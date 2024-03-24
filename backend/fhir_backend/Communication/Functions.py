import json
import os
from fhir.resources.patient import Patient
from fhir.resources.observation import Observation
from fhir.resources.documentreference import DocumentReference
import datetime


def createPatient(patient: dict) -> Patient:
    patient = json.dumps(patient)
    newPatient = Patient.parse_raw(patient)
    return newPatient

def savePatient(patient: Patient, directory: str) -> None:
    filename = patient.id + ".json"
    with open(os.path.join(directory, filename), "w") as f:
        f.write(json.dumps(patient.dict(), indent=4))

def saveObservation(
    observations: list, directory: str # expects a list of observations
) -> None:  
    for observation in observations:
        if not os.path.exists(os.path.join(directory, observation.id)):
            os.mkdir(os.path.join(directory, observation.id))
        filename = (
            str(len(os.listdir(os.path.join(directory, observation.id)))) + ".json"
        )
        obs_path = os.path.join(directory, observation.id, filename)
        with open(obs_path, "w") as f:
            final = observation.dict()
            final["effectiveDateTime"] = str(final["effectiveDateTime"])
            f.write(json.dumps(final, indent=4))


def saveNotes(
    notes: DocumentReference, directory: str # directory is path to Notes folder
) -> None:  
    if not os.path.exists(os.path.join(directory, notes.id)):
        os.mkdir(os.path.join(directory, notes.id))
        count = 0
    else:
        count = len(os.listdir(os.path.join(directory, notes.id)))
    filename = str(count) + ".json"
    with open(os.path.join(directory, notes.id, filename), "w") as f:
        dictionary = notes.dict()
        dictionary["content"][0]["attachment"]["data"] = dictionary["content"][0][
            "attachment"
        ]["data"].decode("utf-8")
        f.write(json.dumps(dictionary, indent=4))


def getImprovement(id: str, path: str, snomed_desired) -> dict:
    # each sub list represents the same body part eg right foot improvement
    # expects path to be path to fhir
    res = {value[0]: [] for value in snomed_desired}
    observation_path = os.path.join(path, "Observation", id)
    files = os.listdir(observation_path)
    files.sort(key=lambda x: os.path.getmtime(os.path.join(observation_path, x)))
    for filename in files:
        with open(os.path.join(observation_path, filename), "r") as file:
            obs = json.load(file)
            measurement = obs["valueString"]  # individual measurement
            if obs["bodySite"]["coding"][0]["code"] in res:
                res[obs["bodySite"]["coding"][0]["code"]].append(measurement)

    return res



def getNotes(id: str, path: str, filename: str = None) -> list:
    res = []
    if filename is None:  
        file_paths = [
            os.path.join(path, id, name) for name in os.listdir(os.path.join(path, id))
        ]

        # Sort files by modification time in ascending order
        file_paths.sort(key=lambda x: os.path.getmtime(x))

        for file_path in file_paths:
            with open(file_path, "r") as file:
                notes = json.load(file)
                res.append(notes)
    else:
        with open(os.path.join(path, id, filename), "r") as file:
            notes = json.load(file)
            res.append(notes)
    print(res)
    return res


def createObservation(
    id, measurement: str, loinc: str, SNOMED: str, desired_path: str
) -> Observation:  # returns observation and session notes
    current_date = str(datetime.datetime.now())
    observation = Observation(
        id=str(id),
        status="final",
        code={"coding": [{"system": "http://loinc.org", "code": loinc}]},
        valueString=measurement,
        bodySite={"coding": [{"system": "http://snomed.info/sct", "code": SNOMED}]},
        effectiveDateTime=current_date,
    )
    """
    try:
        observation.validate()
    except Exception as e:
        print(f"Validation error: {e}")"""
    snomeds = getDesired(id, desired_path)
    snomeds = [snomed[0] for snomed in snomeds]
    if SNOMED not in snomeds:
        saveDesired(id, 0, desired_path, SNOMED)
    return observation


def createNotes(notes: str, id: int) -> DocumentReference:
    if isinstance(notes, bytes):
        notes = notes.decode("utf-8")
    current_date = str(datetime.datetime.now())

    notes_ = DocumentReference(
        id=str(id),
        status="final",
        content=[
            {
                "attachment": {
                    "contentType": "text/plain",
                    "data": notes,
                }
            }
        ],
    )
    """
    try:
        notes.validate()
    except FHIRValidationError as e:
        print(f"Validation error: {e}")"""
    return notes_


def saveDesired(patient: int, desired: int, path: str, snomed: str) -> None:
    filename = snomed + ".json"
    if not os.path.exists(os.path.join(path, str(patient))):
        os.mkdir(os.path.join(path, str(patient)))
    with open(os.path.join(path, patient, filename), "w") as f:
        f.write(json.dumps({"desired": desired}, indent=4))


def getDesired(
    patient: int, path: str
) -> list[tuple]:  # returns a list of tuples of snomed,desired

    files = os.listdir(os.path.join(path, str(patient)))
    res = []
    for file in files:
        snomed = file.split(".")[0]
        with open(os.path.join(path, str(patient), file), "r") as f:
            desired = json.load(f)
            desired_value = desired["desired"]
            res.append((snomed, desired_value))
    return res


def getInterval(
    id: int, start: int, end: int, fhir_path: str, notes_path: str
) -> tuple[dict, list]:
    values = getImprovement(
        str(id), fhir_path, getDesired(id, os.path.join(fhir_path, "Desired"))
    )

    notes = getNotes(str(id), notes_path)[start - 1 : end]  # adjust for off by 1 error
    notes_specific = [
        notes[x]["content"][0]["attachment"]["data"] for x in range(len(notes))
    ]
    for key in values.keys():

        if len(values[key]) > end:
            stop = end
        else:
            stop = len(values[key])
        values[key] = values[key][start - 1 : stop]

    dateSnomedDict = createSnomedDateDict(str(id), fhir_path)

    return values, notes_specific, dateSnomedDict


def createSnomedDateDict(patient: int, path: str) -> dict:
    desired_snomeds = getDesired(patient, os.path.join(path, "Desired"))
    snomed_date_dict = {}

    for snomed, _ in desired_snomeds:
        snomed_dates = getDates(patient, snomed, os.path.join(path, "Observation"))
        snomed_date_dict[snomed] = snomed_dates

    return snomed_date_dict


def getLatestConsultation(
    patient_id: int, fhir_path: str, notes_path: str, desired_path: str
) -> dict:
    """
    Retrieve the latest consultation details for a patient, including the latest observation for each SNOMED code
    corresponding to the index of the latest note.

    :param patient_id: The ID of the patient.
    :param fhir_path: The path to the FHIR resources.
    :param notes_path: The path to the notes resources.
    :param desired_path: The path where the desired SNOMED codes are stored.
    :return: A dictionary containing the latest observation for each SNOMED code and the latest note.
    """
    # Get all notes for the patient and find the index of the latest note

    all_notes = getNotes(str(patient_id), notes_path)
    if not all_notes:
        raise ValueError("No notes found for patient with ID {}".format(patient_id))

    latest_note = all_notes[-1]["content"][0]["attachment"][
        "data"
    ]  
    data = getImprovement(
        str(patient_id),
        fhir_path,
        getDesired(str(patient_id), os.path.join(fhir_path, "Desired")),
    )
    latest_observations = {key: values[-1] for key, values in data.items() if values}


    snomeds = [snomed[0] for snomed in getDesired(patient_id, desired_path)]

    date = getDates(patient_id, int(snomeds[0]), os.path.join(fhir_path, "Observation"))


    return latest_observations, latest_note, date



def getDates(id: int, snomed: int, path: str) -> list:
    dir_path = os.path.join(path, str(id))
    files = os.listdir(dir_path)
    
    files.sort(key=lambda x: os.path.getmtime(os.path.join(dir_path, x)))

    res = []
    for file in files:
        print(os.path.basename(file))
        with open(os.path.join(dir_path, file), "r") as f:
            obs = json.load(f)

            if int(obs["bodySite"]["coding"][0]["code"]) == int(snomed):
                res.append(obs["effectiveDateTime"][:10])
    
    print("dates here are", res)

    return res

# import json
# import os
# from fhir.resources.patient import Patient
# from fhir.resources.observation import Observation
# from fhir.resources.documentreference import DocumentReference
# import base64
# #needs more checks for existing files
# #need to check states of fhir obs/docs
# def createPatient(patient: dict) -> Patient:
#     patient = json.dumps(patient)
#     newPatient = Patient.parse_raw(patient)
#     return newPatient

# def savePatient(patient: Patient, directory: str) -> None:
#     filename = patient.id + ".json"
#     with open(os.path.join(directory, filename), "w") as f:
#         f.write(json.dumps(patient.dict(), indent=4))

# def saveObservation(observations: list, directory: str) -> None: #expects a list of observations
#     for observation in observations:
#         if not os.path.exists(os.path.join(directory, observation.id)):
#             os.mkdir(os.path.join(directory, observation.id))
#         filename = str(len(os.listdir(os.path.join(directory, observation.id)))) + ".json"
#         obs_path = os.path.join(directory,observation.id, filename)
#         with open(obs_path, "w") as f:
#             f.write(json.dumps(observation.dict(), indent=4))

# def saveNotes(notes: DocumentReference, directory: str) -> None: #directory is path to Notes folder
#     if not os.path.exists(os.path.join(directory,notes.id)):
#         os.mkdir(os.path.join(directory, notes.id))
#         count = 0
#     else:
#         count = len(os.listdir(os.path.join(directory, notes.id)))
#     filename = str(count) + ".json"
#     with open(os.path.join(directory, notes.id, filename), "w") as f:
#         dictionary = notes.dict()
#         dictionary['content'][0]['attachment']['data'] = dictionary['content'][0]['attachment']['data'].decode('utf-8')
#         #print(dictionary['content'][0]['attachment']['data'])
#         f.write(json.dumps(dictionary, indent=4))

# def getImprovement(id: str, path: str, snomed_desired) -> dict: #each sub list represents the same body part eg right foot improvement
#     #expects path to be path to fhir
#     res = {value[0]:[] for value in snomed_desired}
#     path = os.path.join(path, "Observation")
    
#     for filename in os.listdir(os.path.join(path, id)):
#         with open(os.path.join(path, id, filename), "r") as file:
#             obs = json.load(file)
#             measurement = obs['valueString'] #individual measurement
#             res[obs['bodySite']['coding'][0]['code']].append(measurement)
#     return res

# def getNotes(id: str, path: str, filename: str = None) -> list:
#     res = []
#     if filename is None: #return all notes for patient
#         for filename in os.listdir(os.path.join(path, id)):
#             with open(os.path.join(path, id, filename), "r") as file:
#                 notes = json.load(file)
#                 res.append(notes)
#     else:
#         with open(os.path.join(path, id, filename), "r") as file:
#             notes = json.load(file)
#             res.append(notes)
#     #print(res)
#     return res
        
# def createObservation(id, measurement: str, loinc: str, SNOMED: str) -> Observation:#returns observation and session notes
#     observation = Observation(
#         id = str(id),
#         status="final",
#         code={"coding": [{"system": "http://loinc.org", "code": loinc}]},
#         valueString= measurement,
#         bodySite={"coding": [{"system": "http://snomed.info/sct", "code": SNOMED}]},
#     )
#     '''
#     try:
#         observation.validate()
#     except Exception as e:
#         print(f"Validation error: {e}")'''
#     return observation

# def createNotes(notes: str, id: int) -> DocumentReference:
#     if isinstance(notes, bytes):
#         notes = notes.decode("utf-8") 

#     notes_ = DocumentReference(
#         id = str(id),
#         status="final",
#         #{"contentType": "text/plain", "data": notes}
#         content=[{"attachment": {"contentType": "text/plain","data": notes, }}],
#     )
#     '''
#     try:
#         notes.validate()
#     except FHIRValidationError as e:
#         print(f"Validation error: {e}")'''
#     return notes_

# def saveDesired(patient: int, desired: int, path: str, snomed: str) -> None:
#     filename = snomed + ".json"
#     if not os.path.exists(os.path.join(path, str(patient))):
#         os.mkdir(os.path.join(path, str(patient)))
#     with open(os.path.join(path, patient, filename), "w") as f:
#         f.write(json.dumps({"desired":desired}, indent=4))

# def getDesired(patient: int, path: str) -> list[tuple]:#returns a list of tuples of snomed,desired
#     patient = str(patient)
#     files = os.listdir(os.path.join(path, patient))
#     res = []
#     for file in files:
#         snomed = file.split('.')[0]
#         with open(os.path.join(path,patient,file), "r") as f:
#             desired = json.load(f)
#             desired_value = desired['desired']
#             res.append((snomed, desired_value))
#     return res

# def getInterval(id: int, start: int, end: int, obs_path: str, notes_path: str) -> tuple[dict, list]:
#     values = getImprovement(id, obs_path, getDesired(id, notes_path))
#     print("values",values)
#     notes = getNotes(id, notes_path)[start -1:end]#adjust for off by 1 error
#     print("notes",notes)
#     for key in values.keys():
#         values[key] = values[key][start -1:end]
#     return values, notes

import json
import os
from fhir.resources.patient import Patient
from fhir.resources.observation import Observation
from fhir.resources.documentreference import DocumentReference
import base64
#needs more checks for existing files
#need to check states of fhir obs/docs
def createPatient(patient: dict) -> Patient:
    patient = json.dumps(patient)
    newPatient = Patient.parse_raw(patient)
    return newPatient

def savePatient(patient: Patient, directory: str) -> None:
    filename = patient.id + ".json"
    with open(os.path.join(directory, filename), "w") as f:
        f.write(json.dumps(patient.dict(), indent=4))

def saveObservation(observations: list, directory: str) -> None: #expects a list of observations
    for observation in observations:
        if not os.path.exists(os.path.join(directory, observation.id)):
            os.mkdir(os.path.join(directory, observation.id))
        filename = str(len(os.listdir(os.path.join(directory, observation.id)))) + ".json"
        obs_path = os.path.join(directory,observation.id, filename)
        with open(obs_path, "w") as f:
            f.write(json.dumps(observation.dict(), indent=4))

def saveNotes(notes: DocumentReference, directory: str) -> None: #directory is path to Notes folder
    if not os.path.exists(os.path.join(directory,notes.id)):
        os.mkdir(os.path.join(directory, notes.id))
        count = 0
    else:
        count = len(os.listdir(os.path.join(directory, notes.id)))
    filename = str(count) + ".json"
    with open(os.path.join(directory, notes.id, filename), "w") as f:
        dictionary = notes.dict()
        dictionary['content'][0]['attachment']['data'] = dictionary['content'][0]['attachment']['data'].decode('utf-8')
        #print(dictionary['content'][0]['attachment']['data'])
        f.write(json.dumps(dictionary, indent=4))

def getImprovement(id: str, path: str, snomed_desired) -> dict: #each sub list represents the same body part eg right foot improvement
    #expects path to be path to fhir
    res = {value[0]:[] for value in snomed_desired}
    path = os.path.join(path, "Observation")
    for filename in os.listdir(os.path.join(path, id)):
        with open(os.path.join(path, id, filename), "r") as file:
            obs = json.load(file)
            measurement = obs['valueString'] #individual measurement
            # print(obs['bodySite']['coding'][0]['code'])
            res[obs['bodySite']['coding'][0]['code']].append(measurement)
    return res

def getNotes(id: str, path: str, filename: str = None) -> list:
    res = []
    if filename is None: #return all notes for patient
        for filename in os.listdir(os.path.join(path, id)):
            with open(os.path.join(path, id, filename), "r") as file:
                notes = json.load(file)
                res.append(notes)
    else:
        with open(os.path.join(path, id, filename), "r") as file:
            notes = json.load(file)
            res.append(notes)
    #print(res)
    return res
        
# def createObservation(id, measurement: str, loinc: str, SNOMED: str) -> Observation:#returns observation and session notes
#     observation = Observation(
#         id = str(id),
#         status="final",
#         code={"coding": [{"system": "http://loinc.org", "code": loinc}]},
#         valueString= measurement,
#         bodySite={"coding": [{"system": "http://snomed.info/sct", "code": SNOMED}]},
#     )
#     '''
#     try:
#         observation.validate()
#     except Exception as e:
#         print(f"Validation error: {e}")'''
#     return observation

def createObservation(id, measurement: str, loinc: str, SNOMED: str, desired_path: str) -> Observation:#returns observation and session notes
    observation = Observation(
        id = str(id),
        status="final",
        code={"coding": [{"system": "http://loinc.org", "code": loinc}]},
        valueString= measurement,
        bodySite={"coding": [{"system": "http://snomed.info/sct", "code": SNOMED}]},
    )
    '''
    try:
        observation.validate()
    except Exception as e:
        print(f"Validation error: {e}")'''
    print("before get desired")
    snomeds = getDesired(id, desired_path)
    print("after get desired")
    snomeds = [snomed[0] for snomed in snomeds]
    if SNOMED not in snomeds:
        print("existing snowmeds", snomeds)
        print("snomed not in snomed")
        saveDesired(id, 0, desired_path, SNOMED)
    return observation

def createNotes(notes: str, id: int) -> DocumentReference:
    if isinstance(notes, bytes):
        notes = notes.decode("utf-8") 

    notes_ = DocumentReference(
        id = str(id),
        status="final",
        #{"contentType": "text/plain", "data": notes}
        content=[{"attachment": {"contentType": "text/plain","data": notes, }}],
    )
    '''
    try:
        notes.validate()
    except FHIRValidationError as e:
        print(f"Validation error: {e}")'''
    return notes_

def saveDesired(patient: int, desired: int, path: str, snomed: str) -> None:
    filename = snomed + ".json"
    if not os.path.exists(os.path.join(path, str(patient))):
        os.mkdir(os.path.join(path, str(patient)))
    with open(os.path.join(path, patient, filename), "w") as f:
        f.write(json.dumps({"desired":desired}, indent=4))

def getDesired(patient: int, path: str) -> list[tuple]:#returns a list of tuples of snomed,desired
    files = os.listdir(os.path.join(path, str(patient)))
    res = []
    for file in files:
        snomed = file.split('.')[0]
        with open(os.path.join(path, str(patient),file), "r") as f:
            desired = json.load(f)
            desired_value = desired['desired']
            res.append((snomed, desired_value))
    return res

def getInterval(id: int, start: int, end: int, fhir_path: str, notes_path: str) -> tuple[dict, list]:
    values = getImprovement(str(id), fhir_path, getDesired(id, os.path.join(fhir_path, "Desired")))
    #print(getNotes(str(id), notes_path))
    notes = getNotes(str(id), notes_path)[start -1:end]#adjust for off by 1 error
    notes_specific = [notes[x]['content'][0]['attachment']['data'] for x in range(len(notes))]
    for key in values.keys():
        if len(values[key]) > end:
            stop = end
        else:
            stop = len(values[key])
        values[key] = values[key][start -1:stop]
    return values, notes_specific

# def getInterval(id: int, start: int, end: int, fhir_path: str, notes_path: str) -> tuple[dict, list]:
#     values = getImprovement(str(id), fhir_path, getDesired(id, os.path.join(fhir_path, "Desired")))
#     #print(getNotes(str(id), notes_path))
#     notes = getNotes(str(id), notes_path)[start -1:end]#adjust for off by 1 error
#     notes_specific = [notes[x]['content'][0]['attachment']['data'] for x in range(len(notes))]
#     for key in values.keys():
#         values[key] = values[key][start -1:end]
#     return values, notes_specific


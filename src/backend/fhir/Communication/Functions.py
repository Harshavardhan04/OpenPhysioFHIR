import json
import os
from fhir.resources.patient import Patient
from fhir.resources.observation import Observation

#needs more checks for existing files
def createPatient(patient: dict) -> Patient:
    #assign the patient dictionary to a new patient object and return it
    newPatient = Patient(**patient)
    return newPatient

def savePatient(patient: Patient, directory: str) -> None:
    #save the patient object to a file
    #filename = patient.id + ".json"
    #file destination is ../Patient
    filename = patient.id + ".json"
    with open(os.path.join(directory, filename), "w") as f:
        f.write(json.dumps(patient.dict(), indent=4))

def saveObservation(observation: Observation, directory: str) -> None:
    #save the session object to a file
    #need more checks such as if the file already exists
    filename = observation['id'] + ".json"
    with open(os.path.join(directory, filename), "w") as f:
        f.write(json.dumps(observation.dict(), indent=4))

#returns desired value and a list of ints 
def getImprovement(id: str, path: str) -> tuple[int, list]: #path is the path to the patient file
    #get the improvement value from the patient file
    #filename = id + ".json"
    #file destination is ../Patient
    filename = id + ".json"
    with open(os.path.join(path, filename), "r") as f:
        patient = json.load(f)
        desired = patient[0]['desired value']
        res = []
        for i in range(len(patient[0]['measurements'])):#assumes constant number of measurements
            measurements = [data['measurements'][i] for data in patient]
            res.append(measurements)
        return desired, res

def createObservation(observation: dict) -> Observation:
    #assign the observation dictionary to a new observation object and return it
    newObservation = Observation(**observation)
    return newObservation


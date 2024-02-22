import unittest
from Functions import *
import shutil

class TestSaving(unittest.TestCase):
    def test_patient(self):
        patient = createPatient({"id": "test"})
        savePatient(patient, "src/backend/fhir/Patient")
        with open("src/backend/fhir/Patient/test.json", "r") as f:
            self.assertEqual(json.load(f), patient.dict())
        os.remove("src/backend/fhir/Patient/test.json")

    def test_observation(self):
        observation = createObservation('test', '90', '999', '3001')
        saveObservation([observation], "src/backend/fhir/Observation")
        with open("src/backend/fhir/Observation/test/0.json", "r") as f:
            self.assertEqual(json.loads(f.read())['id'], "test")
        shutil.rmtree("src/backend/fhir/Observation/test")
    
    def test_getImprovement(self):
        saveDesired("1", "120", "src/backend/fhir/Desired", "999")
        saveDesired("1", "120", "src/backend/fhir/Desired", "888")
        values = getDesired("1", "src/backend/fhir/Desired")
        improvement = getImprovement("1", "src/backend/fhir", values)
        values = list(improvement.values())
        self.assertEqual(values, ([["115", "115", "115", "115"], ["90", "100", "110", "120"]]))
    
    def test_addingNotes(self):
        note1 = createNotes(id="2", notes= "this is a test")
        note2 = createNotes(id="2", notes= "this is also a test")
        saveNotes(note1, "src/backend/fhir/Notes")
        saveNotes(note2, "src/backend/fhir/Notes")
        loaded = getNotes("2", "src/backend/fhir/Notes")
        #print(loaded[0]['content'][0]['attachment']['data'])
        self.assertEqual([loaded[0]['content'][0]['attachment']['data'],loaded[1]['content'][0]['attachment']['data'] ], ["this is a test", "this is also a test"])
        #self.assertEqual(loaded[0]['content'][0]['attachment']['data'].decode('utf-8'), "this is a test")
        shutil.rmtree("src/backend/fhir/Notes/2")
    
if __name__ == "__main__":
    unittest.main()
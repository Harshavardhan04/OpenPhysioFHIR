import unittest
from Functions import *

class TestSaving(unittest.TestCase):
    def test_patient(self):
        patient = createPatient({"id": "test"})
        savePatient(patient, "src/backend/fhir/Patient")
        with open("src/backend/fhir/Patient/test.json", "r") as f:
            self.assertEqual(json.load(f), patient.dict())
        os.remove("src/backend/fhir/Patient/test.json")

    def test_observation(self):
        observation = createObservation({"id": "test"})
        saveObservation(observation, "src/backend/fhir/Observation")
        with open("src/backend/fhir/Observation/test.json", "r") as f:
            self.assertEqual(json.load(f), observation.dict())
        os.remove("src/backend/fhir/Observation/test.json")
    
    def test_getImprovement(self):
        improvement = getImprovement("1", "src/backend/fhir/Observation")
        self.assertEqual(improvement, (120, [[90, 100, 110, 115], [120, 120, 120, 120]]))
    
if __name__ == "__main__":
    unittest.main()
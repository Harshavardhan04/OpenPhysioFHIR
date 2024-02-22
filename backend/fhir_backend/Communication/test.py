class Patient:
    def __init__(self):
        self.test = None

patient = Patient()

def checker():
    patient.test = 100

checker()
print(patient.test)
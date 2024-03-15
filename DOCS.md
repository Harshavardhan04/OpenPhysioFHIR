# Backend Functions Documentation

## Function: createPatient
- **Description**: Creates a Patient resource from a given dictionary.
- **Parameters**:
  - `patient`: A dictionary representing the patient data.
- **Returns**: A `Patient` object.

## Function: savePatient
- **Description**: Saves a Patient resource to a specified directory.
- **Parameters**:
  - `patient`: A `Patient` object.
  - `directory`: A string specifying the directory to save the patient data.
- **Returns**: None.

## Function: saveObservation
- **Description**: Saves a list of Observation resources to a specified directory.
- **Parameters**:
  - `observations`: A list of `Observation` objects.
  - `directory`: A string specifying the directory to save the observation data.
- **Returns**: None.

## Function: saveNotes
- **Description**: Saves a DocumentReference resource to a specified directory.
- **Parameters**:
  - `notes`: A `DocumentReference` object.
  - `directory`: A string specifying the path to the Notes folder.
- **Returns**: None.

## Function: getImprovement
- **Description**: Retrieves improvement data for a patient based on their SNOMED codes.
- **Parameters**:
  - `id`: A string representing the patient's ID.
  - `path`: A string specifying the path to the FHIR resources.
  - `snomed_desired`: A list of SNOMED codes and desired values.
- **Returns**: A dictionary mapping SNOMED codes to lists of observed values.

## Function: getNotes
- **Description**: Retrieves notes for a patient, optionally filtered by filename.
- **Parameters**:
  - `id`: A string representing the patient's ID.
  - `path`: A string specifying the path to the notes.
  - `filename`: An optional string specifying the filename to filter by.
- **Returns**: A list of notes.

## Function: createObservation
- **Description**: Creates an Observation resource from given parameters.
- **Parameters**:
  - `id`: The patient's ID.
  - `measurement`: A string representing the measurement value.
  - `loinc`: A string representing the LOINC code.
  - `SNOMED`: A string representing the SNOMED code.
  - `desired_path`: A string specifying the path to the desired values.
- **Returns**: An `Observation` object.

## Function: createNotes
- **Description**: Creates a DocumentReference resource from given notes and patient ID.
- **Parameters**:
  - `notes`: A string containing the notes.
  - `id`: An integer representing the patient's ID.
- **Returns**: A `DocumentReference` object.

## Function: saveDesired
- **Description**: Saves desired values for a patient based on SNOMED codes.
- **Parameters**:
  - `patient`: An integer representing the patient's ID.
  - `desired`: An integer representing the desired value.
  - `path`: A string specifying the path to save the desired values.
  - `snomed`: A string representing the SNOMED code.
- **Returns**: None.

## Function: getDesired
- **Description**: Retrieves desired values for a patient.
- **Parameters**:
  - `patient`: An integer representing the patient's ID.
  - `path`: A string specifying the path to the desired values.
- **Returns**: A list of tuples containing SNOMED codes and desired values.

## Function: getInterval
- **Description**: Retrieves interval data for a patient, including values and notes within a specified range.
- **Parameters**:
  - `id`: An integer representing the patient's ID.
  - `start`: An integer representing the start index.
  - `end`: An integer representing the end index.
  - `fhir_path`: A string specifying the path to the FHIR resources.
  - `notes_path`: A string specifying the path to the notes.
- **Returns**: A tuple containing a dictionary of values, a list of notes, and a dictionary of SNOMED codes and dates.

## Function: createSnomedDateDict
- **Description**: Creates a dictionary mapping SNOMED codes to their corresponding dates.
- **Parameters**:
  - `patient`: An integer representing the patient's ID.
  - `path`: A string specifying the path to the FHIR resources.
- **Returns**: A dictionary mapping SNOMED codes to lists of dates.

## Function: getLatestConsultation
- **Description**: Retrieves the latest consultation details for a patient.
- **Parameters**:
  - `patient_id`: An integer representing the patient's ID.
  - `fhir_path`: A string specifying the path to the FHIR resources.
  - `notes_path`: A string specifying the path to the notes.
  - `desired_path`: A string specifying the path to the desired values.
- **Returns**: A dictionary containing the latest observation for each SNOMED code and the latest note.

## Function: getDates
- **Description**: Retrieves dates associated with a specific SNOMED code for a patient.
- **Parameters**:
  - `id`: An integer representing the patient's ID.
  - `snomed`: An integer representing the SNOMED code.
  - `path`: A string specifying the path to the observations.
- **Returns**: A list of dates corresponding to the observations.

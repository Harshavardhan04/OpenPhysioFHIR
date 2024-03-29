# System Documentation

# Backend Functions and Flask Server Documentation

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


# Flask Server (base.py) documentation

The `base.py` file initializes and configures the Flask server, sets up CORS (Cross-Origin Resource Sharing) to allow frontend communication, and defines routes for the various API endpoints used by the web application.

### Flask Server Initialization
- **Purpose**: To create an instance of the Flask server and configure CORS for different routes.
- **Routes**:
  - `/profile`: Handles requests related to the patient's profile data.
  - `/past-data`: Retrieves historical data for the patient.
  - `/chart-data`: Fetches data needed for chart visualizations.
  - `/desired`: Manages the desired values for different SNOMED codes for the patient.
  - `/last-consultation`: Retrieves data related to the patient's last consultation.

### Class: Patient
- **Description**: A class to facilitate sharing and editing patient data across different functions.
- **Attributes**:
  - `id`: Holds the patient's identifier which is used across API routes.

### API Route: /search-profile
- **Method**: POST
- **Description**: Searches for a patient's profile based on the patient ID provided in the request.
- **Returns**: JSON data of the patient's profile or an error message if not found.

### API Route: /profile
- **Methods**: GET, POST
- **Description**: Handles the retrieval and updating of the patient's session data. The GET method fetches the patient's profile data, while the POST method updates it with new session data.

### API Route: /past-data
- **Methods**: POST, GET
- **Description**: Retrieves past data entries for a patient within a specified range. Requires 'start', 'end', and 'patientId' in the request body.

### API Route: /desired
- **Methods**: GET, POST
- **Description**: Retrieves or updates desired values for a patient. The GET method fetches all desired values, and the POST method updates a specific desired value based on the SNOMED code provided.

### API Route: /chart-data
- **Method**: POST
- **Description**: Retrieves data for chart visualizations based on the SNOMED code provided in the request.

### API Route: /last-consultation
- **Method**: GET
- **Description**: Fetches details of the last consultation for the patient, including observations and notes.

### Main Block
- **Purpose**: The conditional `if __name__ == "__main__":` block runs the Flask server when the `base.py` file is executed as the main program.
- **Configuration**: The server is set to run in debug mode to provide detailed error logs and auto-reload during development.


# PastDataPage Component Documentation

The `PastDataPage` component is a part of a healthcare data management application, designed for visualizing past consultation data for patients. It provides functionalities to view and export data within a specified consultation range.

## Features

- **Date Range Selection**: Users can select a range of consultation numbers to filter the data they wish to view.
- **Data Fetching**: The component makes a POST request to `/past-data` with the selected start and end consultation numbers to fetch relevant data.
- **Data Display**: Fetched data are displayed in a tabular format, including consultation numbers, SNOMED codes, values, and dates.
- **Data Export**: Users can export the data of a particular consultation as a CSV file.

## State Management

- `snomedData`: An object containing SNOMED codes and their corresponding values.
- `notes`: An array storing notes associated with each consultation.
- `dates`: An object mapping SNOMED codes to arrays of dates.
- `startConsultation` and `endConsultation`: States for managing the selected range of consultations.
- `selectedSNOMED`: An array of selected SNOMED codes for which data should be displayed.
- `SNOMEDOptions`: An array of SNOMED codes available for selection.

## Functionality

- **Effect Hook**: On component mount or when `startConsultation` or `endConsultation` change, it triggers a data fetch.
- **Data Download**: The `downloadConsultationData` function generates and triggers a download of the consultation data in CSV format.

## UI Components

- **TextField**: For inputting the start and end consultation numbers.
- **Autocomplete**: To allow selection of multiple SNOMED codes from the available options.
- **Table**: For displaying the consultation data in a structured format.
- **Button**: To trigger the data download function.

## Usage

Include the `PastDataPage` component within a parent component's render method, ensuring that the backend is correctly set up to handle the required endpoints.

```jsx
<PastDataPage />
```
# ViewCharts Component Documentation

The `ViewCharts` component is designed to display an interactive line chart representing patient observations over time. It is built using React and utilizes the `react-chartjs-2` library for rendering the chart.

## Features

- **SNOMED Code Selection**: A dropdown menu allows users to select a SNOMED code to display related observations.
- **Chart Display**: Utilizes the `Line` component from `react-chartjs-2` to render observation values graphically.
- **Responsive Design**: The chart is responsive and adapts to various screen sizes for optimal viewing.

## Props

- `selectedSnomed`: The currently selected SNOMED code.
- `snomedOptions`: An array of available SNOMED codes for selection.
- `chartData`: The data object that contains values to be displayed on the chart.
- `setSelectedSnomed`: A function to update the state when a new SNOMED code is selected.
- `dates`: An array of dates corresponding to each observation value.

## Functionality

- The component displays a line chart representing the trend of observations based on the selected SNOMED code.
- The labels on the x-axis combine the session number with the corresponding date for each observation.

## UI Components

- **Card**: Wraps the chart and selection controls in a Material-UI card for a clean layout.
- **FormControl and Select**: Used to build the dropdown menu for SNOMED code selection.
- **Typography**: Displays titles and selected SNOMED code information.

## Usage

To incorporate the `ViewCharts` component into a parent component, pass the required props as follows:

```jsx
<ViewCharts
  selectedSnomed={selectedSnomed}
  snomedOptions={snomedOptions}
  chartData={chartData}
  setSelectedSnomed={setSelectedSnomed}
  dates={dates}
/>
```
# Desired Component Documentation

The `Desired` component in the application is responsible for managing the desired values associated with various SNOMED codes used within the system. It provides an interface for viewing and editing these values.

## Features

- **List Desired Values**: Display a list of SNOMED codes alongside their corresponding desired values.
- **Edit Desired Values**: Allows for the in-place editing of the desired values.
- **Update Functionality**: Submit new desired values to the backend via API calls.

## Props

This component does not take any props and manages its state and effects internally.

## State Management

- `desiredValues`: An array of objects containing SNOMED codes and their desired values.
- `editStates`: An object mapping each SNOMED code to its editable state value.

## API Integration

The component interacts with the `/desired` endpoint to fetch and update desired values.

## Functionality

- **Fetching Data**: On mount, the component fetches the existing desired values using a GET request to the `/desired` endpoint.
- **Updating Data**: When a user modifies a desired value and clicks the update button, a POST request is made to the `/desired` endpoint with the new value.

## UI Components

- **Table**: To layout the SNOMED codes and desired values in a tabular format.
- **TextField**: Allows users to enter new desired values.
- **Button**: When clicked, triggers the update of the desired value for the corresponding SNOMED code.

## Usage

Simply import and use the component in the parent component (Dashboard) as follows:

```jsx
<Desired />
```
# Dashboard Component Documentation

The `Dashboard` component is the central hub of the application's user interface, where users can access various functionalities including patient profiles, consultation data, and visualization of observations.

## Features

- **Patient Profile**: Display basic patient information such as name, date of birth, and patient ID.
- **Consultation Notes**: View and record notes from patient consultations.
- **Session Values**: Manage measurements taken during patient sessions.
- **View Modes**: Toggle between tabular data, graphical views of data, and managing desired SNOMED values.
- **New Consultation**: Add new consultation data for a patient.

## Integration with Other Components

- **PastDataPage**: Provides a detailed historical view of past consultations.
- **ViewCharts**: Visualizes patient data in a chart format for better analysis.
- **Desired**: Allows users to manage the desired values associated with SNOMED codes.

## State Management

- `view`: Controls which component view to display.
- `patientProfile`: Contains patient's personal information.
- `sessionValues`: Stores data from the current or last session.
- `chartData`: Data structure for chart visualization.
- `snomedOptions`: Available SNOMED codes for selection in the UI.
- `snomedCodesAndValues`: Current SNOMED codes and their values.

## API Integration

The component interacts with several endpoints such as `/profile`, `/last-consultation`, `/chart-data`, and `/desired` to fetch and post data.

## Functionality

- **Data Fetching**: On component mount, patient profile data, last consultation, and SNOMED options are fetched from the backend.
- **Data Posting**: On form submission, current session data is posted to the backend to update the patient profile.
- **Dynamic Views**: The user can switch between different data views and manage patient data effectively.

## UI Components

- **Typography**: For displaying text and labels.
- **Button**: For triggering actions like fetching data, submitting forms, and changing views.
- **Dialog**: To confirm that session data was saved successfully.
- **TextField**: For inputting text data such as consultation notes and session values.
- **Table**: To display the latest consultation details in tabular form.
- **FormControl**: For selecting SNOMED codes.

## Usage

Simply import and render the component in the application as follows:

```jsx
<Dashboard />
```



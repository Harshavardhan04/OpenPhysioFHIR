import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from fhir_backend.Communication.Functions import *
import logging

api = Flask(__name__)

# Enable CORS for just the /profile endpoint for the React origin
CORS(api, resources={r"/profile": {"origins": "http://localhost:3000"}})
CORS(api, resources={r"/past-data": {"origins": "http://localhost:3000"}})
CORS(api, resources={r"/chart-data": {"origins": "http://localhost:3000"}})
CORS(api, resources={r"/desired/*": {"origins": "http://localhost:3000"}})
CORS(api, resources = {r"/desired": {"origins": "http://localhost:3000"}})

class Patient: #the purpose of patient is to create a way of sharing/editing data across functions
    def __init__(self):
        self.id = None

patient = Patient()



# @api.route('/profile')
# def my_profile():
#     response_body = {
#         "name": "Nagato",
#         "age": 30,
#         "nhsNumber": "1234567890",
#         "problemDescription": "Sample problem description",
#         "desiredValues": [
#             {"name": "Value1", "value": "One"},
#             {"name": "Value2", "value": "Two"}
#         ]
#     }
#     return jsonify(response_body)

# profile_file_path = 'patient_files/test1.json'

# @api.route('/profile', methods=['GET', 'POST'])
# def profile():
#     if request.method == 'POST':
#         data = request.json
#         with open(profile_file_path, 'w') as file:
#             json.dump(data, file)
#         return jsonify({'status': 'success', 'message': 'Profile updated successfully.'}), 200

#     elif request.method == 'GET':
#         try:
#             with open(profile_file_path, 'r') as file:
#                 data = json.load(file)
#             return jsonify(data), 200
#         except FileNotFoundError:
#             return jsonify({'status': 'error', 'message': 'Profile data not found.'}), 404

# data = [
#     { 'date': '2023-02-01', 'steps': 1000, 'jointAngle': 30, 'muscleStrength': 50 },
#     { 'date': '2023-01-02', 'steps': 1100, 'jointAngle': 32, 'muscleStrength': 52 },
#     { 'date': '2023-02-03', 'steps': 1150, 'jointAngle': 34, 'muscleStrength': 54 },
#     { 'date': '2023-01-04', 'steps': 1200, 'jointAngle': 35, 'muscleStrength': 55 },
#     { 'date': '2023-01-05', 'steps': 1250, 'jointAngle': 36, 'muscleStrength': 56 },
#     { 'date': '2023-01-06', 'steps': 1300, 'jointAngle': 38, 'muscleStrength': 58 },
#     { 'date': '2023-01-07', 'steps': 1350, 'jointAngle': 40, 'muscleStrength': 60 },
#     { 'date': '2023-02-08', 'steps': 1400, 'jointAngle': 42, 'muscleStrength': 62 },
#     { 'date': '2023-01-09', 'steps': 1450, 'jointAngle': 44, 'muscleStrength': 64 },
#     { 'date': '2023-01-10', 'steps': 1500, 'jointAngle': 45, 'muscleStrength': 66 },
#     { 'date': '2023-02-11', 'steps': 1550, 'jointAngle': 46, 'muscleStrength': 68 },
#     { 'date': '2023-01-12', 'steps': 1600, 'jointAngle': 48, 'muscleStrength': 70 },
#     { 'date': '2023-01-13', 'steps': 1650, 'jointAngle': 50, 'muscleStrength': 72 },
#     { 'date': '2023-02-14', 'steps': 1700, 'jointAngle': 52, 'muscleStrength': 74 },
#     { 'date': '2023-01-15', 'steps': 1750, 'jointAngle': 54, 'muscleStrength': 76 },
#     { 'date': '2023-01-16', 'steps': 1800, 'jointAngle': 55, 'muscleStrength': 78 },
#     { 'date': '2023-02-17', 'steps': 1850, 'jointAngle': 56, 'muscleStrength': 80 },
#     { 'date': '2023-01-18', 'steps': 1900, 'jointAngle': 58, 'muscleStrength': 82 },
#     { 'date': '2023-02-19', 'steps': 1950, 'jointAngle': 60, 'muscleStrength': 84 },
#     { 'date': '2023-01-20', 'steps': 2000, 'jointAngle': 62, 'muscleStrength': 86 },
# ]



# @api.route('/profile', methods=['GET', 'POST'])
# def profile():
#     if request.method == 'POST':
#         update_data = request.json
#         try:
#             # Attempt to read the existing data from the file.
#             with open(profile_file_path, 'r') as file:
#                 data = json.load(file)
#         except FileNotFoundError:
#             # If the file does not exist, initialize data as an empty dict
#             data = {}

#         # Update the data dictionary with the new values from update_data
#         # This ensures existing keys are updated, and new keys are added,
#         # but keys not included in the update_data are left unchanged.
#         data.update(update_data)

#         # Write the updated data back to the file
#         with open(profile_file_path, 'w') as file:
#             json.dump(data, file, indent=4)  # Using indent for better readability of the JSON file

#         return jsonify({'status': 'success', 'message': 'Profile updated successfully.'}), 200

#     elif request.method == 'GET':
#         try:
#             with open(profile_file_path, 'r') as file:
#                 data = json.load(file)
#             return jsonify(data), 200
#         except FileNotFoundError:
#             return jsonify({'status': 'error', 'message': 'Profile data not found.'}), 404


profile_dir = '../backend/fhir_backend/Patient/'

@api.route('/search-profile', methods=['POST'])
def search_profile():
    if request.method == "POST":
        criteria = request.json

        patientID = criteria.get('patientID')
        patient.id=patientID


        # Search for file based on patient name or NHS number
        '''
        if patient_name:
            file_path = os.path.join(profile_dir, f"{patient_name}.json")
        elif nhs_number:
            file_path = os.path.join(profile_dir, f"{nhs_number}.json")
        else:
            return jsonify({'status': 'error', 'message': 'No search criteria provided.'}), 400
        '''
        file_path = os.path.join(profile_dir, f"{patient.id}.json")
        # print(file_path)
        try:
            with open(file_path, 'r') as file:
                data = json.load(file)
            return jsonify(data), 200
        except FileNotFoundError:
            return jsonify({'status': 'error', 'message': 'Profile not found.'}), 404



# profile_file_path = 'patient_files/test1.json'
notes_path = '../backend/fhir_backend/Notes/'
obs_path = '../backend/fhir_backend/Observation/'
desired_path = '../backend/fhir_backend/Desired/'
generic_path = "../backend/fhir_backend/"

@api.route('/profile', methods=['GET', 'POST'])
def profile():
    if request.method == 'POST':
        session_data = request.json 
        #print(session_data)# This should now only contain session-specific data
        '''
        # Ensure 'data' key exists and is a list; append new session data
        if 'data' not in data:
            data['data'] = []
        data['data'].append(session_data)  # Append new session to 'data' array

        with open(profile_file_path, 'w') as file:
            json.dump(data, file, indent=4)'''
        
        notes = createNotes(session_data['notes'], int(patient.id))
        measurements = [session_data['measurements'][x]['value'] for x in range(len(session_data['measurements']))]
        snomeds = [session_data['measurements'][x]['snowmedName'] for x in range(len(session_data['measurements']))]
        loincs = [session_data['measurements'][x]['loincName'] for x in range(len(session_data['measurements']))]
        saveNotes(notes, '../backend/fhir_backend/Notes')

        obs = []
        for i in range(len(session_data['measurements'])):
            obs.append(createObservation(patient.id, str(measurements[i]),str(loincs[i]), str(snomeds[i]),desired_path))
        saveObservation(obs, obs_path)

        return jsonify({'status': 'success', 'message': 'Session updated successfully.'}), 200

    elif request.method == 'GET':
        try:



            with open(os.path.join(profile_dir, str(patient.id) + '.json'), 'r') as file:
                data = json.load(file)
                #print(data)
            return jsonify(data), 200
        except FileNotFoundError:
            return jsonify({'status': 'error', 'message': 'Profile not found.'}), 404



# @api.route('/past-data', methods=['GET'])
# def get_past_data():
#     return jsonify(data)
#profile_file_path = 'patient_files/test1.json'
# @api.route('/past-data', methods=['GET','POST'])
# def get_past_data():
#     path = os.path.join(obs_path, patient.id)
#     try:
#         '''with open(profile_file_path, 'r') as file:
#             file_data = json.load(file)
#             # Assuming the 'data' array is within the JSON structure
#             past_data = file_data.get('data', [])  # Provide a default empty list in case 'data' is not found
#         return jsonify(past_data), 200'''
#         snomed_desired = getDesired(patient.id, desired_path)
#         x = getImprovement(patient.id, path, snomed_desired)
#         print(x)
        
#         # return getImprovement(patient.id, obs_path, snomed_desired), getNotes(patient.id, notes_path)
#     except FileNotFoundError:
#         return jsonify({'status': 'error', 'message': 'Past data not found.'}), 404

@api.route('/past-data', methods=['POST','GET'])
def get_past_data():
    # Extract start and end from the POST request
    data = request.get_json()
    start = data.get('start')
    end = data.get('end')
    patient_id = patient.id  # Assuming the patient ID is also sent in the request
    # print("Data",start,end,patient_id)

    if not all([start, end, patient_id]):
        return jsonify({'status': 'error', 'message': 'Missing required fields: start, end, or patientId'}), 400

    obs_path_complete = os.path.join(obs_path, str(patient_id))
    notes_path_complete = os.path.join(notes_path, str(patient_id))
    desired_path_complete = os.path.join(desired_path, str(patient_id))
    generic_path = "../backend/fhir_backend"


    try:
        # snomed_desired = getDesired(patient_id, desired_path)
        interval_data = getInterval(int(patient_id), int(start), int(end), generic_path, notes_path)

        # Assuming interval_data correctly returns the values and notes within the specified range
        
        response = jsonify(interval_data)
        response.headers.add('Access-Control-Allow-Origin', '*')  # Add CORS header
        
        return response, 200
    except FileNotFoundError:
        return jsonify({'status': 'error', 'message': 'Past data not found for the given patient ID.'}), 404


# @api.route('/chart-data', methods=['GET'])
# def get_chart_data():
#     chart_data = {
#         'line': {
#             'labels': ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5'],
#             'data': [20, 25, 30, 35, 40]
#         },
#         'bar': {
#             'labels': ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5'],
#             'data': [10, 15, 20, 25, 30]
#         },
#         'doughnut': {
#             'labels': ['Weak', 'Moderate', 'Strong'],
#             'data': [30, 40, 30]
#         },
#         'radar': {
#             'labels': ['Balance', 'Stability', 'Coordination', 'Agility'],
#             'data': [65, 59, 90, 81]
#         }
#     }
#     return jsonify(chart_data)


# @api.route('/desired', methods=['GET', 'POST'])
# def manage_patient_desired(snomed_code=None):
#     """
#     Fetches or updates the desired values for the current patient's SNOMED code.
#     GET request to fetch the desired value for a specific SNOMED code.
#     POST request to update the desired value for a specific SNOMED code.
#     """
#     if not patient.id:

#         return jsonify({"error": "Patient ID is not set"}), 400

#     if request.method == 'GET':
#         try:
#             desired_values = getDesired(patient.id, desired_path)
            
#             if snomed_code:
#                 # Filter for the specific SNOMED code if provided
#                 desired_value = next((item for item in desired_values if item[0] == snomed_code), None)
#                 if desired_value:
#                     return jsonify({snomed_code: desired_value[1]}), 200
#                 else:
#                     return jsonify({"error": f"Desired value for SNOMED code {snomed_code} not found"}), 404
#             else:
#                 # Return all desired values if no specific SNOMED code is provided

#                 return jsonify(desired_values), 200
#         except Exception as e:
#             return jsonify({"error": str(e)}), 500

#     elif request.method == 'POST':
#         request_data = request.json
#         desired_value = request_data.get('desired')

#         if desired_value is None:
#             return jsonify({"error": "Missing desired value"}), 400

#         try:
#             saveDesired(patient.id, desired_value, desired_path, snomed_code)
#             return jsonify({"message": "Desired value updated successfully"}), 200
#         except Exception as e:
#             return jsonify({"error": str(e)}), 500

@api.route('/desired', methods=['GET', 'POST'])
def manage_patient_desired():
    """
    Fetches or updates the desired values for the current patient.
    GET request to fetch all desired values.
    POST request to update a desired value for a specific SNOMED code.
    """
    if not patient.id:
        return jsonify({"error": "Patient ID is not set"}), 400

    if request.method == 'GET':
        try:
            desired_values = getDesired(patient.id, desired_path)
            return jsonify(desired_values), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    elif request.method == 'POST':
        request_data = request.json
        snomed_code = request_data.get('snomedCode')
        desired_value = request_data.get('desired')
        print("vals received",snomed_code,desired_value)

        if not all([snomed_code, desired_value is not None]):
            return jsonify({"error": "Missing SNOMED code or desired value"}), 400

        try:
            saveDesired(patient.id, desired_value, desired_path, snomed_code)
            print("vals to function",patient.id, desired_value, desired_path, snomed_code)
            return jsonify({"message": "Desired value updated successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500


@api.route('/chart-data', methods=['POST'])
def get_chart_data():
    data = request.json
    patient_id = patient.id  # This should be dynamically determined based on your application's context
    snomed_code = data.get('snomedCode')
    
    if not snomed_code:
        return jsonify({"error": "SNOMED code is required"}), 400
    
    snomed_desired = getDesired(patient_id, desired_path)
    observations = getImprovement(patient_id, generic_path, snomed_desired)
    
    # Extracting observations for the requested SNOMED code
    snomed_observations = observations.get(snomed_code, [])
    desired_value = next((value for code, value in snomed_desired if code == snomed_code), None)

    print(snomed_observations, desired_value)
    if not snomed_observations:
        return jsonify({"error": "No observations found for the provided SNOMED code"}), 404

    return jsonify({
        "observations": snomed_observations,
        "desired": desired_value
    }), 200

# @api.route('/chart-data', methods=['POST'])
# def get_chart_data():
#     data = request.json
#     snomed_code = data.get('snomedCode')
#     patient_id = patient.id  # Assumes patient ID is available in the session or context


#     if not snomed_code:
#         return jsonify({"error": "SNOMED code is required"}), 400

#     # Your logic to fetch observations and desired value for the SNOMED code
#     snomed_desired = getDesired(patient_id, desired_path)
#     observations = getImprovement(patient_id, generic_path, [(snomed_code,)])
#     print(snomed_desired, observations)
    
#     # Extracting observations and desired value for the SNOMED code
#     snomed_observations = observations.get(snomed_code, [])
#     desired_value = next((value for code, value in snomed_desired if code == snomed_code), None)

#     if not snomed_observations:
#         return jsonify({"error": "No observations found for the provided SNOMED code"}), 404

#     return jsonify({
#         "observations": snomed_observations,
#         "desired": desired_value
#     }), 200
    
if __name__ == "__main__":
    api.run(debug=True)

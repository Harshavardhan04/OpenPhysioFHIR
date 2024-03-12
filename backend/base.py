import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from fhir_backend.Communication.Functions import *
import logging

api = Flask(__name__)

CORS(api, resources={r"/profile": {"origins": "http://localhost:3000"}})
CORS(api, resources={r"/past-data": {"origins": "http://localhost:3000"}})
CORS(api, resources={r"/chart-data": {"origins": "http://localhost:3000"}})
CORS(api, resources={r"/desired/*": {"origins": "http://localhost:3000"}})
CORS(api, resources={r"/desired": {"origins": "http://localhost:3000"}})
CORS(api, resources={r"//last-consultation": {"origins": "http://localhost:3000"}})


class Patient:  # the purpose of patient is to create a way of sharing/editing data across functions
    def __init__(self):
        self.id = None


patient = Patient()


profile_dir = "../backend/fhir_backend/Patient/"


@api.route("/search-profile", methods=["POST"])
def search_profile():
    if request.method == "POST":
        criteria = request.json

        patientID = criteria.get("patientID")

        patient.id = patientID


        # Search for file based on patient name or NHS number
        """
        if patient_name:
            file_path = os.path.join(profile_dir, f"{patient_name}.json")
        elif nhs_number:
            file_path = os.path.join(profile_dir, f"{nhs_number}.json")
        else:
            return jsonify({'status': 'error', 'message': 'No search criteria provided.'}), 400
        """
        file_path = os.path.join(profile_dir, f"{patient.id}.json")
        # print(file_path)
        try:
            with open(file_path, "r") as file:
                data = json.load(file)
            return jsonify(data), 200
        except FileNotFoundError:
            return jsonify({"status": "error", "message": "Profile not found."}), 404


# profile_file_path = 'patient_files/test1.json'
notes_path = "../backend/fhir_backend/Notes/"
obs_path = "../backend/fhir_backend/Observation/"
desired_path = "../backend/fhir_backend/Desired/"
generic_path = "../backend/fhir_backend/"


@api.route("/profile", methods=["GET", "POST"])
def profile():
    if request.method == "POST":
        session_data = request.json

        # print(session_data)# This should now only contain session-specific data
        """
        # Ensure 'data' key exists and is a list; append new session data
        if 'data' not in data:
            data['data'] = []
        data['data'].append(session_data)  # Append new session to 'data' array

        with open(profile_file_path, 'w') as file:
            json.dump(data, file, indent=4)"""
        
 
        notes = createNotes(session_data["notes"], patient.id)

        measurements = [
            session_data["measurements"][x]["value"]
            for x in range(len(session_data["measurements"]))
        ]
        snomeds = [
            session_data["measurements"][x]["snowmedName"]
            for x in range(len(session_data["measurements"]))
        ]
        loincs = [
            session_data["measurements"][x]["loincName"]
            for x in range(len(session_data["measurements"]))
        ]
        saveNotes(notes, "../backend/fhir_backend/Notes")

        obs = []
        for i in range(len(session_data["measurements"])):
            obs.append(
                createObservation(
                    patient.id,
                    str(measurements[i]),
                    str(loincs[i]),
                    str(snomeds[i]),
                    desired_path,
                )
            )
        saveObservation(obs, obs_path)

        return (
            jsonify({"status": "success", "message": "Session updated successfully."}),
            200,
        )

    elif request.method == "GET":
        try:


            with open(
                os.path.join(profile_dir, str(patient.id) + ".json"), "r"
            ) as file:
                data = json.load(file)
                # print(data)
            return jsonify(data), 200
        except FileNotFoundError:
            return jsonify({"status": "error", "message": "Profile not found."}), 404


@api.route("/past-data", methods=["POST", "GET"])
def get_past_data():
    # Extract start and end from the POST request
    data = request.get_json()
    start = data.get("start")
    end = data.get("end")
    patient_id = patient.id  # Assuming the patient ID is also sent in the request
    # print("Data",start,end,patient_id)

    if not all([start, end, patient_id]):
        return (
            jsonify(
                {
                    "status": "error",
                    "message": "Missing required fields: start, end, or patientId",
                }
            ),
            400,
        )

    obs_path_complete = os.path.join(obs_path, str(patient_id))
    notes_path_complete = os.path.join(notes_path, str(patient_id))
    desired_path_complete = os.path.join(desired_path, str(patient_id))
    generic_path = "../backend/fhir_backend"

    try:
        # snomed_desired = getDesired(patient_id, desired_path)
        interval_data = getInterval(
            patient_id, int(start), int(end), generic_path, notes_path
        )
        date_snomed_dict = interval_data[2]

# Now, you can access dates for each SNOMED code using date_snomed_dict
        for snomed, dates in date_snomed_dict.items():
            print(f"SNOMED Code: {snomed} has dates: {dates}")

        # Assuming interval_data correctly returns the values and notes within the specified range

        response = jsonify(interval_data)
        response.headers.add("Access-Control-Allow-Origin", "*")  # Add CORS header

        return response, 200
    except FileNotFoundError:
        return (
            jsonify(
                {
                    "status": "error",
                    "message": "Past data not found for the given patient ID.",
                }
            ),
            404,
        )


@api.route("/desired", methods=["GET", "POST"])
def manage_patient_desired():
    """
    Fetches or updates the desired values for the current patient.
    GET request to fetch all desired values.
    POST request to update a desired value for a specific SNOMED code.
    """
    if not patient.id:
        return jsonify({"error": "Patient ID is not set"}), 400

    if request.method == "GET":
        try:
            desired_values = getDesired(patient.id, desired_path)
            return jsonify(desired_values), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    elif request.method == "POST":
        request_data = request.json
        snomed_code = request_data.get("snomedCode")
        desired_value = request_data.get("desired")


        if not all([snomed_code, desired_value is not None]):
            return jsonify({"error": "Missing SNOMED code or desired value"}), 400

        try:
            saveDesired(patient.id, desired_value, desired_path, snomed_code)
   
            return jsonify({"message": "Desired value updated successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500


@api.route("/chart-data", methods=["POST"])
def get_chart_data():
    data = request.json
    patient_id = (
        patient.id
    )  # This should be dynamically determined based on your application's context
    snomed_code = data.get("snomedCode")

    if not snomed_code:
        return jsonify({"error": "SNOMED code is required"}), 400

    snomed_desired = getDesired(patient_id, desired_path)
    observations = getImprovement(patient_id, generic_path, snomed_desired)

    # Extracting observations for the requested SNOMED code
    snomed_observations = observations.get(snomed_code, [])
    desired_value = next(
        (value for code, value in snomed_desired if code == snomed_code), None
    )

    snomed_dates = getDates(patient_id, snomed_code, os.path.join(generic_path,"Observation"))
    print("dates",snomed_dates)
    if not snomed_observations:
        return (
            jsonify({"error": "No observations found for the provided SNOMED code"}),
            404,
        )

    return jsonify({"observations": snomed_observations, "desired": desired_value, "dates": snomed_dates}), 200



@api.route("/last-consultation", methods=["GET"])
def last_consultation():

    patient_id = patient.id  

    try:


        consultation_data = getLatestConsultation(
            patient_id, generic_path, notes_path, desired_path
        )
        date_retrieved = consultation_data[2][-1]



        return jsonify({"latest_observations": consultation_data[0],
                        "latest_note": consultation_data[1],
                        "date": date_retrieved}), 200
    except Exception as e:

        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    api.run(debug=True)

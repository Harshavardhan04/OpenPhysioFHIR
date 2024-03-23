# Deployment Manual

This deployment manual provides step-by-step instructions to set up and run the backend and frontend of the OpenPhysio FHIR application. Please follow the instructions carefully.

## Prerequisites Installation

Before you begin the deployment, you need to install some necessary tools and libraries. Ensure you have administrative access to your system to perform these installations.

### Python and Flask Installation

1. **Install Python 3:** Download and install Python 3 from [the official Python website](https://www.python.org/downloads/). Ensure to add Python to your system's PATH during the installation process.

2. **Install Flask:** Flask is a micro web framework written in Python. To install Flask, open your terminal or command prompt and execute:

    ```bash
    pip install flask
    ```

3. **Install Flask-CORS:** Flask-CORS is a Flask extension for handling Cross-Origin Resource Sharing (CORS). Install it using pip:

    ```bash
    pip install -U flask-cors
    ```

4. **Install FHIR Resources:** This library is utilized to work with FHIR resources. Install it using pip:

    ```bash
    pip install fhir.resources
    ```

### Node.js and React Installation

1. **Install Node.js:** Download and install Node.js from [the official Node.js website](https://nodejs.org/en/download/). This will also install npm (Node Package Manager), required to manage frontend dependencies.

2. **Verify NPM Installation:** Ensure npm is installed by checking its version in the terminal:

    ```bash
    npm -v
    ```

## Backend Activation

Follow these steps to activate and run the application's backend.

1. **Activate the Virtual Environment:** Navigate to your project's virtual environment directory (called 'venv', within 'backend' folder) and activate it:

    - macOS/Linux:
      ```bash
      source bin/activate
      ```

    - Windows:
      ```cmd
      .\Scripts\activate
      ```

2. **Navigate back to the Backend Directory:**

    ```bash
    cd ..
    ```

3. **Set Flask App Environment Variable:**

    - macOS/Linux:
      ```bash
      export FLASK_APP=base.py
      ```

    - Windows:
      ```cmd
      set FLASK_APP=base.py
      ```

4. **Run the Flask Application:**

    ```bash
    flask run
    ```

## Frontend Activation

Follow these steps to set up and start the frontend of the application.

1. **Navigate to Your Frontend Directory (called 'frontend'):**

    ```bash
    cd path/to/your/frontend
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Start the Frontend Application:**

    ```bash
    npm start
    ```

Your web application's backend and frontend should now be running. If you encounter any issues, verify that all steps were followed correctly and all prerequisites were installed.

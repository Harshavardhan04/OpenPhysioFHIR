# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Backend

to use the functions contained within the Functions.py file, FHIR.resources is required to be installed. installation details can be found at: 

- https://pypi.org/project/fhir.resources/

Each patient's basic data is stored in json format with their unique patient ID as the filename. 

The session's data is stored in the Observation directory with it's patient ID as the filename.


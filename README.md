# Student Tech Hub

Student Tech Hub is a simple, beginner-friendly full-stack web application designed for listing upcoming technical events and allowing users to register.

## Project Structure

This project is separated into a frontend (HTML, CSS, JavaScript) and a backend (Python with FastAPI).

*   **`frontend/`**: Contains the user interface. It is built with vanilla HTML, CSS, and JS (no frameworks).
*   **`backend/`**: Contains the API server built with Python and FastAPI. It provides endpoints for the frontend to fetch events and submit registrations.

## Prerequisites

*   **Python**: You need Python installed on your computer.
*   **Web Browser**: Any modern web browser.
*   **A code editor or terminal**.

## Backend Setup & Execution

1.  **Navigate to the backend directory:**
    Open your terminal and `cd` into the `backend` folder.
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    Install FastAPI, Uvicorn (the web server), and CORS middleware.
    ```bash
    py -m pip install -r requirements.txt
    ```

3.  **Run the backend server:**
    Use `uvicorn` to start the server. The `--reload` flag enables auto-reloading when you make code changes.
    ```bash
    py -m uvicorn main:app --reload
    ```
    The backend API will now be running at `http://127.0.0.1:8000`.

## Frontend Setup & Execution

1.  **Open the frontend folder:**
    You can simply open the `frontend` folder in your file explorer.

2.  **Run the frontend:**
    You don't need any special server to run the frontend! Simply double-click the `index.html` file to open it in your web browser. 

## How it works (Frontend-Backend Communication)

1.  When you click the **"Load Events"** button on the frontend, the JavaScript code (`script.js`) uses the `fetch` API to make an HTTP GET request to the backend's `/api/events` endpoint (`http://localhost:8000/api/events`).
2.  The backend (`main.py`) receives this request and returns a list of events in JSON format.
3.  The frontend receives this JSON data and dynamically updates the HTML to display the events.
4.  Similarly, when you submit the registration form, the frontend sends an HTTP POST request with your name and email to the backend's `/api/register` endpoint.
5.  **CORS (Cross-Origin Resource Sharing)** is enabled in `main.py` so that your web browser allows the frontend to talk to the backend running on `localhost:8000` from a local file or different port.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Sample event data
events_data = [
    {"id": 1, "title": "Intro to Web Development", "date": "2026-10-15", "location": "Room 101"},
    {"id": 2, "title": "AI & Machine Learning Workshop", "date": "2026-10-20", "location": "Lab 3"},
    {"id": 3, "title": "Hackathon Info Session", "date": "2026-11-05", "location": "Main Auditorium"},
]

class User(BaseModel):
    name: str
    email: str

@app.get("/api/events")
def get_events():
    return events_data

@app.post("/api/register")
def register_user(user: User):
    # In a real app, we would save this to a database
    return {"message": f"Successfully registered {user.name} with email {user.email}!"}

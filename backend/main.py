from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class JobDescriptionRequest(BaseModel):
    jobDescription: str


@app.get("/")
def home():
    return {"message": "Backend is running"}


@app.post("/generate-test")
def generate_test(data: JobDescriptionRequest):
    questions = [
        {
            "id": 1,
            "type": "mcq",
            "question": "Which protocol provides secure web communication?",
            "options": ["HTTP", "FTP", "HTTPS", "Telnet"],
            "answer": "HTTPS"
        },
        {
            "id": 2,
            "type": "short-answer",
            "question": "What is the purpose of a SIEM tool?",
            "answer": "A SIEM collects and analyzes security logs."
        },
        {
            "id": 3,
            "type": "scenario",
            "question": "How would you respond to a phishing incident?",
            "answer": "Identify, isolate, investigate, contain and report."
        }
    ]

    return {
        "message": "Test generated successfully",
        "questions": questions
    }
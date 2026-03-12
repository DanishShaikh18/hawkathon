from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import create_tables
from .routers import patients, doctors, appointments, symptons, health_records, pharmacy, medicines
from .seed import seed_database

app = FastAPI(title="Rural TeleHealth API")

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()

app.include_router(patients.router)
app.include_router(doctors.router)
app.include_router(appointments.router)
app.include_router(symptons.router)
app.include_router(health_records.router)
app.include_router(pharmacy.router)
app.include_router(medicines.router)


@app.post("/seed")
def seed():
    seed_database()
    return {"message": "Database seeded with sample data"}


@app.get("/")
def root():
    return {"message": "Rural TeleHealth API is running"}

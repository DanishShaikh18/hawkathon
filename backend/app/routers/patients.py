from fastapi import APIRouter, HTTPException
from ..database import get_db
from ..schemas import PatientRegister, PatientLogin

router = APIRouter(prefix="/patients", tags=["Patients"])


# REGISTER PATIENT
@router.post("/register")
def register_patient(data: PatientRegister):
    conn = get_db()
    cursor = conn.cursor()

    try:
        cursor.execute("""
        INSERT INTO patients(name, phone, blood_group, allergies)
        VALUES (?, ?, ?, ?)
        """, (data.name, data.phone, data.blood_group, data.allergies))

        conn.commit()

        return {
            "message": "Patient registered successfully"
        }

    except:
        raise HTTPException(status_code=400, detail="Phone already registered")

    finally:
        conn.close()


# LOGIN PATIENT
@router.post("/login")
def login_patient(data: PatientLogin):

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM patients WHERE phone = ?", (data.phone,)
    )

    patient = cursor.fetchone()

    conn.close()

    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    return {
        "id": patient["id"],
        "name": patient["name"],
        "phone": patient["phone"],
        "blood_group": patient["blood_group"],
        "allergies": patient["allergies"]
    }
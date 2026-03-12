from fastapi import APIRouter, HTTPException
from ..database import get_db
from ..schemas import DoctorRegister, DoctorLogin

router = APIRouter(prefix="/doctors", tags=["Doctors"])


# REGISTER DOCTOR
@router.post("/register")
def register_doctor(data: DoctorRegister):

    conn = get_db()
    cursor = conn.cursor()

    try:
        cursor.execute("""
        INSERT INTO doctors(name, phone, specialization)
        VALUES (?, ?, ?)
        """, (data.name, data.phone, data.specialization))

        conn.commit()

        return {"message": "Doctor registered successfully"}

    except:
        raise HTTPException(status_code=400, detail="Doctor already exists")

    finally:
        conn.close()


# LOGIN DOCTOR
@router.post("/login")
def login_doctor(data: DoctorLogin):

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM doctors WHERE phone = ?",
        (data.phone,)
    )

    doctor = cursor.fetchone()

    conn.close()

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    return {
        "id": doctor["id"],
        "name": doctor["name"],
        "specialization": doctor["specialization"]
    }


# LIST DOCTORS (for patient appointment booking)
@router.get("/list")
def list_doctors():

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT id, name, specialization
    FROM doctors
    """)

    doctors = cursor.fetchall()
    conn.close()

    return [
        {
            "id": d["id"],
            "name": d["name"],
            "specialization": d["specialization"]
        }
        for d in doctors
    ]
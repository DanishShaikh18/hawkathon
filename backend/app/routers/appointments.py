from ..database import get_db
from ..schemas import AppointmentBook
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/appointments", tags=["Appointments"])


@router.post("/book")
def book_appointment(data: AppointmentBook):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO appointments(patient_id, doctor_id, symptoms, priority, status, time_slot)
    VALUES (?, ?, ?, ?, 'pending', ?)
    """, (
        data.patient_id,
        data.doctor_id,
        data.symptoms,
        data.priority,
        data.time_slot
    ))

    conn.commit()
    appt_id = cursor.lastrowid
    conn.close()

    return {
        "message": "Appointment booked successfully",
        "appointment_id": appt_id
    }


@router.get("/patient/{patient_id}")
def patient_appointments(patient_id: int):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        appointments.id,
        doctors.name as doctor_name,
        doctors.specialization,
        appointments.symptoms,
        appointments.priority,
        appointments.status,
        appointments.time_slot,
        appointments.created_at
    FROM appointments
    JOIN doctors ON appointments.doctor_id = doctors.id
    WHERE appointments.patient_id = ?
    ORDER BY appointments.created_at DESC
    """, (patient_id,))

    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "appointment_id": r["id"],
            "doctor_name": r["doctor_name"],
            "specialization": r["specialization"],
            "symptoms": r["symptoms"],
            "priority": r["priority"],
            "status": r["status"],
            "time_slot": r["time_slot"],
            "date": r["created_at"]
        }
        for r in rows
    ]


@router.get("/doctor/{doctor_id}")
def doctor_appointments(doctor_id: int):

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        appointments.id,
        patients.name as patient_name,
        appointments.symptoms,
        appointments.priority,
        appointments.time_slot
    FROM appointments
    JOIN patients
    ON appointments.patient_id = patients.id
    WHERE appointments.doctor_id = ?
    AND appointments.status = 'pending'
    ORDER BY
        CASE appointments.priority
            WHEN 'emergency' THEN 1
            ELSE 2
        END,
        appointments.time_slot
    """, (doctor_id,))

    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "appointment_id": r["id"],
            "patient_name": r["patient_name"],
            "symptoms": r["symptoms"],
            "priority": r["priority"],
            "time_slot": r["time_slot"]
        }
        for r in rows
    ]


@router.get("/{appointment_id}/details")
def appointment_details(appointment_id: int):

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        patients.name,
        patients.blood_group,
        patients.allergies,
        appointments.symptoms
    FROM appointments
    JOIN patients
    ON appointments.patient_id = patients.id
    WHERE appointments.id = ?
    """, (appointment_id,))

    row = cursor.fetchone()
    conn.close()

    if not row:
        return {"error": "Appointment not found"}

    return {
        "patient_name": row["name"],
        "blood_group": row["blood_group"],
        "allergies": row["allergies"],
        "symptoms": row["symptoms"]
    }
from fastapi import APIRouter
from ..database import get_db
from ..schemas import HealthRecordCreate

router = APIRouter(prefix="/health-records", tags=["Health Records"])


@router.post("/create")
def create_health_record(data: HealthRecordCreate):

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO health_records(appointment_id, patient_id, doctor_id, diagnosis, notes)
    VALUES (?, ?, ?, ?, ?)
    """, (
        data.appointment_id,
        data.patient_id,
        data.doctor_id,
        data.diagnosis,
        data.notes
    ))

    conn.commit()

    record_id = cursor.lastrowid
    conn.close()

    return {
        "message": "Health record created",
        "record_id": record_id
    }


from ..schemas import PrescriptionCreate


@router.post("/prescriptions/add")
def add_prescription(data: PrescriptionCreate):

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO prescriptions(record_id, medicine_name, dosage, instructions)
    VALUES (?, ?, ?, ?)
    """, (
        data.record_id,
        data.medicine_name,
        data.dosage,
        data.instructions
    ))

    conn.commit()
    conn.close()

    return {"message": "Prescription added"}

@router.get("/patients/{patient_id}")
def patient_records(patient_id: int):

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT id, diagnosis, created_at
    FROM health_records
    WHERE patient_id = ?
    ORDER BY created_at DESC
    """, (patient_id,))

    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "record_id": r["id"],
            "diagnosis": r["diagnosis"],
            "date": r["created_at"]
        }
        for r in rows
    ]

@router.get("/{record_id}")
def record_details(record_id: int):

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT diagnosis, notes, doctor_id, created_at
    FROM health_records
    WHERE id = ?
    """, (record_id,))

    record = cursor.fetchone()

    cursor.execute("""
    SELECT medicine_name, dosage, instructions
    FROM prescriptions
    WHERE record_id = ?
    """, (record_id,))

    medicines = cursor.fetchall()

    conn.close()

    return {
        "diagnosis": record["diagnosis"],
        "notes": record["notes"],
        "doctor_id": record["doctor_id"],
        "date": record["created_at"],
        "prescriptions": [
            {
                "medicine": m["medicine_name"],
                "dosage": m["dosage"],
                "instructions": m["instructions"]
            }
            for m in medicines
        ]
    }


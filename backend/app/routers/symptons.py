from fastapi import APIRouter
from ..database import get_db
from ..schemas import SymptomCheck
from ..services.ai_service import analyze_symptoms

router = APIRouter(prefix="/symptoms", tags=["Symptoms"])


@router.post("/check")
def check_symptoms(data: SymptomCheck):

    result = analyze_symptoms(data.symptoms)

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO symptom_logs(patient_id, symptoms, possible_issue, urgency)
    VALUES (?, ?, ?, ?)
    """, (
        data.patient_id,
        data.symptoms,
        result["possible_issue"],
        result["urgency"]
    ))

    conn.commit()
    conn.close()

    return result
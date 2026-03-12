def analyze_symptoms(symptoms: str):

    s = symptoms.lower()

    # --- EMERGENCY ---
    if "chest pain" in s or "heart" in s:
        return {
            "possible_issue": "Cardiac issue",
            "urgency": "emergency",
            "advice": "Seek immediate medical help. Call emergency services."
        }

    if "breathing" in s or "breathless" in s or "suffocation" in s:
        return {
            "possible_issue": "Respiratory distress",
            "urgency": "emergency",
            "advice": "Seek immediate medical help. Sit upright and try to stay calm."
        }

    if "unconscious" in s or "seizure" in s or "fainting" in s:
        return {
            "possible_issue": "Neurological emergency",
            "urgency": "emergency",
            "advice": "Call emergency services immediately. Do not move the person."
        }

    if "severe bleeding" in s or "heavy bleeding" in s:
        return {
            "possible_issue": "Hemorrhage",
            "urgency": "emergency",
            "advice": "Apply pressure to wound. Seek immediate medical help."
        }

    # --- MODERATE ---
    if "fever" in s and "cough" in s:
        return {
            "possible_issue": "Viral infection / Flu",
            "urgency": "moderate",
            "advice": "Consult doctor within 24 hours. Stay hydrated and rest."
        }

    if "fever" in s and ("rash" in s or "skin" in s):
        return {
            "possible_issue": "Viral rash / Dengue possibility",
            "urgency": "moderate",
            "advice": "Consult doctor soon. Monitor for worsening symptoms."
        }

    if "diarrhea" in s or "loose motion" in s:
        return {
            "possible_issue": "Gastroenteritis / Food poisoning",
            "urgency": "moderate",
            "advice": "Take ORS solution. Consult doctor if it lasts more than 2 days."
        }

    if "vomiting" in s and "stomach" in s:
        return {
            "possible_issue": "Gastric issue / Food poisoning",
            "urgency": "moderate",
            "advice": "Avoid solid food for a few hours. Take small sips of water. Consult doctor if persisting."
        }

    if "fever" in s:
        return {
            "possible_issue": "Fever — possible infection",
            "urgency": "moderate",
            "advice": "Take Paracetamol. Rest and drink fluids. Consult doctor if fever exceeds 103°F."
        }

    if "stomach pain" in s or "abdominal pain" in s:
        return {
            "possible_issue": "Abdominal discomfort",
            "urgency": "moderate",
            "advice": "Avoid spicy food. Consult doctor if pain is severe or persistent."
        }

    # --- LOW ---
    if "headache" in s:
        return {
            "possible_issue": "Tension headache / Migraine",
            "urgency": "low",
            "advice": "Rest in a dark room. Stay hydrated. Take Paracetamol if needed."
        }

    if "cough" in s or "cold" in s or "runny nose" in s:
        return {
            "possible_issue": "Common cold",
            "urgency": "low",
            "advice": "Rest, drink warm fluids, and take steam inhalation."
        }

    if "body ache" in s or "muscle pain" in s or "fatigue" in s:
        return {
            "possible_issue": "General fatigue / Body ache",
            "urgency": "low",
            "advice": "Rest well and stay hydrated. Consult doctor if it persists beyond 3 days."
        }

    if "sore throat" in s or "throat pain" in s:
        return {
            "possible_issue": "Pharyngitis / Sore throat",
            "urgency": "low",
            "advice": "Gargle with warm salt water. Drink warm fluids. Consult doctor if it worsens."
        }

    if "back pain" in s:
        return {
            "possible_issue": "Muscular back pain",
            "urgency": "low",
            "advice": "Apply warm compress. Avoid heavy lifting. Consult doctor if pain radiates."
        }

    if "itching" in s or "allergy" in s:
        return {
            "possible_issue": "Allergic reaction",
            "urgency": "low",
            "advice": "Take Cetirizine. Avoid known allergens. Consult doctor if swelling occurs."
        }

    if "joint pain" in s or "knee pain" in s:
        return {
            "possible_issue": "Joint inflammation",
            "urgency": "low",
            "advice": "Rest the joint. Apply ice pack. Consult orthopedic doctor if persistent."
        }

    return {
        "possible_issue": "Unidentified symptoms",
        "urgency": "low",
        "advice": "Consult a doctor if symptoms persist for more than 2-3 days."
    }
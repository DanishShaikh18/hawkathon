from .database import get_db

def create_tables():
    conn = get_db()
    cursor = conn.cursor()

    # PATIENTS
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS patients(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT UNIQUE,
        blood_group TEXT,
        allergies TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # DOCTORS
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS doctors(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT UNIQUE,
        specialization TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cursor.execute("""
CREATE TABLE IF NOT EXISTS appointments(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    doctor_id INTEGER,
    symptoms TEXT,
    priority TEXT,
    status TEXT,
    time_slot TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")
    

    cursor.execute("""
CREATE TABLE IF NOT EXISTS symptom_logs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    symptoms TEXT,
    possible_issue TEXT,
    urgency TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")
    
    # HEALTH RECORDS
    cursor.execute("""
CREATE TABLE IF NOT EXISTS health_records(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    appointment_id INTEGER,
    patient_id INTEGER,
    doctor_id INTEGER,
    diagnosis TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

# PRESCRIPTIONS
    cursor.execute("""
CREATE TABLE IF NOT EXISTS prescriptions(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    record_id INTEGER,
    medicine_name TEXT,
    dosage TEXT,
    instructions TEXT
)
""")

    # PHARMACIES
    cursor.execute("""
CREATE TABLE IF NOT EXISTS pharmacies(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    location TEXT,
    phone TEXT
)
""")

# PHARMACY INVENTORY
    cursor.execute("""
CREATE TABLE IF NOT EXISTS pharmacy_inventory(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pharmacy_id INTEGER,
    medicine_name TEXT,
    quantity INTEGER,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")
    conn.commit()
    conn.close()
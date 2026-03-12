from .database import get_db


def seed_database():
    conn = get_db()
    cursor = conn.cursor()

    # --- Seed Doctors ---
    doctors = [
        ("Dr. Amandeep Sharma", "9876500001", "General Physician"),
        ("Dr. Harpreet Kaur", "9876500002", "Cardiologist"),
        ("Dr. Rajinder Singh", "9876500003", "Orthopedics"),
        ("Dr. Nisha Verma", "9876500004", "Dermatologist"),
        ("Dr. Vikram Patel", "9876500005", "Pediatrician"),
    ]
    for name, phone, spec in doctors:
        cursor.execute(
            "INSERT OR IGNORE INTO doctors(name, phone, specialization) VALUES (?, ?, ?)",
            (name, phone, spec),
        )

    # --- Seed Pharmacies ---
    pharmacies = [
        ("City Pharmacy", "Near Bus Stand, Nabha", "9876600001"),
        ("Nabha Medicos", "Main Bazar, Patiala Road", "9876600002"),
        ("Village Health Center", "Gram Panchayat Govt Dispensary, Amloh Road", "9876600003"),
    ]
    for name, location, phone in pharmacies:
        cursor.execute(
            "INSERT OR IGNORE INTO pharmacies(name, location, phone) VALUES (?, ?, ?)",
            (name, location, phone),
        )

    # Get pharmacy IDs
    cursor.execute("SELECT id, name FROM pharmacies")
    pharmacy_map = {row["name"]: row["id"] for row in cursor.fetchall()}

    # --- Seed Inventory ---
    inventory = [
        (pharmacy_map.get("City Pharmacy", 1), "Paracetamol", 120),
        (pharmacy_map.get("City Pharmacy", 1), "Amoxicillin", 45),
        (pharmacy_map.get("City Pharmacy", 1), "Cetirizine", 80),
        (pharmacy_map.get("City Pharmacy", 1), "ORS Packets", 200),
        (pharmacy_map.get("Nabha Medicos", 2), "Paracetamol", 95),
        (pharmacy_map.get("Nabha Medicos", 2), "Metformin", 60),
        (pharmacy_map.get("Nabha Medicos", 2), "Ibuprofen", 35),
        (pharmacy_map.get("Nabha Medicos", 2), "Azithromycin", 25),
        (pharmacy_map.get("Village Health Center", 3), "Paracetamol", 0),
        (pharmacy_map.get("Village Health Center", 3), "Iron Tablets", 50),
        (pharmacy_map.get("Village Health Center", 3), "Bandages", 100),
    ]

    # Clear old inventory and re-seed
    cursor.execute("DELETE FROM pharmacy_inventory")
    for pharm_id, med_name, qty in inventory:
        cursor.execute(
            "INSERT INTO pharmacy_inventory(pharmacy_id, medicine_name, quantity) VALUES (?, ?, ?)",
            (pharm_id, med_name, qty),
        )

    conn.commit()
    conn.close()

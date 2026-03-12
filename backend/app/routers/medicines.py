from fastapi import APIRouter
from ..database import get_db

router = APIRouter(prefix="/medicines", tags=["Medicines"])


@router.get("/search")
def search_medicine(name: str):

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        pharmacies.name AS pharmacy_name,
        pharmacies.location,
        pharmacy_inventory.quantity
    FROM pharmacy_inventory
    JOIN pharmacies
    ON pharmacy_inventory.pharmacy_id = pharmacies.id
    WHERE pharmacy_inventory.medicine_name LIKE ?
    AND pharmacy_inventory.quantity > 0
    """, (f"%{name}%",))

    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "pharmacy": r["pharmacy_name"],
            "location": r["location"],
            "available_quantity": r["quantity"]
        }
        for r in rows
    ]
from fastapi import APIRouter
from ..database import get_db
from ..schemas import PharmacyRegister, InventoryUpdate

router = APIRouter(prefix="/pharmacy", tags=["Pharmacy"])


@router.post("/register")
def register_pharmacy(data: PharmacyRegister):

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO pharmacies(name, location, phone)
    VALUES (?, ?, ?)
    """, (
        data.name,
        data.location,
        data.phone
    ))

    conn.commit()
    conn.close()

    return {"message": "Pharmacy registered"}


@router.post("/inventory/update")
def update_inventory(data: InventoryUpdate):

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO pharmacy_inventory(pharmacy_id, medicine_name, quantity)
    VALUES (?, ?, ?)
    """, (
        data.pharmacy_id,
        data.medicine_name,
        data.quantity
    ))

    conn.commit()
    conn.close()

    return {"message": "Inventory updated"}

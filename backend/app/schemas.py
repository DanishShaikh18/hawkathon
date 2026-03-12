from pydantic import BaseModel

class PatientRegister(BaseModel):
    name: str
    phone: str
    blood_group: str
    allergies: str


class PatientLogin(BaseModel):
    phone: str


class DoctorRegister(BaseModel):
    name: str
    phone: str
    specialization: str


class DoctorLogin(BaseModel):
    phone: str

class SymptomCheck(BaseModel):
    patient_id: int
    symptoms: str

class HealthRecordCreate(BaseModel):
    appointment_id: int
    patient_id: int
    doctor_id: int
    diagnosis: str
    notes: str


class PrescriptionCreate(BaseModel):
    record_id: int
    medicine_name: str
    dosage: str
    instructions: str

class PharmacyRegister(BaseModel):
    name: str
    location: str
    phone: str


class InventoryUpdate(BaseModel):
    pharmacy_id: int
    medicine_name: str
    quantity: int


class AppointmentBook(BaseModel):
    patient_id: int
    doctor_id: int
    symptoms: str
    priority: str = "normal"
    time_slot: str = ""
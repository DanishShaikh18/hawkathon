const API_BASE = "http://localhost:8000";

async function request(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(err.detail || "Request failed");
    }
    return await res.json();
  } catch (err) {
    if (err.message === "Failed to fetch") {
      throw new Error("offline");
    }
    throw err;
  }
}

// ---- Patients ----
export const registerPatient = (data) =>
  request("/patients/register", { method: "POST", body: JSON.stringify(data) });

export const loginPatient = (phone) =>
  request("/patients/login", { method: "POST", body: JSON.stringify({ phone }) });

// ---- Doctors ----
export const listDoctors = () => request("/doctors/list");

// ---- Appointments ----
export const bookAppointment = (data) =>
  request("/appointments/book", { method: "POST", body: JSON.stringify(data) });

export const getPatientAppointments = (patientId) =>
  request(`/appointments/patient/${patientId}`);

// ---- Symptoms ----
export const checkSymptoms = (patientId, symptoms) =>
  request("/symptoms/check", {
    method: "POST",
    body: JSON.stringify({ patient_id: patientId, symptoms }),
  });

// ---- Health Records ----
export const getHealthRecords = (patientId) =>
  request(`/health-records/patients/${patientId}`);

export const getRecordDetails = (recordId) =>
  request(`/health-records/${recordId}`);

// ---- Medicines ----
export const searchMedicines = (name) =>
  request(`/medicines/search?name=${encodeURIComponent(name)}`);

// ---- Seed ----
export const seedDatabase = () => request("/seed", { method: "POST" });

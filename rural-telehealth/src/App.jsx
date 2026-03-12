import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import Home from './pages/Home';
import LanguageSelect from './pages/LanguageSelect';
import SymptomChecker from './pages/SymptomChecker';
import Consultation from './pages/Consultation';
import HealthRecords from './pages/HealthRecords';
import MedicineFinder from './pages/MedicineFinder';

import DoctorLayout from './doctor/DoctorLayout';
import DoctorDashboard from './doctor/pages/DoctorDashboard';
import ConsultationRequests from './doctor/pages/ConsultationRequests';
import PatientRecords from './doctor/pages/PatientRecords';
import PrescribeMedicine from './doctor/pages/PrescribeMedicine';

function App() {
  return (
    <Routes>
      {/* Route without Layout for language selection */}
      <Route path="/language" element={<LanguageSelect />} />
      
      {/* Routes with Main Layout (Nav + Header) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/symptoms" element={<SymptomChecker />} />
        <Route path="/consult" element={<Consultation />} />
        <Route path="/records" element={<HealthRecords />} />
        <Route path="/medicine" element={<MedicineFinder />} />
      </Route>

      {/* Doctor Module Routes */}
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route index element={<DoctorDashboard />} />
        <Route path="requests" element={<ConsultationRequests />} />
        <Route path="patients" element={<PatientRecords />} />
        <Route path="prescribe" element={<PrescribeMedicine />} />
      </Route>
    </Routes>
  );
}

export default App;

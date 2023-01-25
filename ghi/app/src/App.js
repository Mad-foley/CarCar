import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppointmentList from './AppointmentList';
import MainPage from './MainPage';
import AppointmentForm from './AppointmentForm'
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import AppointmentHistory from './AppointmentHistory';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/appointments">
            <Route path='' element={<AppointmentList />} />
            <Route path='new' element={<AppointmentForm />}/>
            <Route path='history' element={<AppointmentHistory />} />
          </Route>
          <Route path='/technicians'>
            <Route path="" element={<TechnicianList />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

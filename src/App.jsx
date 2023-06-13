import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users';
import Driver from './pages/Driver';
import Request from './pages/Request';
import Vehicle from './pages/Vehicle';
import LoginPage from './pages/LoginPage';
import AdminPublicRoute from './utils/AdminPublicRoute';
import AdminProtectedRoute from './utils/AdminProtectedRoute';
import AddVehicle from './components/AddVehicle';
import EditVehicle from './components/EditVehicle';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Admin */}
          <Route element={<AdminPublicRoute />}>
            <Route path="/" element={<LoginPage />} />
          </Route>

          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/user" element={<Users />} />
            <Route path="/admin/driver" element={<Driver />} />
            <Route path="/admin/request" element={<Request />} />
            <Route path="/admin/vehicle" element={<Vehicle />} />
            <Route path="/admin/vehicle/addVehicle" element={<AddVehicle/>} />
            <Route path="/admin/vehicle/editVehicle" element={<EditVehicle />} />
            <Route path="/admin/salesReport" element={<Vehicle />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

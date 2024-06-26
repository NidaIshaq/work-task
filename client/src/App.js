import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import AdminPanel from "./pages/admin/AdminPanel";
import AddSymptoms from "./components/AddSymptoms";
import AddDisease from "./components/AddDisease";
import DiseaseRecognition from "./pages/user/DiseaseRecognition";
import DiseaseDetails from "./pages/user/DiseaseDetails";
import Hero from "./components/Hero";
import Emergency from "./components/Emergency";
import AddDietPlan from "./components/AddDietPlan";
import DietPlanPage from "./pages/DietPlanPage";
import RegisterDoctor from "./pages/doctor/RegisterDoctor";
import ClinicsPage from "./pages/ClinicsPage";
import ApplyAppointment from "./pages/user/ApplyAppointment";
import EmergencyAppointment from "./pages/user/EmergencyAppointment";
import CommunityForum from "./pages/user/CommunityForum";
import LoginDoctor from "./pages/doctor/LoginDoctor";
import DoctorPanel from "./pages/doctor/doctorPanel";

function App() {
  const { loading } = useSelector((state) => state.alerts || { loading: false });
    return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointment"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                  <Login />

              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-appointments"
              element={
                <ProtectedRoute>
                  <DoctorAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/emergency"
              element={
                <ProtectedRoute>
                  <Emergency />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                // <ProtectedRoute>
                  <Hero />
                  // {/* </ProtectedRoute> */}
              }
            />

            <Route path="/adminPanel" element={<AdminPanel />} />
            <Route path="/addSymptoms" element={<AddSymptoms />} />
            <Route path="/addDisease" element={<AddDisease />} />
            <Route path="/diseaseRecognition"  element={<DiseaseRecognition />}/>
            <Route path="/diseaseDetails/:id" element={<DiseaseDetails />} />
            <Route path="/addDietPlan" element={<AddDietPlan />} />
            <Route path= "/dietPlanPage/:diseaseId" element={<DietPlanPage/>} />
            <Route path= "/registerDoctor" element={<RegisterDoctor/>} />
            <Route path= "/clinicsPage" element={<ClinicsPage/>} />
            <Route path= "/applyAppointment/:doctorId" element={<ApplyAppointment/>} />
            <Route path= "/emergencyAppointment" element={<EmergencyAppointment/>} />
            <Route path= "/communityForum" element={<CommunityForum/>} />
            <Route path= "/loginDoctor" element={<LoginDoctor/>} /> 
            <Route path= "/doctorPanel" element={<DoctorPanel/>} />



          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;

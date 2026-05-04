import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/routing/ProtectedRoute";

import Login from "./pages/Login/Login";

// placeholders مؤقتًا (اعملهم ملفات بسيطة لو مش جاهزين)
const Dashboard = () => <div className="p-3">Dashboard</div>;
const ListPage = () => <div className="p-3">List</div>;
const DetailsPage = () => <div className="p-3">Details</div>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/list"
        element={
          <ProtectedRoute>
            <ListPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/details/:id"
        element={
          <ProtectedRoute>
            <DetailsPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<div className="p-3">Not Found</div>} />
    </Routes>
  );
}

export default App;

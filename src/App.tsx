import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ReportLostPage } from './pages/ReportLostPage';
import { ReportFoundPage } from './pages/ReportFoundPage';
import { SearchPage } from './pages/SearchPage';
import { MyReportsPage } from './pages/MyReportsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/report/lost"
            element={
              <ProtectedRoute>
                <ReportLostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report/found"
            element={
              <ProtectedRoute>
                <ReportFoundPage />
              </ProtectedRoute>
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/my-reports"
            element={
              <ProtectedRoute>
                <MyReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

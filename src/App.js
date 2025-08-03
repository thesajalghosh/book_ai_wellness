import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import BookPageNL from './pages/BookPageNL';
import Login from './pages/Login';
import Register from './pages/Register';
import InvoicePage from './pages/InvoicePage';
import PrivateRoute from './component/ProtectedRoute';
import PaymentSuccess from './pages/PaymentSuccess';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book-page" element={<BookPage />} />
        <Route path="/book-page-nl" element={<BookPageNL />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path='/profile-page' element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

        {/* ✅ Protected Route */}
        <Route
          path="/invoice-page/:id"
          element={
            <PrivateRoute>
              <InvoicePage />
            </PrivateRoute>
          }
        />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;

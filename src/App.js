import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './component/Header';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import BookPageNL from './pages/BookPageNL';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Example check using localStorage
    const token = localStorage.getItem('authToken');
    if(token){
      setIsLoggedIn(true);

    }
  }, []);
console.log("isLoggedIn", isLoggedIn)
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Route Logic */}
        <Route
          path="/book-page"
          element={isLoggedIn ? <BookPage /> : <Navigate to="/nl-book-page" />}
        />
        <Route path="/nl-book-page" element={<BookPageNL />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

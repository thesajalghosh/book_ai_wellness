import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookPage from './pages/BookPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book-page" element={<BookPage />} />


        </Routes>



      </BrowserRouter>

    </>
  );
}

export default App;

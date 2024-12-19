import {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddAuthor from './AddAuthor'
import AddBook from './AddBook'
import Login from './Login'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <nav>
          <ul class="nav justify-content-center">
            <li class="nav-item">
              <Link to="/" class="nav-link">Авторы</Link>
            </li>
            <li class="nav-item">
              <Link to="/books" class="nav-link">Книги</Link>
            </li>
            <li class="nav-item">
              <Link to="/login" class="nav-link">Авторизация</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<LoginRoute />} />
        </Routes>
      </div>
    </Router>
  );


  return (
    <div className="App">
      <AddAuthor/>
    </div>
  );
  
}

function Home() {
  return (
    <div className="App">
      <AddAuthor/>
    </div>
  );
}

function LoginRoute() {
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

function Books() {
  return (
    <div className="App">
      <AddBook/>
    </div>
  );
}



export default App;


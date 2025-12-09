import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserTable from './components/UserTable';
import EditUser from './components/EditUser';
import CreateUser from './components/CreateUser';
import HomePage from './components/HomePage';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/edit/:id" element={<EditUser />} />
      <Route path="/create" element={<CreateUser />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;

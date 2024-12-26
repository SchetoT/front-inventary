import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Navbar/Navbar';
import Home from "./Pages/Home/Home"
import Register from "./Pages/Register/Register";
import SignIn from './Pages/Signin/SignIn';
import CreateItem from './Pages/CreateItem/CreateItem';
import EditItem from './Pages/EditItem/EditItem';
import ItemDetail from './Pages/ItemDetail/ItemDetail';
import ItemView from './Pages/Home/ItemsView';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          {/* Muestra el Login como la página principal */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />

          {/* Otras rutas */}
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/edititem" element={<EditItem />} />
          
          <Route path="/items" element={<ItemView />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
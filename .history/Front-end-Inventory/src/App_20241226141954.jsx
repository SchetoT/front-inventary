import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Navbar/Navbar';
import Home from "./Pages/Home/Home"
import Register from "./Pages/Register/Register";
import SignIn from './Pages/Signin/Signin';
import CreateItem from './Pages/CreateItem/CreateItem';
import EditItem from './Pages/EditItem/EditItem';
import ItemDetail from './Pages/ItemDetail/ItemDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/EditItem" element={<EditItem />} />

          <Route path="/createitem" element={<CreateItem />} />
           {/* <Route path="/about" element={<About />} /> */}
          <Route path="/signin" element={<SignIn />} /> 
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
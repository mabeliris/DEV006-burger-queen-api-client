import { Form } from './components/Form';
import { Home } from './components/Home'; 
import { Chef } from './components/Chef';

import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('meserx'); 
  const [orders, setOrders] = useState([]);


    const handleLogout = () => {
        setUser(null);
    };

    
    const handleButtonClick = (buttonName) => {
        console.log('Button clicked:', buttonName);
        setActiveSection(buttonName);
    };

  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Form setUser={setUser} />}/> 
        
        <Route path="/Home" element={<Home  
        user={user} 
        setUser={setUser} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        handleLogout={handleLogout} 
        handleButtonClick={handleButtonClick}
        setOrders={setOrders}/>}  /> 
        

        <Route path="/Chef" element={<Chef 
        orders={orders}
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        handleLogout={handleLogout} 
        handleButtonClick={handleButtonClick}
        setUser={setUser} />} />        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

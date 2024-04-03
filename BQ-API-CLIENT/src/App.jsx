import { Form } from './components/Form'
import { Home } from './components/Home' 
import { Chef } from './components/Chef'
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  const [user, setUser]=useState(null)
  

  return (
     <BrowserRouter>
      <Routes>
          <Route path="/" element={<Form setUser={setUser}/>}/> 
          <Route path="/Home" element={<Home user={user}  setUser={setUser}/>}/>          
          <Route path="/Chef" element={<Chef />} />        
      </Routes>
    </BrowserRouter>
    
  )
}

export default App

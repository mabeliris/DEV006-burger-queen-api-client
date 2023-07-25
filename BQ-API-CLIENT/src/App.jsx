import { Form } from './components/Form'
import { Home } from './components/Home' 
import { useState } from 'react'
import './App.css'

function App() {

  const [user, setUser]=useState([])
  

  return (
    <div className='app'>
      {
        !user.length > 0
        ?<Form setUser= {setUser}/>
        :<Home setUser= {setUser}/>
      }
      

    </div>
  )
}

export default App

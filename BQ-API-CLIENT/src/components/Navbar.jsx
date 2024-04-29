import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./Navbar.css"

export function Navbar({ handleLogout }) {

    const [activeSection, setActiveSection] = useState('meserx');

    const handleButtonClick = (buttonName) => {
        console.log('Button clicked:', buttonName);
        setActiveSection(buttonName);
    };

    

    return (
        <>
            <button className={activeSection === 'admin' ? 'routeBtn active' : 'routeBtn'} onClick={() => handleButtonClick('admin')}> ADMIN </button>

            <Link to="/Home">
                <button className={activeSection === 'meserx' ? 'routeBtn active' : 'routeBtn'} onClick={() => handleButtonClick('meserx')}>MESERX</button>
            </Link>

            <Link to="/Chef">
                <button className={activeSection === 'chef' ? 'routeBtn active' : 'routeBtn'} onClick={() => handleButtonClick('chef')}>CHEF</button>
            </Link>

            <Link to="/">
                <button onClick={handleLogout}><img className="logoutBtn" src="../src/assets/img/logout.png" alt="delete" /></button>
            </Link>
        </>
    );
}
import { Link } from 'react-router-dom';

 function alertRoutes() {
        alert("este sitio está en construcción :)")
  }

  const handleLogout = () => {
        setUser(null);
  };


export function Chef () {
  // Lógica del componente aquí
  
  return (
    <>      
      <nav>

       <button className="routeBtn" onClick={alertRoutes}>ADMIN</button>
       <Link to="/Home">
        <button className="routeWaiter">MESERX</button>
       </Link>
       
       <Link to="/Chef">
        <button className="routeBtn">CHEF</button>
       </Link>
       
       <Link to="/">
        <button onClick={handleLogout}><img className="logoutBtn" src="../src/assets/img/logout.png" alt="delete" /></button>
       </Link>  

      </nav>
      
         
      <button className="buttonChef">En proceso</button>
      <button className="buttonChef">Listos</button>
      
      
    </>
  );
};

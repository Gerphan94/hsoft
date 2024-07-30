import { Link } from 'react-router-dom';



function Navbar({ clicked, setClick }) {


  return (
    <div className="fixed top-0 w-screen h-16 p-2 z-50">
      <nav className="flex items-center justify-between">
        <div className="text-white text-2xl font-semibold">...</div>
        <ul className="flex space-x-4 mr-20">
          <button>Nội trú</button>
          
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

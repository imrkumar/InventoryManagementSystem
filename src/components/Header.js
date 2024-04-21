import './header.css';
import { Link } from 'react-router-dom';
const Header = ({ isLoggedIn, onLogout })=>{
    return(
        <header className='header'>
            <div className='ims'><Link to="/" className='gqr'>Inventory Management System</Link></div>
            <div className='qrcode'>
               <span><Link to="/genrateqr" className='gqr'>Generate QR Code</Link></span>
               <span><Link to="/upload" className='gqr'>Scan QR Code</Link></span>
            </div>
            <div className='hbuttons'>
            {isLoggedIn ? (
          <button className='logoutbtn loginbtn' onClick={onLogout}>Logout</button>
        ) : (
          <button className='loginbtn'><Link to="/signin" className='lbtn'>Sign-in</Link></button>
        )}
        {!isLoggedIn && <button className='signbtn'><Link to="/register" className='sbtn'>Register</Link></button>}  
            </div>
        </header>
    )
}

export default Header;
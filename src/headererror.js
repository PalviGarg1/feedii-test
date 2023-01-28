import logo from './feediilogo.png';
import './Content/Content/login.css';
import './App.css';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';

export const Headererrorpg = () => {
    const hdrstyl1 = {
        opacity: ".5",
        fontSize: "15px",
        letterSpacing: ".18px",
        lineHeight: "24px"
    };

    return <div>

                <div className="content-header custom-blue box-shadow-4 cstm-hdrrr" id="content-header">
                    <div className="navbar navbar-expand-lg" style={{ margin: "0 60px" }}>
                        <div className="navbar-text nav-title" id="pageTitle">
                            <Link to="/">
                                <img src={logo} alt="Logo" style={{ width: "85px" }} />
                            </Link>
                        </div>
                        <div className="collapse navbar-collapse order-lg-1" id="navbarToggler" style={{ height: "2rem" }}></div>
                        <ul className="nav flex-row order-lg-2">
                            <li>
                                <div style={hdrstyl1} className="mbvw-dspn">
                                    Not found the page?
                                </div>
                            </li>
                            <li>
                                <Link to="/" className="sgnupcstmabtn shldr">Sign In</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
     
}
import logo from './feediilogo.png';
import './Content/Content/login.css';
import './App.css';
import './Content/Content/headerdashboard.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';

export const Headertchclssrm = () => {

    var username = sessionStorage.getItem("usernamesession");
    console.log(username);

    return <div>

                <div className="content-header custom-blue box-shadow-4 cstm-hdrrr" id="content-header">
                    <div className="navbar navbar-expand-lg" style={{ margin: "1px 60px 0", paddingBottom: "0" }}>
                        <div className="navbar-text nav-title hdrbckbtnnnwddcs" id="pageTitle">
                            <div className='mbvw-hdrrcs'>
                                <NavLink to="/tch/classroom" className='row m-0' alt="Back Button">
                                    <img src="/Images/left-long-arrow.svg" width="22" className="hdrbckbtnnnimg m-0 p-0" />
                                    <div className='hdrbckbtnnn'>BACK</div>
                                </NavLink>
                            </div>
                        </div>
                        
                        <div className="row nvhdrhde mbvw-dspn" style={{width: "100%", textAlign: "center", justifyContent: "center"}}>
                            <div>
                                <NavLink to="/tch/class" className={({ isActive }) => (isActive ? 'nvhdr active' : 'inactive')}>
                                    <button className="dshbdhdrbtn" id="staff">
                                        Overview
                                    </button>
                                </NavLink>
                                <NavLink to="/tch/classsurveys" className={({ isActive }) => (isActive ? 'nvhdr active' : 'inactive')}>
                                    <button className="dshbdhdrbtn" id="srvy">
                                        Survey
                                    </button>
                                </NavLink>
                                <NavLink to="/tch/classreports" className={({ isActive }) => (isActive ? 'nvhdr active' : 'inactive')}>
                                    <button className="dshbdhdrbtn" id="clsrm">
                                        Reports
                                    </button>
                                </NavLink>
                            </div>
                        </div>

                        <ul className="nav flex-row order-lg-2 mt--7px">
                            <li className="dropdown d-flex align-items-center">
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" className="d-flex align-items-center drpbtnndw">
                                        <div className="avatar">
                                            <div className="text-truncate csk-pfrl-nm" title={username}>{username}</div>
                                        </div>
                                        <i className="fa fa-caret-down hdr-fa-icon Aezakmi8"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="drpdwnmnu">
                                        <Link to="/u/profile2" className="dropdown-item btnclclclk">
                                            <div style={{minWidth: '32px'}}><img src="https://res.cloudinary.com/infoi/image/upload/q_auto/v1655208369/Dashboard/profile_icon.svg" width="22" height="20" alt="Profile Icon" style={{display: 'block', maxWidth: '100%'}} /></div>
                                            <div style={{paddingLeft: '6px'}}>Profile</div>
                                        </Link>
                                        <Link to="/tch/class" className="dropdown-item btnclclclk dspdsktp-n">
                                            <div style={{minWidth: '32px'}}><img src="https://res.cloudinary.com/infoi/image/upload/q_auto/v1645182960/Dashboard/dashboard_asd2cv.svg" width="22" height="20" alt="Profile Icon" style={{display: 'block', maxWidth: '100%'}} /></div>
                                            <div style={{paddingLeft: '6px'}}>Overview</div>
                                        </Link>
                                        <Link to="/tch/classsurveys" className="dropdown-item btnclclclk dspdsktp-n">
                                            <div style={{minWidth: '32px'}}><img src="https://res.cloudinary.com/infoi/image/upload/q_auto/v1655115253/Dashboard/certificatee_ly9o3w.svg" width="22" height="20" alt="Profile Icon" style={{display: 'block', maxWidth: '100%'}} /></div>
                                            <div style={{paddingLeft: '6px'}}>Survey</div>
                                        </Link>
                                        <Link to="/tch/classreports" className="dropdown-item btnclclclk dspdsktp-n">
                                            <div style={{minWidth: '32px'}}><img src="https://res.cloudinary.com/infoi/image/upload/q_auto/v1645502515/Dashboard/jobs_nj9hip.svg" width="22" height="20" alt="Profile Icon" style={{display: 'block', maxWidth: '100%'}} /></div>
                                            <div style={{paddingLeft: '6px'}}>Staff</div>
                                        </Link>
                                        <Link to="/" className="dropdown-item btnclclclk drpdwnlastitm">
                                            <div style={{minWidth: '32px'}}><img src="https://res.cloudinary.com/infoi/image/upload/q_auto/v1638941210/Header%20Logo/logoutstf607712_mgmuyg.svg" width="22" height="20" alt="Logout Icon" style={{display: 'block', maxWidth: '100%'}} /></div>
                                            <div style={{paddingLeft: '6px'}}>Log out of Feedii</div>
                                        </Link>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
     
}
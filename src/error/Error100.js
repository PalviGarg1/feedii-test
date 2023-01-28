import React from "react";
import '../Content/Content/login.css';
import '../Content/Content/errorcss.css';
import '../App.css';
import $ from 'jquery';
import { Headererrorpg } from '../headererror';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';


export const Error100Page = () => {

    return <div>
                <Headererrorpg />

                <div style={{paddingTop: '7%'}}>
                    
                    {/* <div style={{textAlign: 'center', width: '100%', padding: '20px 24px'}}>
                        <img src="../Images/cloud_off-black-48dp.svg" style={{width: '100px'}} />
                        <h1 style={{marginTop: 40, color: '#333e63', fontSize: 34, fontWeight: '600'}}>Something went wrong</h1>
                        <p style={{marginTop: 18, color: '#7a829a', fontSize: 17, fontWeight: '400'}}>Try again later...</p>
                        <div className="text-center cstmwderrr">
                            <Link to="/"><button type="button" className="btnns">Back To Login</button></Link>
                        </div>
                    </div> */}

                    <div style={{display: 'flex', flexDirection: 'column', alignItem: 'center', textAlign: 'center', justifyContent: 'center', backgroundColor: 'transparent', width: '100%', padding: 24, overflow: 'auto', position: 'fixed', height: '80vh', left: 0, top: 0}}>
                        <img style={{height: 100}} src="../Images/cloud_off-black-48dp.svg" />
                        <h3 style={{marginTop: '20px !important', color: '#585858', fontSize: 28, fontFamily: 'circular-book'}}>Something went wrong. Please try again.</h3>
                        <div style={{width: '50%', margin: '15px auto'}}>
                            <a href="/" className="ahvr"><i className="fa fa-chevron-left" style={{fontSize: '12px !important'}} /> Back to Feedii Home Page</a>
                        </div>
                    </div>


                </div>
            </div>    
    
}



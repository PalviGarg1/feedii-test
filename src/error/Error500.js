import React from "react";
import '../Content/Content/login.css';
import '../Content/Content/errorcss.css';
import '../App.css';
import $ from 'jquery';
import { Headererrorpg } from '../headererror';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';


export const Error500Page = () => {

    return <div>
                <Headererrorpg />

                <div className="cstmbgerrr">
                    
                    <div style={{textAlign: 'center', width: '100%', padding: '20px 24px'}}>
                        <img src="../Images/cloud_off-black-48dp.svg" style={{width: '100px'}} />
                        <h1 style={{marginTop: 40, color: '#333e63', fontSize: 34, fontWeight: '600'}}>Internal Server Error</h1>
                        <p style={{marginTop: 18, color: '#7a829a', fontSize: 17, fontWeight: '400'}}>Try again later...</p>
                        <div className="text-center cstmwderrr">
                            <Link to="/"><button type="button" className="btnns">Back To Login</button></Link>
                        </div>
                    </div>

                </div>
            </div>    
    
}



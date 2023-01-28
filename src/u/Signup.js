import React from "react";
import '../Content/Content/signup.css';
// import '../AllJs/signup.js';
import { Headersignup } from '../headersignup';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';

export const Signup = () => {

    var actpsignup = "";
    sessionStorage.clear();

    const tchrbtnsignup = () => {
        actpsignup = "Teacher";
        // ReactSession.set("acounttype", actp);
        // sessionStorage.setItem('acounttp', actp);
        //const acounttype = ReactSession.get("acounttype");
        //alert(acounttype + " Great Shot!");
        sessionStorage.setItem("acntypesignup", actpsignup);
        window.location.href = "/getstarted/details";
    }

    const studntsignup = () => {
        actpsignup = "Student";
        // ReactSession.set("acounttype", actp);
        // localStorage.acntype =  actp;
        //const acounttype = ReactSession.get("acounttype");
        //alert(acounttype + " Great Shot!");
        sessionStorage.setItem("acntypesignup", actpsignup);
        window.location.href = "/getstarted/details";
    }

    const adminnsignup = () => {
        actpsignup = "School";
        // ReactSession.set("acounttype", actp);
        // localStorage.acntype =  actp;
        //const acounttype = ReactSession.get("acounttype");
        //alert(acounttype + " Great Shot!");
        sessionStorage.setItem("acntypesignup", actpsignup);
        window.location.href = "/getstarted/details";
    }


    return <div>
        <Headersignup />
        <div id="divLoader" style={{display: "none"}}> </div>
        <div className="cntanerr" id="login">
            <div className="roww jc-cntr mbvwjcc">
                <div className="colcs">
                    <div className="dv1">
                        <h6>Choose One!</h6>
                        <h3>Sign up for Feedii as a...</h3>
                    </div>
                    <div className="dv2 roww">
                        <div className="col-sm-4">
                            <div className="dv2cstma" onClick={tchrbtnsignup} id="techr">
                                <div className="cstmdv01">
                                    <img src="/Images/teacher-img1.png" className="cstmdv01-img" height="104" width="104" />
                                    <p className="cstmdv01-p">Teacher</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="dv2cstma" onClick={studntsignup} id="studnt">
                                <div className="cstmdv01">
                                    <img src="/Images/student-img1.png" className="cstmdv01-img" height="104" width="104" />
                                    <p className="cstmdv01-p">Student</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="dv2cstma" onClick={adminnsignup} id="adminn">
                                <div className="cstmdv01">
                                    <img src="/Images/school-img1.svg" className="cstmdv01-img" height="104" width="104" />
                                    <p className="cstmdv01-p">Admin</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dv3">
                        <span className="dv3spn">You have credentials?</span>
                        <Link to="/" className="dv3cstma shldr">Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

// export default Test;    
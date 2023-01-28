import React, {useState} from "react";
import $ from 'jquery';
import '../Content/Content/nwlogin.css';
import '../Content/Content/signin.css';
import { Headersignin } from '../headersignin';
import { ReactSession } from 'react-client-session';
// import '../AllJs/signin.js';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';

export const Signin = () => {
    const handleChange = (e) => {
        var eml = $('#entreml').val().trim();
        var pswrd = $('#passwrd').val().trim();

        if ((eml.length > 0 && pswrd.length > 0)) {
            $('#nxt-btnSignin').removeAttr('disabled');
        } else {
            $('#nxt-btnSignin').attr('disabled', 'disabled');
        }
    }

    const onKeyDown = (event) => {
        if (event.code === 'Space') event.preventDefault()
    }


    let acounttype = sessionStorage.getItem('acntype');
    //alert(acounttype + " is the account type value");
    //alert(sessionStorage.getItem("acntype"));


      const onBlur = (e) => {
        var eml = $('#entreml');
        var udiv = $('#uiscs');

        if (eml.val() === '' || null) {
            udiv.attr('errr', '');
            udiv.removeClass('valid-inp');
            
            $('.kckh4-svg > g').removeClass('loginerrsvg');
            $('#uiscs .kckh4-err-spn').hide();
            $('#uiscs .kckh4-err-spn .err-txt').text('Email is required');
        }
        else {
            udiv.removeAttr('errr');
            udiv.addClass('valid-inp');
        }
      }
      
      const onBlur2 = (e) => {
        var pswrd = $('#passwrd');
        var udiv2 = $('#uiscs2');

        if (pswrd.val() === '' || null) {
            udiv2.attr('errr', '');
            udiv2.removeClass('valid-inp');
        }
        else {
            udiv2.removeAttr('errr');
            udiv2.addClass('valid-inp');
        }
      }

      const [emailSignin, setEmailSignin] = useState(null);
      const [passwordSignin, setPasswordSignin] = useState(null);
      


      const handleSubmit = e => {
        //console.log('handleSubmit run');
        e.preventDefault(); // 👈️ prevent page refresh
    
        // 👇️ access input values here
       
        var nxtbtnlodr = $('#nxt-btnn-loader');
        var nxtbtntxt = $('#nxt-btnn-txt');
        var passwordtocheck="Feedie" + passwordSignin + "1@23";
        nxtbtnlodr.show();
        nxtbtntxt.hide();        
        var ctpvl = "false";
    
        // 👇️ clear all input values in the form
        // setemailsignup('');
       
  
        //alert(acounttype);
        fetch('https://entity-feediiapi.azurewebsites.net/api/login/GetUserSignin/' + emailSignin + "-" + acounttype + "/", {
            method: 'GET'
          }) .then((response) => response.json())
          .then((data) => {
                //alert('getusersignin api work');
                var dataa = JSON.stringify(data);               
                var obj = JSON.parse(dataa);
                var userMasterid = obj[0].usermasterId;
                var description_ = obj[0].description;
                var accountidtosend=obj[0].accountId;
                var ValidorNot=obj[0].Accountstatus;
                nxtbtnlodr.show();
                nxtbtntxt.hide();
               
                var fetchname=obj[0].name;

                if(fetchname.indexOf(' ') != -1)
                {
                    var nameses= fetchname.substring(0, fetchname.indexOf(' ')); 
                }
                else{
                    var nameses= fetchname; 
                }
                //var nameses= fetchname.substring(0, fetchname.indexOf(' ')); 

                sessionStorage.setItem("Masteridsnd", obj[0].usermasterId);
                sessionStorage.setItem("usernamesession", nameses);
                
                    if(acounttype == "School")
                    {
                        sessionStorage.setItem("schoolidsession", accountidtosend);
                    }
                    else if (acounttype == "Teacher")
                    {
                        sessionStorage.setItem("staffidsession", accountidtosend);
                    }
                    else{
                        sessionStorage.setItem("studentidsession", accountidtosend);
                    }
                    //alert(description_)
                if (description_ == "Profile Created")
                {
                    //alert('description is profile created!');

                    if (ValidorNot == "Valid Account")
                    {
                    fetch('https://entity-feediiapi.azurewebsites.net/Token', {
                        method: 'POST',
                        headers: {               
                             'Content-Type': 'application/x-www-form-urlencoded',
                          },
                           body: "userName=" + emailSignin + "&password=" + passwordtocheck +  "&grant_type=password",
                          }) .then(response=> { return response.json(); })
                            .then(data=>
                                {
                                    const items = data;
                                    

                                if( items.access_token!= undefined)
                                {
                                    if(acounttype == "School")
                                    {
                                        window.location.href="/u/staff";
                                    }
                                    else if(acounttype=="Teacher")
                                    {
                                        window.location.href="/tch/surveybyme";
                                    }
                                    else{
                                        window.location.href="/stu/survey";
                                    }
                                    
                                    $('.kckh4-svg > g').removeClass('loginerrsvg');
                                    $('#uiscs .kckh4-err-spn').hide();
                                    $('#uiscs .kckh4-err-spn .err-txt').text('Email is required');
                                }
                                else
                                {
                                    
                                    nxtbtnlodr.hide();
                                    nxtbtntxt.show();
                                    $('.kckh4-svg > g').addClass('loginerrsvg');
                                    $('#uiscs .kckh4-err-spn').show();
                                    $('#uiscs .kckh4-err-spn .err-txt').text('Incorrect username and password');
                                    //alert("Incorrect username and password")
                                }
            
                                })
                                .catch(error =>{
                                console.log(error);
                                })
                            }
                            else if(ValidorNot == "Delete Account")
                            {
                                nxtbtnlodr.hide();
                                nxtbtntxt.show();
                                $('.kckh4-svg > g').addClass('loginerrsvg');
                                $('#uiscs .kckh4-err-spn').show();
                                $('#uiscs .kckh4-err-spn .err-txt').text('Your Account is deleted! Please check with your school Admin');
                                
                            }
                            else
                            {
                                nxtbtnlodr.hide();
                                nxtbtntxt.show();
                                $('.kckh4-svg > g').addClass('loginerrsvg');
                                $('#uiscs .kckh4-err-spn').show();
                                $('#uiscs .kckh4-err-spn .err-txt').text('Something went wrong! Contact Feedii support.');
                                
                            }

                }
                else if(description_ == "Password Created")
                {
                    
                        
                        if(acounttype == "School")
                        {
                            ctpvl = "True";
                            sessionStorage.setItem("crtprflvl", ctpvl);
                            window.location.href="/getstarted/createprofile";
                        }
                        else if (acounttype == "Teacher")
                        {
                            ctpvl = "True";
                            sessionStorage.setItem("crtprflvll", ctpvl);
                            window.location.href="/getstarted/createprofile2";
                        }
                        else {
                            ctpvl = "True";
                            sessionStorage.setItem("crtprflvlll", ctpvl);
                            window.location.href="/getstarted/createprofile3";
                        }
                        
                }
                else if(description_ == "Not Registered")
                {
                    nxtbtnlodr.hide();
                    nxtbtntxt.show();
                    $('.kckh4-svg > g').addClass('loginerrsvg');
                    $('#uiscs .kckh4-err-spn').show();
                    $('#uiscs .kckh4-err-spn .err-txt').text('Your email id is not existing! Please signup with your email id');
                    
                      //alert("Your email id is not existing! Please signup with your email id")
                        
                }
                else if(description_ == "Account is on Hold")
                {
                    nxtbtnlodr.hide();
                    nxtbtntxt.show();
                    $('.kckh4-svg > g').addClass('loginerrsvg');
                    $('#uiscs .kckh4-err-spn').show();
                    $('#uiscs .kckh4-err-spn .err-txt').text('Your account is on hold! Please try again later');
                    
                    //alert("Your account is on hold! Please try again later")
                        
                }
                else if(description_ == "Sign up not completed")
                {
                    nxtbtnlodr.hide();
                    nxtbtntxt.show();
                    $('.kckh4-svg > g').addClass('loginerrsvg');
                    $('#uiscs .kckh4-err-spn').show();
                    $('#uiscs .kckh4-err-spn .err-txt').text('Please complete your signup process, then try to login');
                    //alert("Please complete your signup process, then try to login")
                     
                        
                }
                else {
                    nxtbtnlodr.hide();
                    nxtbtntxt.show();
                    $('.kckh4-svg > g').addClass('loginerrsvg');
                    $('#uiscs .kckh4-err-spn').show();
                    $('#uiscs .kckh4-err-spn .err-txt').text('This email id is already registered with another account type! please try with other email');
                    //alert("This email id is already registered with another account type! please try with other email")
                    
                }

                sessionStorage.setItem("crtprflvl", ctpvl);
                sessionStorage.setItem("crtprflvll", ctpvl);
                sessionStorage.setItem("crtprflvlll", ctpvl);
                

            })
            .catch(error =>{
                sessionStorage.setItem("crtprflvl", ctpvl);
                sessionStorage.setItem("crtprflvll", ctpvl);
                sessionStorage.setItem("crtprflvlll", ctpvl);
                console.log(error);
            });
                       
  

      };

      var rstpddd = "False";

      const rstpswrd = () => {
        var rstpddd = "True";
        sessionStorage.setItem("rstpddd", rstpddd);
        window.location.href = "/u/resetpassword"
      }

    return <div>
            <Headersignin />
        
                <div id="divLoader" style={{display:"none"}}> </div>
                <div className="container" id="login">
                    <div className="row">
                        <div className="sgndv1 col-lg-5">
                            <div className="sgndv1-1">
                                <img src="../Images/step-1.png" />
                                <h2>
                                    Get Started <br />
                                    with Feedii
                                </h2>
                                <p>Sign in for Feedii and explore the platform yourself.</p>
                                <div className="sgndv1-2">
                                    <p>Don't have credentials?</p>
                                    <Link to="/u/signup" className="sgndv1-2a">Signup</Link>
                                </div>
                            </div>
                        </div>
                        <div className="sgndv2 col-lg-7">
                            <div className="sgndv2-1">
                                <div className="sgnd2-21">2/2</div>
                                <div className="sgndv2-2">
                                    <div className="mtb-4p">
                                        <h2 className="sgndv2-3">Welcome back!</h2>
                                    </div>
                                    <div>
                                        <form id="form" className="signinfrm" name="form" action="" method="post" onSubmit={handleSubmit}>
                                            <div className="w-100">
                                                <div className="kckh4" id="uiscs">
                                                    <input id="entreml" name="email" spellCheck="false" type="text" title="Enter your Email" className="mbl-inp" maxLength="30" required=""  value={emailSignin} onBlur={(e) => onBlur(e)} onChange={e => { setEmailSignin(e.target.value); handleChange(e)}} />
                                                    <span className="kckh4-spn" htmlFor="email">Enter your email</span>
                                                    <svg className="kckh4-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g fill="none" fillRule="evenodd" stroke="#d7dae1" strokeWidth="2" className="stroke">
                                                            <path d="M2 4h20v16H2z"></path>
                                                            <path d="M2 7.9l9.9 3.899 9.899-3.9"></path>
                                                        </g>
                                                    </svg>
                                                    <span className="kckh4-err-spn" style={{display: "none"}}>
                                                        <img src="https://res.cloudinary.com/infoi/image/upload/q_auto/v1639375615/Login%20Image/closearw234dsfoi2l.webp" alt="" width="16" height="16" />
                                                        <span className="err-txt">Email is required</span>
                                                    </span>
                                                </div>
                                                <div className="kckh4" id="uiscs2">
                                                    <input id="passwrd" name="password" spellCheck="false" type="password" title="Enter your Password" className="mbl-inp" maxLength="30" required="" onKeyPress={(event)=>onKeyDown(event)} value={passwordSignin} onBlur={(e) => onBlur2(e)} onChange={e => { setPasswordSignin(e.target.value); handleChange(e)}} />
                                                    <span className="kckh4-spn" htmlFor="password">Enter your password</span>
                                                    <svg className="kckh4-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g fill="none" fillRule="evenodd" stroke="#d7dae1" strokeWidth="2" className="stroke">
                                                            <rect id="Rectangle" x="4" y="10" width="16" height="11"></rect>
                                                            <path d="M12,1 C14.209139,1 16,2.790861 16,5 L16,10 L16,10 L8,10 L8,5 C8,2.790861 9.790861,1 12,1 Z" id="Rectangle"></path>
                                                            <path d="M12,14 L12,17" id="Rectangle"></path>
                                                        </g>
                                                    </svg>
                                                    <span className="kckh4-err-spn" style={{display: "none" }}>
                                                        <img src="https://res.cloudinary.com/infoi/image/upload/q_auto/v1639375615/Login%20Image/closearw234dsfoi2l.webp" alt="" width="16" height="16" />
                                                        <span className="err-txt">Password is required</span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="errtxtttt">
                                                    Please enter correct username and password.
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <a className="sgndv1-2a sgndv1-2acstmm" onClick={rstpswrd}>Password Reset?</a>
                                            </div>

                                            <div className="form-group login-submit mb-0 dvvmmn4 sgndv-btncd">
                                                <button id="nxt-btnSignin" type="submit" className="kckh-btn" disabled>
                                                    <div id="nxt-btnn-loader" className="loadingio-spinner-rolling-rrc44sjio9" style={{display: "none"}}>
                                                        <div className="ldio-ravfkgmzeb">
                                                            <div className="lodrr"></div>
                                                        </div>
                                                    </div>
                                                    <span id="nxt-btnn-txt">Next</span>
                                                </button>
                                                <Link to="/" className="sgndv-btncda">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                                        <path fill="#54D4F2" fillRule="evenodd" d="M4.709 9L7 6.708 5.586 5.294.88 10l4.705 4.706L7 13.292 4.709 11H18V9H4.709z"></path>
                                                    </svg>
                                                    <span className="mt-2px">&nbsp; Back </span>
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
}
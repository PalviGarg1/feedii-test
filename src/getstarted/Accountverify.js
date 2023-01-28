import React, {useState, useEffect} from "react";
import $ from 'jquery';
import '../Content/Content/waiting.css';
// import '../AllJs/verifyaccount.js';
import { Headersignup } from '../headersignup';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';
import useLoader from "../useLoader";

export const AccountVerifi = () => {
    const [loader, showLoader, hideLoader] = useLoader();

    useEffect(() => {
        showLoader();
        $('#login').hide();
      }, []);

      React.useEffect(
          ()=> {
          var crtpvllll = sessionStorage.getItem("crtprflvllll");
  
          if(crtpvllll == "True") {        
              hideLoader();
              $('#login').show();
          }
          else {
              showLoader();
              $('#login').hide();
              window.location.href="/error/error100";
          }
      });

    var tokenn = sessionStorage.getItem("tokensnd");
    var accounttypeacntverify = sessionStorage.getItem("acntypesignup");
    var isforgot = sessionStorage.getItem("isforgot");
    //alert(isforgot);
    var errorDiv = $('#shwmsg');

    const verifidbtn = () => {
        

          var accounttypepswrd = sessionStorage.getItem("acntypesignup");
          var emailSignup = sessionStorage.getItem("emailsession");


          fetch('https://entity-feediiapi.azurewebsites.net/api/login/GetUserValidated/' + emailSignup + "-" + accounttypepswrd + "/", {
            method: 'GET'
          }) .then((response) => response.json())
          .then((data) => {
                //console.log("palvi" + JSON.stringify(data));
                var dataa = JSON.stringify(data);               
                var obj = JSON.parse(dataa);
                var userMasterid = obj[0].usermasterId;
                var description_ = obj[0].description;
                          
                if (description_ == "Verification Link Send" || description_ == "Email Not Verified") {
                   
                    $('#msgdvacntvrfy').show();
                    $("#shwmsg").text('Your account is not verified! Please check your email');
                    setTimeout(function () {
                        $('#msgdvacntvrfy').hide();
                    }, 10000);
                }
                else if (description_ == "Profile Created" || description_ == "Password Created"){

                    
                    $('#msgdvacntvrfy').show();
                    $("#shwmsg").text('This account is already registered, please login into your account!');
                    setTimeout(function () {
                        $('#msgdvacntvrfy').hide();
                    }, 10000);
                }
                else if(description_="Email Verified")
                {
                  
                    window.location.href="/getstarted/createpassword";
                }
                else{
                    
                   
                    $('#msgdvacntvrfy').show();
                    $("#shwmsg").text('Your account is on hold!');
                    setTimeout(function () {
                        $('#msgdvacntvrfy').hide();
                    }, 10000);
                }

          })
          .catch(error =>{
              console.log(error);
          });
    }

    const rsndlinkbtn = () => {
        
        $('#rsndbtnloader').show();
        $('#rsndbtntxtt').hide();

        var rcvMaterId = sessionStorage.getItem("Masteridsnd");

        fetch('https://entity-feediiapi.azurewebsites.net/api/login/getLink/' + rcvMaterId + '-' + accounttypeacntverify +"-" + isforgot, {
            method: 'GET'
          }) .then((response) => response.json())
          .then((data) => {
            //console.log(data);
            //alert('api runs');
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
            var activeStatus_ = parse[0].activeStatus;
            //alert(activeStatus_);
            
            
            if (activeStatus_ === "Attempt Exceed")
            {
                $('#rsndbtnloader').hide();
                $('#rsndbtntxtt').show();
                //alert('if');
                $('#msgdvacntvrfy').show();
                $("#shwmsg").text('Your acount is on hold position! Please try after some time');
                //window.location.href="/getstarted/createpassword";
                setTimeout(function () {
                    $('#msgdvacntvrfy').hide();
                }, 10000);
            }
            else if(activeStatus_ == "Verification Link Send") {
                $('#rsndbtnloader').hide();
                $('#rsndbtntxtt').show();
                //alert('if-else');
                $('#msgdvacntvrfy').show();
                $("#shwmsg").text('Verification link has been sent to your email address');
                setTimeout(function () {
                    $('#msgdvacntvrfy').hide();
                }, 10000);
            }
            else if(activeStatus_ == "Password Created" || activeStatus_ == "Profile Created") {
                $('#rsndbtnloader').hide();
                $('#rsndbtntxtt').show();
                //alert('if-else');
                $('#msgdvacntvrfy').show();
                $("#shwmsg").text('Your Account is already verified!');
                setTimeout(function () {
                    $('#msgdvacntvrfy').hide();
                }, 10000);
            }
            else {
                $('#rsndbtnloader').hide();
                $('#rsndbtntxtt').show();
                //alert('if-else');
                $('#msgdvacntvrfy').show();
                $("#shwmsg").text('Something went wrong! contact to Feedii support.');
                setTimeout(function () {
                    $('#msgdvacntvrfy').hide();
                }, 10000);
            }

          })
          .catch(error =>{
                console.log(error);
          });
        
    }

    const msgHideBtnid = () => {
        $('#msgdvacntvrfy').hide();        
    }


    return <div>
        <Headersignup />


        {loader}
        <div className="be-wrapper be-login innerwrapper" id="login">
            <div className="container wtmcst">
                <div className="wtdv1">
                    <div className="wtdv2">
                        <div>
                            <div className="wtdv2-dvv wtdv2-dvv1"></div>
                            <div className="wtdv2-dvv wtdv2-dvv2"></div>
                            <div className="wtdv2-dvv wtdv2-dvv3"></div>
                            <div className="wtdv2-dvv wtdv2-dvv4"></div>
                            <div className="wtdv2-dvv wtdv2-dvv5"></div>
                            <div className="wtdv2-dvv wtdv2-dvv6"></div>
                            <div className="wtdv2-dvv wtdv2-dvv7"></div>
                            <div className="wtdv2-dvv wtdv2-dvv8"></div>
                        </div>
                        <svg width="144" height="144" viewBox="0 0 144 144" fill="none" xmlns="http://www.w3.org/2000/svg" className="wtdv2-svg"><path d="M71.56 141.12C109.977 141.12 141.12 109.977 141.12 71.56C141.12 33.1431 109.977 2 71.56 2C33.1431 2 2 33.1431 2 71.56C2 109.977 33.1431 141.12 71.56 141.12Z" stroke="#54D4F2" strokeWidth="3.9624" strokeMiterlimit="10" strokeLinecap="round" strokeDasharray="0.05 21.79"></path></svg>
                    </div>
                    <div className="wtdv3">
                        <div className="wtdv3-dv1">
                            <div>
                                <h2 className="wtdv3-dv1-h2">Sit back & Relax</h2>
                                <p className="wtdv3-dv1-p">While we're verifying your details, check your mail for verification code</p>
                                <div className="dspflx mbvwdspblk">
                                    <a className="wtdv3-dv1-a" onClick={verifidbtn} id="wtdvbtn1">
                                        <span>I have verified</span>
                                    </a>
                                    <a className="wtdv3-dv1-btn" onClick={rsndlinkbtn} id="wtdvbtn2">
                                        <span id="rsndbtntxtt">Resend Link?</span>
                                        <span id="rsndbtnloader" style={{display: 'none', color: '#54d4f2'}}><i className="fa fa-circle-o-notch fa-spin"></i></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="wtdv3-dv2">
                            <img className="wtdv3-dv2-img" src="../Images/waiting-imgg.jpg" />
                        </div>
                    </div>
                    <div id="msgdvacntvrfy">
                        <div className="errdvacntvrfysgnup col-sm-6 row">
                            <div id="shwmsg" className="col-sm-10 pl-0"></div>
                            <div className="col-sm-2 text-right">
                                <button className="msgHideBtn" onClick={msgHideBtnid}></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
}

// export default Details;
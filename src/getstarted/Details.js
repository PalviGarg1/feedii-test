import React, {useState} from "react";
import $ from 'jquery';
import '../Content/Content/nwlogin.css';
import '../Content/Content/nwlogin2.css';
// import '../AllJs/details-adm';
import { Headersignup } from '../headersignup';
import { BrowserRouter, Route, Routes, NavLink, Link, json } from 'react-router-dom';

export const Details = () => {
    var ctpvllll = "False";
    const handleChange = (e) => {
        var eml = $('#ademail');
        var udiv = $('#uiscs');
        var ptrn = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
        

        if (eml.val() === '' || null) {
            udiv.attr('errr', '');
            $('.kckh4-svg > g').removeClass('loginerrsvg');
            $('#uiscs .kckh4-spn').removeClass('vlactvv');
            $("#uiscs .err-txt").text('Email is required');
            udiv.removeClass('valid-inp');
            udiv.removeClass('valid-inp');
            $('#nxt-btnneml').attr('disabled', 'disabled');
        }
        else if (!ptrn.test(eml.val())) {
            udiv.attr('errr', '');
            $('.kckh4-svg > g').removeClass('loginerrsvg');
            $('#uiscs .kckh4-spn').addClass('vlactvv');
            $("#uiscs .err-txt").text('Please enter correct email');
            udiv.removeClass('valid-inp');
            $("#uiscs .kckh4-svg > g").removeClass("grn-strk").addClass("stroke");
            $('#nxt-btnneml').attr('disabled', 'disabled');
        }
        else {
            $('#uiscs .kckh4-spn').addClass('vlactvv');
            $("#uiscs .err-txt").text('Email is required');
            udiv.removeAttr('errr');
            udiv.addClass('valid-inp');
            $('#nxt-btnneml').removeAttr('disabled');
        }
    }

    var accounttypepswrd = sessionStorage.getItem("acntypesignup");
    // alert(sessionStorage.getItem("acntypesignup"));


      const onBlur = (e) => {
        var eml = $('#ademail');
        var udiv = $('#uiscs');
        var ptrn = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
        

        if (eml.val() === '' || null) {
            udiv.attr('errr', '');
            $('#uiscs .kckh4-spn').removeClass('vlactvv');
            $("#uiscs .err-txt").text('Email is required');
            udiv.removeClass('valid-inp');
            udiv.removeClass('valid-inp');
            $('#nxt-btnneml').attr('disabled', 'disabled');
        }
        else if (!ptrn.test(eml.val())) {
            udiv.attr('errr', '');
            $('#uiscs .kckh4-spn').addClass('vlactvv');
            $("#uiscs .err-txt").text('Please enter correct email');
            udiv.removeClass('valid-inp');
            $("#uiscs .kckh4-svg > g").removeClass("grn-strk").addClass("stroke");
            $('#nxt-btnneml').attr('disabled', 'disabled');
        }
        else {
            $('#uiscs .kckh4-spn').addClass('vlactvv');
            $("#uiscs .err-txt").text('Email is required');
            udiv.removeAttr('errr');
            udiv.addClass('valid-inp');
            $('#nxt-btnneml').removeAttr('disabled');
        }
      }

      const [emailSignup, setemailsignup] = useState('');

      const handleSubmit = e => {
        //console.log('handleSubmit run');
        e.preventDefault(); // 👈️ prevent page refresh
       
        var nxtbtnlodr = $('#nxt-btnn-loader');
        var nxtbtntxt = $('#nxt-btnn-txt');
        nxtbtnlodr.show();
        nxtbtntxt.hide();
    
        // 👇️ access input values here
        console.log('emailSignup 👉️', emailSignup);
        sessionStorage.setItem("emailsession", emailSignup);
    
        // 👇️ clear all input values in the form
        // setemailsignup('');

        var eml = $('#ademail');
        var udiv = $('#uiscs');       
        // alert(emailSignup);
        // alert(accounttypepswrd);

        fetch('https://feedii-test-api.azurewebsites.net/api/login/GetUserValidated/' + emailSignup + "-" + accounttypepswrd + "/", {
            method: 'GET'
          }) .then((response) => response.json())
          .then((data) => {
                //console.log("palvi" + JSON.stringify(data));
                var dataa = JSON.stringify(data);               
                var obj = JSON.parse(dataa);
                var userMasterid = obj[0].usermasterId;
                var description_ = obj[0].description;
                sessionStorage.setItem("tokensnd", obj[0].confirmationToken);
                sessionStorage.setItem("Masteridsnd", obj[0].usermasterId);
                sessionStorage.setItem("isforgot", 0);
                nxtbtnlodr.show();
                nxtbtntxt.hide();
                
                //alert(description_)
               // alert(data + " || " + obj + " || " + umid);

                if (description_ == "Verification Link Send" || description_ == "Email Not Verified") {
                    
                    ctpvllll = "True";
                    sessionStorage.setItem("crtprflvllll", ctpvllll);
                    window.location.href="/getstarted/accountverify";
                }
                else if (description_ == "Profile Created" || description_ == "Password Created"){
                    nxtbtnlodr.hide();
                    nxtbtntxt.show();

                    udiv.attr('errr', '');
                    $("#uiscs .err-txt").text('This account is already registered, please login into your account!');
                    $('.kckh4-svg > g').addClass('loginerrsvg');
                    $('#nxt-btnneml #nxt-btnn-loader').css('display', 'none');
                    $('#nxt-btnneml #nxt-btnn-txt').css('display', 'block');
                }
                else if(description_=="Email Verified")
                {
                   // alert(description_);
                    window.location.href="/getstarted/createpassword";
                }
                else if(description_=="Already exist with another access type")
                {
                    nxtbtnlodr.hide();
                    nxtbtntxt.show();
                    
                    udiv.attr('errr', '');
                    $("#uiscs .err-txt").text('You are already registered with another account type! Please try with another emailid');
                    $('.kckh4-svg > g').addClass('loginerrsvg');
                    $('#nxt-btnneml #nxt-btnn-loader').css('display', 'none');
                    $('#nxt-btnneml #nxt-btnn-txt').css('display', 'block');
                }
                else{
                    sessionStorage.setItem("crtprflvllll", ctpvllll);

                    nxtbtnlodr.hide();
                    nxtbtntxt.show();
                    udiv.attr('errr', '');
                    $("#uiscs .err-txt").text('Your account is on hold!');
                    $('.kckh4-svg > g').addClass('loginerrsvg');
                    $('#nxt-btnneml #nxt-btnn-loader').css('display', 'none');
                    $('#nxt-btnneml #nxt-btnn-txt').css('display', 'block');
                }

          })
          .catch(error =>{
            sessionStorage.setItem("crtprflvllll", ctpvllll);
            
            nxtbtnlodr.hide();
            nxtbtntxt.show();
              console.log(error);
          });
           
                           

      };

    return <div>
        <Headersignup />
        <div id="divLoader" style={{display: "none"}}> </div>
        <div className="be-wrapper be-login innerwrapper" id="login">
            <div className="be-content">
                <div className="main-content container-fluid disp-flex pb-0">
                    <div className="col-lg-8 col-xs-12" style={{margin: "0 auto", maxWidth: "752px"}}>
                        <div>
                            <div className="dvvmmn dvmmbw">
                                <div style={{display: "flex", marginLeft: "5px"}} className="dvvmmn2">
                                    <div style={{paddingRight: "15px"}}>
                                        <div style={{position: "relative", width: "78px", height: "78px"}}>
                                            <div className="kldkc">1</div>
                                            <svg className="kldkc-svg" width="100%" height="100%" viewBox="0 0 34 34">
                                                <circle className="kldkc-crcl1" cx="17" cy="17" r="15.91549430918954" fill="transparent" stroke="#E8E8F0" strokeWidth="1" strokeDasharray="30.333333333333332 3" strokeDashoffset="23.5"></circle>
                                                <circle className="kldkc-crcl2" cx="17" cy="17" r="15.91549430918954" fill="transparent" stroke="transparent" strokeWidth="1" strokeDasharray="30.333333333333332 69.66666666666667" strokeDashoffset="23.5"></circle>
                                                <circle className="kldkc-crcl2" cx="17" cy="17" r="15.91549430918954" fill="transparent" stroke="transparent" strokeWidth="1" strokeDasharray="30.333333333333332 69.66666666666667" strokeDashoffset="23.5"></circle>
                                                <circle className="kldkc-crcl2" cx="17" cy="17" r="15.91549430918954" fill="transparent" stroke="transparent" strokeWidth="1" strokeDasharray="30.333333333333332 69.66666666666667" strokeDashoffset="23.5"></circle>
                                            </svg>
                                        </div>
                                    </div>
                                    <div style={{paddingLeft: "10px"}} className="dvvmmn3">
                                        <h6 className="kckh6">
                                            Step 1: Enter your email
                                        </h6>
                                        <h3 className="kckh3">Tell us a little about yourself.</h3>
                                    </div>
                                </div>

                                <div className="c-div" style={{width: "80%", margin: "7.6% 0 0 18%"}}>
                                    <form action="" method="POST" className="dtlsadmndtlfrm1" id="dtlsadmndtls1" noValidate="novalidate" onSubmit={handleSubmit}>

                                        <div className="w-100">
                                            <div className="kckh43 elmll" id="uiscs">
                                                <input id="ademail" name="ademail" type="text" className="mbl-inp" maxLength="50" required="" value={emailSignup} onBlur={(e) => onBlur(e)} onChange={e => { setemailsignup(e.target.value); handleChange(e)}} />
                                                <span className="kckh4-spn" htmlFor="ademail">Your Email</span>
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
                                        </div>

                                        <div className="form-group login-submit mb-0 dvvmmn4" style={{paddingTop: "38px"}}>
                                            <button id="nxt-btnneml" type="submit" className="kckh-btn verifybutton" disabled>
                                                <div id="nxt-btnn-loader" className="loadingio-spinner-rolling-rrc44sjio9" style={{display: "none"}}>
                                                    <div className="ldio-ravfkgmzeb">
                                                        <div className="lodrr"></div>
                                                    </div>
                                                </div>
                                                <span id="nxt-btnn-txt">Continue</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bck-btn-mbw">
                    <Link title="Back" to="/u/signup" className="px-5 pyf-2 pp-pl-0 bck-btn cstmabtnsa">
                        <img src="../Images/left-long-arrow.svg" width="22" style={{verticalAlign: "bottom"}} /> <span className="bck-btn"> BACK </span>
                    </Link>
                </div>
            </div>
        </div>
        
    </div>
}

// export default Details;
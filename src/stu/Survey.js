import React, { useState, useRef, useEffect } from "react";
import $ from 'jquery';
import '../Content/Content/survery-css.css';
import { Headerstuclssrm } from '../headerstuclassroom';
import '../AllJs/dashboard-staff.js';
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from 'react-bootstrap/Dropdown';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import useLoader from "../useLoader";
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';


export const SurveyStudentPage = () => {
    const [loader, showLoader, hideLoader] = useLoader();

    useEffect(() => {
        showLoader();
        $('#login').hide();
      }, []);


    const [surveyupcoming, setsurveyupcoming] = useState([]);
    const [surveycurrent, setsurveycurrent] = useState([]);
    const [surveysession, setsurveysession] = useState([]);
    const [studentTeacher, setstudentteachers] = useState([]);
    const [schooldetails, setschooldetails] = useState([]);
    const [session, setsessionval] = useState(""); 

    const dataFetchedRef = useRef(false);
    const dataFetchedRefCurrent = useRef(false);
    const dataFetchedRefteacher = useRef(false);
    const dataFetchedRefschool = useRef(false);
    var schoolcurrentid = 0;
   

    const sessionstudentid = sessionStorage.getItem('studentidsession');

    React.useEffect(
        ()=> {      

        
        fetch('https://entity-feediiapi.azurewebsites.net/api/Student/getStudentSurveydetailFixed/' + sessionstudentid , {
            method: 'GET'
        }) .then((response) => response.json())
        .then((data) => {
            if (dataFetchedRef.current) return;
            dataFetchedRef.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
        
            setsurveyupcoming(data)
            hideLoader();
             $('#login').show();

        })
        .catch(error =>{
            console.log(error);
        });



        fetch('https://entity-feediiapi.azurewebsites.net/api/Student/getStudentSurveydetail/' + sessionstudentid , {
            method: 'GET'
        }) .then((response) => response.json())
        .then((data) => {
            if (dataFetchedRefCurrent.current) return;
            dataFetchedRefCurrent.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
        
            setsurveycurrent(data)

        })
        .catch(error =>{
            console.log(error);
        });



                    })
                    
          



    const mysurvyy = (e) => {
        $('#mysrvy').addClass('active');
        $('#pndingsuvry').removeClass('active');
        $('#mmysrvv').show();
        $('#pnndnggsrvv').hide();
      }

      const pndngsrvyy = (e) => {
        $('#mysrvy').removeClass('active');
        $('#pndingsuvry').addClass('active');
        $('#mmysrvv').hide();
        $('#pnndnggsrvv').show();
      }


      let completedcount = 0;
      for (let i = 0; i < surveycurrent.length; i++) {
        if (surveycurrent[i].Status === 'Completed') completedcount++;
      }

      let completedcountaged = 0;
      for (let i = 0; i < surveyupcoming.length; i++) {
        if (surveyupcoming[i].Status === 'Completed') completedcountaged++;
      }

      const fetchpulseid = (pulseid) => {
        //alert(pulseid);
        sessionStorage.setItem("pulseidsession",pulseid);
        sessionStorage.setItem("ifteacherorschool","school");
      }

      

      const fetchstaffdetails = (pulseid) => {
           
        fetch('https://entity-feediiapi.azurewebsites.net/api/Student/getStudentTeacherSurveydetail/' + sessionstudentid + "-" + pulseid  , {   //studentid-pulseid
            method: 'GET'
        }) .then((response) => response.json())
        .then((data) => {
            if (dataFetchedRefteacher.current) return;
            dataFetchedRefteacher.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
        
            setstudentteachers(data)
         

        })
        .catch(error =>{
            console.log(error);
        });   
    }

    const fetchschooldetails = (pulseid) => {
           
        fetch('https://entity-feediiapi.azurewebsites.net/api/admin/getAdminSurveyTargetSummary/' + pulseid + "-" + "Student" + "-" +  "School" + "-" + sessionstudentid , {   //pulseid-participantid
            method: 'GET'
        }) .then((response) => response.json())
        .then((data) => {
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
        
            setschooldetails(data)
          

        })
        .catch(error =>{
            console.log(error);
        });   
    }
   

    // const slctoptndta = (sessionId) => {
    //     var opnvl = $('#selectsesssionn').val();
    //     alert(opnvl);

        

    //         fetch('https://entity-feediiapi.azurewebsites.net/api/Student/getStudentSurveydetailUpcomming/' + sessionstudentid + '-' + opnvl, {
    //             method: 'GET'
    //         }) .then((response) => response.json())
    //         .then((data) => {
               
                
    //             var objj = JSON.stringify(data);
    //             var parse = JSON.parse(objj);
            
    //             setsurveyupcoming(data)

    //         })
    //         .catch(error =>{
    //             console.log(error);
    //         });



    //         fetch('https://entity-feediiapi.azurewebsites.net/api/Student/getStudentSurveydetail/' + studentid + '-' +  opnvl, {
    //             method: 'GET'
    //         }) .then((response) => response.json())
    //         .then((data) => {
                
                
    //             var objj = JSON.stringify(data);
    //             var parse = JSON.parse(objj);
            
    //             setsurveycurrent(data)

    //         })
    //         .catch(error =>{
    //             console.log(error);
    //         });

    // }

      const slctyearoptions = [
        { value: 'Current Session : Apr 2022 - Mar 2023', label: 'Current Session : Apr 2022 - Mar 2023' },
        { value: 'Previous Session : Apr 2021 - Mar 2022', label: 'Previous Session : Apr 2021 - Mar 2022' },
        { value: 'Previous Session : Apr 2020 - Mar 2021', label: 'Previous Session : Apr 2020 - Mar 2021' },
      ];

      const [selectedOption, setSelectedOption] = useState(null);


      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => {
          setShow(true);
      }

      const [show2, setShow2] = useState(false);
      const handleClose2 = () => setShow2(false);
      const handleShow2 = () => {
          setShow2(true);
      }

      const [show3, setShow3] = useState(false);
      const handleClose3 = () => setShow3(false);
      const handleShow3 = () => {
          setShow3(true);
      }

      const [show4, setShow4] = useState(false);
      const handleClose4 = () => setShow4(false);
      const handleShow4 = () => {
          setShow4(true);
      }

      if(surveycurrent.length == 0) {
           $('#errdv1').show();
           $('.tbldtaa1').hide();
       }
       else {
           $('.tbldtaa1').show();
           $('#errdv1').hide();
       }

       if(surveyupcoming.length == 0) {
            $('#errdv2').show();
            $('.tbldtaa2').hide();
        }
        else {
            $('.tbldtaa2').show();
            $('#errdv2').hide();
        }

    return <div>
        <Headerstuclssrm />
        {loader}
        <div className="be-wrapper be-login innerwrapper mt-4p" id="login">
            <div className="padding mbvwpd">
                <div className="row tab-content mb-3 mt-4">
                    <div className="col-sm-12 row tab-pane cstmtab-pane animate fadeIn text-muted active" id="tab1">
                    <div className="col-sm-12 col-md-12" id="survytbl">
                    <div>
                        <div className="col-sm-12">
                            <h1 className="kmcs_h1 bluclr">Overview</h1>
                            <p className="kmcs_p mt-5 bluclr mt-0 mb-4">Wherever you are in this world of work - no matter your doubts, hopes and dreams, there's a job for you here.</p>
                        </div>
                    </div>
                    <div>
                        <div className="col-sm-12 bgclrblu">
                            <div className="dshbrd-dvv1 row ml-0 mr-0 pb-0">
                                <div className="col-sm-8 pl-0">
                                    <ul className="dshbrd-dvv1-ul">
                                        <li className="dshbrd-dvv1-ul-li">
                                            <a id="mysrvy" className="dshbrd-dvv1-ul-li-a active dshbrd-dvv1-ul-li-a-mbvw mbvw-ml0" onClick={mysurvyy}>Active ({surveycurrent.length})</a>
                                        </li>
                                        <li className="dshbrd-dvv1-ul-li">
                                            <a id="pndingsuvry" className="dshbrd-dvv1-ul-li-a dshbrd-dvv1-ul-li-a-mbvw mbvw-mr0" onClick={pndngsrvyy}>Aged ({surveyupcoming.length})</a>
                                        </li>
                                    </ul>
                                </div>
                                
                                    {/* <div className="col-sm-4 pr-0 pl-0 kckh48 kckhkcstm8 mb-0">
                                        <div className="custom-selectt custom-selecttsrvy">
                                        {/* <Select defaultValue={slctyearoptions[0]} onChange={setSelectedOption} options={slctyearoptions} theme={(theme) => ({...theme, colors: {...theme.colors,primary25: '#f5faff',primary50: '#f5faff',primary: '#54d4f2',}, })} /> */}
                                    
                                        {/*<select id="selectsesssionn" className="mbl-inp cs-slct-fld slct-cstm1 cstmsrvyslct-cstm1" onChange={(e) => slctoptndta(e)}>
                                            {surveysession.map((session) => (
                                                <option value={session.schoolsessionId}>{session.schoolsession}</option>
                                            ))}
                                        </select>
                                    </div> 
                                </div>*/}
                                   
                                    
                                
                                
                            </div>
                        </div>
                    </div>

                    <div id="mmysrvv">

                    <div className="cstm-mrgn" id="accordion">
                            
                            <div>
                                <div className="panel box no-border mb-0">
                                    <div id="c_2020" className="in collapse show" style={{}}>
                                        <div className="box-body row m-0">
                                            <div className="table-responsive ht-auto">
                                                <div id="errdv1">
                                                    <div className="nodtadv1">
                                                        <div>
                                                            <img className="nodtadv1img" src="https://res.cloudinary.com/infoi/image/upload/q_auto:best/v1634879425/AMA%20Icons/sidebar-empty-state-1_uwimwd.svg" width="150" alt="Error Image" />
                                                            <div className="nodtadv1txt">No Data Found</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <table id="nwsrvytbblll" className="table cstmtable2 tbldtaa1 v-middle p-0 m-0 box">
                                                    <thead>
                                                        <tr>
                                                            <th>Surveys ({completedcount} / {surveycurrent.length})</th>
                                                            <th>Period</th>
                                                            <th>Response Progress</th>
                                                            <th />
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{height: 'inherit'}}>
                                                        {surveycurrent.map((current) =>{
                                                            if(current.participant=="Student" && current.target=="School")
                                                            {
                                                                if(current.Status == "Not Started") {
                                                                    return(<tr>
                                                                        <td>
                                                                            <Link to='/stu/surveyrun'>
                                                                                <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={current.Pulsename} onClick={()=> {fetchpulseid(current.pulseid); }}>{current.Pulsename}</div>
                                                                                <div className="tbltddv2 cstmwdtbldv">{current.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {current.target}</div>
                                                                            </Link>
                                                                        </td>
                                                                        <td>
                                                                            <span className="tbltddv3">{current.Schedule}</span>
                                                                        </td>
                                                                        <td>
                                                                            <div className="srvytblprgbrsvdv">
                                                                                <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                                    <div className="progress-bar primary" style={{width: `${current.CompletionPer}%`}}></div>
                                                                                </div>
                                                                                <div className="text-left tbltddv4" onClick={()=> {fetchschooldetails(current.pulseid); handleShow2(); }} >
                                                                                    <span className="tblsvprgstxt">{current.Status}</span>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="text-right">
                                                                            <Link to='/stu/surveyrun'>
                                                                                <button className="modalRedBtn cstmmbtnn" onClick={()=> {fetchpulseid(current.pulseid); }}>Start</button>
                                                                            </Link>
                                                                        </td>
                                                                    </tr>)
                                                                }
                                                                else if(current.Status == "Completed") {
                                                                    return(<tr>
                                                                        <td>
                                                                            <Link to='/stu/surveyview'>
                                                                                <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={current.Pulsename} onClick={()=> {fetchpulseid(current.pulseid); }}>{current.Pulsename}</div>
                                                                                <div className="tbltddv2 cstmwdtbldv">{current.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {current.target} <button className="grnstatusbtn">Completed</button> </div>
                                                                            </Link>
                                                                        </td>
                                                                        <td>
                                                                            <span className="tbltddv3">{current.Schedule}</span>
                                                                        </td>
                                                                        <td>
                                                                            <div className="srvytblprgbrsvdv">
                                                                                <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                                    <div className="progress-bar primary" style={{width: `${current.CompletionPer}%`}}></div>
                                                                                </div>
                                                                                <div className="text-left tbltddv4" onClick={()=> {fetchschooldetails(current.pulseid); handleShow2(); }} >
                                                                                    <span className="tblsvprgstxt">{current.Status}</span>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="text-right">
                                                                            <Link to='/stu/surveyview'>
                                                                                <button className="modalGrayBtn cstmmbtnn" onClick={()=> {fetchpulseid(current.pulseid); }}>View</button>
                                                                            </Link>
                                                                        </td>
                                                                    </tr>)
                                                                }
                                                                else if(current.Status == "Upcoming") {
                                                                    return(<tr>
                                                                        <td>
                                                                            
                                                                                <div className="tbltddv1 text-truncate cstmwdtbldv" title={current.Pulsename}>{current.Pulsename}</div>
                                                                                <div className="tbltddv2 cstmwdtbldv">{current.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {current.target} <button className="blustatusbtn">Upcoming</button> </div>
                                                                            
                                                                        </td>
                                                                        <td>
                                                                            <span className="tbltddv3">{current.Schedule}</span>
                                                                        </td>
                                                                        <td>
                                                                            <div className="srvytblprgbrsvdv">
                                                                                <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                                    <div className="progress-bar primary" style={{width: `${current.CompletionPer}%`}}></div>
                                                                                </div>
                                                                                <div className="text-left tbltddv4" onClick={()=> {fetchschooldetails(current.pulseid); handleShow2(); }} >
                                                                                    <span className="tblsvprgstxt">{current.Status}</span>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="text-right">
                                                                            
                                                                                <button className="modalGrayBtn cstmmbtnn">{current.Status}</button>
                                                                            
                                                                        </td>
                                                                    </tr>)
                                                                }
                                                                else {

                                                                }
                                                            }
                                                            else
                                                            {
                                                                if(current.Status == "Not Started") {
                                                                    return( <tr>
                                                                            <td>
                                                                                <Link to='/stu/surveytch'>
                                                                                    <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={current.Pulsename} onClick={()=> {fetchpulseid(current.pulseid); }} >{current.Pulsename}</div>
                                                                                    <div className="tbltddv2 cstmwdtbldv">{current.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {current.target}</div>
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                <span className="tbltddv3">{current.Schedule}</span>
                                                                            </td>
                                                                            <td>
                                                                                <div className="srvytblprgbrsvdv">
                                                                                    <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                                        <div className="progress-bar primary" style={{width: `${current.CompletionPer}%`}}></div>
                                                                                    </div>
                                                                                    <div className="text-left tbltddv4" onClick={()=>{fetchstaffdetails(current.pulseid); handleShow(); }} >
                                                                                        <span className="tblsvprgstxt">{current.Status}</span>
                                                                                        <span className="float-right">{current.CompletedCount}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        
                                                                            <td className="text-right">
                                                                                <Link to='/stu/surveytch'>
                                                                                    <button className="modalRedBtn cstmmbtnn" onClick={()=> {fetchpulseid(current.pulseid); }}>Start</button>
                                                                                </Link>
                                                                            </td>
                                                                        </tr>)
                                                                        }
                                                                        else if(current.Status == "Inprogress") {
                                                                            return( <tr>
                                                                                    <td>
                                                                                        <Link to='/stu/surveytch'>
                                                                                            <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={current.Pulsename} onClick={()=> {fetchpulseid(current.pulseid); }}>{current.Pulsename}</div>
                                                                                            <div className="tbltddv2 cstmwdtbldv">{current.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {current.target} <button className="grnstatusbtn">Inprogress</button> </div>
                                                                                        </Link>
                                                                                    </td>
                                                                                    <td>
                                                                                        <span className="tbltddv3">{current.Schedule}</span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <div className="srvytblprgbrsvdv">
                                                                                            <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                                                <div className="progress-bar primary" style={{width: `${current.CompletionPer}%`}}></div>
                                                                                            </div>
                                                                                            <div className="text-left tbltddv4" onClick={()=>{fetchstaffdetails(current.pulseid); handleShow(); }} >
                                                                                                <span className="tblsvprgstxt">{current.Status}</span>
                                                                                                <span className="float-right">{current.CompletedCount}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                
                                                                                    <td className="text-right">
                                                                                        <Link to='/stu/surveytch'>
                                                                                            <button className="modalRedBtn cstmmbtnn" onClick={()=> {fetchpulseid(current.pulseid); }}>Start</button>
                                                                                        </Link>
                                                                                    </td>
                                                                                </tr>)
                                                                                }
                                                                                
                                                                                else if(current.Status == "Completed") {
                                                                                    return( <tr>
                                                                                        <td>
                                                                                            <Link to='/stu/surveytch'>
                                                                                                <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={current.Pulsename} onClick={()=> {fetchpulseid(current.pulseid); }}>{current.Pulsename}</div>
                                                                                                <div className="tbltddv2 cstmwdtbldv">{current.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {current.target} <button className="grnstatusbtn">Completed</button> </div>
                                                                                            </Link>
                                                                                        </td>
                                                                                        <td>
                                                                                            <span className="tbltddv3">{current.Schedule}</span>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div className="srvytblprgbrsvdv">
                                                                                                <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                                                    <div className="progress-bar primary" style={{width: `${current.CompletionPer}%`}}></div>
                                                                                                </div>
                                                                                                <div className="text-left tbltddv4" onClick={()=>{fetchstaffdetails(current.pulseid); handleShow(); }} >
                                                                                                    <span className="tblsvprgstxt">{current.Status}</span>
                                                                                                    <span className="float-right">{current.CompletedCount}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                    
                                                                                        <td className="text-right">
                                                                                            <Link to='/stu/surveytch'>
                                                                                                <button className="modalGrayBtn cstmmbtnn" onClick={()=> {fetchpulseid(current.pulseid); }}>View</button>
                                                                                            </Link>
                                                                                        </td>
                                                                                    </tr>)
                                                                                }
                                                                                
                                                                                else if(current.Status == "Upcoming") {
                                                                                    return( <tr>
                                                                                        <td>
                                                                                            
                                                                                                <div className="tbltddv1 text-truncate cstmwdtbldv" title={current.Pulsename}>{current.Pulsename}</div>
                                                                                                <div className="tbltddv2 cstmwdtbldv">{current.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {current.target} <button className="blustatusbtn">Upcoming</button> </div>
                                                                                            
                                                                                        </td>
                                                                                        <td>
                                                                                            <span className="tbltddv3">{current.Schedule}</span>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div className="srvytblprgbrsvdv">
                                                                                                <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                                                    <div className="progress-bar primary" style={{width: `${current.CompletionPer}%`}}></div>
                                                                                                </div>
                                                                                                <div className="text-left tbltddv4" onClick={()=>{fetchstaffdetails(current.pulseid); handleShow(); }} >
                                                                                                    <span className="tblsvprgstxt">{current.Status}</span>
                                                                                                    <span className="float-right">{current.CompletedCount}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                    
                                                                                        <td className="text-right">
                                                                                                <button className="modalGrayBtn cstmmbtnn">{current.Status}</button>
                                                                                        </td>
                                                                                    </tr>)
                                                                                }
                                                                                else {

                                                                                }
                                                                }
                                                            })}
                                                        

                                                       

                                                    {/* {surveycurrent.map((survey)=>{
                                                        if(survey.Status == "Start") {
                                                            
                                                        }
                                                        else 
                                                        {
                                                            return(
                                                                <tr>
                                                                    <td>
                                                                        <Link to='/stu/surveytch'>
                                                                            <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={survey.name}>{survey.name} </div>
                                                                            <div className="tbltddv2 cstmwdtbldv">Student <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> Teacher <button className="grnstatusbtn">Inprogress</button> </div>
                                                                        </Link>
                                                                    </td>
                                                                    <td>
                                                                        <span className="tbltddv3">Nov 20 - Dec 20</span>
                                                                    </td>
                                                                    <td>

                                                                        <div className="srvytblprgbrsvdv">
                                                                            <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                                <div className="progress-bar primary" style={{width: '10%'}} />
                                                                            </div>
                                                                            <div className="text-left tbltddv4" onClick={()=>{handleShow(); }} >
                                                                                <span className="tblsvprgstxt">Inprogress</span>
                                                                                <span className="float-right">1/5</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-right">
                                                                        <Link to="/stu/surveytch">
                                                                            <button className="modalGrayBtn cstmmbtnn">View</button>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                                 );
                                                        }
                                                        })} */}

                                                        {/* <tr>
                                                            <td>
                                                                <Link>
                                                                    <div className="tbltddv1 text-truncate cstmwdtbldv" title="Social &amp; Emotional Learning  - Pulse 1">Social &amp; Emotional Learning  - Pulse 1 </div>
                                                                    <div className="tbltddv2 text-truncate cstmwdtbldv">Student <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> School <button className="blustatusbtn">Upcoming</button> </div>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <span className="tbltddv3">Jan 20 - Dec 20</span>
                                                            </td>
                                                            <td>
                                                                <div className="srvytblprgbrsvdv">
                                                                    <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                        <div className="progress-bar primary" style={{width: '0%'}}></div>
                                                                    </div>
                                                                    <div className="text-left tbltddv4" onClick={()=>{handleShow3(); }} >
                                                                        <span className="tblsvprgstxt">Upcoming</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-right">
                                                                <button className="modalGrayBtn cstmmbtnn pntr-none">Upcoming</button>
                                                            </td>
                                                        </tr> */}
                                                      
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div id="pnndnggsrvv" style={{display: 'none'}}>

                        <div className="cstm-mrgn" id="accordion">
                            
                            <div>
                                <div className="panel box no-border mb-0">
                                    <div id="c_2020" className="in collapse show" style={{}}>
                                        <div className="box-body row m-0">
                                            <div className="table-responsive ht-auto">
                                                <div id="errdv2">
                                                    <div className="nodtadv1">
                                                        <div>
                                                            <img className="nodtadv1img" src="https://res.cloudinary.com/infoi/image/upload/q_auto:best/v1634879425/AMA%20Icons/sidebar-empty-state-1_uwimwd.svg" width="150" alt="Error Image" />
                                                            <div className="nodtadv1txt">No Data Found</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <table id="nwsrvytbblll" className="table cstmtable2 tbldtaa2 v-middle p-0 m-0 box">
                                                    <thead>
                                                        <tr>
                                                            <th>Surveys ({completedcountaged} / {surveyupcoming.length})</th>
                                                            <th>Period</th>
                                                            <th>Response Progress</th>
                                                            <th />
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{height: 'inherit'}}>
                                                        {surveyupcoming.map((upcom) => {
                                                            if(upcom.participant=="Student" && upcom.target=="School")
                                                            {
                                                                if(upcom.Status == "Not Started") {
                                                                    return(
                                                                        <tr>
                                                                            <td>
                                                                                <Link to='/stu/surveyview'>
                                                                                    <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={upcom.Pulsename} onClick={()=> {fetchpulseid(upcom.pulseid); }}>{upcom.Pulsename} </div>
                                                                                    <div className="tbltddv2 text-truncate cstmwdtbldv">{upcom.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {upcom.target} <button className="ylwstatusbtn">Ended</button> </div>
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                <span className="tbltddv3">{upcom.Schedule}</span>
                                                                            </td>
                                                                            <td>
                                                                                <div className="srvytblprgbrsvdv">
                                                                                    <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                                        <div className="progress-bar primary" style={{width: `${upcom.CompletionPer}%`}}></div>
                                                                                    </div>
                                                                                        <div className="text-left tbltddv4" onClick={()=>{fetchschooldetails(upcom.pulseid); handleShow2(); }} >
                                                                                            <span className="tblsvprgstxt">{upcom.Status}</span>
                                                                                        </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="text-right">
                                                                                <Link to='/stu/surveyview'>
                                                                                    <button className="modalGrayBtn cstmmbtnn pntr-none" onClick={()=> {fetchpulseid(upcom.pulseid); }}>View</button>
                                                                                </Link>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }
                                                                else if(upcom.Status == "Completed") {
                                                                    return(
                                                                        <tr>
                                                                            <td>
                                                                                <Link to='/stu/surveyview'>
                                                                                    <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={upcom.Pulsename} onClick={()=> {fetchpulseid(upcom.pulseid); }}>{upcom.Pulsename} </div>
                                                                                    <div className="tbltddv2 text-truncate cstmwdtbldv">{upcom.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {upcom.target} <button className="grnstatusbtn">Complpeted</button> </div>
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                <span className="tbltddv3">{upcom.Schedule}</span>
                                                                            </td>
                                                                            <td>
                                                                                <div className="srvytblprgbrsvdv">
                                                                                    <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                                        <div className="progress-bar primary" style={{width: `${upcom.CompletionPer}%`}}></div>
                                                                                    </div>
                                                                                        <div className="text-left tbltddv4" onClick={()=>{fetchschooldetails(upcom.pulseid); handleShow2(); }} >
                                                                                            <span className="tblsvprgstxt">{upcom.Status}</span>
                                                                                        </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="text-right">
                                                                                <Link to='/stu/surveyview'>
                                                                                    <button className="modalGrayBtn cstmmbtnn pntr-none" onClick={()=> {fetchpulseid(upcom.pulseid); }}>View</button>
                                                                                </Link>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }
                                                                else {

                                                                }
                                                            }
                                                            else if (upcom.participant=="Student" && upcom.target=="Teacher")
                                                            {
                                                                if(upcom.Status == "Not Started") {
                                                                    return(
                                                                        <tr>
                                                                            <td>
                                                                                <Link to='/stu/surveytch'>
                                                                                    <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={upcom.Pulsename} onClick={()=> {fetchpulseid(upcom.pulseid); }}>{upcom.Pulsename} </div>
                                                                                    <div className="tbltddv2 text-truncate cstmwdtbldv">{upcom.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {upcom.target} <button className="ylwstatusbtn">Ended</button> </div>
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                <span className="tbltddv3">{upcom.Schedule}</span>
                                                                            </td>
                                                                            <td>
                                                                                <div className="srvytblprgbrsvdv">
                                                                                    <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                                        <div className="progress-bar primary" style={{width: `${upcom.CompletionPer}%`}}></div>
                                                                                    </div>
                                                                                        <div className="text-left tbltddv4" onClick={()=>{fetchstaffdetails(upcom.pulseid); handleShow(); }} >
                                                                                            <span className="tblsvprgstxt">{upcom.Status}</span>
                                                                                            <span className="float-right">{upcom.CompletedCount}</span>
                                                                                        </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="text-right">
                                                                                <Link to='/stu/surveytch'>
                                                                                    <button className="modalGrayBtn cstmmbtnn pntr-none" onClick={()=> {fetchpulseid(upcom.pulseid); }}>View</button>
                                                                                </Link>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }
                                                                else if(upcom.Status == "Inprogress") {
                                                                    return(
                                                                        <tr>
                                                                            <td>
                                                                                <Link to='/stu/surveytch'>
                                                                                    <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={upcom.Pulsename} onClick={()=> {fetchpulseid(upcom.pulseid); }}>{upcom.Pulsename} </div>
                                                                                    <div className="tbltddv2 text-truncate cstmwdtbldv">{upcom.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {upcom.target} <button className="ylwstatusbtn">Ended</button> </div>
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                <span className="tbltddv3">{upcom.Schedule}</span>
                                                                            </td>
                                                                            <td>
                                                                                <div className="srvytblprgbrsvdv">
                                                                                    <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                                        <div className="progress-bar primary" style={{width: `${upcom.CompletionPer}%`}}></div>
                                                                                    </div>
                                                                                        <div className="text-left tbltddv4" onClick={()=>{fetchstaffdetails(upcom.pulseid); handleShow(); }} >
                                                                                            <span className="tblsvprgstxt">{upcom.Status}</span>
                                                                                            <span className="float-right">{upcom.CompletedCount}</span>
                                                                                        </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="text-right">
                                                                                <Link to='/stu/surveytch'>
                                                                                    <button className="modalGrayBtn cstmmbtnn pntr-none" onClick={()=> {fetchpulseid(upcom.pulseid); }}>View</button>
                                                                                </Link>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }
                                                                else if(upcom.Status == "Completed") {
                                                                    return(
                                                                        <tr>
                                                                            <td>
                                                                                <Link to='/stu/surveytch'>
                                                                                    <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={upcom.Pulsename} onClick={()=> {fetchpulseid(upcom.pulseid); }}>{upcom.Pulsename} </div>
                                                                                    <div className="tbltddv2 text-truncate cstmwdtbldv">{upcom.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {upcom.target} <button className="grnstatusbtn">Completed</button> </div>
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                <span className="tbltddv3">{upcom.Schedule}</span>
                                                                            </td>
                                                                            <td>
                                                                                <div className="srvytblprgbrsvdv">
                                                                                    <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                                        <div className="progress-bar primary" style={{width: `${upcom.CompletionPer}%`}}></div>
                                                                                    </div>
                                                                                        <div className="text-left tbltddv4" onClick={()=>{fetchstaffdetails(upcom.pulseid); handleShow4(); }} >
                                                                                            <span className="tblsvprgstxt">{upcom.Status}</span>
                                                                                            <span className="float-right">{upcom.CompletedCount}</span>
                                                                                        </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="text-right">
                                                                                <Link to='/stu/surveytch'>
                                                                                    <button className="modalGrayBtn cstmmbtnn pntr-none" onClick={()=> {fetchpulseid(upcom.pulseid); }}>View</button>
                                                                                </Link>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }
                                                                else {

                                                                }
                                                            }
                                                            else {

                                                            }
                                                        })}
                                                       

                                                       
                                                    
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    </div>
                    <br />
                    </div>
                </div>
            </div>

        </div>


        
        <Modal show={show} onHide={handleClose} className="cstmmtmodal cstmlmodal2" >
            <Modal.Header className="cstmmdlinfodv cstmmdlldlhdr1" closeButton>
                <div className="cstmmdlldlhdr1dv1">Teachers</div>
            </Modal.Header>
            <Modal.Body className="cstmmdlinfodv2 cstmmdlinfodv2cstmm">
                {studentTeacher.map((teacher) => {
                    if(teacher.Status == "Not Started") {
                        return(
                            <div className="infomdvmdl1 col-sm-12 row m-0 mb-4">
                                <div className="col-sm-6 pl-0">
                                    <div className="row m-0">
                                        <img src="../Images/user_green.png" width="24" className="mr-3" alt="User Profile" />
                                        <span className="text-truncate mdldvdv12d cstmwdmdl" title={teacher.StaffName}>{teacher.StaffName}</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 text-right">
                                    <span className="text-truncate mdldvdv12d">{teacher.Status}</span>
                                    <img className="ml-4" src="../Images/greycircle-4.png" width="22" alt="Image" />
                                </div>
                            </div>
                        )
                    }
                    else if(teacher.Status == "Inprogress") {
                        return(
                            <div className="infomdvmdl1 col-sm-12 row m-0 mb-4">
                                <div className="col-sm-6 pl-0">
                                    <div className="row m-0">
                                        <img src="../Images/user_green.png" width="24" className="mr-3" alt="User Profile" />
                                        <span className="text-truncate mdldvdv12d cstmwdmdl" title={teacher.StaffName}>{teacher.StaffName}</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 text-right">
                                    <span className="text-truncate mdldvdv12d">{teacher.Status}</span>
                                    <img className="ml-4" src="../Images/greycircle-1.png" width="22" alt="Image" />
                                </div>
                            </div>
                        )
                    }
                    else if(teacher.Status == "Completed") {
                        return(
                            <div className="infomdvmdl1 col-sm-12 row m-0 mb-4">
                                <div className="col-sm-6 pl-0">
                                    <div className="row m-0">
                                        <img src="../Images/user_green.png" width="24" className="mr-3" alt="User Profile" />
                                        <span className="text-truncate mdldvdv12d cstmwdmdl" title={teacher.StaffName}>{teacher.StaffName}</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 text-right">
                                    <span className="text-truncate mdldvdv12d">{teacher.Status}</span>
                                    <img className="ml-4" src="../Images/checkbox-marked-circle.svg" width="22" alt="Image" />
                                </div>
                            </div>
                        )
                    }
                    else {

                    }
                })}
                
                
             
            </Modal.Body>
        </Modal>

        <Modal show={show2} onHide={handleClose2} className="cstmmtmodal cstmlmodal2" >
            <Modal.Header className="cstmmdlinfodv cstmmdlldlhdr1" closeButton>
                <div className="cstmmdlldlhdr1dv1">School</div>
            </Modal.Header>
            <Modal.Body className="cstmmdlinfodv2 cstmmdlinfodv2cstmm">
                {schooldetails.map((school) => {
                    if(school.Status == "Not Started") {
                        return(
                            <div className="infomdvmdl1 col-sm-12 row m-0 mb-4">
                                <div className="col-sm-6 pl-0">
                                    <div className="row m-0">
                                        <img src="../Images/school-building.png" width="24" className="mr-3 mt--5px" alt="School Image" />
                                        <span className="text-truncate mdldvdv12d cstmwdmdl" title={school.targetName}>{school.targetName}</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 text-right">
                                    <span className="text-truncate mdldvdv12d">{school.Status}</span>
                                    <img className="ml-4" src="../Images/greycircle-4.png" width="22" alt="Image" />
                                </div>
                            </div>
                        )
                    }
                    else if(school.Status == "Completed") {
                        return(
                            <div className="infomdvmdl1 col-sm-12 row m-0 mb-4">
                                <div className="col-sm-6 pl-0">
                                    <div className="row m-0">
                                        <img src="../Images/school-building.png" width="24" className="mr-3 mt--5px" alt="School Image" />
                                        <span className="text-truncate mdldvdv12d cstmwdmdl" title={school.targetName}>{school.targetName}</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 text-right">
                                    <span className="text-truncate mdldvdv12d">{school.Status}</span>
                                    <img className="ml-4" src="../Images/checkbox-marked-circle.svg" width="22" alt="Image" />
                                </div>
                            </div>
                        )
                    }
                    else {

                    }
                    })}
                
             
            </Modal.Body>
        </Modal>

        <Modal show={show3} onHide={handleClose3} className="cstmmtmodal cstmlmodal2" >
            <Modal.Header className="cstmmdlinfodv cstmmdlldlhdr1" closeButton>
                <div className="cstmmdlldlhdr1dv1">School</div>
            </Modal.Header>
            <Modal.Body className="cstmmdlinfodv2 cstmmdlinfodv2cstmm">
                
                <div className="infomdvmdl1 col-sm-12 row m-0 mb-4">
                    <div className="col-sm-6 pl-0">
                        <div className="row m-0">
                            <img src="../Images/user_green.png" width="24" className="mr-3" alt="User Profile" />
                            <span className="text-truncate mdldvdv12d cstmwdmdl">School Name</span>
                        </div>
                    </div>
                    <div className="col-sm-6 text-right">
                        <span className="text-truncate mdldvdv12d">Not Started</span>
                        <img className="ml-4" src="../Images/greycircle-4.png" width="22" alt="Image" />
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={show4} onHide={handleClose4} className="cstmmtmodal cstmlmodal2" >
            <Modal.Header className="cstmmdlinfodv cstmmdlldlhdr1" closeButton>
                <div className="cstmmdlldlhdr1dv1">School</div>
            </Modal.Header>
            <Modal.Body className="cstmmdlinfodv2 cstmmdlinfodv2cstmm">
                
                <div className="infomdvmdl1 col-sm-12 row m-0 mb-4">
                    <div className="col-sm-6 pl-0">
                        <div className="row m-0">
                            <img src="../Images/user_green.png" width="24" className="mr-3" alt="User Profile" />
                            <span className="text-truncate mdldvdv12d cstmwdmdl">School Name</span>
                        </div>
                    </div>
                    <div className="col-sm-6 text-right">
                        <span className="text-truncate mdldvdv12d">Not Started</span>
                        <img className="ml-4" src="../Images/greycircle-4.png" width="22" alt="Image" />
                    </div>
                </div>
            </Modal.Body>
        </Modal>

    </div>
}

// export default Details;
import React, { useState, useRef, useEffect }  from "react";
import $ from 'jquery';
import '../Content/Content/survery-css.css';
import { SecondHeaderTchrrrdashboardSurvy } from '../secondheadertchrdashboardsurvey';
import '../AllJs/dashboard-staff.js';
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from 'react-bootstrap/Dropdown';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import useLoader from "../useLoader";
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';


export const SurveyTeacherPage = () => {
    const [loader, showLoader, hideLoader] = useLoader();

    useEffect(() => {
        showLoader();
        $('#login').hide();
      }, []);

    
    const [surveyformeaged, setsurveyformeaged] = useState([]);
    const [surveyforme, setsurveyforme] = useState([]);
    const [session, setsessionval] = useState(""); 

    
    const dataFetchedRefforme = useRef(false);
    const dataFetchedRefformeaged = useRef(false);
    // var schoolcurrentid=3;
    // var studentid = 7;
    const dataFetchedRefschool = useRef(false);
    const [studentTeacher, setstudentteachers] = useState([]);

    var staffidsession = sessionStorage.getItem("staffidsession");
    const [schooldetails, setschooldetails] = useState([]);


    React.useEffect(
        ()=> {
       
           //alert(staffidsession);
            fetch('https://feedii-test-api.azurewebsites.net/api/staff/getSurveyTeacherDashboardforme/' + staffidsession, {
            method: 'GET'
            }) .then((response) => response.json())
            .then((data) => {
                if (dataFetchedRefforme.current) return;
                dataFetchedRefforme.current = true;
                
                setsurveyforme(data)
                hideLoader();
                $('#login').show();
               
            })
            .catch(error =>{
                console.log(error);
            });


        fetch('https://feedii-test-api.azurewebsites.net/api/staff/getSurveyTeacherDashboardformeAged/' + staffidsession, {
            method: 'GET'
        }) .then((response) => response.json())
        .then((data) => {
            if (dataFetchedRefformeaged.current) return;
            dataFetchedRefformeaged.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
        
            setsurveyformeaged(data)

        })
        .catch(error =>{
            console.log(error);
        });

          
        })
        
          
        const fetchteacherdetails = (pulseid) => {
           
            fetch('https://feedii-test-api.azurewebsites.net/api/admin/getstaffSurveyTargetSummary/' + pulseid + "-"  + staffidsession , {   //pulseid-participantid
                method: 'GET'
            }) .then((response) => response.json())
            .then((data) => {
              
                var objj = JSON.stringify(data);
                var parse = JSON.parse(objj);
            
                setstudentteachers(data)
              
            })
            .catch(error =>{
                console.log(error);
            });   
        }

        const fetchpulseid = (pulseid) => {      
            sessionStorage.setItem("pulseidsession",pulseid);
           
          }


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
      for (let i = 0; i < surveyforme.length; i++) {
        if (surveyforme[i].Status === 'Completed') completedcount++;
      }

      let completedcountaged = 0;
      for (let i = 0; i < surveyformeaged.length; i++) {
        if (surveyformeaged[i].Status === 'Completed') completedcountaged++;
      }

      const fetchsurveyid = (surveyid) => {
        sessionStorage.setItem("surveyidsession",surveyid);
        
      }

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

      const [show5, setShow5] = useState(false);
      const handleClose5 = () => setShow5(false);
      const handleShow5 = () => {
          setShow5(true);
      }

      if(surveyforme.length == 0) {
           $('#errdv1').show();
           $('.tbldtaa1').hide();
       }
       else {
           $('.tbldtaa1').show();
           $('#errdv1').hide();
       }

       if(surveyformeaged.length == 0) {
            $('#errdv2').show();
            $('.tbldtaa2').hide();
        }
        else {
            $('.tbldtaa2').show();
            $('#errdv2').hide();
        }


    return <div>
        <SecondHeaderTchrrrdashboardSurvy />
        {loader}
        <div className="be-wrapper be-login innerwrapper" id="login">
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
                                            <a id="mysrvy" className="dshbrd-dvv1-ul-li-a active dshbrd-dvv1-ul-li-a-mbvw mbvw-ml0" onClick={mysurvyy}>Active ({surveyforme.length})</a>
                                        </li>
                                        <li className="dshbrd-dvv1-ul-li">
                                            <a id="pndingsuvry" className="dshbrd-dvv1-ul-li-a dshbrd-dvv1-ul-li-a-mbvw mbvw-mr0" onClick={pndngsrvyy}>Aged ({surveyformeaged.length})</a>
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
                                                <table id="nwsrvytbblll" className="table cstmtable2 v-middle p-0 m-0 box tbldtaa1">
                                                    <thead>
                                                        <tr>
                                                            <th>Surveys ({completedcount} / {surveyforme.length})</th>
                                                            <th>Period</th>
                                                            <th>Response Progress</th>
                                                            <th />
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{height: 'inherit'}}>
                                                        {surveyforme.map((survy) => {
                                                            if(survy.Status == "Not Started") {
                                                                return(
                                                            <tr>
                                                            <td>
                                                                <Link to='/tch/surveytchrstsc' onClick={()=> {fetchpulseid(survy.pulseid); }}>
                                                                    <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={survy.title}>
                                                                        {survy.title}
                                                                        <Link to='/tch/surveytemplateone'>
                                                                            <i className="fa fa-eye" title="View Survey Template" onClick={()=> {fetchpulseid(survy.pulseid); fetchsurveyid(survy.surveyID);}} style={{marginLeft: '10px'}} ></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="tbltddv2 cstmwdtbldv">{survy.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {survy.target}</div>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <span className="tbltddv3">{survy.Schedule}</span>
                                                            </td>
                                                            <td>
                                                                <div className="srvytblprgbrsvdv">
                                                                    <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                        <div className="progress-bar primary" style={{width: `${survy.CompletionPer}%`}}></div>
                                                                    </div>
                                                                    <div className="text-left tbltddv4" onClick={()=>{fetchteacherdetails(survy.pulseid); handleShow(); }} >
                                                                        <span className="tblsvprgstxt">{survy.Status}</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-right">
                                                                <Link to='/tch/surveytchrstsc'>
                                                                    <button className="modalGrayBtn cstmmbtnn" onClick={()=> {fetchpulseid(survy.pulseid); }}>View</button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                                )}

                                                                else if(survy.Status == "Inprogress") {
                                                                    return(
                                                                <tr>
                                                                <td>
                                                                    <Link to='/tch/surveytchrstsc' onClick={()=> {fetchpulseid(survy.pulseid); }}>
                                                                        <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={survy.title}>
                                                                            {survy.title}
                                                                            <Link to='/tch/surveytemplateone'>
                                                                                <i className="fa fa-eye" title="View Survey Template" onClick={()=> {fetchpulseid(survy.pulseid); fetchsurveyid(survy.surveyID);}} style={{marginLeft: '10px'}} ></i>
                                                                            </Link>
                                                                        </div>
                                                                        <div className="tbltddv2 cstmwdtbldv">{survy.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {survy.target}<button className="grnstatusbtn">Inprogress</button></div>
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <span className="tbltddv3">{survy.Schedule}</span>
                                                                </td>
                                                                <td>
                                                                    <div className="srvytblprgbrsvdv">
                                                                        <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                            <div className="progress-bar primary" style={{width: `${survy.CompletionPer}%`}}></div>
                                                                        </div>
                                                                        <div className="text-left tbltddv4" onClick={()=>{fetchteacherdetails(survy.pulseid);  handleShow(); }} >
                                                                            <span className="tblsvprgstxt">{survy.Status}</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-right">
                                                                    <Link to='/tch/surveytchrstsc'>
                                                                        <button className="modalGrayBtn cstmmbtnn" onClick={()=> {fetchpulseid(survy.pulseid); }}>View</button>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                                    )}
                                                                    else if(survy.Status == "Completed") {
                                                                        return(
                                                                    <tr>
                                                                    <td>
                                                                        <Link to='/tch/surveytchrstsc' onClick={()=> {fetchpulseid(survy.pulseid); }}>
                                                                            <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={survy.title}>
                                                                                {survy.title}
                                                                                <Link to='/tch/surveytemplateone'>
                                                                                    <i className="fa fa-eye" title="View Survey Template" onClick={()=> {fetchpulseid(survy.pulseid); fetchsurveyid(survy.surveyID); }} style={{marginLeft: '10px'}} ></i>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="tbltddv2 cstmwdtbldv">{survy.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {survy.target}<button className="grnstatusbtn">Completed</button></div>
                                                                        </Link>
                                                                    </td>
                                                                    <td>
                                                                        <span className="tbltddv3">{survy.Schedule}</span>
                                                                    </td>
                                                                    <td>
                                                                        <div className="srvytblprgbrsvdv">
                                                                            <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                                <div className="progress-bar primary" style={{width: `${survy.CompletionPer}%`}}></div>
                                                                            </div>
                                                                            <div className="text-left tbltddv4" onClick={()=>{fetchteacherdetails(survy.pulseid); handleShow(); }} >
                                                                                <span className="tblsvprgstxt">{survy.Status}</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-right">
                                                                        <Link to='/tch/surveytchrstsc'>
                                                                            <button className="modalGrayBtn cstmmbtnn" onClick={()=> {fetchpulseid(survy.pulseid); }}>View</button>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                                        )}
                                                                        else if(survy.Status == "Upcoming") {
                                                                            return(
                                                                        <tr>
                                                                        <td>
                                                                           
                                                                                <div className="tbltddv1 text-truncate cstmwdtbldv" title={survy.title}>
                                                                                    {survy.title}
                                                                                </div>
                                                                                <div className="tbltddv2 cstmwdtbldv">{survy.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {survy.target}<button className="blustatusbtn">Upcoming</button></div>
                                                                            
                                                                        </td>
                                                                        <td>
                                                                            <span className="tbltddv3">{survy.Schedule}</span>
                                                                        </td>
                                                                        <td>
                                                                            <div className="srvytblprgbrsvdv">
                                                                                <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                                    <div className="progress-bar primary" style={{width: `${survy.CompletionPer}%`}}></div>
                                                                                </div>
                                                                                <div className="text-left tbltddv4" onClick={()=>{fetchteacherdetails(survy.pulseid); }} >
                                                                                    <span className="tblsvprgstxt crsr-auto">{survy.Status}</span>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="text-right">
                                                                            
                                                                                <button className="modalGrayBtn cstmmbtnn">Upcoming</button>
    
                                                                        </td>
                                                                    </tr>
                                                                            )}
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
                                                <table id="nwsrvytbblll" className="table cstmtable2 v-middle p-0 m-0 box tbldtaa2">
                                                    <thead>
                                                        <tr>
                                                            <th>Surveys ({completedcountaged} / {surveyformeaged.length})</th>
                                                            <th>Period</th>
                                                            <th>Response Progress</th>
                                                            <th />
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{height: 'inherit'}}>
                                                        {surveyformeaged.map((survyaged)=>{
                                                            if(survyaged.Status == "Not Started")
                                                            {
                                                            return(<tr>
                                                            <td>
                                                                <Link to='/tch/surveytchrstsc' onClick={()=> {fetchpulseid(survyaged.pulseid); }}>
                                                                    <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={survyaged.title}>
                                                                        {survyaged.title}
                                                                        <Link to='/tch/surveytemplateone'>
                                                                            <i className="fa fa-eye" title="View Survey Template" onClick={()=> {fetchpulseid(survyaged.pulseid); fetchsurveyid(survyaged.surveyID);}} style={{marginLeft: '10px'}} ></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="tbltddv2 text-truncate cstmwdtbldv">{survyaged.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {survyaged.target} <button className="ylwstatusbtn">Ended</button> </div>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <span className="tbltddv3">{survyaged.Schedule}</span>
                                                            </td>
                                                            <td>
                                                                <div className="srvytblprgbrsvdv">
                                                                    <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                        <div className="progress-bar primary" style={{width: `${survyaged.CompletionPer}%`}}></div>
                                                                    </div>
                                                                        <div className="text-left tbltddv4" onClick={()=>{handleShow4(); }} >
                                                                            <span className="tblsvprgstxt">{survyaged.Status}</span>
                                                                        </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-right">
                                                                <Link to='/tch/surveytchrstsc'>
                                                                    <button className="modalGrayBtn cstmmbtnn" onClick={()=> {fetchpulseid(survyaged.pulseid); }}>View</button>
                                                                </Link>
                                                            </td>
                                                        </tr>)
                                                            }
                                                           else if(survyaged.Status == "Inprogress")
                                                            {
                                                            return(<tr>
                                                            <td>
                                                                <Link to='/tch/surveytchrstsc' onClick={()=> {fetchpulseid(survyaged.pulseid); }}>
                                                                    <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={survyaged.title}>
                                                                        {survyaged.title}
                                                                        <Link to='/tch/surveytemplateone'>
                                                                            <i className="fa fa-eye" title="View Survey Template" onClick={()=> {fetchpulseid(survyaged.pulseid); fetchsurveyid(survyaged.surveyID);}} style={{marginLeft: '10px'}} ></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="tbltddv2 text-truncate cstmwdtbldv">{survyaged.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {survyaged.target} <button className="ylwstatusbtn">Ended</button> </div>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <span className="tbltddv3">{survyaged.Schedule}</span>
                                                            </td>
                                                            <td>
                                                                <div className="srvytblprgbrsvdv">
                                                                    <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                        <div className="progress-bar primary" style={{width: `${survyaged.CompletionPer}%`}}></div>
                                                                    </div>
                                                                        <div className="text-left tbltddv4" onClick={()=>{handleShow4(); }} >
                                                                            <span className="tblsvprgstxt">{survyaged.Status}</span>
                                                                        </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-right">
                                                                <Link to='/tch/surveytchrstsc'>
                                                                    <button className="modalGrayBtn cstmmbtnn" onClick={()=> {fetchpulseid(survyaged.pulseid); }}>View</button>
                                                                </Link>
                                                            </td>
                                                        </tr>)
                                                            }
                                                            else if(survyaged.Status == "Completed")
                                                            {
                                                            return(<tr>
                                                            <td>
                                                                <Link to='/tch/surveytchrstsc' onClick={()=> {fetchpulseid(survyaged.pulseid); }}>
                                                                    <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={survyaged.title}>
                                                                        {survyaged.title}
                                                                        <Link to='/tch/surveytemplateone'>
                                                                            <i className="fa fa-eye" title="View Survey Template" onClick={()=> {fetchpulseid(survyaged.pulseid); fetchsurveyid(survyaged.surveyID); }} style={{marginLeft: '10px'}} ></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="tbltddv2 text-truncate cstmwdtbldv">{survyaged.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {survyaged.target} <button className="grnstatusbtn">Completed</button> </div>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <span className="tbltddv3">{survyaged.Schedule}</span>
                                                            </td>
                                                            <td>
                                                                <div className="srvytblprgbrsvdv">
                                                                    <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                        <div className="progress-bar primary" style={{width: `${survyaged.CompletionPer}%`}}></div>
                                                                    </div>
                                                                        <div className="text-left tbltddv4" onClick={()=>{handleShow4(); }} >
                                                                            <span className="tblsvprgstxt">{survyaged.Status}</span>
                                                                        </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-right">
                                                                <Link to='/tch/surveytchrstsc'>
                                                                    <button className="modalGrayBtn cstmmbtnn" onClick={()=> {fetchpulseid(survyaged.pulseid); }}>View</button>
                                                                </Link>
                                                            </td>
                                                        </tr>)
                                                            }
                                                            else{
                                                               
                                                                return(<tr>
                                                                <td>
                                                                    <Link to='/tch/surveytchrstsc'>
                                                                        <div className="tbltddv1 text-truncate cstmwdtbldv crsr-pntr" title={survyaged.title}>
                                                                            {survyaged.title}
                                                                            <Link to='/tch/surveytemplateone'>
                                                                                <i className="fa fa-eye" title="View Survey Template" onClick={()=> {fetchpulseid(survyaged.pulseid); fetchsurveyid(survyaged.surveyID);}} style={{marginLeft: '10px'}} ></i>
                                                                            </Link>
                                                                        </div>
                                                                        <div className="tbltddv2 text-truncate cstmwdtbldv">{survyaged.participant} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {survyaged.target} <button className="ylwstatusbtn">Ended</button> </div>
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <span className="tbltddv3">{survyaged.Schedule}</span>
                                                                </td>
                                                                <td>
                                                                    <div className="srvytblprgbrsvdv">
                                                                        <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                            <div className="progress-bar primary" style={{width: `${survyaged.CompletionPer}%`}}></div>
                                                                        </div>
                                                                            <div className="text-left tbltddv4" onClick={()=>{handleShow4(); }} >
                                                                                <span className="tblsvprgstxt">{survyaged.Status}</span>
                                                                            </div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-right">
                                                                    <Link to='/tch/surveytchrstsc'>
                                                                        <button className="modalGrayBtn cstmmbtnn ">View</button>
                                                                    </Link>
                                                                </td>
                                                            </tr>)
                                                                
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
                                        <span className="text-truncate mdldvdv12d cstmwdmdl" title={teacher.targetName}>{teacher.targetName}</span>
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
                                        <span className="text-truncate mdldvdv12d cstmwdmdl" title={teacher.targetName}>{teacher.targetName}</span>
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
                                        <span className="text-truncate mdldvdv12d cstmwdmdl" title={teacher.targetName}>{teacher.targetName}</span>
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
                            <span className="text-truncate mdldvdv12d">School Name</span>
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
                            <span className="text-truncate mdldvdv12d">School Name</span>
                        </div>
                    </div>
                    <div className="col-sm-6 text-right">
                        <span className="text-truncate mdldvdv12d">Not Started</span>
                        <img className="ml-4" src="../Images/greycircle-4.png" width="22" alt="Image" />
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={show5} onHide={handleClose5} className="cstmmtmodal cstmlmodal2" >
            <Modal.Header className="cstmmdlinfodv cstmmdlldlhdr1" closeButton>
                <div className="cstmmdlldlhdr1dv1">Teacher</div>
            </Modal.Header>
            <Modal.Body className="cstmmdlinfodv2 cstmmdlinfodv2cstmm">
                
                <div className="infomdvmdl1 col-sm-12 row m-0 mb-4">
                    <div className="col-sm-6 pl-0">
                        <div className="row m-0">
                            <img src="../Images/user_green.png" width="24" className="mr-3" alt="User Profile" />
                            <span className="text-truncate mdldvdv12d">Teacher Name</span>
                        </div>
                    </div>
                    <div className="col-sm-6 text-right">
                        <span className="text-truncate mdldvdv12d">Not Started</span>
                        <img className="ml-4" src="../Images/greycircle-4.png" width="22" alt="Image" />
                    </div>
                </div>
                
                <div className="infomdvmdl1 col-sm-12 row m-0 mb-4">
                    <div className="col-sm-6 pl-0">
                        <div className="row m-0">
                            <img src="../Images/user_green.png" width="24" className="mr-3" alt="User Profile" />
                            <span className="text-truncate mdldvdv12d">Teacher Name</span>
                        </div>
                    </div>
                    <div className="col-sm-6 text-right">
                        <span className="text-truncate mdldvdv12d">Completed</span>
                        <img className="ml-4" src="../Images/checkbox-marked-circle.svg" width="22" alt="Image" />
                    </div>
                </div>
            </Modal.Body>
        </Modal>

    </div>
}

// export default Details;
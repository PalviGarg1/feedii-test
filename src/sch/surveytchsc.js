import React, { useState, useRef, useEffect } from "react";
import $ from 'jquery';
import '../Content/Content/survery-css.css';
import { SecondHeaderSchSrvysdashboardforOverviewdeeppages } from '../secondheaderschsrvydashboardtmplatesovrvwdtls';
import '../AllJs/dashboard-staff.js';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from 'react-bootstrap/Dropdown';
import useLoader from "../useLoader";
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';


export const SurveyTeacherToSchoolPage = () => {
    const [loader, showLoader, hideLoader] = useLoader();

    useEffect(() => {
        showLoader();
        $('#login').hide();
      }, []);


    const [surveyupcoming, setsurveyupcoming] = useState([]);
    const [surveycurrent, setsurveycurrent] = useState([]);
    const [surveysession, setsurveysession] = useState([]);
    const [session, setsessionval] = useState(""); 

    const dataFetchedRef = useRef(false);
    const dataFetchedRefCurrent = useRef(false);
    const dataFetchedRefsession = useRef(false);
    const dataFetchedRefsessionfetch = useRef(false);
    const dataFetchedRefsurvey = useRef(false);
    const dataFetchedRefclasses = useRef(false);
    var schoolcurrentid = 0;

    const [staffname, setstaffname] = useState(""); 
    const [staffemail, setstaffemail] = useState("");
    const [staffdetails, setStaffDetails] = useState([]);
    const [schooldetails, setschooldetails] = useState([]);
    const [staffdesignation, setstaffdesignation] = useState(""); 

    const [surveydetails, setsurveydetails] = useState([]);
    const [surveydetailsfilter, setsurveydetailsfilter] = useState([]);

    const [surveyname, setsurveyname] = useState(""); 
    const [participantname, setparticipantname] = useState(""); 
    const [targetname, settargetname] = useState(""); 
    const [surveyclasses, setsurveyclasses] = useState([]);
   

    const sessionstudentid = sessionStorage.getItem('studentidsession');
    const sessionpulseid = sessionStorage.getItem('pulseidsession');
    const sessionscholid = sessionStorage.getItem('schoolidsession');

    React.useEffect(
        ()=> {      

           
            fetch('https://feedii-test-api.azurewebsites.net/api/admin/getAdminSurveyDetailSummary/'+ sessionpulseid + "-" + "Teacher-School-All-" + sessionscholid , {
            method: 'GET'
             }) .then((response) => response.json())
            .then((data) => {
            if (dataFetchedRefsurvey.current) return;
            dataFetchedRefsurvey.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
        
            setsurveydetails(data)
            setsurveydetailsfilter(data)
            setsurveyname(data[0].Pulsename);
            setparticipantname(data[0].Participant);
            settargetname(data[0].Target);
            hideLoader();
             $('#login').show();

        })
        .catch(error =>{
            console.log(error);
        });

        fetch('https://feedii-test-api.azurewebsites.net/api/admin/getclassesdata/' + sessionscholid , {
            method: 'GET'
        }) .then((response) => response.json())
        .then((data) => {
            if (dataFetchedRefclasses.current) return;
            dataFetchedRefclasses.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
        
            setsurveyclasses(data)
            

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
      for (let i = 0; i < surveydetails.length; i++) {
        if (surveydetails[i].Status === 'Completed') completedcount++;
      }

      const fetchstaffdetails = (staffid) => {
            //alert(staffid)
            fetch('https://feedii-test-api.azurewebsites.net/api/Staff/getStaffClassroom/' + staffid, {
                method: 'GET'
              }) .then((response) => response.json())
              .then((data) => {    
                // var objj = JSON.stringify(data);
                // var parse = JSON.parse(objj);
                // alert(data[0].name)
                if(data.length==0)
                {
                    setstaffname("Name")
                    setstaffemail("Email")
                    setstaffdesignation("Designation")
                    setStaffDetails([data])
                }
                else{
                    setstaffname(data[0].name)
                    setstaffemail(data[0].Email)
                    setstaffdesignation(data[0].AccountType)
                    setStaffDetails(data)
                }
                
    
              })
              .catch(error =>{
                  console.log(error);
              });     
        }


        const fetchschooldetails = (staffid) => {
           
            fetch('https://feedii-test-api.azurewebsites.net/api/admin/getAdminSurveyTargetSummary/' + sessionpulseid + "-" + "Teacher" + "-" +  "School" + "-" + staffid , {   //pulseid-participantid
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

        

    //         fetch('https://feedii-test-api.azurewebsites.net/api/Student/getStudentSurveydetailUpcomming/' + sessionstudentid + '-' + opnvl, {
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



    //         fetch('https://feedii-test-api.azurewebsites.net/api/Student/getStudentSurveydetail/' + studentid + '-' +  opnvl, {
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

      const slctdrpdwnoptions = [
        { label: 'All Teachers', value: 'All Teachers'},
      ];

      
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

    return <div>
        <SecondHeaderSchSrvysdashboardforOverviewdeeppages />
        {loader}
        <div className="be-wrapper be-login innerwrapper" id="login">
            <div className="padding mbvwpd">
                <div className="row tab-content mb-3 mt-4">
                    <div className="col-sm-12">
                        <div className="col-sm-12 mb-4 cstmtab-pane tab-pane">
                            <NavLink to="/sch/survey" className="srvylnkbtnnn">
                                <i className="fa fa-chevron-left mr-2"></i>
                                <span>All Surveys</span>
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-sm-12 row tab-pane cstmtab-pane animate fadeIn text-muted active" id="tab1">
                    <div className="col-sm-12 col-md-12" id="survytbl">
                    <div className="col-sm-12 row ml-0 mr-0 mb-4 p-0">
                        <div className="col-sm-3">
                            <Select options={slctdrpdwnoptions} defaultValue={{ label: "All Teachers", value: 0 }} />
                        </div>
                        <div className="col-sm-5"></div>
                        <div className="col-sm-4 text-right">
                            <Link to='/sch/surveytemplateone'><button className="modalGrayBtn cstmmbtnn mr-3" style={{minWidth: '120px'}}> Preview Survey </button></Link>
                            <button className="modalRedBtn cstmmbtnn mr-1" style={{minWidth: '90px'}}> View Result </button>
                        </div>
                    </div>
                    <div>
                        <div className="col-sm-12 bgclrblu">
                            <div className="dshbrd-dvv1 col-sm-12 row ml-0 mr-0">
                                <div className="col-sm-12">
                                    <div className="nwsrvdvdvd1">Survey Name - {surveyname}</div>
                                    <div className="nwsrvdvdvd2">{participantname} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {targetname}</div>
                                </div>
                                {/* <div className="col-sm-3 text-right">
                                    <input className="nwsrvdvdvi1" placeholder="Search Teacher..." type="text" />
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div id="mmysrvv">

                    <div className="cstm-mrgn cstmbracrdnn" id="accordion">
                            
                            <div>
                                <div className="panel box no-border mb-0">
                                    <div id="c_2020" className="in collapse show" style={{}}>
                                        <div className="box-body row m-0">
                                            <div className="table-responsive ht-auto">
                                                <table id="nwsrvytbblll" className="table brdr-none cstmtable2 v-middle p-0 m-0 box">
                                                    <thead>
                                                        <tr className="cstmsrtbthdbrdr">
                                                            <th className="pl-24px tblsccshdng">Teachers ({completedcount} / {surveydetails.length})</th>
                                                            <th className="tblsccshdng">Period</th>
                                                            <th className="tblsccshdng pl-0">Response Progress</th>
                                                            <th />
                                                        </tr>
                                                    </thead>
                                                    <tbody className="ht-cstmtbdysvy cstmsrtbtbdybrdr cstmmxhtbdytbb2">
                                                    {surveydetails.map(clist => (
                                                        <tr>
                                                            <td>
                                                                <div className="tbltddv1 txttrnsfrm-cpl text-truncate cstmwdtbldv crsr-pntr" onClick={()=>{fetchstaffdetails(clist.targetId); handleShow(); }}  title={clist.StaffName}> <img src="../Images/user_green.png" className="nwsrvdvdvdimg" /> {clist.StaffName} </div>
                                                            </td>
                                                            <td>
                                                                <span className="tbltddv3">{clist.Schedule}</span>
                                                            </td>
                                                            <td>
                                                                <div className="srvytblprgbrsvdv">
                                                                    <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                        <div className="progress-bar primary" style={{width: `${clist.CompletionPer}%`}}></div>
                                                                    </div>
                                                                    <div className="text-left tbltddv4" onClick={()=>{fetchschooldetails(clist.targetId); handleShow2(); }} >
                                                                        <span className="tblsvprgstxt">{clist.Status}</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-right">
                                                                <button className="modalGrayBtn cstmmbtnn" onClick={()=>{fetchstaffdetails(clist.targetId); handleShow(); }} >View</button>
                                                            </td>
                                                        </tr>
                                                        ))}
                                                        

                                                        
                                                        
                                                      
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
            <Modal.Header className="cstmmdlinfodv" closeButton>
            </Modal.Header>
            <Modal.Body className="cstmmdlinfodv2 srvycstmhtmdlbd">
                
            <div className="infomdvmdl1 col-sm-12 row m-0">
                    <div className="col-sm-2">
                        <img src="../Images/user_green.png" className="infomdvmdl1-img" alt="User Profile" />
                    </div>
                    <div className="col-sm-10">
                        <p className="infomdvmdl2">{staffname}</p>
                        <div className="infomdvmdl3 row m-0">
                            <div className="col-sm-4 p-0">
                                <i className="fa fa-user mr-7px"></i>
                                Teacher
                            </div>
                            <div className="infomdvmdl2dvdr col-sm-1 p-0 m-0">|</div>
                            <div className="col-sm-6 text-truncate p-0" title={staffemail}>
                                <i className="fa fa-envelope mr-7px"></i>
                                {staffemail}
                            </div>
                        </div>
                    </div>
                    
                </div>
                {staffdetails.map((staffs) => {
                    if(staffs.gradename != "All" && staffs.gradename != "-") {
                        return(
                            <div>
                                <div className="infomdvmdl3 col-sm-12 mt-4">
                                    <h3 className="infomdvmdl3-h3">{staffs.gradename}</h3>
                                    <div readOnly className="infomdvmdl3-txtara">{staffs.Subject} </div>
                                </div>                
                            </div>
                        );
                    }
                    else if(staffs.gradename == "-") {
                        return(
                            <div>
                                <div className="infomdvmdl3 col-sm-12 mt-4">
                                    <h3 className="infomdvmdl3-h3">No Class generated yet</h3>
                                    <div readOnly className="infomdvmdl3-txtara">No Subject generated yet </div>
                                </div>                
                            </div>
                        );
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


    </div>
}

// export default Details;
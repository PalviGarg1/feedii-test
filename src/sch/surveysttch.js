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


export const SurveyStudentToTeacherPage = () => {
    const [loader, showLoader, hideLoader] = useLoader();

    useEffect(() => {
        showLoader();
        $('#login').hide();
      }, []);


    const [surveyupcoming, setsurveyupcoming] = useState([]);
    const [surveycurrent, setsurveycurrent] = useState([]);
    const [surveysession, setsurveysession] = useState([]);
    const [session, setsessionval] = useState(""); 
    const dataFetchedRefteacher = useRef(false);
    const dataFetchedRef = useRef(false);
    const dataFetchedRefCurrent = useRef(false);
    const dataFetchedRefsession = useRef(false);
    const dataFetchedRefsessionfetch = useRef(false);
    var schoolcurrentid = 0;
    const dataFetchedRefsurvey = useRef(false);
    const dataFetchedRefclasses = useRef(false);
    const [surveyname, setsurveyname] = useState(""); 
    const [participantname, setparticipantname] = useState(""); 
    const [targetname, settargetname] = useState(""); 
    const [surveyclasses, setsurveyclasses] = useState([]);
    const [surveydetails, setsurveydetails] = useState([]);
    const [surveydetailsfilter, setsurveydetailsfilter] = useState([]);
    const [studentTeacher, setstudentteachers] = useState([]);
   
    const [uniqueclassesfilter, setuniqueclassesfilter] = useState([]);
    const [uniqueclasses, setuniqueclasses] = useState([]);

    const sessionstudentid = sessionStorage.getItem('studentidsession');
    const sessionpulseid = sessionStorage.getItem('pulseidsession');
    const sessionscholid = sessionStorage.getItem('schoolidsession');

    const [studentname, setstaffname] = useState(""); 
    const [studentemail, setstaffemail] = useState("");
    const [studentdetails, setStaffDetails] = useState([]);
    const [studentrollno, setstaffrollnum] = useState("");
    const [studentsubject, setstudentsubjects] = useState("");
    const [studentgrade, setstudentGrade] = useState("");

    React.useEffect(
        ()=> {      

            fetch('https://feedii-test-api.azurewebsites.net/api/admin/getAdminSurveyDetailSummary/'+ sessionpulseid + "-" + "Student" + "-" + "Teacher" + "-" + "All" + "-" + sessionscholid , {
            method: 'GET'
              }) .then((response) => response.json())
             .then((data) => {
            if (dataFetchedRefsurvey.current) return;
            dataFetchedRefsurvey.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
        
            setsurveydetails(data);
            setsurveydetailsfilter(data);
            
            if(data.length == 0) {}
            else {
                setsurveyname(data[0].Pulsename);
                setparticipantname(data[0].Participant);
                settargetname(data[0].Target);
            }
            
            hideLoader();
             $('#login').show();

        })
        .catch(error =>{
            console.log(error);
        });

        fetch('https://feedii-test-api.azurewebsites.net/api/admin/getclassesdata/'+ sessionscholid , {
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

      const batcheswithid = [];
       

      for (const [i, clas] of surveyclasses.entries()) {
       batcheswithid.push({ value: clas.batchId, label:  clas.Grade})
     }

     const [selectedclass, setselectedclass] = useState();

   

  
      const slctyearoptions = [
        { value: 'Current Session : Apr 2022 - Mar 2023', label: 'Current Session : Apr 2022 - Mar 2023' },
        { value: 'Previous Session : Apr 2021 - Mar 2022', label: 'Previous Session : Apr 2021 - Mar 2022' },
        { value: 'Previous Session : Apr 2020 - Mar 2021', label: 'Previous Session : Apr 2020 - Mar 2021' },
      ];

      const slctdrpdwnoptions = [
        { label: 'All Classes', value: 'All Classes'},
        { label: 'Class 6th - A', value: 'Class 6th - A'},
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

      var uniqueTags = [];
      
     // const [uniqueTagsval, setuniquetagsvlupdt] = useState([]);

      surveydetails.map(clist => {
        if (uniqueclasses.indexOf(clist.GradeName) === -1) {
            uniqueclasses.push(clist.GradeName)
                               
             }
             });

             surveydetails.map(clist => {
                if (uniqueclassesfilter.indexOf(clist.GradeName) === -1) {
                    uniqueclassesfilter.push(clist.GradeName)
                                       
                     }
                     });
     

      const handleChange1 = e => {
          setselectedclass(e.value);
          if(e.value == 0)
          {
              surveydetails.map(clist => {
                if (uniqueclassesfilter.indexOf(clist.GradeName) === -1) {
                      uniqueclassesfilter.push(clist.GradeName)                          
                  }
                });
                setsurveydetailsfilter(surveydetails)
          }
          else {
              var output =  surveydetails.filter(details => details.GradeName == e.label);
              var outputclass = uniqueclasses.filter(det=>det == e.label);
             
              setuniqueclassesfilter(outputclass);
              setsurveydetailsfilter(output)
          }
        }

        const fetchstaffdetails = (studentid) => {
           
            fetch('https://feedii-test-api.azurewebsites.net/api/admin/getAdminSurveyTargetSummary/' + sessionpulseid + "-" + "Student" + "-" +  "Teacher" + "-" + studentid , {   //studentid-pulseid
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

        const fetchsurveyid = (surveyid) => {
            sessionStorage.setItem("surveyidsession",surveyid);
            
          }

        const fetchstudentdetails = (studentida) => {
           
            fetch('https://feedii-test-api.azurewebsites.net/api/Admin/getstudentSubject/' + studentida, {
                method: 'GET'
              }) .then((response) => response.json())
              .then((data) => {    
                
                if(data.length==0)
                {
                    setstaffname("Name")
                    setstaffemail("Email")
                    setstaffrollnum("RollNo")
                    setstudentsubjects("Subject Name")
                    setstudentGrade("Grade")
                    setStaffDetails([data])
                }
                else{
                    setstaffname(data[0].name)
                    setstaffemail(data[0].email)
                    setstaffrollnum(data[0].rollNo)
                    setstudentsubjects(data[0].Subjectname)
                    setstudentGrade(data[0].gradeName)
                    setStaffDetails(data)
                }
                

              })
              .catch(error =>{
                  console.log(error);
              });     
        } 

        if(uniqueclassesfilter.length == 0) {
            $('#errdv1').show();
            $('.tbldtaa1').hide();
        }
        else {
            $('.tbldtaa1').show();
            $('#errdv1').hide();
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
                    <div id="errdv1" className="col-sm-12">
                        <div className="nodtadv1 nobrdrnobg">
                            <div>
                                <img className="nodtadv1img" src="https://res.cloudinary.com/infoi/image/upload/q_auto:best/v1634879425/AMA%20Icons/sidebar-empty-state-1_uwimwd.svg" width="150" alt="Error Image" />
                                <div className="nodtadv1txt">No Data Found</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 row tab-pane cstmtab-pane animate fadeIn text-muted active tbldtaa1" id="tab1">
                    <div className="col-sm-12 col-md-12" id="survytbl">
                    <div className="col-sm-12 row ml-0 mr-0 mb-4 p-0">
                        <div className="col-sm-3">
                            <Select id="slctdpdwnnfltr" options={batcheswithid} defaultValue={{ label: "All Classes", value: 0 }} value={batcheswithid.find(obj => obj.value === selectedclass)} onChange={handleChange1} />
                            {/* <select id="slctsrvydvfltr">
                                <option value="0">-- Select All --</option>
                                {surveyclasses.map((sury)=>{
                                    return(
                                        <option value={sury.Grade}>{sury.Grade}</option>
                                    )
                                })}
                                
                            </select> */}
                        </div>

                        {/*{selectedclass} && */<div style={{display: 'none'}}>
                            <div id="slctcdclasval">{selectedclass}</div>
                        </div>}

                        <div className="col-sm-5"></div>
                        <div className="col-sm-4 text-right">
                            <Link to='/sch/surveytemplateone'><button className="modalGrayBtn cstmmbtnn mr-3" style={{minWidth: '120px'}} > Preview Survey </button></Link>
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
                                    <input className="nwsrvdvdvi1" placeholder="Search Student..." type="text" />
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
                                        {uniqueclassesfilter.map((classes) => {
                                            
                                            const rows = surveydetailsfilter.filter(survy => survy.GradeName === classes).map(survy => (
                                                <tr>
                                                    <td>
                                                            <div className="tbltddv1 txttrnsfrm-cpl text-truncate cstmwdtbldv crsr-pntr" onClick={()=>{fetchstudentdetails(survy.targetId); handleShow(); }}  title={survy.StaffName}> <img src="../Images/user_green.png" className="nwsrvdvdvdimg" /> {survy.StaffName} </div>
                                                        </td>
                                                        <td>
                                                            <span className="tbltddv3">{survy.Schedule}</span>
                                                        </td>
                                                        <td>
                                                            <div className="srvytblprgbrsvdv">
                                                                <div className="progress prgrs-wd-cstm my-2 ml-2">
                                                                    <div className="progress-bar primary" style={{width: `${survy.CompletionPer}%`}}></div>
                                                                </div>
                                                                <div className="text-left tbltddv4" onClick={()=>{fetchstaffdetails(survy.targetId);  handleShow2(); }} >
                                                                    <span className="tblsvprgstxt">{survy.Status}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-right">
                                                            <button className="modalGrayBtn cstmmbtnn" onClick={()=>{fetchstudentdetails(survy.targetId); handleShow(); }} >View</button>
                                                        </td>
                                                </tr>
                                                ));



                                                if (rows.length > 0) {
                                                    return (
                                                    <table id="nwsrvytbblll" className="table brdr-none cstmtable2 v-middle p-0 m-0 box">
                                                        <thead>
                                                        <tr className="bglytbluclr cstmsrtbthdbrdr">
                                                            <th className="pl-24px tblsccshdng">{classes} ({surveydetailsfilter.find(s=>s.GradeName==classes).overallcompletedcount} / {surveydetails.find(s=>s.GradeName==classes).overallcount} )</th>
                                                            <th className="tblsccshdng">Period</th>
                                                            <th className="tblsccshdng pl-0">Response Progress</th>
                                                            <th />
                                                        </tr>
                                                        </thead>
                                                        <tbody className="ht-cstmtbdysvy cstmsrtbtbdybrdr cstmmxhtbdytbb2">{rows}</tbody>
                                                    </table>
                                                    );
                                                }

                                                return null;
                                                })}


                                                       
                                                      
                                                  
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
            <Modal.Body className="cstmmdlinfodv2 cstmmdlinfodv2cstmm">
                
            <div className="infomdvmdl1 col-sm-12 row m-0">
                    <div className="col-sm-2">
                        <img src="../Images/user_green.png" className="infomdvmdl1-img" alt="User Profile" />
                    </div>
                    <div className="col-sm-10">
                        <p className="infomdvmdl2">{studentname}</p>
                        <div className="infomdvmdl3">
                            <span>
                                <i className="fa fa-user mr-7px"></i>
                                Student
                            </span>
                            <span className="infomdvmdl2dvdr">|</span>
                            <span title={studentemail}>
                                <i className="fa fa-envelope mr-7px"></i>
                               {studentemail}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="infomdvmdl3 col-sm-12 mt-10px">
                    <h3 className="infomdvmdl3-h3">{studentgrade}</h3>
                    <div readOnly className="infomdvmdl3-txtara"> {studentsubject}</div>
                </div>
            </Modal.Body>
        </Modal>



        <Modal show={show2} onHide={handleClose2} className="cstmmtmodal cstmlmodal2" >
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
                            <span className="text-truncate mdldvdv12d">{teacher.targetName}</span>
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
                            <span className="text-truncate mdldvdv12d cstmwdmdl" title={teacher.targetName}>{teacher.StaffName}</span>
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


    </div>
}

// export default Details;
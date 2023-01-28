import React, { useState, useRef, useEffect } from "react";
import $ from 'jquery';
import '../Content/Content/survery-css.css';
import { SecondHeaderStuSrvysdashboard } from '../secondheaderstusrvydashboard';
import '../AllJs/dashboard-staff.js';
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from 'react-bootstrap/Dropdown';
import Select from 'react-select';
import useLoader from "../useLoader";
import { BrowserRouter, Route, Routes, NavLink, Link, json } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export const SurveyRunStudentPage = () => {
    const [loader, showLoader, hideLoader] = useLoader();

    useEffect(() => {
        showLoader();
        $('#login').hide();
      }, []);

    const [showModal2, setShowModal2] = useState(false);
    const handleCloseModal2 = () => setShowModal2(false);
    const handleShowModal2 = () => {
        setShowModal2(true);
    }

    const [showModal3, setShowModal3] = useState(false);
    const handleCloseModal3 = () => setShowModal3(false);
    const handleShowModal3 = () => {
        setlistfinaltosave(allvaluesdatalist)
        setShowModal3(true);
        
    }

    const dataFetchedRefsurvey = useRef(false);
    const dataFetchedRefsurveyquestion = useRef(false);
    const [surveyquestionlist, setsurveyquestionlist] = useState([]);
    const [surveyquestiontopiclist, setsurveyquestiontopiclist] = useState([]);
    const [teachername, setteachername] = useState("");
    const [subjectname, setsubjectname] = useState("");
    const [surveyname, setsurveyname] = useState("");
    const [studentmasterid, setstudentmasterid] = useState("");
    const [teachermasterid, setteachermasterid] = useState("");
    const [pulseid, setPulseid] = useState("");
   // const [listfinal,setlistfinal] = useState([]);
   const [listfinaltosave,setlistfinaltosave] = useState([]);
   const [updatedlisttosave,setupdatedlisttosave] = useState([]);
    
   const sessionpulseid = sessionStorage.getItem('pulseidsession');
   const sessionstudentid = sessionStorage.getItem('studentidsession');
   const ifteacherorschoolsession = sessionStorage.getItem('ifteacherorschool');
   const sessiontargetteacherid = sessionStorage.getItem('sessiontargetteacherid');
   const [participantname, setParticipantName] = useState("");
    const [targetname, setTargetName] = useState("");
    const [showSubmit, setShowSubmit] = useState(false);
   const [tagnameList, setTagnameList] = useState([]);
   const [allvaluesdatalist, setallvaluesdatalist] = useState([]);

    React.useEffect(
        ()=> {
       
                //staffid
            fetch('https://feedii-test-api.azurewebsites.net/api/Student/getSurveyTopicandQuestiondetail/' + sessionpulseid , {         //pulseid
            method: 'GET'
            }) .then((response) => response.json())
          .then((data) => {
            if (dataFetchedRefsurveyquestion.current) return;
            dataFetchedRefsurveyquestion.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
            setsurveyquestiontopiclist(data);

            hideLoader();
            $('#login').show();
          })
           
          if (ifteacherorschoolsession == "teacher")
          {
           
            fetch('https://feedii-test-api.azurewebsites.net/api/Student/getStaffStudentSurveyquestion/' + sessionstudentid + "-"+ sessiontargetteacherid + "-" + sessionpulseid ,  {        //studentid-staffid-pulseid
            method: 'GET'
            }) .then((response) => response.json())
          .then((data) => {
            if (dataFetchedRefsurvey.current) return;
            dataFetchedRefsurvey.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
            setteachername(data[0].Teachername);
            setsubjectname(data[0].subjectname);
            setsurveyname(data[0].pulsename);
            setParticipantName(data[0].participant);
            setTargetName(data[0].target);
            setstudentmasterid(data[0].Studentmasterid);
            setteachermasterid(data[0].StaffmasterId);
            setPulseid(data[0].pulseId);
            setsurveyquestionlist(data)
          
            
          })
        }
        else if(ifteacherorschoolsession == "school")
         {
          

            fetch('https://feedii-test-api.azurewebsites.net/api/Student/getSchoolStudentSurveyquestion/' + sessionstudentid + "-" + sessionpulseid ,  {        //studentid-staffid-pulseid
            method: 'GET'
            }) .then((response) => response.json())
          .then((data) => {
            if (dataFetchedRefsurvey.current) return;
            dataFetchedRefsurvey.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
            setteachername(data[0].Schoolname);
           
            setsurveyname(data[0].pulsename);
            setParticipantName(data[0].participant);
            setTargetName(data[0].target);
            setstudentmasterid(data[0].Studentmasterid);
            setteachermasterid(data[0].SchoolmasterId);
            setPulseid(data[0].pulseId);
            setsurveyquestionlist(data)
          
            
          })
        }
          
        const uniquequestions = [];
        surveyquestionlist.map(clist => {
            if (uniquequestions.indexOf(clist.question) === -1) {
                uniquequestions.push(clist.question);
            }
        });

         
          if (tagnameList.length === uniquequestions.length) {
            setShowSubmit(true);
        } else {
            setShowSubmit(false);
        }

        
        })

        const uniqueTags = [];
        surveyquestionlist.map(clist => {
            if (uniqueTags.indexOf(clist.topic) === -1) {
                uniqueTags.push(clist.topic);
            }
        });

       
       
        const allvaluescommentdatalist = [];
        const savedataoptions = [];
        

        const srvyoptnvl = (queidd, optnval) => {
                       
            const found = allvaluesdatalist.findIndex(element => element.questionid == queidd);
            if(found == -1)
            {             
                setallvaluesdatalist([...allvaluesdatalist,({ questionid: queidd, optionid: optnval})])
            }
            else{
                
                allvaluesdatalist.splice(found, 1);
                setallvaluesdatalist([...allvaluesdatalist,({ questionid: queidd, optionid: optnval})])
            }

            const found3=tagnameList.findIndex(element => element == queidd);
            if(found3 == -1)
            {                          
                setTagnameList([...tagnameList, queidd])
            }
          
        }
  

        const saveapi = () => {    
       
        listfinaltosave.forEach(function (arrayItem) {
            var x = arrayItem.optionid ;
            
            savedataoptions.push({ pulseId : pulseid, participantId : studentmasterid,targetId:teachermasterid,surveyOptionId :arrayItem.optionid,surveyquestionId :arrayItem.questionid,comment :""})
           
        });
        
        
        const ele = document.getElementsByTagName('textarea');
        for (var i = 0; i <= ele.length - 1; i++) {
          if (ele[i].value != '')
              {
                allvaluescommentdatalist.push({ questionid: ele[i].id, comment: ele[i].value})
              }
          else {
            allvaluescommentdatalist.push({ questionid: ele[i].id, comment: ele[i].value})
            
          }
        }
       
        
        allvaluescommentdatalist.forEach(function (item) {
            var y=item.questionid;
  

            for (var i in savedataoptions) {
                if (savedataoptions[i].surveyquestionId == item.questionid) {
                    savedataoptions[i].comment = item.comment;
                //Stop this loop, we found it!
                }
            }
            
         })
      
   
        fetch('https://feedii-test-api.azurewebsites.net/api/student/saveallsurveyResponse', {
                    method: 'POST', 
                    headers: {
                        'Accept': 'application/json',  
                        'Content-Type': 'application/json',  
                        'Access-Control-Allow-Origin': '*',  
                        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',  
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(savedataoptions)
                    }).then((data) => {
                       
                        window.location.href = "/stu/survey";
                        console.log("test data - " + data);
                    })

      
    }

    const gobck = () => {
        window.history.go(-1); 
        return false;
    }
        
    return <div>
        <SecondHeaderStuSrvysdashboard />
        {loader}
        <div className="be-wrapper be-login innerwrapper mt-4p" id="login">
            <div className="padding mbvwpd">
                <div className="row tab-content mb-3">
                    <div className="col-sm-12 row tab-pane animate fadeIn text-muted active" id="tab1">
                        <div className="col-sm-12 col-md-12" id="survytbl">
                            <div>
                                <div className="col-sm-12">
                                    <div className="col-sm-12 mb-5">
                                        <div onClick={gobck} className="srvylnkbtnnn">
                                            <i className="fa fa-chevron-left mr-2"></i>
                                            <span>All Surveys</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 row m-0">
                                    <div className="col-sm-2">
                                        <div>
                                            <img src="../Images/usergreen.png" className="imgbrdrnwsrypg" width={100} alt="User Image" />
                                        </div>
                                    </div>
                                    <div className="col-sm-7 pl-0">
                                        <div className="mt-15px">
                                            <div className="usrnmsrvypgdnw">{teachername}</div>
                                           
                                            <div className="usrgrdsrvypgdnw">{subjectname}</div>
                                        </div>
                                    </div>
                                    {/* <div className="col-sm-3 text-right">
                                        <div className="mt-15">
                                            <Link to="">
                                                <button className="modalGrayBtn btn1srvynwpgdsgn cstmmbtnn" onClick={() => { handleShowModal2();}}>Finish Later</button>
                                            </Link>
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div>
                                <div className="col-sm-12">
                                    <div className="mt-5">
                                        <div>
                                            <div className="col-sm-12 bgclrblu">
                                                <div className="dshbrd-dvv1 pl-0 pr-0">
                                                    <div className="col-sm-12">
                                                        <h4 className="text-truncate srvynwdvh4">{surveyname}</h4>
                                                        <div className="tbltddv2 col-sm-12 mt-0">{participantname} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {targetname} </div>
                                                    </div>
                                                </div>
                                                <div>
                                                {uniqueTags.map((topics)=>(
                             
                                                    <div>
                                                        <div className="dshbrd-dvv1 pl-0 pr-0 hdngbgcstm">
                                                            <div className="col-sm-12">
                                                                <h4 className="text-truncate ssrvydvhdng2 srvynwdvh4">{topics}</h4>
                                                            </div>
                                                        </div>
                                                        {surveyquestiontopiclist.map((questionans)=>{
                                                        
                                                            if(topics == questionans.Topic) {
                                                                
                                                             return(  <div className="dshbrd-dvv1 pl-0 pr-0 pt-0">
                                                            <div className="col-sm-12 brdr-tpp">

                                                                
                                                                    <div className="col-sm-12 mt-3 pl-4">
                                                                    <h5 className="srvynwdvh5">{questionans.sno}. {questionans.question} </h5>
                                                                    
                                                                    <div>
                                                                        <div>
                                                                            <div className="srvyndv1">
                                                                               
                                                                            {surveyquestionlist.map((que)=>{
                                                        
                                                                             if(questionans.question == que.question) {
                                                                             return( 
                                                                                <div className="srvyndv2">
                                                                                    <div className="srvyndv3">
                                                                                        <div className="srvyndv4">
                                                                                            <label className="srvyndv5">
                                                                                                <input className="srvyndv6" type="radio" value={que.surveyoptionId} id={que.surveyquestionId} height="100%" name={que.surveyquestionId} onClick={() => { srvyoptnvl(que.surveyquestionId, que.surveyoptionId);}} />
                                                                                                <div className="srvyndv7">
                                                                                                    <div>
                                                                                                        <div className="srvyndv8">{que.weightage}</div>
                                                                                                        <div className="srvyndv9">{que.options}</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )}})}                                                                                               
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="srvyndv10 mt-4">
                                                                            <div className="srvyndv11">
                                                                                <textarea className="srvyndv12 srvycmnttxt" rows="4" id={questionans.commentId} placeholder="Add Comment" ></textarea>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                   
                                                            </div>
                                                            
                                                           
                                                        </div>)
                                                            }
                                                            
                                                            })}
                                                    </div>
                                                    ))}
                                                    <div className="dshbrd-dvv1 pl-0 pr-0 pt-4 pb-4">
                                                        <div className="text-right">
                                                            <div>
                                                                {/* <button className="modalGrayBtn mnwd-13p mr-3 cstmmbtnn" onClick={() => { handleShowModal2();}}>Finish Later</button> */}
                                                                { showSubmit ? <button className="modalRedBtn mnwd-13p mr-4 cstmmbtnn" onClick={() => { handleShowModal3();}}>Submit Survey</button> : <button className="modalRedBtn mnwd-13p mr-4 cstmmbtnn dsbbtnnclr" disabled="true">Submit Survey</button> }
                                                            </div>
                                                        </div>
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


        <Modal show={showModal2} onHide={handleCloseModal2} className="cstmmtmodal" >
            <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to finish later?</p>
            </Modal.Body>
            <Modal.Footer className="brdr-tp">
            <Button variant="primary modalGrayBtn" onClick={handleCloseModal2}>
                Close
            </Button>
            <Button variant="secondary modalRedBtn" onClick={handleCloseModal2}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showModal3} onHide={handleCloseModal3} className="cstmmtmodal" >
            <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to submit?</p>
            </Modal.Body>
            <Modal.Footer className="brdr-tp">
            <Button variant="primary modalGrayBtn" onClick={handleCloseModal3}>
                Close
            </Button>
            <Button variant="secondary modalRedBtn" onClick={() => { saveapi();}}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>

        
    </div>
}

// export default Details;
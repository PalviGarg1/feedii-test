import React, { useState, useRef, useEffect } from "react";
import $ from 'jquery';
import '../Content/Content/survery-css.css';
import { HeaderTchrrrdashboardSrvy } from '../headertchrdashboardsrvy';
import '../AllJs/dashboard-staff.js';
import useLoader from "../useLoader";
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';


export const SurveyTemplateOneTchrPage = () => {
    //const [loader, showLoader, hideLoader] = useLoader();

    // useEffect(() => {
    //     showLoader();
    //     $('#login').hide();
    //   }, []);

    //   hideLoader();
    //   $('#login').show();
    const [loader, showLoader, hideLoader] = useLoader();

    useEffect(() => {
        showLoader();
        $('#login').hide();
      }, []);

    const dataFetchedRefsurvey = useRef(false);
    const dataFetchedRefsurveyquestion = useRef(false);
    const [surveyquestionlist, setsurveyquestionlist] = useState([]);
    const [surveyquestiontopiclist, setsurveyquestiontopiclist] = useState([]);
    const [teachername, setteachername] = useState("");
    const [subjectname, setsubjectname] = useState("");
    const [surveyname, setsurveyname] = useState("");
    const [participantname, setParticipantName] = useState("");
    const [targetName, setTargetName] = useState("");
    const [studentmasterid, setstudentmasterid] = useState("");
    const [teachermasterid, setteachermasterid] = useState("");
    const [pulseid, setPulseid] = useState("");
    const sessionscholid = sessionStorage.getItem('schoolidsession');
    const sessionsurveyid = sessionStorage.getItem('surveyidsession');
    const sessionpulseid = sessionStorage.getItem('pulseidsession');

    React.useEffect(
        ()=> {
       
                //staffid
              // alert(sessionpulseid);
                fetch('https://feedii-test-api.azurewebsites.net/api/admin/getSurveyTopic/'+ sessionsurveyid, {
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
           
            fetch('https://feedii-test-api.azurewebsites.net/api/admin/getSurveyoptionTemplatePulse/' + sessionpulseid ,  {        //studentid-staffid-pulseid
            method: 'GET'
            }) .then((response) => response.json())
          .then((data) => {
            if (dataFetchedRefsurvey.current) return;
            dataFetchedRefsurvey.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
            setteachername(data[0].Teachername);
            setsubjectname(data[0].subjectname);
            setsurveyname(data[0].Pulsename);
            setParticipantName(data[0].participantName);
            setTargetName(data[0].targetName);
            setstudentmasterid(data[0].Studentmasterid);
            setteachermasterid(data[0].StaffmasterId);
            setPulseid(data[0].pulseId);
            setsurveyquestionlist(data);

            hideLoader();
            $('#login').show();
          
            
          })
        
        })

        const uniqueTags = [];
        surveyquestionlist.map(clist => {
            if (uniqueTags.indexOf(clist.Topic) === -1) {
                uniqueTags.push(clist.Topic);
            }
        });

        const uniquequestions = [];
        surveyquestionlist.map(clist => {
            if (uniquequestions.indexOf(clist.question) === -1) {
                uniquequestions.push(clist.question);
            }
        });

    const gobck = () => {
        window.history.go(-1); 
        return false;
    }

    return <div>
        <HeaderTchrrrdashboardSrvy />
        {/* {loader} */}
        <div className="be-wrapper be-login innerwrapper" id="login">
            <div className="padding mbvwpd">
                <div className="row tab-content mb-3">
                    <div className="col-sm-12 row tab-pane animate fadeIn text-muted active" id="tab1">
                        <div className="col-sm-12 col-md-12" id="survytbl">
                            <div>
                                <div className="col-sm-12">
                                    <div className="col-sm-12 mb-5">
                                        <div  onClick={gobck} className="srvylnkbtnnn">
                                            <i className="fa fa-chevron-left mr-2"></i>
                                            <span>All Surveys</span>
                                        </div>
                                    </div>
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
                                                        <div className="col-sm-12">
                                                            <div className="tbltddv2 cstmwdtbldv">{participantname} <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> {targetName}</div>
                                                        </div>
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
                                                            
                                                  return(
                                                        <div className="dshbrd-dvv1 pl-0 pr-0 pt-0">
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
                                                                    {(function() {
                                                                        if(questionans.comment == null) {
                                                                            return(
                                                                                <div className="srvyndv10 mt-4">
                                                                                    <div className="srvyndv11">
                                                                                        <textarea className="srvyndv12" id="usrssrvycmnts" name="usrssrvycmnts" rows="4" readOnly>No comment</textarea>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                        else {
                                                                            return (
                                                                                <div className="srvyndv10 mt-4">
                                                                                    <div className="srvyndv11">
                                                                                        <textarea className="srvyndv12" id="usrssrvycmnts" name="usrssrvycmnts" rows="4" readOnly>{questionans.comment}</textarea>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                        })()
                                                                    }
                                                                    </div>
                                                            </div>
                                                            </div>
                                                            
                                                     
                                                        </div>
                                                          )
                                                        }
                                                                
                                                    })}
                                                    </div>
                                                    ))}
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

        
    </div>
}

// export default Details;
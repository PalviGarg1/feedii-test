import React, { useState, useRef, useEffect } from "react";
import $ from 'jquery';
// import { useForm } from 'react-hook-form';
import { CheckboxGroup, AllCheckerCheckbox, Checkbox } from "@createnl/grouped-checkboxes";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../Content/Content/dashboard.css';
import '../Content/Content/tblcss.css';
import { SecondHeaderTchrrrdashboardforclass } from '../secondheadertchrdashboardforclass';
import '../AllJs/dashboard-staff.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';
import { PieChart, Pie} from 'recharts';
import Dropdown from 'react-bootstrap/Dropdown';
import useLoader from "../useLoader";
import Select from 'react-select';


export const UsertchClass = () => {
    const [loader, showLoader, hideLoader] = useLoader();
    
    useEffect(() => {
        showLoader();
        $('#login').hide();
    }, []);

     const fetchsesntchbchid = sessionStorage.getItem('setsesntchbchid');
     var staffidsession = sessionStorage.getItem("staffidsession");

    //var staffidsession = 13;
   // const fetchsesntchbchid = 1373;

    const dataFetchedRefsubject = useRef(false);
    const dataFetchedRefreject = useRef(false);
    const dataFetchedRefpending = useRef(false);
    const dataFetchedRefapprove = useRef(false);
    const dataFetchedupdate = useRef(false);
    const [sectionname, setsectionname] = useState(""); 
    const [gradename, setgradename] = useState("");
    const [url, seturl] = useState(""); 
    const [subjectlist, setsubjectslist] = useState([]);
    const [rejectlist, setrejectlist] = useState([]);
    const [pendinglist, setpendinglist] = useState([]);
    const [joinedlist, setjoinedlist] = useState([]);
    const [actionstatus, setactionstatus] = useState(""); 

    const [studentpendinglist, setstudentpendinglist] = useState([]);
    const [studentjoinedlist, setstudentjoinedlist] = useState([]);
    const [studentrejectlist, setstudentrejectlist] = useState([]);

    const [studentname, setstaffname] = useState(""); 
    const [studentemail, setstaffemail] = useState("");
    const [studentdetails, setStaffDetails] = useState([]);
    const [studentrollno, setstaffrollnum] = useState("");
    const [studentsubject, setstudentsubjects] = useState("");
    const [studentgrade, setstudentGrade] = useState("");
    const [settingsubject, setsetting] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    

    React.useEffect(
        ()=> {
       
            
       
            fetch('https://feedii-test-api.azurewebsites.net/api/Staff/getStaffClassSubject/' + staffidsession + "-" + fetchsesntchbchid, {
            method: 'GET'
            }) .then((response) => response.json())
          .then((data) => {
            if (dataFetchedRefsubject.current) return;
            dataFetchedRefsubject.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
            if (data.length != 0)
            {
            var grdnm = data[0].Grade;    
            var grdnmnum = grdnm.replace(/\D/g, "");
            setgradename(grdnmnum)
            setsectionname(data[0].section)
            seturl(data[0].url)
            }
    
           setsubjectslist(data);
           hideLoader();
           $('#login').show();
            
          })
          .catch(error =>{
            console.log(error);
        });


          fetch('https://feedii-test-api.azurewebsites.net/api/Staff/getStaffStudentRejected/' + staffidsession + "-"+ 0 +"-"+ fetchsesntchbchid, {
            method: 'GET'
          }) .then((response) => response.json())
          .then((data) => {
            if (dataFetchedRefreject.current) return;
            dataFetchedRefreject.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
           
            setrejectlist(data);
            hideLoader();
            $('#login').show();

          })
          .catch(error =>{
              console.log(error);
          });



          fetch('https://feedii-test-api.azurewebsites.net/api/Staff/getStudentdetailinTeacherPendingApproval/' + staffidsession + "-"+ 0 +"-"+ fetchsesntchbchid, {
            method: 'GET'
          }) .then((response) => response.json())
          .then((data) => {
            if (dataFetchedRefpending.current) return;
            dataFetchedRefpending.current = true;        
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);      
            setpendinglist(data);
            hideLoader();
            $('#login').show();

          })
          .catch(error =>{
              console.log(error);
          });

          fetch('https://feedii-test-api.azurewebsites.net/api/Staff/getStudentdetailinTeacherApproved/' + staffidsession + "-"+ 0 +"-"+ fetchsesntchbchid, {
            method: 'GET'
          }) .then((response) => response.json())
          .then((data) => {
            if (dataFetchedRefapprove.current) return;
            dataFetchedRefapprove.current = true;       
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);       
            setjoinedlist(data);
            //setsetting(data[0].Setting)
            setIsChecked(JSON.parse(data[0].Setting));
            
            hideLoader();
            $('#login').show();

          })
          .catch(error =>{
              console.log(error);
          });

         

        },[])

       


const fetchlistbysubject = (subjectid) => {
    var opnvl = $('#selectsubjects').val();
    //alert(opnvl);

    fetch('https://feedii-test-api.azurewebsites.net/api/Staff/getStaffStudentRejected/' + staffidsession + "-"+ opnvl +"-"+ fetchsesntchbchid, {
        method: 'GET'
      }) .then((response) => response.json())
      .then((data) => {
        if (dataFetchedRefreject.current) return;
        dataFetchedRefreject.current = true;
        
        var objj = JSON.stringify(data);
        var parse = JSON.parse(objj);
       
        setrejectlist(data)

      })
      .catch(error =>{
          console.log(error);
      });



      fetch('https://feedii-test-api.azurewebsites.net/api/Staff/getStudentdetailinTeacherPendingApproval/' + staffidsession + "-"+ opnvl +"-"+ fetchsesntchbchid, {
        method: 'GET'
      }) .then((response) => response.json())
      .then((data) => {
        if (dataFetchedRefpending.current) return;
        dataFetchedRefpending.current = true;
        
        var objj = JSON.stringify(data);
        var parse = JSON.parse(objj);
       
        setpendinglist(data)

      })
      .catch(error =>{
          console.log(error);
      });

      fetch('https://feedii-test-api.azurewebsites.net/api/Staff/getStudentdetailinTeacherApproved/' + staffidsession + "-"+ opnvl +"-"+ fetchsesntchbchid, {
        method: 'GET'
      }) .then((response) => response.json())
      .then((data) => {
        if (dataFetchedRefapprove.current) return;
        dataFetchedRefapprove.current = true;
        
        var objj = JSON.stringify(data);
        var parse = JSON.parse(objj);
        
       
        setjoinedlist(data)

      })
      .catch(error =>{
          console.log(error);
      });
      
}


       
        const fetchstudentdetails = (studentida) => {  
            //alert(studentida)       
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


         const updatesettingstatus = (valuetoupdate) => {  
                   
            fetch('https://feedii-test-api.azurewebsites.net/api/Staff/Update_SettingData', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({ 
                type   : "Staff",
                settingname  : "issubjectchecked",
                value  : valuetoupdate,
                lastUpdatedBy  : staffidsession,
                
                })
            }).then((data) => {        
               // window.location.href = "/tch/settings";
                //console.log("test data - " + data);
            })
        }

                    

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    

    const handleShow = () =>{
        setShow(true);
        updatestatusleftchange("Rejected")
        setactionstatus("Rejected");
    }

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => {
        setShow4(true);
        updatestatusrejectchange("Approved")
        setactionstatus("Approved");
    }

    const [show5, setShow5] = useState(false);
    const handleClose5 = () => setShow5(false);
    const handleShow5 = () =>{
        setShow5(true);
        updatestatuspendingchange("Rejected")
        setactionstatus("Rejected");
       
    }

    const [show6, setShow6] = useState(false);
    const handleClose6 = () => setShow6(false);
    const handleShow6 = () => {
        setShow6(true);
        updatestatuspendingchange("Approved")
        setactionstatus("Approved");
       
    }

    const [show7, setShow7] = useState(false);
    const handleClose7 = () => setShow7(false);
    const handleShow7 = () => setShow7(true);

    const [show8, setShow8] = useState(false);
    const handleClose8 = () => setShow8(false);
    const handleShow8 = () => setShow8(true);

    const [show9, setShow9] = useState(false);
    const handleClose9 = () => setShow9(false);
    const handleShow9 = () => {
        setShow9(true);
        updatestatusleftchange("Approved")
        setactionstatus("Approved");

    }
   

    const allstff222 = () => {
        $('#alstf222').addClass('active');
        $('#pendgaprvl222').removeClass('active');
        $('#stfinvtd222').removeClass('active');
        $('#stfrjct222').removeClass('active');

        $('#alstfff222').show();
        $('#psndaprvlstfff222').hide();
        $('#invtdstfff222').hide();
        $('#rjctstfff222').hide();
    }

    const pendingaproval222 = () => {
        $('#pendgaprvl222').addClass('active');
        $('#alstf222').removeClass('active');
        $('#stfinvtd222').removeClass('active');
        $('#stfrjct222').removeClass('active');

        $('#alstfff222').hide();
        $('#psndaprvlstfff222').show();
        $('#invtdstfff222').hide();
        $('#rjctstfff222').hide();        
    }

    const staffinvtd222 = () => {
        $('#stfinvtd222').addClass('active');
        $('#pendgaprvl222').removeClass('active');
        $('#alstf222').removeClass('active');
        $('#stfrjct222').removeClass('active');

        $('#alstfff222').hide();
        $('#psndaprvlstfff222').hide();
        $('#invtdstfff222').show();
        $('#rjctstfff222').hide();
        
    }

    const stffreject222 = () => {
        $('#stfrjct222').addClass('active');
        $('#pendgaprvl222').removeClass('active');
        $('#stfinvtd222').removeClass('active');
        $('#alstf222').removeClass('active');

        $('#alstfff222').hide();
        $('#psndaprvlstfff222').hide();
        $('#invtdstfff222').hide();
        $('#rjctstfff222').show();
        
    }
   

    const [onChangee222, setOnChangee222] = React.useState({});
    const [showOnChangee222, setShowOnChangee222] = React.useState(true);

    const chckerslctallbx222 = () => {

        if($('#tblcstslctallstff1222').is(":checked")) {
            $('#actnstff1222').removeClass('dis');
        } else {
            $('#actnstff1222').addClass('dis');
        }
    }

    const chckerslctbx222 = () => {

        if($('.chckbxstffpg222').is(":checked")) {
            $('#actnstff1222').removeClass('dis');
        } else {
            $('#actnstff1222').addClass('dis');
        }
    }

    const chckerslctallbx2222 = () => {

        if($('#tblcstslctallstff2222').is(":checked")) {
            $('#actnstff2222').removeClass('dis');
        } else {
            $('#actnstff2222').addClass('dis');
        }
    }

    const chckerslctbx2222 = () => {

        if($('.chckbxstffpg2222').is(":checked")) {
            $('#actnstff2222').removeClass('dis');
        } else {
            $('#actnstff2222').addClass('dis');
        }
    }

    const chckerslctallbx3222 = () => {

        if($('#tblcstslctallstff3222').is(":checked")) {
            $('#actnstff3222').removeClass('dis');
        } else {
            $('#actnstff3222').addClass('dis');
        }
    }

    const chckerslctbx3222 = () => {

        if($('.chckbxstffpg3222').is(":checked")) {
            $('#actnstff3222').removeClass('dis');
        } else {
            $('#actnstff3222').addClass('dis');
        }
    }

    const chckerslctallbx4222 = () => {

        if($('#tblcstslctallstff4222').is(":checked")) {
            $('#actnstff4222').removeClass('dis');
        } else {
            $('#actnstff4222').addClass('dis');
        }
    }

    const chckerslctbx4222 = () => {

        if($('.chckbxstffpg4222').is(":checked")) {
            $('#actnstff4222').removeClass('dis');
        } else {
            $('#actnstff4222').addClass('dis');
        }
    }

      const data01 = [
        {
          "name": "Group A",
          "value": 2400
        },
        {
          "name": "Group B",
          "value": 4567
        },
        {
          "name": "Group C",
          "value": 1398
        },
        {
          "name": "Group D",
          "value": 9800
        },
        {
          "name": "Group E",
          "value": 3908
        },
        {
          "name": "Group F",
          "value": 4800
        }
    ];

    
    
    

    const functionjoinedappchange = (e,action) => {
    
        const value = e.target.value;
       
        var staffaction=studentjoinedlist;
        var indexs = staffaction.findIndex(a => a.studentId === value);
       
        if(e.target.checked)
        {           
            if (indexs === -1) {
                staffaction.push({"studentId":value,"action" : action, "staffid" : staffidsession,"batchId" : fetchsesntchbchid, "subjectId" : "" });
            } 
        }
        else{           
          
            staffaction.splice(staffaction.findIndex(a => a.studentId === value),1);           
        }
        setstudentjoinedlist(staffaction)
        
    }

    const functionpendingappchange = (e,action) => {
        
        const value = e.target.value;
       
        var staffaction=studentpendinglist;
        var indexs = staffaction.findIndex(a => a.studentId === value);
       
        if(e.target.checked)
        {           
            if (indexs === -1) {
                staffaction.push({"studentId":value,"action" : action, "staffid" : staffidsession,"batchId" : fetchsesntchbchid, "subjectId" : ""});
            } 
        }
        else{           
          
            staffaction.splice(staffaction.findIndex(a => a.studentId === value),1);           
        }
        setstudentpendinglist(staffaction)
    }

    const functionrejectappchange = (e,action) => {

        const value = e.target.value;      
        var staffaction = studentrejectlist;
        var indexs = staffaction.findIndex(a => a.studentId === value);
       
        if(e.target.checked)
        {           
            if (indexs === -1) {
                staffaction.push({"studentId": value,"action" : action, "staffid" : staffidsession,"batchId" : fetchsesntchbchid, "subjectId" : ""});
            } 
        }
        else{              
            staffaction.splice(staffaction.findIndex(a => a.studentId === value),1);           
        }
        setstudentrejectlist(staffaction)
    }


    const updatestatusleftchange = (actions) => {
        const newState = studentjoinedlist.map(obj => {            
              return {...obj, action : actions};              
            return obj;
          });
        setstudentjoinedlist(newState);       
    }

    const updatestatuspendingchange = (actions) => {
        const newState = studentpendinglist.map(obj => {            
              return {...obj, action : actions};              
            return obj;
          });
        setstudentpendinglist(newState);       
    }

  
    const updatestatusrejectchange = (actions) => {
        const newState = studentrejectlist.map(obj => {           
              return {...obj, action : actions};             
            return obj;
          });
        setstudentrejectlist(newState);     
    }



    const functionallapprovestatus = (e,action) => {
        var staffaction = studentjoinedlist;               
        var ckbx = $('.chckbxstffpg222'); 
          
        if(e.target.checked)
        {
            for (var i = 0; i < ckbx.length; i++) {                
               var indexpe = staffaction.findIndex(a => a.studentId === ckbx[i].value);              
                if (indexpe === -1) {                
                    staffaction.push({"studentId":ckbx[i].value,"action" : action, "staffid" : staffidsession,"batchId" : fetchsesntchbchid, "subjectId" : ""})
                }
            }
            setstudentjoinedlist(staffaction)     
        }
        else {        
            for (var i = 0; i < ckbx.length; i++) {                                        
              staffaction.splice(staffaction.findIndex(a => a.studentId === ckbx[i].value),1)         
            }
            setstudentjoinedlist(staffaction)
        } 

        }

        


        const functionallpendingstatus = (e,action) => {
            var staffaction = studentpendinglist;               
            var ckbx = $('.chckbxstffpg2222'); 
             
            if(e.target.checked)
            {
                for (var i = 0; i < ckbx.length; i++) {                
                   var indexpe = staffaction.findIndex(a => a.studentId === ckbx[i].value);              
                    if (indexpe === -1) {                
                        staffaction.push({"studentId":ckbx[i].value,"action" : action, "staffid" : staffidsession,"batchId" : fetchsesntchbchid, "subjectId" : ""})
                    }
                }
                studentpendinglist(staffaction)     
            }
            else {        
                for (var i = 0; i < ckbx.length; i++) {                
                                 
                        staffaction.splice(staffaction.findIndex(a => a.studentId === ckbx[i].value),1)
                    
                }
                studentpendinglist(staffaction)
            } 

            }

            const functionallrejectstatus = (e,action) => {
                var staffaction = studentrejectlist;               
                var ckbx = $('.chckbxstffpg4222'); 
                  
                if(e.target.checked)
                {
                    for (var i = 0; i < ckbx.length; i++) {                
                       var indexpe = staffaction.findIndex(a => a.studentId === ckbx[i].value)          
                        if (indexpe === -1) {                
                            staffaction.push({"studentId":ckbx[i].value,"action" : action, "staffid" : staffidsession,"batchId" : fetchsesntchbchid, "subjectId" : ""})
                        }
                    }
                    setstudentrejectlist(staffaction)     
                }
                else {        
                    for (var i = 0; i < ckbx.length; i++) {                
                                     
                            staffaction.splice(staffaction.findIndex(a => a.studentId === ckbx[i].value),1)
                        
                    }
                    setstudentrejectlist(staffaction)
                } 
                
                }


                const callstatusupdateapijoined = () => {

                    $('#mdlbtnlodr5').removeClass('hide');
                    $('#mdlbtntxt5').addClass('hide');

                    for (var i in studentjoinedlist) {
               
                        studentjoinedlist[i].subjectId = "0";
                       
                    }
                    //alert(JSON.stringify(studentjoinedlist))

                    fetch('https://feedii-test-api.azurewebsites.net/api/staff/Update_StudentStatus', {
                        method: 'POST', 
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            },
                        body: JSON.stringify(studentjoinedlist)
                        }).then(response=> { return response.json(); })
                        .then((data) => {
                          
                            window.location.href = "/tch/class";
    
                        })
                        .catch(error =>{
                            console.log(error);
                        })
            
                    
                   
                }


                const callstatusupdateapieditsubject = () => {
                    
                    $('#mdlbtnlodr').removeClass('hide');
                    $('#mdlbtntxt').addClass('hide');

                    const sbjctslctvll = $('#slctcdclsvaleditt').text();
                    const sbjctvllerr = $('#slctclserr2');
                    const sbjctslctvalle = sbjctslctvll.replace('[', '').replace(']','').replace(' ','');
                    const subjectidstring = sbjctslctvalle.replace(/\s*\n\s*/g,"");
                    
                    if(sbjctslctvalle == "" || sbjctslctvalle == "[]") {
            
                        $('#mdlbtntxt').removeClass('hide');
                        $('#mdlbtnlodr').addClass('hide');
                        sbjctvllerr.show();
                    }

                    else {
                        for (var i in studentjoinedlist) {
               
                            studentjoinedlist[i].subjectId = subjectidstring;
                           
                        }
                      
                        fetch('https://feedii-test-api.azurewebsites.net/api/staff/Update_StudentStatus', {
                            method: 'POST', 
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                },
                            body: JSON.stringify(studentjoinedlist)
                            }).then(response=> { return response.json(); })
                            .then((data) => {
                              
                                window.location.href = "/tch/class";
        
                            })
                            .catch(error =>{
                                console.log(error);
                            })
                    }
            
                    
                   
                }



                const callstatusupdateapipending = () => {
                    
                    $('#mdlbtnlodr2').removeClass('hide');
                    $('#mdlbtntxt2').addClass('hide');

                        
                    const sbjctslctval = $('#slctcdclsval').text();
                    const sbjctvlerr = $('#slctclseerrr');
                    const sbjctslctvaal = sbjctslctval.replace('[', '').replace(']','').replace(' ','');
                    const subjectidstring = sbjctslctvaal.replace(/\s*\n\s*/g,"");
                    
                    if(sbjctslctval == "" || sbjctslctval == "[]") {
            
                        $('#mdlbtntxt2').removeClass('hide');
                        $('#mdlbtnlodr2').addClass('hide');
                        sbjctvlerr.show();
                    }

                    else {
                        for (var i in studentpendinglist) {
               
                            studentpendinglist[i].subjectId = subjectidstring;
                           
                        }
    
                        //alert(JSON.stringify(studentpendinglist));
    
                        fetch('https://feedii-test-api.azurewebsites.net/api/staff/Update_StudentStatus', {
                            method: 'POST', 
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                },
                            body: JSON.stringify(studentpendinglist)
                            }).then(response=> { return response.json(); })
                            .then((data) => {
                                
                                //alert("Status Updated successfully!");
                                window.location.href = "/tch/class";
                
                            })
                            .catch(error =>{
                                console.log(error);
                            })
                    }
            
                    
                   
                }

                const callstatusupdateapipendingreject = () => {

                    $('#mdlbtnlodr4').removeClass('hide');
                    $('#mdlbtntxt4').addClass('hide');
                   
    
                        for (var i in studentpendinglist) {
                   
                            studentpendinglist[i].subjectId = "0";
                           
                        }
    
    
                        fetch('https://feedii-test-api.azurewebsites.net/api/staff/Update_StudentStatus', {
                            method: 'POST', 
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                },
                            body: JSON.stringify(studentpendinglist)
                            }).then(response=> { return response.json(); })
                            .then((data) => {
                                
                                //alert("Status Updated successfully!");
                                window.location.href = "/tch/class";
                
                            })
                            .catch(error =>{
                                console.log(error);
                            })
                
                        
                       
                    }

                const callstatusupdateapireject = () => {

                    $('#mdlbtnlodr3').removeClass('hide');
                    $('#mdlbtntxt3').addClass('hide');

                    const sbjctslctvalrj = $('#slctcdclsvaledit').text();
                    const sbjctvlerrrjc = $('#slctclserrrjc');
                    const sbjctslctvalrjc = sbjctslctvalrj.replace('[', '').replace(']','').replace(' ','');
                    const subjectidstring = sbjctslctvalrjc.replace(/\s*\n\s*/g,"");
    
                    if(sbjctslctvalrj == "" || sbjctslctvalrj == "[]") {
            
                        $('#mdlbtntxt3').removeClass('hide');
                        $('#mdlbtnlodr3').addClass('hide');
                        sbjctvlerrrjc.show();
                    }
                    else {

                        for (var i in studentrejectlist) {
                   
                            studentrejectlist[i].subjectId = subjectidstring;
                           
                        }
                                   
                        // alert(JSON.stringify(studentrejectlist));
                        fetch('https://feedii-test-api.azurewebsites.net/api/staff/Update_StudentStatus', {
                            method: 'POST', 
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                },
                            body: JSON.stringify(studentrejectlist)
                            }).then(response=> { return response.json(); })
                            .then((data) => {
                                
                                //alert("Status Updated successfully!");
                                window.location.href = "/tch/class";
                
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    }
            
             
                   
                }
    
    
                if(joinedlist.length == 0 && pendinglist.length == 0 && rejectlist.length == 0) {
                   
                     $('#schclsloader').show();
                     $('#schclsdata').hide();
                 }
                 else {
                    
                     $('#schclsdata').show();
                     $('#schclsloader').hide();
                 }

                 const gobck = () => {
                     window.history.go(-1); 
                     return false;
                 }

    

                if(joinedlist.length == 0) {
                    $('#errdv1').show();
                    $('#tbl1').hide();
                }
                else {
                    $('#tbl1').show();
                    $('#errdv1').hide();
                }
            
                if(pendinglist.length == 0) {
                    $('#errdv2').show();
                    $('#tbl2').hide();
                }
                else {
                    $('#tbl2').show();
                    $('#errdv2').hide();
                }
            
               if(rejectlist.length == 0) {
                    $('#errdv4').show();
                    $('#tbl4').hide();
                }
                else {
                    $('#tbl4').show();
                    $('#errdv4').hide();
                }
                

                // const sbjctlistsss = [{
                //     value: "Hindi", label: "Hindi"
                // },{
                //     value: "English", label: "English"
                // },{
                //     value: "Maths", label: "Maths"
                // },
                // ];

                const sbjctlistsss=[];
                subjectlist.map((sub) => (
                    sbjctlistsss.push({value : sub.subjectId, label : sub.subjectname})
                ))
                

                const handleCheckboxChange = () => {
                    setIsChecked(!isChecked);
                    
                    if(isChecked) { 
                        
                        $('.sbjlistssalstdnstbl').addClass('hide');
                        updatesettingstatus(0); 
                    }
                    else {
                        
                        $('.sbjlistssalstdnstbl').removeClass('hide');
                        updatesettingstatus(1);
                    }
                    

                }

                const uniqueTags = [];
                joinedlist.map(clist => {
                   
                    const found = uniqueTags.findIndex(element => element.studentid == clist.studentId);
                        if (found === -1) {
                            uniqueTags.push({ name: clist.name, studentid: clist.studentId,rollNo:clist.rollNo})
                        }
                    
                });

                const [selectedValue, setSelectedValue] = useState([]);
        
                const handleChangee = e => {
                    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
                }

                const [selectedValueedt, setSelectedValueedt] = useState([]);
        
                const handleChangeedt = e => {
                    setSelectedValueedt(Array.isArray(e) ? e.map(x => x.value) : []);
                }

                
    const functionjoinedappchangee2 = (e,action) => {
    
        const value = e.target.value;
       
        var staffaction = studentjoinedlist;
        var indexs = staffaction.findIndex(a => a.studentId === value);
       
            if (indexs === -1) {
                staffaction.push({"studentId":value,"action" : action, "staffid" : staffidsession,"batchId" : fetchsesntchbchid, "subjectId" : "" });
            } 
        setstudentjoinedlist(staffaction)
        
    }

    const functionrejectappchange2 = (e,action) => {

        const value = e.target.value;      
        var staffaction = studentrejectlist;
        var indexs = staffaction.findIndex(a => a.studentId === value);
       
                 
            if (indexs === -1) {
                staffaction.push({"studentId": value,"action" : action, "staffid" : staffidsession,"batchId" : fetchsesntchbchid, "subjectId" : ""});
            } 
       
        setstudentrejectlist(staffaction)
    }

    const functionpendingappchange2 = (e,action) => {
        
        const value = e.target.value;
       
        var staffaction=studentpendinglist;
        var indexs = staffaction.findIndex(a => a.studentId === value);
       
                 
            if (indexs === -1) {
                staffaction.push({"studentId": value,"action" : action, "staffid" : staffidsession,"batchId" : fetchsesntchbchid, "subjectId" : ""});
            } 
       
        setstudentpendinglist(staffaction)
    }
                

    return <div>
        <SecondHeaderTchrrrdashboardforclass />
        {loader}
        <div id="divLoader" style={{display: "none"}}> </div>
        <div className="be-wrapper be-login innerwrapper" id="login">
        
            <div className="cs-pdng pb-0 mt-5">
                <div className="wd-80p m-auto">
                    <div className="col-sm-12 mb-5">
                        <div onClick={gobck} className="srvylnkbtnnn">
                            <i className="fa fa-chevron-left mr-2"></i>
                            <span>Back to Classroom</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cs-pdng pt-0" id='schclsloader'>
                <div className="pgnodtadv1 pt-0">
                    <div>
                        <img className="pgnodtadv1img" src="https://res.cloudinary.com/infoi/image/upload/q_auto:best/v1634879425/AMA%20Icons/sidebar-empty-state-1_uwimwd.svg" width="200" alt="Error Image" />
                        <div className="pgnodtadv1txt">No Data Found</div>
                    </div>
                </div>
            </div>

            <div className="cs-pdng pt-0" id='schclsdata'>

                <div className="wdth-ipdwvw-cs mbvw-imgwd" style={{backgroundImage: `url(${url})`}}>
                <div className="wdth-ipdwvw-csdvd">
                    <div className="srvydvvddv1 mt-5p">
                        <div className="srvydvvddv2">
                            <div>
                                <div className="srvydvvddv3">{gradename}</div>            
                            </div>
                            <div className="srvydvvddv4">
                                <p className="kmcs_p" style={{color: 'rgb(51, 62, 99)'}}>Class</p>
                                <div className="srvydvvddv5">Section {sectionname}</div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="srvdvvdvd1">
                        <div>
                            <div class="row m-0">
                                <span className="srvdvvdvspn">Maths</span>
                            </div>
                        </div>
                    </div> */}
                </div>
                </div>


                <div className="row">
                    <div className="col-md-2 col-lg-2"></div>
                    <div className="col-md-9 pr-5px">

                        {/* for students */}

                        <div id="survytbl"> 
                            <div className="row m-0">
                                <div className="col-sm-8 p-0 mbvw-mt3">
                                    <p className="kmcs_p mt-5 bluclr mt-5">Student's </p>
                                </div>
                                {/* <div className="col-sm-4 pr-0 pl-0 kckh48 kckhkcstm8 mb-0 mt-cstmdrpdwnn">
                                    <div className="custom-selectt custom-selecttsrvy">
                                        <select id="selectsubjects" className="mbl-inp cs-slct-fld slct-cstm1 cstmsrvyslct-cstm1" onChange={(e) => fetchlistbysubject(e)}>
                                            
                                            <option value={0}>All Subjects</option>
                                            {subjectlist.map((e, key) => {
                                                            return <option key={key} value={e.subjectId}>{e.subjectname}</option>;
                                                        })}
                                                                                        
                                        </select>
                                    </div>
                                </div> */}

                            </div>

                            <div className="mt-10px">
                                <div>
                                    <div className="col-sm-12 cstsbx1">
                                        <div className="dshbrd-dvv1 row ml-0 mr-0 mt-0 pb-0 mb--10px">
                                            <div className="col-sm-10 pl-0">
                                                <ul className="dshbrd-dvv1-ul">
                                                    <li className="dshbrd-dvv1-ul-li">
                                                        <a onClick={allstff222} id="alstf222" className="dshbrd-dvv1-ul-li-a active">All Students ({uniqueTags.length})</a>
                                                    </li>
                                                    <li className="dshbrd-dvv1-ul-li">
                                                        <a onClick={pendingaproval222} id="pendgaprvl222" className="dshbrd-dvv1-ul-li-a">Pending Approval ({pendinglist.length})</a>
                                                    </li>
                                                    {/* <li className="dshbrd-dvv1-ul-li">
                                                        <a onClick={staffinvtd222} id="stfinvtd222" className="dshbrd-dvv1-ul-li-a">Invited (0)</a>
                                                    </li> */}
                                                    <li className="dshbrd-dvv1-ul-li">
                                                        <a onClick={stffreject222} id="stfrjct222" className="dshbrd-dvv1-ul-li-a">Rejected ({rejectlist.length})</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-sm-2 text-right pr-0">
                                                <Dropdown>
                                                    <Dropdown.Toggle className="adtchrbtn">
                                                        <svg focusable="false" width="24" height="24" viewBox="0 0 24 24"><path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z"></path></svg>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="tbl-drpdwnmnu">
                                                        <div className="tbl-dropdown-item dropdown-item crsr-dis">Add student</div>
                                                        <div className="tbl-dropdown-item dropdown-item crsr-dis">Bulk Import</div>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="alstfff222" style={{display: 'block'}}>
                                    <div className="row">
                                        <div className="col-sm-12" id="stftabl">

                                        <div id="errdv1">
                                            <div className="nodtadv1">
                                                <div>
                                                    <img className="nodtadv1img" src="https://res.cloudinary.com/infoi/image/upload/q_auto:best/v1634879425/AMA%20Icons/sidebar-empty-state-1_uwimwd.svg" width="150" alt="Error Image" />
                                                    <div className="nodtadv1txt">No Data Found</div>
                                                </div>
                                            </div>
                                        </div>
                                        <table className="table" id="tbl1">
                                            <CheckboxGroup onChange={setOnChangee222}>
                                                <thead>
                                                <tr>
                                                    <th className="brdr-n wd-15px">
                                                        <div>
                                                            <AllCheckerCheckbox type="checkbox" id="tblcstslctallstff1222" title="Select all" onClick={chckerslctallbx222} onChange={e => { functionallapprovestatus(e,actionstatus)}}  />
                                                        </div>
                                                    </th>
                                                    <th className="brdr-n">                                                    
                                                        <div>
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtn dis cstmrdclrrr" id="actnstff1222">
                                                                <span>Action</span>
                                                                <i className="fa fa-chevron-down ml-4 tblcstslctbtn-i"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                {/* <div className="tbl-dropdown-item dropdown-item" onClick={handleShow}>Delete</div> */}
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow}>Delete</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        </div>
                                                    </th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n w-30 text-right pr-4">
                                                        {/* <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtnsrtng">
                                                                Subjects <i className="fa fa-chevron-down ml-2 fs-10px"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item">Show Subjects</div>
                                                                <div className="tbl-dropdown-item dropdown-item">Hide Subjects</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown> */}
                                                        <div className="pr-3">
                                                            <label className="allstndtbllbl1chkbxshwsbjct" for="shwsbjcshd">Show Subjects </label>
                                                            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="allstndtbllbl1chkbxshwsbjctinp" name="shwsbjcshd" id="shwsbjcshd" />
                                                        </div>
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                    {uniqueTags.map((students)=>(


                                                        <tr>
                                                        <td>
                                                            <div>
                                                                <Checkbox type="checkbox" id="tblcstslctstff1222" title="Select" className="slct1id chckbxstffpg222" onClick={chckerslctbx222}   onChange={e => { functionjoinedappchange(e,actionstatus)}} value={students.studentid} />
                                                            </div>
                                                        </td>
                                                        <td className="wd-80p pl-0">
                                                            <div title={students.name} onClick={()=>{fetchstudentdetails(students.studentid); handleShow2(); }}>
                                                                <span className="blu-clr mr-2" title="Roll Number">{students.rollNo} &nbsp;  - </span>
                                                                <img src="../Images/user-blue-imgg.png" className="tblusricnimg mb-2 vrt-algn-tp" /> 
                                                                <span className="mr-3 blu-clr"> {students.name}</span>
                                                                <a className="sbjlistssalstdnstbl">
                                                                    {joinedlist.map((studentss)=> {
                                                                        if (studentss.studentId == students.studentid)
                                                                        {
                                                                        if(isChecked) {
                                                                            return(
                                                                                <button className="blustatusbtn allstndsdtlstdvbtn">{studentss.subjectname}</button>
                                                                            );
                                                                        }
                                                                        else {                                                                            
                                                                            return(
                                                                                <button className="blustatusbtn allstndsdtlstdvbtn hide">{studentss.subjectname}</button>
                                                                            );
                                                                        }
                                                                    }
                                                                    })}
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td className="text-right pr-4">
                                                            <Dropdown>
                                                                <Dropdown.Toggle className="tbl-drpbtnndw">
                                                                    <i className="fa fa-ellipsis-v" title="More options"></i>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                    <button className="tbl-dropdown-item dropdown-item" onClick={()=>{fetchstudentdetails(students.studentid); handleShow2(); }}>View Details</button>
                                                                    <button className="tbl-dropdown-item dropdown-item" onClick={e => { functionjoinedappchangee2(e,actionstatus); handleShow9();}} value={students.studentid} >Edit Subjects</button>
                                                                    <button className="tbl-dropdown-item dropdown-item" onClick={e => { functionjoinedappchangee2(e,actionstatus); handleShow();}} value={students.studentid}>Delete</button>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </td>
                                                        </tr>

                                                    ))}
                                               
                                               
                                                </tbody>
                                            </CheckboxGroup>
                                        </table>
                                        </div>
                                    </div>
                                </div>

                                <div id="psndaprvlstfff222" style={{display: 'none'}}>
                                    <div className="row">
                                        <div className="col-sm-12" id="stftabl">

                                        <div id="errdv2">
                                            <div className="nodtadv1">
                                                <div>
                                                    <img className="nodtadv1img" src="https://res.cloudinary.com/infoi/image/upload/q_auto:best/v1634879425/AMA%20Icons/sidebar-empty-state-1_uwimwd.svg" width="150" alt="Error Image" />
                                                    <div className="nodtadv1txt">No Data Found</div>
                                                </div>
                                            </div>
                                        </div>
                                        <table className="table" id="tbl2">
                                            <CheckboxGroup onChange={setOnChangee222}>
                                                <thead>
                                                <tr>
                                                    <th className="brdr-n wd-15px">
                                                        <div>
                                                            <AllCheckerCheckbox type="checkbox" id="tblcstslctallstff2222" title="Select all" onClick={chckerslctallbx2222} onChange={e => { functionallpendingstatus(e,actionstatus)}} />
                                                        </div>
                                                    </th>
                                                    <th className="brdr-n">                                            
                                                        <div>
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtn dis cstmrdclrrr" id="actnstff2222">
                                                                <span>Action</span>
                                                                <i className="fa fa-chevron-down ml-4 tblcstslctbtn-i"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow6}>Approve</div>
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow5}>Reject</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        </div>
                                                    </th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n text-right pr-4">
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtnsrtng">
                                                                AZ <i className="fa fa-sort"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item crsr-dis">Sorting A-Z</div>
                                                                <div className="tbl-dropdown-item dropdown-item crsr-dis">Sorting Z-A</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                    {pendinglist.map((students)=>(
                                                        <tr>
                                                        <td>
                                                            <div>
                                                                <Checkbox type="checkbox" className="slct1id chckbxstffpg2222" onClick={chckerslctbx2222} id="tblcstslctstff1222" title="Select" onChange={e => { functionpendingappchange(e,actionstatus)}} value={students.studentId}  />
                                                            </div>
                                                        </td>
                                                        <td className="wd-80p pl-0">
                                                            <div title={students.name} onClick={()=>{fetchstudentdetails(students.studentId); handleShow2(); }}>
                                                                <span className="blu-clr mr-2" title="Roll Number">{students.rollNo} &nbsp;  - </span>
                                                                <img src="../Images/user-blue-imgg.png" className="tblusricnimg" /> 
                                                                <span className="blu-clr">{students.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="text-right pr-4">
                                                            <Dropdown>
                                                                <Dropdown.Toggle className="tbl-drpbtnndw">
                                                                    <i className="fa fa-ellipsis-v" title="More options"></i>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                    <div className="tbl-dropdown-item dropdown-item" onClick={()=>{fetchstudentdetails(students.studentId); handleShow2(); }}>View Details</div>
                                                                    <button className="tbl-dropdown-item dropdown-item" onClick={e => { functionpendingappchange2(e,actionstatus); handleShow6();}} value={students.studentId} >Approve</button>
                                                                    <button className="tbl-dropdown-item dropdown-item" onClick={e => { functionpendingappchange2(e,actionstatus); handleShow5();}} value={students.studentId}>Reject</button>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </td>
                                                        </tr>
                                                    ))}
                                               
                                               
                                                </tbody>
                                            </CheckboxGroup>
                                        </table>
                                        </div>
                                    </div>
                                </div>

                                <div id="invtdstfff222" style={{display: 'none'}}>
                                    <div className="row">
                                        <div className="col-sm-12" id="stftabl">

                                        <div id="errdv3">
                                            <div className="nodtadv1">
                                                <div>
                                                    <img className="nodtadv1img" src="https://res.cloudinary.com/infoi/image/upload/q_auto:best/v1634879425/AMA%20Icons/sidebar-empty-state-1_uwimwd.svg" width="150" alt="Error Image" />
                                                    <div className="nodtadv1txt">No Data Found</div>
                                                </div>
                                            </div>
                                        </div>
                                        <table className="table" id="tbl3">                                        
                                            <CheckboxGroup onChange={setOnChangee222}>
                                                <thead>
                                                <tr>
                                                    <th className="brdr-n wd-15px">
                                                        <div>
                                                            <AllCheckerCheckbox type="checkbox" id="tblcstslctallstff3222" title="Select all" onClick={chckerslctallbx3222} onChange={e => { functionallpendingstatus(e,actionstatus)}} />
                                                        </div>
                                                    </th>
                                                    <th className="brdr-n">                                            
                                                        <div>
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtn dis cstmrdclrrr" id="actnstff3222">
                                                                <span>Action</span>
                                                                <i className="fa fa-chevron-down ml-4 tblcstslctbtn-i"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow}>Remove</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        </div>
                                                    </th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n text-right pr-4">
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtnsrtng">
                                                                AZ <i className="fa fa-sort"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item crsr-dis">Sorting A-Z</div>
                                                                <div className="tbl-dropdown-item dropdown-item crsr-dis">Sorting Z-A</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <Checkbox type="checkbox" className="slct1id chckbxstffpg3222" onClick={chckerslctbx3222} id="tblcstslctstff1222" title="Select" />
                                                        </div>
                                                    </td>
                                                    <td className="wd-80p pl-0">
                                                        <div title="GHI" onClick={handleShow2}>
                                                            <span className="blu-clr mr-2" title="Roll Number">1104 &nbsp;  - </span>
                                                            <img src="../Images/user-blue-imgg.png" className="tblusricnimg" /> 
                                                            <span className="blu-clr">GHI</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-right pr-4">
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tbl-drpbtnndw">
                                                                <i className="fa fa-ellipsis-v" title="More options"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow}>Remove</div>
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow7}>Resend mail</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <Checkbox type="checkbox" className="slct1id chckbxstffpg3222" onClick={chckerslctbx3222} id="tblcstslctstff2222" title="Select" />
                                                        </div>
                                                    </td>
                                                    <td><div title="GHI" onClick={handleShow2}><img src="../Images/user-blue-imgg.png" className="tblusricnimg" /> GHI</div></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="text-right pr-4">
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tbl-drpbtnndw">
                                                                <i className="fa fa-ellipsis-v" title="More options"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow}>Remove</div>
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow7}>Resend mail</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <Checkbox type="checkbox" className="slct1id chckbxstffpg3222" onClick={chckerslctbx3222} id="tblcstslctstff3222" title="Select" />
                                                        </div>
                                                    </td>
                                                    <td><div title="GHI" onClick={handleShow2}><img src="../Images/user-blue-imgg.png" className="tblusricnimg" /> GHI</div></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="text-right pr-4">
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tbl-drpbtnndw">
                                                                <i className="fa fa-ellipsis-v" title="More options"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow}>Remove</div>
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow7}>Resend mail</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <Checkbox type="checkbox" className="slct1id chckbxstffpg3222" onClick={chckerslctbx3222} id="tblcstslctstff4222" title="Select" />
                                                        </div>
                                                    </td>
                                                    <td className="wd-80p pl-0">
                                                        <div title="GHI" onClick={handleShow2}>
                                                            <span className="blu-clr mr-2" title="Roll Number">1104 &nbsp;  - </span>
                                                            <img src="../Images/user-blue-imgg.png" className="tblusricnimg" /> 
                                                            <span className="blu-clr">GHI</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-right pr-4">
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tbl-drpbtnndw">
                                                                <i className="fa fa-ellipsis-v" title="More options"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow}>Remove</div>
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow7}>Resend mail</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            
                                            </CheckboxGroup>
                                        </table>
                                        </div>
                                    </div>
                                </div>

                                <div id="rjctstfff222" style={{display: 'none'}}>
                                    <div className="row">
                                        <div className="col-sm-12" id="stftabl">

                                        <div id="errdv4">
                                            <div className="nodtadv1">
                                                <div>
                                                    <img className="nodtadv1img" src="https://res.cloudinary.com/infoi/image/upload/q_auto:best/v1634879425/AMA%20Icons/sidebar-empty-state-1_uwimwd.svg" width="150" alt="Error Image" />
                                                    <div className="nodtadv1txt">No Data Found</div>
                                                </div>
                                            </div>
                                        </div>
                                        <table className="table" id="tbl4">                                        
                                            <CheckboxGroup onChange={setOnChangee222}>
                                                <thead>
                                                <tr>
                                                    <th className="brdr-n wd-15px">
                                                        <div>
                                                            <AllCheckerCheckbox type="checkbox" id="tblcstslctallstff4222" title="Select all" onClick={chckerslctallbx4222} onChange={e => { functionallrejectstatus(e,actionstatus)}} />
                                                        </div>
                                                    </th>
                                                    <th className="brdr-n">                                            
                                                        <div>
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtn dis cstmrdclrrr" id="actnstff4222">
                                                                <span>Action</span>
                                                                <i className="fa fa-chevron-down ml-4 tblcstslctbtn-i"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow4}>Approve</div>
                                                                
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        </div>
                                                    </th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n text-right pr-4">
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtnsrtng">
                                                                AZ <i className="fa fa-sort"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item crsr-dis">Sorting A-Z</div>
                                                                <div className="tbl-dropdown-item dropdown-item crsr-dis">Sorting Z-A</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {rejectlist.map((students)=>(

                                                    <tr>
                                                    <td>
                                                        <div>
                                                            <Checkbox type="checkbox" className="slct1id chckbxstffpg4222" onClick={chckerslctbx4222} id="tblcstslctstff1222" title="Select" onChange={e => { functionrejectappchange(e,actionstatus)}} value={students.studentId} />
                                                        </div>
                                                    </td>
                                                    <td className="wd-80p pl-0">
                                                        <div title={students.name} onClick={()=>{fetchstudentdetails(students.studentId); handleShow2(); }}>
                                                            <span className="blu-clr mr-2" title="Roll Number">{students.rollNo} &nbsp;  - </span>
                                                            <img src="../Images/user-disabled-imgg.png" className="tblusricnimg" /> 
                                                            <span className="blu-clr">{students.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-right pr-4">
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tbl-drpbtnndw">
                                                                <i className="fa fa-ellipsis-v" title="More options"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                            <div className="tbl-dropdown-item dropdown-item" onClick={()=>{fetchstudentdetails(students.studentId); handleShow2(); }}>View Details</div>
                                                                <button className="tbl-dropdown-item dropdown-item" onClick={e => { functionrejectappchange2(e,actionstatus); handleShow4();}} value={students.studentId} >Approve</button>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>


                                                    ))}
                                                
                                                
                                                </tbody>
                                            
                                            </CheckboxGroup>
                                        </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>            
        </div>

        <Modal show={show} onHide={handleClose} className="cstmmtmodal" >
            <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to remove?</p>
            </Modal.Body>
            <Modal.Footer className="brdr-tp">
            <Button variant="primary modalGrayBtn" onClick={handleClose}>
                Close
            </Button>
            <Button variant="secondary modalRedBtn" onClick={callstatusupdateapijoined} style={{minWidth: '80px'}}>
                <span id="mdlbtnlodr5" className="hide">
                    <i className="fa fa-spinner fa-spin" style={{fontSize: '12px'}}></i>
                </span>
                <span id="mdlbtntxt5">Confirm</span>
            </Button>
            </Modal.Footer>
        </Modal>

        

        <Modal show={show2} onHide={handleClose2} className="cstmmtmodal cstmlmodal2" >
            <Modal.Header className="cstmmdlinfodv" closeButton>
            </Modal.Header>
            <Modal.Body className="cstmmdlinfodv2 ht-220px">
                <div className="infomdvmdl1 col-sm-12 row m-0">
                    <div className="col-sm-2">
                        <img src="../Images/user_green.png" className="infomdvmdl1-img" alt="User Profile" />
                    </div>
                    <div className="col-sm-10">
                        <p className="infomdvmdl2">{studentname}</p>
                        <div className="infomdvmdl3 col-sm-12 p-0 row m-0">
                            <div className="col-sm-4 pl-0">
                                <i className="fa fa-user mr-7px"></i>
                                Student
                            </div>
                            <div className="infomdvmdl2dvdr col-sm-1 m-0 p-0">|</div>
                            <div className="col-sm-6 p-0 text-truncate" title={studentemail}>
                                <i className="fa fa-envelope mr-7px"></i>
                               {studentemail}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="infomdvmdl3 col-sm-12 mt-10px">
                    <h3 className="infomdvmdl3-h3">{studentgrade}</h3>
                    <div readOnly className="infomdvmdl3-txtara">{studentsubject}</div>
                </div>
                
            </Modal.Body>
        </Modal>


        {/* Reject to approve */}
        <Modal show={show4} onHide={handleClose4} className="cstmmtmodal" >
            <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-sm-12">
                    <p>Select subjects for approving</p>
                </div>
                <div className="col-sm-12 mb-3">
                    <Select id="slctsbjctssdtaa" options={sbjctlistsss} value={sbjctlistsss.filter(obj => selectedValue.includes(obj.value))} onChange={handleChangee} isMulti isClearable />
                    <div className="errslct" id="slctclserrrjc">Please select subjects</div>
                    {selectedValue && <div style={{ display: 'none' }}>
                        <div id="slctcdclsvaledit">{JSON.stringify(selectedValue, null, 2)}</div>
                    </div>}
                </div>
            </Modal.Body>
            <Modal.Footer className="brdr-tp">
            <Button variant="primary modalGrayBtn" onClick={handleClose4}>
                Close
            </Button>
            <Button variant="secondary modalRedBtn" onClick={callstatusupdateapireject} style={{minWidth: '80px'}}>
                <span id="mdlbtnlodr3" className="hide">
                    <i className="fa fa-spinner fa-spin" style={{fontSize: '12px'}}></i>
                </span>
                <span id="mdlbtntxt3">Confirm</span>
            </Button>
            </Modal.Footer>
        </Modal>


        <Modal show={show5} onHide={handleClose5} className="cstmmtmodal" >
            <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to reject?</p>
            </Modal.Body>
            <Modal.Footer className="brdr-tp">
            <Button variant="primary modalGrayBtn" onClick={handleClose5}>
                Close
            </Button>
            <Button variant="secondary modalRedBtn" onClick={callstatusupdateapipendingreject} style={{minWidth: '80px'}}>
                <span id="mdlbtnlodr4" className="hide">
                    <i className="fa fa-spinner fa-spin" style={{fontSize: '12px'}}></i>
                </span>
                <span id="mdlbtntxt4">Confirm</span>
            </Button>
            </Modal.Footer>
        </Modal>


        <Modal show={show6} onHide={handleClose6} className="cstmmtmodal" >
            <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-sm-12">
                    <p>Select subjects for approving</p>
                </div>
                <div className="col-sm-12 mb-3">
                    <Select id="slctsbjctssdtaa" options={sbjctlistsss} value={sbjctlistsss.filter(obj => selectedValue.includes(obj.value))} onChange={handleChangee} isMulti isClearable />
                    <div className="errslct" id="slctclseerrr">Please select subjects</div>
                    {selectedValue && <div style={{ display: 'none' }}>
                        <div id="slctcdclsval">{JSON.stringify(selectedValue, null, 2)}</div>
                    </div>}
                </div>
            </Modal.Body>
            <Modal.Footer className="brdr-tp">
            <Button variant="primary modalGrayBtn" onClick={handleClose6}>
                Close
            </Button>
            <Button variant="secondary modalRedBtn" onClick={()=> { callstatusupdateapipending(); }} style={{minWidth: '80px'}}>
                <span id="mdlbtnlodr2" className="hide">
                    <i className="fa fa-spinner fa-spin" style={{fontSize: '12px'}}></i>
                </span>
                <span id="mdlbtntxt2">Confirm</span>
            </Button>
            </Modal.Footer>

            {/* <form onSubmit={handleSubmit(frmsbmit)}>
                <Select options={sbjctlistsss} {...register('selectVal', { required: true })} />
                {errors.selectVal && <p>Subject is required.</p>}
                <Select isMulti isClearable options={sbjctlistsss} refSetter={register('color', { required: true })} />
                {errors.color && <p>Subject is required</p>}
                <button type="submit">Submit</button>
            </form> */}
            
        </Modal>


        <Modal show={show7} onHide={handleClose7} className="cstmmtmodal" >
            <Modal.Header closeButton>
            <Modal.Title>Resent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Mail is re-sent on <b>test@gmail.com</b>.</p>
            </Modal.Body>
            <Modal.Footer className="brdr-tp">
            <Button variant="primary modalGrayBtn" onClick={handleClose7}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>


        <Modal show={show8} onHide={handleClose8} className="cstmmtmodal" >
            <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to confirm?</p>
            </Modal.Body>
            <Modal.Footer className="brdr-tp">
            <Button variant="primary modalGrayBtn" onClick={handleClose8}>
                Close
            </Button>
            <Button variant="secondary modalRedBtn" onClick={handleClose8}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>


        <Modal show={show9} onHide={handleClose9} className="cstmmtmodal" >
            <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-sm-12">
                    <p>You can edit the subjects</p>
                </div>
                <div className="col-sm-12 mb-3">
                    <Select id="slctsbjctssdtaa" options={sbjctlistsss} onChange={handleChangeedt}  isMulti isClearable />
                    <div className="errslct" id="slctclserr2">Please select subjects</div>
                    {selectedValueedt && <div style={{ display: 'none' }}>
                        <div id="slctcdclsvaleditt">{JSON.stringify(selectedValueedt, null, 2)}</div>
                    </div>}
                </div>
            </Modal.Body>
            <Modal.Footer className="brdr-tp">
            <Button variant="primary modalGrayBtn" onClick={handleClose9}>
                Close
            </Button>
            <Button variant="secondary modalRedBtn" onClick={callstatusupdateapieditsubject} style={{minWidth: '80px'}}>
                <span id="mdlbtnlodr" className="hide">
                    <i className="fa fa-spinner fa-spin" style={{fontSize: '12px'}}></i>
                </span>
                <span id="mdlbtntxt">Confirm</span>
            </Button>
            </Modal.Footer>
            
        </Modal>


    </div>
}

// export default Details;
import React, { useState, useRef, useEffect } from "react";
import $ from 'jquery';
import { CheckboxGroup, AllCheckerCheckbox, Checkbox } from "@createnl/grouped-checkboxes";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../Content/Content/dashboard.css';
import '../Content/Content/tblcss.css';
import { Headerdashboard} from '../headeruserdashboard';
import '../AllJs/dashboard-staff.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';
import { PieChart, Pie} from 'recharts';
import Dropdown from 'react-bootstrap/Dropdown';
import useLoader from "../useLoader";


export const Staffpage = () => {
    const [loader, showLoader, hideLoader] = useLoader();


    useEffect(() => {
        showLoader();
        $('#login').hide();
      }, []);

    const [staffdata, setStaffData] = useState([]);
    const [staffdatapending, setStaffDatapending] = useState([]);
    const [staffdatarejected, setStaffDatarejected] = useState([]);
    const [staffdatainvited, setStaffDatainvited] = useState([]);

    const [staffadd, setStaffadd] = useState([]); 
    const [staffaddpending, setStaffaddpending] = useState([]); 
    const [staffaddleft, setStaffaddleft] = useState([]); 
    const [staffaddreject, setStaffaddreject] = useState([]);
    const [staffdetails, setStaffDetails] = useState([]);
    
    const [staffaddapprove, setStaffaddapprove] = useState([]);
    

    const [actionstatus, setactionstatus] = useState(""); 
    const [staffname, setstaffname] = useState(""); 
    const [staffemail, setstaffemail] = useState("");
    const [staffdesignation, setstaffdesignation] = useState(""); 

    const dataFetchedRef = useRef(false);
    const dataFetchedRefpending = useRef(false);
    const dataFetchedRefrejected = useRef(false);
    const dataFetchedRefinvited = useRef(false);

    const sessionschoolid = sessionStorage.getItem('schoolidsession');
    
    
    React.useEffect(
        ()=> {
            if(sessionschoolid == "") {    
                // showLoader();
                // $('#login').hide();
                window.location.href="/error/error100";   
            }
            else if(sessionschoolid == null) {    
                // showLoader();
                // $('#login').hide();
                window.location.href="/error/error100";   
            }
            else if(sessionschoolid == 0) {    
                // showLoader();
                // $('#login').hide();
                window.location.href="/error/error100";   
            }
            else { 
                // hideLoader();
                // $('#login').show();
                }
        }
    );

    React.useEffect(
        ()=> {

     fetch('https://entity-feediiapi.azurewebsites.net/api/Admin/getAllstaffJoined/' + sessionschoolid, {
            method: 'GET'
          }) .then((response) => response.json())
          .then((data) => {
            if (dataFetchedRef.current) return;
            dataFetchedRef.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
           
            setStaffData(data);
            hideLoader();
            $('#login').show();

          })
          .catch(error =>{
              console.log(error);
          });



          fetch('https://entity-feediiapi.azurewebsites.net/api/Admin/getAllstaffInvited/' + sessionschoolid, {
            method: 'GET'
          }) .then((response) => response.json())
          .then((data) => {
            if (dataFetchedRefinvited.current) return;
            dataFetchedRefinvited.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
           
            setStaffDatainvited(data);
            hideLoader();
            $('#login').show();

          })
          .catch(error =>{
              console.log(error);
          });



          fetch('https://entity-feediiapi.azurewebsites.net/api/Admin/getAllstaffPendingApproval/' + sessionschoolid, {
            method: 'GET'
          }) .then((response) => response.json())
          .then((data) => {
            if (dataFetchedRefpending.current) return;
            dataFetchedRefpending.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
           
            setStaffDatapending(data);
            hideLoader();
            $('#login').show();

          })
          .catch(error =>{
              console.log(error);
          });

          fetch('https://entity-feediiapi.azurewebsites.net/api/Admin/getAllstaffReject/' + sessionschoolid, {
            method: 'GET'
          }) .then((response) => response.json())
          .then((data) => {
            if (dataFetchedRefrejected.current) return;
            dataFetchedRefrejected.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
           
            setStaffDatarejected(data);
            hideLoader();
            $('#login').show();

          })
          .catch(error =>{
              console.log(error);
          });
        
},[])




    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () =>{
        setShow(true);
        updatestatusleftchange("Left")
        setactionstatus("Left");
    } 

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => {
        setShow2(true);
    }

    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => {
        setShow4(true);
        updatestatusrejectchange("Joined")
        setactionstatus("Joined");
    }

    const [show5, setShow5] = useState(false);
    const handleClose5 = () => setShow5(false);
    const handleShow5 = () =>{
        setShow5(true);
        updatestatusapprovechange("Delete")
        setactionstatus("Delete");
       
    }

    const [show6, setShow6] = useState(false);
    const handleClose6 = () => setShow6(false);
    const handleShow6 = () => {
        setShow6(true);
        updatestatusapprovechange("Joined")
        setactionstatus("Joined");
       
    }

   


    const [show7, setShow7] = useState(false);
    const handleClose7 = () => setShow7(false);
    const handleShow7 = () => setShow7(true);

    const allstff = () => {
        $('#alstf').addClass('active');
        $('#pendgaprvl').removeClass('active');
        $('#stfinvtd').removeClass('active');
        $('#stfrjct').removeClass('active');

        $('#alstfff').show();
        $('#psndaprvlstfff').hide();
        $('#invtdstfff').hide();
        $('#rjctstfff').hide();
    }

    const pendingaproval = () => {
        $('#pendgaprvl').addClass('active');
        $('#alstf').removeClass('active');
        $('#stfinvtd').removeClass('active');
        $('#stfrjct').removeClass('active');

        $('#alstfff').hide();
        $('#psndaprvlstfff').show();
        $('#invtdstfff').hide();
        $('#rjctstfff').hide();        
    }

    const staffinvtd = () => {
        $('#stfinvtd').addClass('active');
        $('#pendgaprvl').removeClass('active');
        $('#alstf').removeClass('active');
        $('#stfrjct').removeClass('active');

        $('#alstfff').hide();
        $('#psndaprvlstfff').hide();
        $('#invtdstfff').show();
        $('#rjctstfff').hide();
        
    }

    const stffreject = () => {
        $('#stfrjct').addClass('active');
        $('#pendgaprvl').removeClass('active');
        $('#stfinvtd').removeClass('active');
        $('#alstf').removeClass('active');

        $('#alstfff').hide();
        $('#psndaprvlstfff').hide();
        $('#invtdstfff').hide();
        $('#rjctstfff').show();
        
    }

    const [onChangee, setOnChangee] = React.useState({});
    const [showOnChangee, setShowOnChangee] = React.useState(true);

    const chckerslctallbx = () => {

        if($('#tblcstslctallstff1').is(":checked")) {
            $('#actnstff1').removeClass('dis');
        } else {
            $('#actnstff1').addClass('dis');
        }
    }
    // const functionall = (e) => {
    //     alert(1)
    //     const newStudents=staffadd;               
    //     var ckbx = $('.chckbxstffpg2');        
    //     if(e.target.checked)
    //     {
    //         for (var i = 0; i < ckbx.length; i++) {                
    //            const indexd = newStudents.indexOf(ckbx[i].value);              
    //             if (indexd === -1) {                
    //                 newStudents.push(ckbx[i].value)
    //             }
    //         }
    //         setStaffadd(newStudents)     
    //     }
    //     else {        
    //         for (var i = 0; i < ckbx.length; i++) {                
    //             const indexd = newStudents.indexOf(ckbx[i].value);              
    //             if (indexd > -1) {              
    //                 newStudents.splice(ckbx[i].value)
    //             }
    //         }
    //         setStaffadd(newStudents)
    //     }  
    //     }

        const updatestatuschange = (actions) => {
            const newState = staffaddpending.map(obj => {             
                  return {...obj, action : actions};               
                return obj;
              });
            setStaffaddpending(newState);      
        }

        const updatestatusleftchange = (actions) => {
            const newState = staffaddleft.map(obj => {            
                  return {...obj, action : actions};              
                return obj;
              });
            setStaffaddleft(newState);       
        }
        
        const updatestatusrejectchange = (actions) => {
            const newState = staffaddreject.map(obj => {           
                  return {...obj, action : actions};             
                return obj;
              });
            setStaffaddreject(newState);     
        }

        
        const updatestatusapprovechange = (actions) => {
            const newState = staffaddapprove.map(obj => {            
                  return {...obj, action : actions};              
                return obj;
              });
            setStaffaddapprove(newState);       
        }



            const functionallleftstatus = (e,action) => {
                var staffaction = staffaddleft;               
                var ckbx = $('.chckbxstffpg'); 
                  
                if(e.target.checked)
                {
                    for (var i = 0; i < ckbx.length; i++) {                
                       var indexpe = staffaction.findIndex(a => a.staffId === ckbx[i].value);              
                        if (indexpe === -1) {                
                            staffaction.push({"staffId":ckbx[i].value,"action" : action})
                        }
                    }
                    setStaffaddleft(staffaction)     
                }
                else {        
                    for (var i = 0; i < ckbx.length; i++) {                
                                     
                            staffaction.splice(staffaction.findIndex(a => a.staffId === ckbx[i].value),1)
                        
                    }
                    setStaffaddleft(staffaction)
                } 
    
                }


                const functionallRejectstatus = (e,action) => {
                    var staffaction = staffaddreject;               
                    var ckbx = $('.chckbxstffpg4'); 
                      
                    if(e.target.checked)
                    {
                        for (var i = 0; i < ckbx.length; i++) {                
                           var indexpe = staffaction.findIndex(a => a.staffId === ckbx[i].value);              
                            if (indexpe === -1) {                
                                staffaction.push({"staffId":ckbx[i].value,"action" : action})
                            }
                        }
                        setStaffaddreject(staffaction)     
                    }
                    else {        
                        for (var i = 0; i < ckbx.length; i++) {                
                                         
                                staffaction.splice(staffaction.findIndex(a => a.staffId === ckbx[i].value),1)
                            
                        }
                        setStaffaddreject(staffaction)
                    } 
        
                    }

                    const functionallpendingapprstatus = (e,action) => {
                        var staffaction = staffaddapprove;               
                        var ckbx = $('.chckbxstffpg2'); 
                          
                        if(e.target.checked)
                        {
                            for (var i = 0; i < ckbx.length; i++) {                
                               var indexpe = staffaction.findIndex(a => a.staffId === ckbx[i].value)          
                                if (indexpe === -1) {                
                                    staffaction.push({"staffId":ckbx[i].value,"action" : action})
                                }
                            }
                            setStaffaddapprove(staffaction)     
                        }
                        else {        
                            for (var i = 0; i < ckbx.length; i++) {                
                                             
                                    staffaction.splice(staffaction.findIndex(a => a.staffId === ckbx[i].value),1)
                                
                            }
                            setStaffaddapprove(staffaction)
                        } 
            
                        }


                       



    // const callsaveapi = () => {
    //     //alert()
    //     fetch('https://entity-feediiapi.azurewebsites.net/api/staff/Delete_Staff', {
    //         method: 'POST', 
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             },
    //         body: JSON.stringify({"staffId" :  staffadd.toString() })
    //         }).then(response=> { return response.json(); })
    //         .then((data) => {
               
    //             alert("Deleted successfully!");
    //             window.location.href = "/";

    //         })
    //         .catch(error =>{
    //             console.log(error);
    //         })

        
       
    // }


    

    const callstatusleftapi = () => {
        // alert(JSON.stringify(staffaddleft))
        fetch('https://entity-feediiapi.azurewebsites.net/api/staff/Update_StaffStatus', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(staffaddleft)
            }).then(response=> { return response.json(); })
            .then((data) => {
               
                //alert("Status Updated successfully!");
                window.location.href = "/u/staff";

            })
            .catch(error =>{
                console.log(error);
            })

        
       
    }

    const callstatusrejectapi = () => {

        $('#mdlbtnlodr2').removeClass('hide');
        $('#mdlbtntxt2').addClass('hide');

        // alert(JSON.stringify(staffaddreject))
        fetch('https://entity-feediiapi.azurewebsites.net/api/staff/Update_StaffStatus', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(staffaddreject)
            }).then(response=> { return response.json(); })
            .then((data) => {
               
                //alert("Status Updated successfully!");
                window.location.href = "/u/staff";

            })
            .catch(error =>{
                console.log(error);
            })

        
       
    }

    
    const callstatusapproveapi = () => {

        $('#mdlbtnlodr2').removeClass('hide');
        $('#mdlbtntxt2').addClass('hide');

        // alert(JSON.stringify(staffaddapprove))
        fetch('https://entity-feediiapi.azurewebsites.net/api/staff/Update_StaffStatus', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(staffaddapprove)
            }).then(response=> { return response.json(); })
            .then((data) => {
               
                //alert("Status Updated successfully!");
                window.location.href = "/u/staff";

            })
            .catch(error =>{
                console.log(error);
            })

        
       
    }


    const fetchstaffdetails = (staffid) => {
    //    alert(staffid)
        fetch('https://entity-feediiapi.azurewebsites.net/api/Staff/getStaffClassroom/' + staffid, {
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





    // const function2 = (e) => {

    //     const value = e.target.value;
       
    //     const newStudents=staffadd;
    //     const index = newStudents.indexOf(value);
       
    //     if(e.target.checked)
    //     {           
    //         if (index === -1) {
    //         newStudents.push(value);
    //         } 
    //     }
    //     else{         
    //         newStudents.splice(index,1);          
    //     }
    //    setStaffadd(newStudents)
    // }

    const functionleftchangethreedots = (value) => { //for remove option in 3 dots
    
         var staffaction=staffaddleft;
   
        staffaction.push({"staffId":value,"action" : "Left"});

        setStaffaddleft(staffaction)
    }

    const functionrejectchangethreedots = (value) => { //for remove option in 3 dots
    
        var staffaction=staffaddapprove;
  
       staffaction.push({"staffId":value,"action" : "Delete"});

       setStaffaddapprove(staffaction)
   }

   const functionapprovechangethreedots = (value) => { //for remove option in 3 dots
    
    var staffaction=staffaddapprove;

   staffaction.push({"staffId":value,"action" : "Joined"});

   setStaffaddapprove(staffaction)
}

const functionpendingapprovechangethreedots = (value) => { //for remove option in 3 dots
    
    var staffaction=staffaddreject;

   staffaction.push({"staffId":value,"action" : "Joined"});

   setStaffaddreject(staffaction)
}

   

    const functionleftchange = (e,action) => {
    
        const value = e.target.value;
       
        var staffaction=staffaddleft;
        var indexs = staffaction.findIndex(a => a.staffId === value);
       
        if(e.target.checked)
        {           
            if (indexs === -1) {
                staffaction.push({"staffId":value,"action" : action});
            } 
        }
        else{           
           
            staffaction.splice(staffaction.findIndex(a => a.staffId === value),1);           
        }
       setStaffaddleft(staffaction)
    }
    const functionrejectchange = (e,action) => {
    
        const value = e.target.value;
       
        var staffaction=staffaddreject;
        var indexs = staffaction.findIndex(a => a.staffId === value);
       
        if(e.target.checked)
        {           
            if (indexs === -1) {
                staffaction.push({"staffId":value,"action" : action});
            } 
        }
        else{           
          
            staffaction.splice(staffaction.findIndex(a => a.staffId === value),1);           
        }
       setStaffaddreject(staffaction)
    }

    const functionpendingappchange = (e,action) => {
    
        const value = e.target.value;
       
        var staffaction=staffaddapprove;
        var indexs = staffaction.findIndex(a => a.staffId === value);
       
        if(e.target.checked)
        {           
            if (indexs === -1) {
                staffaction.push({"staffId":value,"action" : action});
            } 
        }
        else{           
          
            staffaction.splice(staffaction.findIndex(a => a.staffId === value),1);           
        }
       setStaffaddapprove(staffaction)
    }





    const chckerslctbx = (name) => {
        if($('.chckbxstffpg').is(":checked")) {         
            $('#actnstff1').removeClass('dis');                                 
        } else {         
            $('#actnstff1').addClass('dis');     
        }           
    }

        
   
    const chckerslctallbx2 = () => {
        if($('#tblcstslctallstff2').is(":checked")) {
            $('#actnstff2').removeClass('dis');
        } else {
            $('#actnstff2').addClass('dis');
        }
    }

    const chckerslctbx2 = () => {

        if($('.chckbxstffpg2').is(":checked")) {
            $('#actnstff2').removeClass('dis');
        } else {
            $('#actnstff2').addClass('dis');
        }
    }

    const chckerslctallbx3 = () => {

        if($('#tblcstslctallstff3').is(":checked")) {
            $('#actnstff3').removeClass('dis');
        } else {
            $('#actnstff3').addClass('dis');
        }
    }

    const chckerslctbx3 = () => {

        if($('.chckbxstffpg3').is(":checked")) {
            $('#actnstff3').removeClass('dis');
        } else {
            $('#actnstff3').addClass('dis');
        }
    }

    const chckerslctallbx4 = () => {

        if($('#tblcstslctallstff4').is(":checked")) {
            $('#actnstff4').removeClass('dis');
        } else {
            $('#actnstff4').addClass('dis');
        }
    }

    const chckerslctbx4 = () => {

        if($('.chckbxstffpg4').is(":checked")) {
            $('#actnstff4').removeClass('dis');
        } else {
            $('#actnstff4').addClass('dis');
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

    const [hasDropdown, setHasDropdown] = useState(false);

    const adclstodvonclkdrpdwnbtn = () => {
        //alert('works');
        setHasDropdown(!hasDropdown);
    }


    if(staffdata.length == 0) {
        $('#errdv1').show();
        $('#tbl1').hide();
    }
    else {
        $('#tbl1').show();
        $('#errdv1').hide();
    }

    if(staffdatapending.length == 0) {
        $('#errdv2').show();
        $('#tbl2').hide();
    }
    else {
        $('#tbl2').show();
        $('#errdv2').hide();
    }

   if(staffdatarejected.length == 0) {
        $('#errdv4').show();
        $('#tbl4').hide();
    }
    else {
        $('#tbl4').show();
        $('#errdv4').hide();
    }

    return <div>
        <Headerdashboard />
        {loader}
        <div className="be-wrapper be-login innerwrapper mt-4p" id="login">
            <div className="cs-pdng cstmmtpgg">
                <div className="wdth-ipdwvw-cs wdth-ipdwvw-cs22">
                    <div className="wdth-ipdwvw-csdvd wdth-ipdwvw-csdvd22">
                        <h1 className="kmcs_h1">Explore New &amp; Trending Design Jobs</h1>
                        <p className="kmcs_p mt-3">
                        Build a solid foundation for your UX/UI design knowledge and get a crash course into the inner workings of the design world. Whether you’re just getting started or have years of experience, ensuring that you correctly understand key concepts.
                        </p>
                    </div>
                </div>


                <div>
                    <div className="wd-84p mt-5">
                        <div className="col-sm-12 p-0">
                            {/* <div className="box mt-10px">
                                <div className="box-body">
                                    <form className="">
                                        <div className="form-group">
                                                <div className="bg-csmm">
                                                    <div className="mb-15px">
                                                        <div className="col-sm-12 cstsbx1">
                                                            <h1 className="text-md mb-1 _600 fs-20px clr-drkbl">Overall Engagement Score</h1>
                                                        </div>
                                                    </div>
                                                    <div className="row m-0 csdv1">
                                                        <div className="col-sm-4">
                                                            <div className="block clearfix">
                                                                <div className="">
                                                                    {/* <div className="easypiechart" dataPlugin="easyPieChart" dataPercent="40" data-size="150" dataScaleLength="2" dataLineWidth="12">
                                                                        <div>
                                                                            <h4 className="text-3x text-blucs _400">40</h4>
                                                                        </div>
                                                                    </div> */}
                                                                    {/* <PieChart width={250} height={250}>
                                                                        <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="orange" label />
                                                                    </PieChart>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-8 col-sm-offset-8 mt-5">
                                                            <h6 style={{color: "#333e63", fontSize: "18px"}}>How are we doing? Fair!</h6>
                                                            <p style={{fontSize: "14px"}}>Your students are happy and motivated some of the time. Use the analyze tools to see what's working for you and what can be improved.</p>
                                                            <small className="text-sm mb-1 _500" style={{color: "#333e63"}}> Total Responses: 250 </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </form>
                                </div>
                            </div> */}

                            <div className="mt-10px" id="survytbl">
                                <div>
                                    <div className="col-sm-12 cstsbx1">
                                        <div className="dshbrd-dvv1 row ml-0 mr-0 pb-0 mb--10px">
                                            <div className="col-sm-10 pl-0">
                                                <ul className="dshbrd-dvv1-ul">
                                                    <li className="dshbrd-dvv1-ul-li">
                                                        <a onClick={allstff} id="alstf" className="dshbrd-dvv1-ul-li-a active">All Staff ({staffdata.length})</a>
                                                    </li>
                                                    <li className="dshbrd-dvv1-ul-li">
                                                        <a onClick={pendingaproval} id="pendgaprvl" className="dshbrd-dvv1-ul-li-a">Pending Approval ({staffdatapending.length})</a>
                                                    </li>
                                                    {/* <li className="dshbrd-dvv1-ul-li">
                                                        <a onClick={staffinvtd} id="stfinvtd" className="dshbrd-dvv1-ul-li-a">Invited ({staffdatainvited.length})</a>
                                                    </li> */}
                                                    <li className="dshbrd-dvv1-ul-li">
                                                        <a onClick={stffreject} id="stfrjct" className="dshbrd-dvv1-ul-li-a">Rejected ({staffdatarejected.length})</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-sm-2 text-right pr-0">
                                                <Dropdown>
                                                    <Dropdown.Toggle className="adtchrbtn">
                                                        <svg focusable="false" width="24" height="24" viewBox="0 0 24 24"><path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z"></path></svg>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="tbl-drpdwnmnu">
                                                        <div className="tbl-dropdown-item dropdown-item crsr-dis">Add teacher</div>
                                                        <div className="tbl-dropdown-item dropdown-item crsr-dis">Bulk Import</div>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="alstfff" style={{display: 'block'}}>
                                    <div className="row">
                                        <div className="col-sm-12" id="stftabl">
                                        {/* <OverlayTrigger overlay={(props) => (
                                            <Tooltip className="tltp" {...props}>
                                                <div>Hii, I am a simple tooltip information!!!</div>
                                            </Tooltip>
                                            )}
                                            placement="right">
                                            <Button variant="warning">Tooltip Button</Button>
                                        </OverlayTrigger> */}

                                        <div id="errdv1">
                                            <div className="nodtadv1 brdr-top-none">
                                                <div>
                                                    <img className="nodtadv1img" src="https://res.cloudinary.com/infoi/image/upload/q_auto:best/v1634879425/AMA%20Icons/sidebar-empty-state-1_uwimwd.svg" width="150" alt="Error Image" />
                                                    <div className="nodtadv1txt">No Data Found</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <table className="table cstmbrdrdvcs" id="tbl1">
                                            <CheckboxGroup onChange={setOnChangee}>
                                                <thead>
                                                <tr>
                                                    <th className="brdr-n csstftblthcs">
                                                        <div>
                                                            <AllCheckerCheckbox type="checkbox" id="tblcstslctallstff1" className="alstfclsnmslctall1" title="Select all" onClick = {() => { chckerslctallbx(); }} onChange={e => { functionallleftstatus(e,actionstatus)}}  />
                                                        </div>
                                                    </th>
                                                    <th className="brdr-n">                                            
                                                        <div className="cstmmtactnbtn">
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtn dis cstmrdclrrr" id="actnstff1">
                                                                <span>Action</span>
                                                                <i className="fa fa-chevron-down ml-4 tblcstslctbtn-i"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow}>Delete</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        </div>
                                                    </th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n text-right pr-4">
                                                        {/* <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtnsrtng">
                                                                AZ <i className="fa fa-sort"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item crsr-dis">Sorting A-Z</div>
                                                                <div className="tbl-dropdown-item dropdown-item crsr-dis">Sorting Z-A</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown> */}
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody className="cstmpght" style={hasDropdown ? {minHeight: '170px'} : {}}>

                                                {staffdata.map((staffs) => (
                                                    
                                                        <tr>
                                                        <td className="pl-26px">
                                                            <div>
                                                                <Checkbox type="checkbox" id="tblcstslctstff1" title="Select" className="slct1id chckbxstffpg" onClick={() => { chckerslctbx(); }} onChange={e => { functionleftchange(e,actionstatus)}} value={staffs.staffId} />
                                                            </div>
                                                        </td>
                                                        <td className="cstmtblwd80pp"><div className="text-truncate" title={staffs.name} onClick={()=>{fetchstaffdetails(staffs.staffId); handleShow2(); }}><img src="../Images/user_green.png" className="tblusricnimg" /> {staffs.name}</div></td>
                                                        <td className="text-right pr-4">
                                                            <Dropdown autoClose="inside">
                                                                <Dropdown.Toggle className="tbl-drpbtnndw p-0">
                                                                    <a onClick={adclstodvonclkdrpdwnbtn} className="cstmbtndrpdwnpddd">
                                                                        <i className="fa fa-ellipsis-v" title="More options"></i>
                                                                    </a>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                    <div className="tbl-dropdown-item dropdown-item" onClick={()=>{fetchstaffdetails(staffs.staffId); handleShow2(); }}>View Details</div>
                                                                    <div className="tbl-dropdown-item dropdown-item" onClick={() => window.location = `mailto:(${staffs.email})`}>Send Email</div>
                                                                    <div className="tbl-dropdown-item dropdown-item" onClick={() => { functionleftchangethreedots(staffs.staffId); handleShow(); }} value={staffs.staffId}>Delete</div>
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

                                <div id="psndaprvlstfff" style={{display: 'none'}}>
                                    <div className="row">
                                        <div className="col-sm-12" id="stftabl">

                                        <div id="errdv2">
                                            <div className="nodtadv1 brdr-top-none">
                                                <div>
                                                    <img className="nodtadv1img" src="https://res.cloudinary.com/infoi/image/upload/q_auto:best/v1634879425/AMA%20Icons/sidebar-empty-state-1_uwimwd.svg" width="150" alt="Error Image" />
                                                    <div className="nodtadv1txt">No Data Found</div>
                                                </div>
                                            </div>
                                        </div>

                                        <table className="table cstmbrdrdvcs" id="tbl2">
                                            <CheckboxGroup onChange={setOnChangee}>
                                                <thead>
                                            
                                                <tr>
                                                    <th className="brdr-n csstftblthcs">
                                                        <div>
                                                            <AllCheckerCheckbox type="checkbox" id="tblcstslctallstff2" title="Select all" onClick={chckerslctallbx2} onChange={e => { functionallpendingapprstatus(e,actionstatus)}} />
                                                        </div>
                                                    </th>
                                                    <th className="brdr-n">                                            
                                                        <div className="cstmmtactnbtn">
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtn dis cstmrdclrrr" id="actnstff2">
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
                                                        {/* <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtnsrtng">
                                                                AZ <i className="fa fa-sort"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item crsr-dis">Sorting A-Z</div>
                                                                <div className="tbl-dropdown-item dropdown-item crsr-dis">Sorting Z-A</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown> */}
                                                    </th>
                                                </tr>

                                                
                                                </thead>
                                                <tbody className="cstmpght" style={hasDropdown ? {minHeight: '170px'} : {}}>

                                                {staffdatapending.map((staffs) => (
                                                <tr>
                                                    <td className="pl-26px">
                                                        <div>
                                                            <Checkbox type="checkbox" className="slct1id chckbxstffpg2" onClick={chckerslctbx2} id="tblcstslctstff1" title="Select" onChange={e => { functionpendingappchange(e,actionstatus)}} value={staffs.staffId} />
                                                        </div>
                                                    </td>
                                                    <td className="cstmtblwd80pp"><div className="text-truncate" title={staffs.name} onClick={()=>{fetchstaffdetails(staffs.staffId); handleShow2(); }}><img src="../Images/user_green.png" className="tblusricnimg" /> {staffs.name}</div></td>
                                                    <td className="text-right pr-4">
                                                        <Dropdown autoClose="inside">
                                                            <Dropdown.Toggle className="tbl-drpbtnndw p-0">
                                                                <a onClick={adclstodvonclkdrpdwnbtn} className="cstmbtndrpdwnpddd">
                                                                    <i className="fa fa-ellipsis-v" title="More options"></i>
                                                                </a>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={()=>{fetchstaffdetails(staffs.staffId); handleShow2(); }}>View Details</div>
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={() => { functionapprovechangethreedots(staffs.staffId); handleShow6(); }} value={staffs.staffId}>Approve</div>
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={() => { functionrejectchangethreedots(staffs.staffId); handleShow5(); }} value={staffs.staffId}>Reject</div>
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

                                {/* <div id="invtdstfff" style={{display: 'none'}}>
                                    <div className="row">
                                        <div className="col-sm-12" id="stftabl">
                                        <table className="table cstmbrdrdvcs">                                        
                                            <CheckboxGroup onChange={setOnChangee}>
                                                <thead>
                                                <tr>
                                                    <th className="brdr-n wd-15px">
                                                        <div>
                                                            <AllCheckerCheckbox type="checkbox" id="tblcstslctallstff3" title="Select all" onClick={chckerslctallbx3} />
                                                        </div>
                                                    </th>
                                                    <th className="brdr-n">                                            
                                                        <div className="cstmmtactnbtn">
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtn dis cstmrdclrrr" id="actnstff3">
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
                                                <tbody className="cstmpght">
                                                {staffdatainvited.map((staffs) => (
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <Checkbox type="checkbox" className="slct1id chckbxstffpg3" onClick={chckerslctbx3} id="tblcstslctstff1" title="Select" />
                                                        </div>
                                                    </td>
                                                    <td><div title="GHI" onClick={()=>{fetchstaffdetails(staffs.staffId); handleShow2(); }}><img src="../Images/user-blue-imgg.png" className="tblusricnimg" /> GHI</div></td>
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
                                                ))}
                                                
                                                </tbody>
                                            
                                            </CheckboxGroup>
                                        </table>
                                        </div>
                                    </div>
                                </div> */}

                                <div id="rjctstfff" style={{display: 'none'}}>
                                    <div className="row">
                                        <div className="col-sm-12" id="stftabl">
                                        <div id="errdv4">
                                            <div className="nodtadv1 brdr-top-none">
                                                <div>
                                                    <img className="nodtadv1img" src="https://res.cloudinary.com/infoi/image/upload/q_auto:best/v1634879425/AMA%20Icons/sidebar-empty-state-1_uwimwd.svg" width="150" alt="Error Image" />
                                                    <div className="nodtadv1txt">No Data Found</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <table className="table cstmbrdrdvcs" id="tbl4">                    
                                            <CheckboxGroup onChange={setOnChangee}>
                                                <thead>
                                                <tr>
                                                    <th className="brdr-n csstftblthcs">
                                                        <div>
                                                            <AllCheckerCheckbox type="checkbox" id="tblcstslctallstff4" title="Select all" onClick={chckerslctallbx4} onChange={e => { functionallRejectstatus(e,actionstatus)}} />
                                                        </div>
                                                    </th>
                                                    <th className="brdr-n">                                            
                                                        <div className="cstmmtactnbtn">
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtn dis cstmrdclrrr" id="actnstff4">
                                                                <span>Action</span>
                                                                <i className="fa fa-chevron-down ml-4 tblcstslctbtn-i"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow4}>Approve</div>
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={handleShow}>Delete</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        </div>
                                                    </th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n"></th>
                                                    <th className="brdr-n text-right pr-4">
                                                        {/* <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtnsrtng">
                                                                AZ <i className="fa fa-sort"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item crsr-dis">Sorting A-Z</div>
                                                                <div className="tbl-dropdown-item dropdown-item crsr-dis">Sorting Z-A</div>
                                                            </Dropdown.Menu>
                                                        </Dropdown> */}
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody className="cstmpght tblrspndpwntbdy" style={hasDropdown ? {minHeight: '170px'} : {}}>
                                                {staffdatarejected.map((staffs) => (
                                                <tr>
                                                    <td className="pl-26px">
                                                        <div>
                                                            <Checkbox type="checkbox" className="slct1id chckbxstffpg4" onClick={chckerslctbx4} onChange={e => { functionrejectchange(e,actionstatus)}} value={staffs.staffId} id="tblcstslctstff1" title="Select" />
                                                        </div>
                                                    </td>
                                                    <td className="cstmtblwd80pp"><div className="text-truncate" title={staffs.name} onClick={()=>{fetchstaffdetails(staffs.staffId); handleShow2(); }}><img src="../Images/user_brown.png" className="tblusricnimg" /> {staffs.name}</div></td>
                                                    <td className="text-right pr-4">
                                                        <Dropdown autoClose="inside">
                                                            <Dropdown.Toggle className="tbl-drpbtnndw p-0">
                                                                <a onClick={adclstodvonclkdrpdwnbtn} className="cstmbtndrpdwnpddd">
                                                                    <i className="fa fa-ellipsis-v" title="More options"></i>
                                                                </a>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={() => { functionpendingapprovechangethreedots(staffs.staffId); handleShow4(); }} value={staffs.staffId}>Approve</div>
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={() => { functionleftchangethreedots(staffs.staffId); handleShow(); }} value={staffs.staffId}>Delete</div>
                                                                
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
            <Button variant="secondary modalRedBtn" onClick={callstatusleftapi}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>

        

        <Modal show={show2} onHide={handleClose2} className="cstmmtmodal cstmlmodal2" >
            <Modal.Header className="cstmmdlinfodv" closeButton>
            </Modal.Header>
            <Modal.Body className="cstmmdlinfodv2 ht-250px">
                
                <div className="infomdvmdl1 col-sm-12 row m-0">
                    <div className="col-sm-2">
                        <img src="../Images/user_green.png" className="infomdvmdl1-img" alt="User Profile" />
                    </div>
                    <div className="col-sm-10">
                        <p className="infomdvmdl2">{staffname}</p>
                        <div className="infomdvmdl3 row m-0 col-sm-12 p-0">
                            <div className="col-sm-4 pl-0">
                                <i className="fa fa-user mr-7px"></i>
                                {staffdesignation}
                            </div>
                            <div className="infomdvmdl2dvdr m-0 col-sm-1 p-0">|</div>
                            <div className="col-sm-6 p-0 text-truncate" title={staffemail}>
                                <i className="fa fa-envelope mr-7px"></i>
                               {staffemail}
                            </div>
                        </div>
                    </div>
                </div>
                {staffdetails.map((staffs) => {
                    
                    if(staffs.gradename == "-") {
                        return(
                            <div>
                                <div className="infomdvmdl3 col-sm-12 mt-4">
                                    <h3 className="infomdvmdl3-h3">No Class generated yet</h3>
                                    <div readOnly className="infomdvmdl3-txtara">No Subject generated yet</div>
                                </div>
                            </div>
                        )
                    }
                    else {
                        if(staffs.gradename != "All") {
                        return(
                            <div>
                                <div className="infomdvmdl3 col-sm-12 mt-4">
                                    <h3 className="infomdvmdl3-h3">{staffs.gradename}</h3>
                                    <div readOnly className="infomdvmdl3-txtara">{staffs.Subject} </div>
                                </div>
                            </div>
                        )
                    }
                }

                })}


                
                
            </Modal.Body>
        </Modal>


        <Modal show={show4} onHide={handleClose4} className="cstmmtmodal" >
            <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to put this back?</p>
            </Modal.Body>
            <Modal.Footer className="brdr-tp">
            <Button variant="primary modalGrayBtn" onClick={handleClose4}>
                Close
            </Button>
            <Button variant="secondary modalRedBtn" onClick={callstatusrejectapi} style={{minWidth: '80px'}}>
                <span id="mdlbtnlodr2" className="hide">
                    <i className="fa fa-spinner fa-spin" style={{fontSize: '12px'}}></i>
                </span>
                <span id="mdlbtntxt2">Confirm</span>
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
            <Button variant="secondary modalRedBtn" onClick={callstatusapproveapi} style={{minWidth: '80px'}}>
                <span id="mdlbtnlodr2" className="hide">
                    <i className="fa fa-spinner fa-spin" style={{fontSize: '12px'}}></i>
                </span>
                <span id="mdlbtntxt2">Confirm</span>
            </Button>
            </Modal.Footer>
        </Modal>


        <Modal show={show6} onHide={handleClose6} className="cstmmtmodal" >
            <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to confirm?</p>
            </Modal.Body>
            <Modal.Footer className="brdr-tp">
            <Button variant="primary modalGrayBtn" onClick={handleClose6}>
                Close
            </Button>
            <Button variant="secondary modalRedBtn" onClick={callstatusapproveapi} style={{minWidth: '80px'}}>
                <span id="mdlbtnlodr2" className="hide">
                    <i className="fa fa-spinner fa-spin" style={{fontSize: '12px'}}></i>
                </span>
                <span id="mdlbtntxt2">Confirm</span>
            </Button>
            </Modal.Footer>
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


    </div>
}

// export default Details;
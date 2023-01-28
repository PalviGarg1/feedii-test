import React, { useState, useRef, useEffect } from "react";
import $ from 'jquery';
import { CheckboxGroup, AllCheckerCheckbox, Checkbox } from "@createnl/grouped-checkboxes";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../Content/Content/dashboard.css';
import '../Content/Content/tblcss.css';
import { SecondHeaderSchoolClassroomForClass } from '../secondheaderschclassroomclass';
import '../AllJs/dashboard-staff.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';
import { PieChart, Pie} from 'recharts';
import Dropdown from 'react-bootstrap/Dropdown';
import useLoader from "../useLoader";


export const UserClass = () => {
    const [loader, showLoader, hideLoader] = useLoader();


    useEffect(() => {
        showLoader();
        $('#login').hide();
      }, []);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);

    const [show5, setShow5] = useState(false);
    const handleClose5 = () => setShow5(false);
    const handleShow5 = () => setShow5(true);

    const [show6, setShow6] = useState(false);
    const handleClose6 = () => setShow6(false);
    const handleShow6 = () => setShow6(true);

    const [show7, setShow7] = useState(false);
    const handleClose7 = () => setShow7(false);
    const handleShow7 = () => setShow7(true);

    const [show8, setShow8] = useState(false);
    const handleClose8 = () => setShow8(false);
    const handleShow8 = () => setShow8(true);


    const dataFetchedRefclass = useRef(false);
    const dataFetchedRefteacher = useRef(false);
    const [studentlist, setstudentslist] = useState([]);
    const [stafflist, setstafflist] = useState([]);
    const [gradename, setgradename] = useState("");
    const [sectionname, setsectionname] = useState(""); 
    const [url, seturl] = useState(""); 

    const [studentname, setstudentname] = useState(""); 
    const [studentemail, setstudentemail] = useState("");
    const [studentdetails, setstudentdetails] = useState([]);
    const [studentrollno, setstudentrollno] = useState("");
    const [studentsubject, setstudentsubjects] = useState("");
    const [studentgrade, setstudentGrade] = useState("");

    const [staffname, setstaffname] = useState(""); 
    const [staffemail, setstaffemail] = useState("");
    const [staffdetails, setStaffDetails] = useState([]);
    const [staffdesignation, setstaffdesignation] = useState(""); 

    
   
    const fetchsesnschlbchid = sessionStorage.getItem('setsesnschlbchid');
    const sessionscholid = sessionStorage.getItem('schoolidsession');

      
    React.useEffect(
        ()=> {
       
       
            fetch('https://feedii-test-api.azurewebsites.net/api/Admin/getAllStudentdetailAdmin/' + sessionscholid + "-" + fetchsesnschlbchid, {
            method: 'GET'
            }) .then((response) => response.json())
           .then((data) => {
            if (dataFetchedRefclass.current) return;
            dataFetchedRefclass.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
            if (data.length != 0)
            {
                var grdnm = data[0].gradename; 
                var grdnmnum = grdnm.replace(/\D/g, "");
                setgradename(grdnmnum)
                setsectionname(data[0].sectionName)
                seturl(data[0].url)
                setstudentslist(data)
            }     
           
                    hideLoader();
                    $('#login').show();
                        
          })

          fetch('https://feedii-test-api.azurewebsites.net/api/Admin/getAdminClassStaffData/' +  fetchsesnschlbchid, {
            method: 'GET'
            }) .then((response) => response.json())
           .then((data) => {
            if (dataFetchedRefteacher.current) return;
            dataFetchedRefteacher.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
            if (data.length != 0)
            {
                var grdnm = data[0].gradename; 
                // var grdnmnum = grdnm.replace(/\D/g, "");
                // setgradename(grdnmnum)
                // setsectionname(data[0].sectionName)
                seturl(data[0].url)
                setstafflist(data)
            }     
                      
                        
          })

        })

        const fetchstudentdetails = (studentida) => {
           
                fetch('https://feedii-test-api.azurewebsites.net/api/Admin/getstudentSubject/' + studentida, {
                    method: 'GET'
                  }) .then((response) => response.json())
                  .then((data) => {    
                    
                    if(data.length==0)
                    {
                        setstudentname("Name")
                        setstudentemail("Email")
                        setstudentrollno("RollNo")
                        setstudentsubjects("Subject Name")
                        setstudentGrade("Grade")
                        setstudentdetails([data])
                    }
                    else{
                        setstudentname(data[0].name)
                        setstudentemail(data[0].email)
                        setstudentrollno(data[0].rollNo)
                        setstudentsubjects(data[0].Subjectname)
                        setstudentGrade(data[0].gradeName)
                        setstudentdetails(data)
                    }
                    

                  })
                  .catch(error =>{
                      console.log(error);
                  });     
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
    
    
   if(studentlist.length == 0) {
        $('#schclsloader').show();
        $('#schclsdata').hide();
    }
    else {
        $('#schclsdata').show();
        $('#schclsloader').hide();
    }


    const fetchstaffdetails = (staffid) => {
           // alert(staffid)
            fetch('https://feedii-test-api.azurewebsites.net/api/Staff/getStaffClassroom/' + staffid, {
                method: 'GET'
              }) .then((response) => response.json())
              .then((data) => {    
                
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

    return <div>
        <SecondHeaderSchoolClassroomForClass />
        {loader}
        <div className="be-wrapper be-login innerwrapper" id="login">
          
            <div className="cs-pdng" id='schclsloader'>
                <div className="pgnodtadv1">
                    <div>
                        <img className="pgnodtadv1img" src="https://res.cloudinary.com/infoi/image/upload/q_auto:best/v1634879425/AMA%20Icons/sidebar-empty-state-1_uwimwd.svg" width="200" alt="Error Image" />
                        <div className="pgnodtadv1txt">No Student List Found</div>
                    </div>
                </div>
            </div>

            <div className="cs-pdng" id='schclsdata'>

                <div style={{width: '70%', margin: '0 auto'}}>
                    <div>
                        <div className="col-sm-12 mb-5 p-0">
                            <NavLink to="/sch/classroom" className="srvylnkbtnnn">
                                <i className="fa fa-chevron-left mr-2"></i>
                                <span>Back to classroom</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="wdth-ipdwvw-cs mbvw-imgwd" style={{backgroundImage: `url(${url})`}}>
                    <div className="wdth-ipdwvw-csdvd">
                        <div className="srvydvvddv1">
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
                    </div>
                    {/* <div className="wdth-ipdwvw-csdvd">
                        <div style={{marginTop: '15%', width: '70%', marginLeft: '5%'}}>
                            <p className="kmcs_p" style={{color: '#333e63'}}>Class : {classname}</p>
                            <div style={{fontSize: '16px', color: '#333e63'}}>Section : {sectionname}</div>
                        </div>
                    </div> */}
                </div>


                <div className="row">
                    <div className="col-md-2 col-lg-2"></div>
                    <div className="col-md-9 pr-5px">

                        {/* Teachers */}

                        <div id="survytbl"> 
                            <div>
                                <div className="col-sm-12 p-0 mbvw-mt3">
                                    <p className="kmcs_p mt-5 bluclr mt-5">Teacher's</p>
                                </div>
                            </div>

                            <div className="mt-10px">
                                <div>
                                    <div className="col-sm-12 cstsbx1">
                                        <div className="dshbrd-dvv1 row ml-0 mr-0 mt-0 pb-0 mb--10px">
                                            <div className="col-sm-10 pl-0">
                                                <ul className="dshbrd-dvv1-ul">
                                                    <li className="dshbrd-dvv1-ul-li">
                                                        <a className="dshbrd-dvv1-ul-li-a active">All Teachers ({stafflist.length})</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-sm-2 text-right pr-0">
                                                <Dropdown>
                                                    <Dropdown.Toggle className="adtchrbtn crsr-dsble">
                                                        <svg focusable="false" width="24" height="24" viewBox="0 0 24 24"><path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z"></path></svg>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="tbl-drpdwnmnu">
                                                        <div className="tbl-dropdown-item dropdown-item crsr-dis">Add teacher</div>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{display: 'block'}}>
                                    <div className="row">
                                        <div className="col-sm-12" id="stftabl">
                                        <table className="table" id="cstmtblfrschl">
                                                
                                                <tbody className="cstmtbdyy schclstbtbdy">
                                                {stafflist.map((staff)=>(
                                                        <tr>
                                                        <td></td>
                                                        <td className="wd-50p"><div title={staff.StaffName} onClick={()=>{fetchstaffdetails(staff.StaffId); handleShow3(); }}><img src="../Images/user_green.png" className="tblusricnimg" /> {staff.StaffName} </div></td>
                                                        <td className="text-right">
                                                            {/* <button className="tchrnmbtn">
                                                                <i className="fa fa-user"></i>
                                                                Class Teacher
                                                            </button> */}
                                                        </td>
                                                        <td className="text-right pr-4">
                                                            <Dropdown>
                                                                <Dropdown.Toggle className="tbl-drpbtnndw">
                                                                    <i className="fa fa-ellipsis-v" title="More options"></i>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                    <div className="tbl-dropdown-item dropdown-item" onClick={()=>{fetchstaffdetails(staff.StaffId); handleShow3(); }}>View Details</div>
                                                                    <div className="tbl-dropdown-item dropdown-item" onClick={()=>{handleShow4(); }}>Make subject teacher</div>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
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



                        {/* Students */}

                        <div id="survytbl"> 
                            <div>
                                <div className="col-sm-12 p-0 mbvw-mt3">
                                    <p className="kmcs_p mt-5 bluclr mt-5">Student's</p>
                                </div>
                            </div>

                            <div className="mt-10px">
                                <div>
                                    <div className="col-sm-12 cstsbx1">
                                        <div className="dshbrd-dvv1 row ml-0 mr-0 mt-0 pb-0 mb--10px">
                                            <div className="col-sm-10 pl-0">
                                                <ul className="dshbrd-dvv1-ul">
                                                    <li className="dshbrd-dvv1-ul-li">
                                                        <a onClick={allstff222} id="alstf222" className="dshbrd-dvv1-ul-li-a active">All Students ({studentlist.length})</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-sm-2 text-right pr-0">
                                                <Dropdown>
                                                    <Dropdown.Toggle className="adtchrbtn crsr-dsble">
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
                                        <table className="table" id="cstmtblfrschl">
                                            <CheckboxGroup onChange={setOnChangee222}>
                                                
                                                <tbody className="cstmtbdyy">

                                                {studentlist.map((students)=>(
                                                <tr>
                                                    <td></td>
                                                    <td><div title={students.name} onClick={()=>{fetchstudentdetails(students.studentID); handleShow2(); }}><img src="../Images/user-blue-imgg.png" className="tblusricnimg" /> {students.name}</div></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="text-right pr-4">
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tbl-drpbtnndw">
                                                                <i className="fa fa-ellipsis-v" title="More options"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                <div className="tbl-dropdown-item dropdown-item" onClick={()=>{fetchstudentdetails(students.studentID); handleShow2(); }}>View Details</div>
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
        

        <Modal show={show2} onHide={handleClose2} className="cstmmtmodal cstmlmodal2" >
            <Modal.Header className="cstmmdlinfodv" closeButton>
            </Modal.Header>
            <Modal.Body className="cstmmdlinfodv2 srvycstmhtmdlbd">
                <div className="infomdvmdl1 col-sm-12 row m-0">
                    <div className="col-sm-2">
                        <img src="../Images/user-blue-imgg.png" className="infomdvmdl1-img" alt="User Profile" style={{borderRadius: '50%'}} />
                    </div>
                    <div className="col-sm-10">
                        <p className="infomdvmdl2">{studentname}</p>
                        <div className="infomdvmdl3 row m-0 col-sm-12 p-0">
                            <div className="col-sm-4 p-0">
                                <i className="fa fa-user mr-7px"></i>
                                Student
                            </div>
                            <div className="infomdvmdl2dvdr m-0 col-sm-1 p-0">|</div>
                            <div className="col-sm-6 p-0 text-truncate" title={studentemail}>
                                <i className="fa fa-envelope mr-7px"></i>
                               {studentemail}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="infomdvmdl3 col-sm-12 mt-10px">
                    <h3 className="infomdvmdl3-h3">{studentgrade}</h3>
                    <div readOnly className="infomdvmdl3-txtara"> {studentsubject}</div>
                </div>
                
            </Modal.Body>
        </Modal>


        <Modal show={show3} onHide={handleClose3} className="cstmmtmodal cstmlmodal2" >
            <Modal.Header className="cstmmdlinfodv" closeButton>
            </Modal.Header>
            <Modal.Body className="cstmmdlinfodv2 srvycstmhtmdlbd">
                
            <div className="infomdvmdl1 col-sm-12 row m-0">
                    <div className="col-sm-2">
                        <img src="../Images/user_green.png" className="infomdvmdl1-img" alt="User Profile" />
                    </div>
                    <div className="col-sm-10">
                        <p className="infomdvmdl2">{staffname}</p>
                        <div className="infomdvmdl3 row m-0 col-sm-12 p-0">
                            <div className="col-sm-4 p-0">
                                <i className="fa fa-user mr-7px"></i>
                                Teacher
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
                    if (staffs.Grade != "All")
                    {
                        return(
                            <div>
                            <div className="infomdvmdl3 col-sm-12 mt-10px">
                                <h3 className="infomdvmdl3-h3">{staffs.gradename}</h3>
                                <div readOnly className="infomdvmdl3-txtara">{staffs.Subject} </div>
                            </div>
                            
                                </div>
                        )
                    }
                   
                })}
            </Modal.Body>
        </Modal>

        <Modal show={show4} onHide={handleClose4} className="cstmmtmodal" >
            <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to change?</p>
            </Modal.Body>
            <Modal.Footer className="brdr-tp">
            <Button variant="primary modalGrayBtn" onClick={handleClose4}>
                Close
            </Button>
            <Button variant="secondary modalRedBtn" onClick={handleClose4} style={{minWidth: '80px'}}>
                <span id="mdlbtnlodr2" className="hide">
                    <i className="fa fa-spinner fa-spin" style={{fontSize: '12px'}}></i>
                </span>
                <span id="mdlbtntxt2">Confirm</span>
            </Button>
            </Modal.Footer>
        </Modal>



    </div>
}

// export default Details;
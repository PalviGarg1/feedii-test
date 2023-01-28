import React, { useState, useRef, useEffect } from "react";
import $ from 'jquery';
import { CheckboxGroup, AllCheckerCheckbox, Checkbox } from "@createnl/grouped-checkboxes";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../Content/Content/dashboard.css';
import '../Content/Content/tblcss.css';
import { Headerstuclssrm } from '../headerstuclassroom';
import '../AllJs/dashboard-staff.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';
import { PieChart, Pie} from 'recharts';
import Dropdown from 'react-bootstrap/Dropdown';
import useLoader from "../useLoader";


export const UserstuClass = () => {
    const [loader, showLoader, hideLoader] = useLoader();

    useEffect(() => {
        showLoader();
        $('#login').hide();
      }, []);



    const dataFetchedRefstudent = useRef(false);
    const [studentteacherlist, setteacherlist] = useState([]);
    const [gradename, setgradename] = useState("");
    const [sectionname, setsectionname] = useState(""); 
    const [url, seturl] = useState(""); 
    const [staffname, setstaffname] = useState(""); 
    const [staffemail, setstaffemail] = useState("");
    const [staffdetails, setStaffDetails] = useState([]);
    const [staffdesignation, setstaffdesignation] = useState(""); 

    const sessionstudentid = sessionStorage.getItem('studentidsession');


    React.useEffect(
        ()=> {
                 //studentid
            fetch('https://feedii-test-api.azurewebsites.net/api/Student/getStudentStaffs/' + sessionstudentid, {
            method: 'GET'
          }) .then((response) => response.json())
          .then((data) => {
            if (dataFetchedRefstudent.current) return;
            dataFetchedRefstudent.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
            if (data.length != 0)
            {
                var grdnm = data[0].gradename;    
                var grdnmnum = grdnm.replace(/\D/g, "");
    
               setgradename(grdnmnum)
               setsectionname(data[0].sectionname)
               seturl(data[0].URL)
            }
           
           
            setteacherlist(data)
            hideLoader();
            $('#login').show();
            
          })
        })


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

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
        $('#stfrjct222').addClass('active');
        $('#pendgaprvl222').removeClass('active');
        $('#stfinvtd222').removeClass('active');
        $('#alstf222').removeClass('active');

        $('#alstfff222').hide();
        $('#psndaprvlstfff222').hide();
        $('#invtdstfff222').hide();
        $('#rjctstfff222').show();
        
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

    const [onChangee, setOnChangee] = React.useState({});
    const [showOnChangee, setShowOnChangee] = React.useState(true);

    const chckerslctallbx = () => {

        if($('#tblcstslctallstff1').is(":checked")) {
            $('#actnstff1').removeClass('dis');
        } else {
            $('#actnstff1').addClass('dis');
        }
    }

    const chckerslctbx = () => {

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

    const fetchstaffdetails = (staffid) => {
        
            fetch('https://feedii-test-api.azurewebsites.net/api/Staff/getStudentStaffClassroom/' + staffid + "-" + sessionstudentid, {
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
    
    
        if(studentteacherlist.length == 0) {
            $('#stuclsloader').show();
            $('#stuclsdata').hide();
        }
        else {
            $('#stuclsdata').show();
            $('#stuclsloader').hide();
        }
    

    return <div>
        <Headerstuclssrm />
        {loader}
        <div className="be-wrapper be-login innerwrapper mt-4p" id="login">

            
        <div className="cs-pdng" id='stuclsloader'>
            <div className="pgnodtadv1">
                <div>
                    <img className="pgnodtadv1img" src="https://res.cloudinary.com/infoi/image/upload/q_auto:best/v1634879425/AMA%20Icons/sidebar-empty-state-1_uwimwd.svg" width="200" alt="Error Image" />
                    <div className="pgnodtadv1txt">No Data Found</div>
                </div>
            </div>
        </div>
          
        <div className="cs-pdng" id='stuclsdata'>
            
            <div className="wdth-ipdwvw-cs mbvw-imgwd" style={{backgroundImage: `url(${url})`}}>
                <div className="wdth-ipdwvw-csdvd">
                    <div className="srvydvvddv1">
                        <div className="srvydvvddv2">
                            <div>
                                <div className="srvydvvddv3">{gradename}</div>            
                            </div>
                            <div className="srvydvvddv4">
                                <p className="kmcs_p" style={{color: 'rgb(51, 62, 99)'}}>Class</p>
                                <div className="srvydvvddv5">Section  {sectionname}</div>
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

                        {/* for teacher */}

                        <div id="survytbl"> 
                            <div>
                                <div className="col-sm-12 p-0 mbvw-mt3">
                                    <p className="kmcs_p mt-5 bluclr mt-5">Your Teacher's</p>
                                </div>
                            </div>

                            <div className="mt-10px">
                                <div>
                                    <div className="col-sm-12 cstsbx1">
                                        <div className="dshbrd-dvv1 row ml-0 mr-0 mt-0 pb-0 mb--10px">
                                            <div className="col-sm-10 pl-0">
                                                <ul className="dshbrd-dvv1-ul">
                                                    <li className="dshbrd-dvv1-ul-li">
                                                        <a onClick={allstff} id="alstf" className="dshbrd-dvv1-ul-li-a active">All Teachers ({studentteacherlist.length})</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* <div className="col-sm-2 text-right pr-0">
                                                <div className="adtchrbtn pntrevnt-n dis crsr-dsble" style={{margin: '7px 20px 0 0'}}>
                                                    <svg focusable="false" width="24" height="24" viewBox="0 0 24 24"><path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z"></path></svg>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>

                                <div id="alstfff" style={{display: 'block'}}>
                                    <div className="row">
                                        <div className="col-sm-12" id="stftabl">
                                        <table className="table">
                                            <CheckboxGroup onChange={setOnChangee}>
                                                {/* <thead>
                                                <tr>
                                                    <th className="brdr-n wd-15px">
                                                        <div>
                                                            <AllCheckerCheckbox type="checkbox" className=" dis crsr-dsble" disabled id="tblcstslctallstff1" title="Select all" />
                                                        </div>
                                                    </th>
                                                    <th className="brdr-n">                                            
                                                        <div>
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="tblcstslctbtn dis pntrevnt-n cstmrdclrrr" id="actnstff1">
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
                                                </thead> */}
                                                <tbody className="ht-auto">
                                                   {studentteacherlist.map((teachers)=>(
                                                        <tr>
                                                        <td className="wd-2p">
                                                            {/* <div>
                                                                <Checkbox type="checkbox" id="tblcstslctstff1" title="Select" className="slct1id chckbxstffpg dis crsr-dsble" disabled />
                                                            </div> */}
                                                        </td>
                                                        <td className="w-50p"><div title={teachers.name} onClick={()=>{fetchstaffdetails(teachers.staffId); handleShow2(); }}><img src="../Images/user_green.png" className="tblusricnimg" /> {teachers.name}</div></td>
                                                        <td className="text-right pr-4">
                                                            <Dropdown>
                                                                <Dropdown.Toggle className="tbl-drpbtnndw">
                                                                    <i className="fa fa-ellipsis-v" title="More options"></i>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                    <div className="tbl-dropdown-item dropdown-item" onClick={()=>{fetchstaffdetails(teachers.staffId); handleShow2(); }}>View Details</div>
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
            <Modal.Body className="cstmmdlinfodv2 ht-auto">
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
                            <div className="infomdvmdl2dvdr col-sm-1 p-0 m-0">|</div>
                            <div className="col-sm-6 p-0 text-truncate" title={staffemail}>
                                <i className="fa fa-envelope mr-7px"></i>
                                {staffemail}
                            </div>
                        </div>
                    </div>
                    
                </div>
                {staffdetails.map((staffs) => {
                    if(staffs.gradename != "All") {
                        return (
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


    </div>
}

// export default Details;
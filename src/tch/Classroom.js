import React, { useState, useRef, useEffect }  from "react";
import $ from 'jquery';
import '../Content/Content/clsromcss.css';
import { SecondHeaderTchrrrdashboard } from '../secondheadertchrdashboard';
import '../AllJs/dashboard-staff.js';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import useLoader from "../useLoader";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { groupBy } from '@progress/kendo-data-query';


export const ClassroomtchPagee = () => {
    const [loader, showLoader, hideLoader] = useLoader();

    useEffect(() => {
        showLoader();
        $('#login').hide();
      }, []);

      

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => {
        setShowModal(true);
    }

    const dataFetchedRefclasstch = useRef(false);
    const dataFetchedRefsubjecttch = useRef(false);
    const dataFetchedRefclass = useRef(false);
    const [classListtch, setclasseslisttch] = useState([]);
    const [listsubjectbatch, setlistsubjectbatch] = useState([]);
    const [listtbatch, setlistbatch] = useState([]);
    const [subjectlist, setsubjectlist] = useState([]);
    const sesnschlbchid = '0';
    var staffidsession = sessionStorage.getItem("staffidsession");
    const [staffstatuscheck, setstaffstatuscheck] = useState([]);


    React.useEffect(
        ()=> {
       
            //alert(staffidsession);
            fetch('https://feedii-test-api.azurewebsites.net/api/Staff/getStaffClassroom/' + staffidsession, {
            method: 'GET'
            }) .then((response) => response.json())
            .then((data) => {
            if (dataFetchedRefclasstch.current) return;
            dataFetchedRefclasstch.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
           
            setclasseslisttch(data);

            if(data.length == 0)
            {
                $('#no-dtaclsrmtchr').removeClass('hide');
                $('#dtaclsrmtchr').addClass('hide');

            }
            else if (data.length === 1 && data[0].Grade == "-")
            {
                $('#no-dtaclsrmtchr').removeClass('hide');
                $('#dtaclsrmtchr').addClass('hide');
            }
            else{
                $('#no-dtaclsrmtchr').addClass('hide');
                $('#dtaclsrmtchr').removeClass('hide');
            }

            

            fetch('https://feedii-test-api.azurewebsites.net/api/Staff/getAllSubject' , {
                method: 'GET'
                }) .then((response) => response.json())
              .then((data) => {
                if (dataFetchedRefsubjecttch.current) return;
                dataFetchedRefsubjecttch.current = true;
                
                var objj = JSON.stringify(data);
                var parse = JSON.parse(objj);
               
                setlistsubjectbatch(data)
                
                
              })

              fetch('https://feedii-test-api.azurewebsites.net/api/Staff/getAllbatch/' + staffidsession , {
                method: 'GET'
                }) .then((response) => response.json())
              .then((data) => {
                if (dataFetchedRefclass.current) return;
                dataFetchedRefclass.current = true;
                
                var objj = JSON.stringify(data);
                var parse = JSON.parse(objj);
               
                setlistbatch(data)                   
                
              })
            
            hideLoader();
            $('#login').show();
            
          })


        })


        const sndssntchbachid = (battchhid) => {
            
            sessionStorage.setItem("setsesntchbchid" , battchhid);
        }

        const uniqueTags = [];
        classListtch.map(clist => {
            if (clist.Grade != "All" && clist.Grade != "-")
            {
                if (uniqueTags.indexOf(clist.Grade) === -1) {
                    uniqueTags.push(clist.Grade)
                }
            }
        });

        const [value, setValue] =  useState([]);
        

        const [sbjctnmss, setsbjctnmss] =  useState([]);
        
        const sbjctvall = 2;
        const sbjctnm = 'English';
        const subjectlistt = [];

     

       const subjectlistwithid = [];
       

       for (const [i, subj] of listsubjectbatch.entries()) {
        subjectlistwithid.push({ value: subj.SubjectID, label: subj.subjectname})
      }
           
        

        const [selectedsbjctValue, setselectedsbjctValue] = useState();

        const handleChange1 = e => {
            setselectedsbjctValue(e.value);
        }

          
       const gradssdatalstt = [];
       for (const [i, grd] of listtbatch.entries()) {
        gradssdatalstt.push({ value: grd.batchID, label: grd.gradename})
      }
        

        const [selectedValue, setSelectedValue] = useState([]);

        const handleChangee = e => {
            setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
        }

        const slctclsdatadrpdwn = () => {    
            var opnvl = $('#selctclsdta .css-12jo7m5').text();
           
        }

        const svv = () => {

            $('#mdlbtnlodr').removeClass('hide');
            $('#mdlbtntxt').addClass('hide');

            var subjctdv = $('#slctsbjcct #react-select-3-placeholder').text();
            var subjerr = $('#slctsuberr');
            var clsdv = $('#selctclsdta #react-select-5-placeholder').text();
            var clserr = $('#slctclserr');
            var sbjvl = $('#slctcdsbjcval').text();
            var clsvl = $('#slctcdclsval').text();
            var clsvall = clsvl.replace('[', '').replace(']','').replace(' ','');
            var batchidstring = clsvall.replace(/\s*\n\s*/g,"");
            
            if(sbjvl == "" || sbjvl == null || clsvl == "" || clsvl == "[]") {
            
                $('#mdlbtntxt').removeClass('hide');
                $('#mdlbtnlodr').addClass('hide');
                subjerr.show();
                clserr.show();
            }
           
            else {

                $('#mdlbtnlodr').removeClass('hide');
                $('#mdlbtntxt').addClass('hide');
                
                subjerr.hide();
                clserr.hide();

                fetch('https://feedii-test-api.azurewebsites.net/api/staff/saveStaffSubjectbatch', {
                    method: 'POST', 
                    headers: {
                        'Accept': 'application/json',  
                        'Content-Type': 'application/json',  
                        'Access-Control-Allow-Origin': '*',  
                        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',  
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify({ 
                            subjectId: sbjvl, 
                            batchId: batchidstring,
                            staffId: staffidsession
                        })
                    }).then((data) => {
                       
                        window.location.href = "/tch/classroom";
                        console.log("test data - " + data);
                    })
            }
        }

        const fetchstatuscheck = () => {
            
                fetch('https://feedii-test-api.azurewebsites.net/api/Staff/getStaffStatusdata/' + staffidsession, {
                    method: 'GET'
                  }) .then((response) => response.json())
                  .then((data) => {    
                   
                    setstaffstatuscheck(data[0].StaffStatus);             
        
                  })
                  .catch(error =>{
                      console.log(error);
                  });     
            }
    
            console.log(subjectlistwithid);

    return <div>
        <SecondHeaderTchrrrdashboard />
        {loader}
        <div className="be-wrapper be-login innerwrapper" id="login">
            
            <div className="padding">

                <div id="no-dtaclsrmtchr">
                    <div className="clsrmnoclsnwd">
                        <div>
                            <img src="https://res.cloudinary.com/infoi/image/upload/v1670915604/feedii/empty_class_pg_y3ekqk.svg" width="150" alt="Image" />
                            <p className="clsrmnoclsnwdp">Create your class by clicking on the below button.</p>
                            <button className="clsrmnoclsnwdbtn" type="button" onClick={() => {fetchstatuscheck(); handleShowModal();}}>
                                <i className="fa fa-plus"></i>
                                Add Class
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row hide" id="dtaclsrmtchr">
                    <div className="col-md-2 col-lg-2"></div>
                    <div className="col-md-9">
                        <div className="mb-30px">
                            <div className="col-sm-12">
                            {uniqueTags.map((classesuni)=>(
                                <div className="col-sm-12 mb-5">
                                    <div className="clsrmdv1">
                                        <h1 className="clshdngh1">Class {classesuni} </h1>
                                    </div>
                                    <div className="clsrmdv2 col-sm-12 row">                                        
                                
                                        {classListtch.map((classes)=>{

                                            if(classesuni == classes.Grade && classesuni != "All") {
                                                
                                                
                                            return (<div className="col-sm-4 mb-4">
                                                <Link to='/tch/class' onClick={()=>{sndssntchbachid(classes.batchId);}} className="tlbxdvvda">
                                                    <div className="clsrmdv2-1">
                                                        <div className="clsrmdv2-2-dv1">
                                                            <div className="clsrmdv2-2-dv1-a1">
                                                                <img src="https://res.cloudinary.com/infoi/image/upload/q_auto/v1653892764/Dashboard/lvvl_lkiiky.svg" height="22" style={{verticalAlign: 'top', marginRight: '5px'}} />
                                                                <span> Section {classes.Section}</span>
                                                            </div>
                                                            <div className="clsrmdv2-2-dv1-a2">
                                                            <Dropdown>
                                                                <Dropdown.Toggle className="clsrmdrpdwn crsr-dsble">
                                                                    <i className="fa fa-ellipsis-v"></i>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu className="tbl-drpdwnmnu">
                                                                    <div className="tbl-dropdown-item dropdown-item crsr-dsbl">Edit Class</div>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>)
                                            }                                 
                                        })}                                     
                                    </div>
                                </div>                                
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </div>


        


        <Modal show={showModal} onHide={handleCloseModal} className="cstmmtmodal" >

            {(() => {
                if(staffstatuscheck == "Joined") {
                    return(
                        <div>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Class</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p className="clsmdlpcsd">Here you can choose your subject & class and add them to your classroom.</p>
                                <div>
                                    <div className="row m-0 mb-4">
                                        <div className="col-sm-4">
                                            <label className="mdllblcsds">Subject</label>
                                        </div>
                                        <div className="col-sm-8">
                                            <Select id="slctsbjcct" options={subjectlistwithid} value={subjectlistwithid.find(obj => obj.value === selectedsbjctValue)} onChange={handleChange1} />
                                            <div className="errslct" id="slctsuberr">Please select your subject</div>
                                        </div>
                                        {selectedsbjctValue && <div style={{ display: 'none' }}>
                                            <div id="slctcdsbjcval">{selectedsbjctValue}</div>
                                        </div>}
                                    </div>
                                    <div className="row m-0 mb-3">
                                        <div className="col-sm-4">
                                            <label className="mdllblcsds">Class</label>
                                        </div>
                                        <div className="col-sm-8">
                                            <Select id="selctclsdta" options={gradssdatalstt} value={gradssdatalstt.filter(obj => selectedValue.includes(obj.value))} onChange={handleChangee} isMulti isClearable />
                                            <div className="errslct" id="slctclserr">Please select your class</div>
                                        </div>
                                        {selectedValue && <div style={{ display: 'none' }}>
                                            <div id="slctcdclsval">{JSON.stringify(selectedValue, null, 2)}</div>
                                        </div>}
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer className="brdr-tp">
                                <Button variant="primary modalGrayBtn" onClick={handleCloseModal}>
                                    Cancel
                                </Button>
                                <Button variant="secondary modalRedBtn" onClick= {svv} style={{minWidth: '60px'}}>
                                    <span id="mdlbtnlodr" className="hide">
                                        <i className="fa fa-spinner fa-spin" style={{fontSize: '12px'}}></i>
                                    </span>
                                    <span id="mdlbtntxt">Add</span>
                                </Button>
                            </Modal.Footer>
                        </div>
                    );
                }
                else {

                    return(
                        <div>
                            <Modal.Header closeButton>
                                <Modal.Title>Alert</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p className="clsmdlpcsd">Please approve your account from your admin then you can create your classes.</p>
                            </Modal.Body>
                            <Modal.Footer className="brdr-tp">
                                <Button variant="primary modalGrayBtn" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </div>
                    );

                }
            })()}
            
        </Modal>


    </div>
}

// export default Details;
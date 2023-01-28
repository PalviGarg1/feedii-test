import React, { useState, useRef, useEffect } from "react";
import $ from 'jquery';
import '../Content/Content/clsromcss.css';
import { SecondHeaderSchoolClassroom} from '../secondheaderschclassroom';
import '../AllJs/dashboard-staff.js';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import useLoader from "../useLoader";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';


export const ClassroomPage = () => {
    const [loader, showLoader, hideLoader] = useLoader();


    useEffect(() => {
        showLoader();
        $('#login').hide();
      }, []);

    const dataFetchedRefclass = useRef(false);
    const [classList, setclasseslist] = useState([]);
    const sesnschlbchid = '0';

    const sessionscholid = sessionStorage.getItem('schoolidsession');

    React.useEffect(
        ()=> {
       
           
            fetch('https://entity-feediiapi.azurewebsites.net/api/Admin/getclassesdata/' + sessionscholid, {
            method: 'GET'
          }) .then((response) => response.json())
          .then((data) => {
            if (dataFetchedRefclass.current) return;
            dataFetchedRefclass.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
           
            setclasseslist(data)
            if(data.length == 0 || data.length == 1) {
                $('#no-dtaclsrmsch').removeClass('hide');
                $('#dtaclsrmsch').addClass('hide');
            }
            else {
                $('#no-dtaclsrmsch').addClass('hide');
                $('#dtaclsrmsch').removeClass('hide');
            }
            hideLoader();
            $('#login').show();
            
          })
        })

        const sndclsidtoclspg = (battchhid) => {
           
        sessionStorage.setItem( "setsesnschlbchid" , battchhid);
        }

        const uniqueTags = [];
        classList.map(clist => {
            if (clist.gradename != "All" && clist.gradename != "All")
            {
                if (uniqueTags.indexOf(clist.gradename) === -1) {
                    uniqueTags.push(clist.gradename)
                }
            }
        });

        const [showModal, setShowModal] = useState(false);
        const handleCloseModal = () => setShowModal(false);
        const handleShowModal = () => {
            setShowModal(true);
        }

        const classlistt = [
            {value: 'Class - 1st', label: 'Class - 1st'},
            {value: 'Class - 2nd', label: 'Class - 2nd' },
            {value: 'Class - 3rd', label: 'Class - 3rd' },
            {value: 'Class - 4th', label: 'Class - 4th' },
            {value: 'Class - 5th', label: 'Class - 5th' }
        ]
        
        const [selectedclassValue, setselectedclassValue] = useState();

        const handleChange1 = e => {
            setselectedclassValue(e.value);
        }

        const sctnlist = [
            {value: 'Section - A', label: 'Section - A'},
            {value: 'Section - B', label: 'Section - B' },
            {value: 'Section - C', label: 'Section - C' },
            {value: 'Section - D', label: 'Section - D' }
        ]


        const [selectedsctnValue, setSelectedsctnValue] = useState([]);

        const handleChangee = e => {
            setSelectedsctnValue(Array.isArray(e) ? e.map(x => x.value) : []);
        }

        const svv = () => {            

           $('#mdlbtnlodr').removeClass('hide');
           $('#mdlbtntxt').addClass('hide');

           var clsnmerr = $('#mdlclsertxt');
           var sctnnmerr = $('#mdlsctnvlerr');
           var clsnm = $('.mdlclsnmer').val();
           var sctnnm = $('.mdlsctnvl').val();
           
           if(clsnm == "" || clsnm == null || sctnnm == "" || sctnnm == null) {
           
               $('#mdlbtntxt').removeClass('hide');
               $('#mdlbtnlodr').addClass('hide');
               clsnmerr.show();
               sctnnmerr.show();
           }
           else {

               clsnmerr.hide();
               sctnnmerr.hide();

               $('#mdlbtnlodr').removeClass('hide');
               $('#mdlbtntxt').addClass('hide');
               
               handleCloseModal();

           }
        }

        let inum = 1;

        const addinptvl = () => {
            $('#dynmcfldmdl').append('<div class="row m-0 mt-2" id="row' + inum + '"><div class="col-sm-11 pl-0"><input type="text" placeholder="Add Section Name" class="tekila6 mdlsctnvl" /></div><div class="col-sm-1 p-0"><button class="mdlbtncsdd rmvclsmdldv" id="'+inum+'"><i title="Add more sections" class="rmvicnred fa fa-minus"></i></button></div></div>');
            inum++;
        }
        
       $(document).on('click', '.rmvclsmdldv', function(){ 
           var rmvbtnid = $(this).attr("id");
           $('#row'+ rmvbtnid +'').remove();
        });

    return <div>
        <SecondHeaderSchoolClassroom />
        {loader}
        <div className="be-wrapper be-login innerwrapper" id="login">
            
            <div className="padding mbvwpd">

                <div id="no-dtaclsrmsch">
                    <div className="clsrmnoclsnwd">
                        <div>
                            <img src="https://res.cloudinary.com/infoi/image/upload/v1670915604/feedii/empty_class_pg_y3ekqk.svg" width="150" alt="Image" />
                            <p className="clsrmnoclsnwdp">Add classes by clicking on the below button.</p>
                            <button className="clsrmnoclsnwdbtn" type="button" onClick={() => { handleShowModal();}}>
                                <i className="fa fa-plus"></i>
                                Add Class
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row hide" id="dtaclsrmsch">
                    <div className="col-md-2 col-lg-2"></div>
                    <div className="col-md-9">
                        <div className="mb-30px">
                            <div className="col-sm-12">
                                
                            {uniqueTags.map((classesuni)=>(
                                <div className="col-sm-12 mb-5">
                                    <div className="clsrmdv1">
                                        <h1 className="clshdngh1">Class {classesuni}</h1>
                                    </div>
                                    <div className="clsrmdv2 col-sm-12 row">                                        
                                
                                        {classList.map((classes)=>{

                                            if(classesuni == classes.gradename && classesuni != "All") {

                                            return (<div className="col-sm-4 mb-4">
                                                <Link to='/sch/class' onClick={()=>{sndclsidtoclspg(classes.batchId);}} className="tlbxdvvda">
                                                    <div className="clsrmdv2-1">
                                                        <div className="clsrmdv2-2-dv1">
                                                            <div className="clsrmdv2-2-dv1-a1">
                                                                <img src="https://res.cloudinary.com/infoi/image/upload/q_auto/v1653892764/Dashboard/lvvl_lkiiky.svg" height="22" style={{verticalAlign: 'top', marginRight: '5px'}} />
                                                                <span> Section {classes.sectionname}</span>
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
            <Modal.Header closeButton>
                <Modal.Title>Add Class</Modal.Title>
            </Modal.Header>
            <Modal.Body className="cstmmdlbdyhtt">
                <p className="clsmdlpcsd">Add classes to your classroom.</p>
                <div>
                    <div className="row m-0 mb-4">
                        <div className="col-sm-4">
                            <label className="mdllblcsds">Class</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text" placeholder="Add Class Name" className="tekila6 mdlclsnmer" />
                            <div className="errslct" id="mdlclsertxt">Please enter class</div>
                        </div>
                    </div>
                    <div className="row m-0 mb-3">
                        <div className="col-sm-4">
                            <label className="mdllblcsds">Section</label>
                        </div>
                        <div className="col-sm-8" id="dynmcfldmdl">
                            <div className="row m-0">
                                <div className="col-sm-11 pl-0">
                                    <input type="text" placeholder="Add Section Name" className="tekila6 mdlsctnvl" />
                                </div>
                                <div className="col-sm-1 p-0">
                                    <button onClick={addinptvl} className="mdlbtncsdd"><i title="Add more sections" className="adicngrn fa fa-plus"></i></button>
                                </div>
                            </div>
                            <div className="errslct" id="mdlsctnvlerr">Please enter section</div>
                        </div>
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
        </Modal>

    </div>
}

// export default Details;
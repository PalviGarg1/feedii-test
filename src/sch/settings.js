import React, { useState, useRef, useEffect }  from "react";
import $ from 'jquery';
import '../Content/Content/clsromcss.css';
import { SecondHeaderSchoolClassroom } from '../secondheaderschclassroom';
import '../AllJs/dashboard-staff.js';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import useLoader from "../useLoader";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';


export const ClassroomschsettingsPagee = () => {
    const [loader, showLoader, hideLoader] = useLoader();

    useEffect(() => {
        showLoader();
        $('#login').hide();
      }, []);

      

    // const [showModal, setShowModal] = useState(false);
    // const handleCloseModal = () => setShowModal(false);
    // const handleShowModal = () => {
    //     setShowModal(true);
    // }

    const [showModal2, setShowModal2] = useState(false);
    const handleCloseModal2 = () => setShowModal2(false);

   

    const dataFetchedRefclasstch = useRef(false);
    const dataFetchedRefsubjecttch = useRef(false);
    const dataFetchedRefclass = useRef(false);
    const [classListtch, setclasseslisttch] = useState([]);
    const [listsubjectbatch, setlistsubjectbatch] = useState([]);
    const [listtbatch, setlistbatch] = useState([]);
    const [subjectidtosend, setsubjectid] = useState("");
    const [batchidtosend, setbatchid] = useState("")
    const [classList, setclasseslist] = useState([]);
    

    React.useEffect(
        ()=> {
       
           
            fetch('https://feedii-test-api.azurewebsites.net/api/Admin/getclassesdata/' + 1, {
            method: 'GET'
          }) .then((response) => response.json())
          .then((data) => {
            if (dataFetchedRefclass.current) return;
            dataFetchedRefclass.current = true;
            
            var objj = JSON.stringify(data);
            var parse = JSON.parse(objj);
           
            setclasseslist(data);
            
            hideLoader();
            $('#login').show();
            
          })
        })
       

        // const uniqueTags = [];
        // classListtch.map(clist => {
        //     if (uniqueTags.indexOf(clist.Grade) === -1) {
        //         uniqueTags.push(clist.Grade)
        //     }
        // });

        const [value, setValue] =  useState([]);

        const subjectlistwithid = [];
       

       for (const [i, subj] of listsubjectbatch.entries()) {
        subjectlistwithid.push({ value: subj.SubjectID, label: subj.subjectname})
      }
          

        // const [selectedsbjctValue, setselectedsbjctValue] = useState();

        // const handleChange1 = e => {
        //     setselectedsbjctValue(e.value);
        //   }

          const gradssdatalstt = [];
          for (const [i, grd] of listtbatch.entries()) {
           gradssdatalstt.push({ value: grd.batchID, label: grd.gradename})
         }

        // const [selectedValue, setSelectedValue] = useState([]);

        // const handleChangee = e => {
        //     setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
        // }

        const slctclsdatadrpdwn = () => {    
            var opnvl = $('#selctclsdta .css-12jo7m5').text();
            //alert(opnvl);
        }

        const handleShowModal2 = (stfbtchid, sbjctid) => {
            //alert(stfbtchid + " & " + sbjctid);
            setsubjectid(sbjctid);
            setbatchid(stfbtchid);
            setShowModal2(true);
        }       


        const [showModal, setShowModal] = useState(false);
        const handleCloseModal = () => setShowModal(false);
        const handleShowModal = () => {
            setShowModal(true);
        }       


        const [showModal3, setShowModal3] = useState(false);
        const handleCloseModal3 = () => setShowModal3(false);
        const handleShowModal3 = () => {
            setShowModal3(true);
        }       


        const [showModal4, setShowModal4] = useState(false);
        const handleCloseModal4 = () => setShowModal4(false);
        const handleShowModal4 = () => {
            setShowModal4(true);
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

        if(classList.length == 0) {
             $('#errdv1').show();
             $('.tbldtaa1').hide();
         }
         else {
             $('.tbldtaa1').show();
             $('#errdv1').hide();
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

         

         const svvupdt = () => {            

            $('#mdlbtnlodr3').removeClass('hide');
            $('#mdlbtntxt3').addClass('hide');

            var clsnmerr = $('#mdlclsertxt3');
            var sctnnmerr = $('#mdlsctnvlerr3');
            var clsnm = $('.mdlclsnmer3').val();
            var sctnnm = $('.mdlsctnvl3').val();
            
            if(clsnm == "" || clsnm == null || sctnnm == "" || sctnnm == null) {
            
                $('#mdlbtntxt3').removeClass('hide');
                $('#mdlbtnlodr3').addClass('hide');
                clsnmerr.show();
                sctnnmerr.show();
            }
            else {

                clsnmerr.hide();
                sctnnmerr.hide();

                $('#mdlbtnlodr3').removeClass('hide');
                $('#mdlbtntxt3').addClass('hide');
                
                handleCloseModal3();

            }
         }

         const svvupdtsctn = () => {            

            $('#mdlbtnlodr4').removeClass('hide');
            $('#mdlbtntxt4').addClass('hide');

            var clsnmerr = $('#mdlclsertxt4');
            var sctnnmerr = $('#mdlsctnvlerr4');
            var clsnm = $('.mdlclsnmer4').val();
            var sctnnm = $('.mdlsctnvl4').val();
            
            if(clsnm == "" || clsnm == null || sctnnm == "" || sctnnm == null) {
            
                $('#mdlbtntxt4').removeClass('hide');
                $('#mdlbtnlodr4').addClass('hide');
                clsnmerr.show();
                sctnnmerr.show();
            }
            else {

                clsnmerr.hide();
                sctnnmerr.hide();

                $('#mdlbtnlodr4').removeClass('hide');
                $('#mdlbtntxt4').addClass('hide');
                
                handleCloseModal4();

            }
         }

         


    return <div>
        <SecondHeaderSchoolClassroom />
        {loader}
        <div className="be-wrapper be-login innerwrapper" id="login">
            
            <div className="padding">

                <div className="hide">
                    <div className="clsrmnoclsnwd">
                        <div>
                            <img src="https://res.cloudinary.com/infoi/image/upload/q_auto:best/v1634879425/AMA%20Icons/sidebar-empty-state-1_uwimwd.svg" alt="Image" />
                            <p className="clsrmnoclsnwdp">No data found</p>
                        </div>
                    </div>
                </div>

                <div className="row tab-content mb-3">
                    <div className="col-sm-12 row tab-pane animate fadeIn text-muted active" id="tab1">
                        <div className="col-sm-12 col-md-12" id="survytbl">
                            <div className="row m-0">
                                <div className="col-sm-12">
                                    <h1 className="kmcs_h1 bluclr">Overview</h1>
                                    <p className="kmcs_p mt-5 bluclr mt-0 mb-5">Wherever you are in this world of work - no matter your doubts, hopes and dreams, there's a job for you here.</p>
                                </div>
                            </div>
                            <div>
                                <div className="col-sm-12 bgclrblu mb-2 p-0">
                                    <div className="dshbrd-dvv1 row ml-0 mr-0 pb-0">
                                        <div className="col-sm-10 pl-0">
                                            <ul className="dshbrd-dvv1-ul">
                                                <li className="dshbrd-dvv1-ul-li">
                                                    <a className="dshbrd-dvv1-ul-li-a active dshbrd-dvv1-ul-li-a-mbvw mbvw-ml0">All Classes</a>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        <div className="col-sm-2 pl-0">
                                            <div>
                                                <button className="stngdvbtn1cs stngdvbtn1csbgcld" title="Add Class Button" type="button" onClick={() => { handleShowModal();}}>
                                                    <i className="fa fa-plus cstmstngfsicn"></i>
                                                    Add Class
                                                </button>
                                            </div>
                                        </div>                                      
                                        
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className="panel box cstmtblbrdr mb-0">
                                        <div >
                                            <div className="box-body row m-0">
                                                <div id="cstmclsstnmtbl" className="table-responsive">
                                                    <div id="errdv1">
                                                        <div className="nodtadv1">
                                                            <div>
                                                                <img className="nodtadv1img" src="https://res.cloudinary.com/infoi/image/upload/q_auto:best/v1634879425/AMA%20Icons/sidebar-empty-state-1_uwimwd.svg" width="150" alt="Error Image" />
                                                                <div className="nodtadv1txt">No Data Found</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <table id="stngtbll" className="table cstmtable2 v-middle p-0 m-0 box tbldtaa1">
                                                        <thead>
                                                            <tr>
                                                                <th>Classes</th>
                                                                <th>No. of Students</th>
                                                                <th>No. of Teachers</th>
                                                                <th />
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {classList.map((classs)=>{
                                                                  if(classs.Grade != "All") {
                                                                    return(
                                                                        <div>
                                                                            <tr className="bglytbluclr">
                                                                                <td>
                                                                                    <div className="ahover text-truncate wd-235px font-bold" title='Class - 6th'>Class - 6th </div>
                                                                                </td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td>
                                                                                    <div className="text-right">
                                                                                        <button className="stngpgtblbin" title="Edit Class" onClick={() => { handleShowModal3();}}>
                                                                                            <i className="fa fa-edit"></i>
                                                                                        </button>
                                                                                        <button className="stngpgtblbin" title="Delete Class" onClick={() => { handleShowModal2();}}>
                                                                                            <i className="fa fa-trash"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            
                                                                            <tr className="mn-ht-65px">
                                                                                <td>
                                                                                    <div className="ahover text-truncate wd-235px" title='Section - A'>Section - A</div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="ahover text-truncate wd-235px pl-4" title='40'>40 </div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="ahover text-truncate wd-235px pl-4" title='06'>06</div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="text-right">
                                                                                        <button className="stngpgtblbin" title="Edit Section" onClick={() => { handleShowModal4();}}>
                                                                                            <i className="fa fa-edit"></i>
                                                                                        </button>
                                                                                        <button className="stngpgtblbin" title="Delete Section" onClick={() => { handleShowModal2();}}>
                                                                                            <i className="fa fa-trash"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            
                                                                            <tr className="mn-ht-65px">
                                                                                <td>
                                                                                    <div className="ahover text-truncate wd-235px" title='Section - A'>Section - B</div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="ahover text-truncate wd-235px pl-4" title='10'>10 </div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="ahover text-truncate wd-235px pl-4" title='02'>02</div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="text-right">
                                                                                        <button className="stngpgtblbin" title="Edit Section" onClick={() => { handleShowModal4();}}>
                                                                                            <i className="fa fa-edit"></i>
                                                                                        </button>
                                                                                        <button className="stngpgtblbin" title="Delete Section" onClick={() => { handleShowModal2();}}>
                                                                                            <i className="fa fa-trash"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </div>
                                                                    );
                                                                  }
                                                              

                                                            }

                                                            )}
                                                              
                                                            
                                                        </tbody>
                                                    </table>
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


        <Modal show={showModal2} onHide={handleCloseModal2} className="cstmmtmodal" >
            <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete?</p>
            </Modal.Body>
            <Modal.Footer className="brdr-tp">
            <Button variant="primary modalGrayBtn" onClick={handleCloseModal2}>
                Close
            </Button>
            <Button variant="secondary modalRedBtn" onClick={handleCloseModal2} style={{minWidth: '80px'}}>
                <span id="mdlbtnlodr2" className="hide">
                    <i className="fa fa-spinner fa-spin" style={{fontSize: '12px'}}></i>
                </span>
                <span id="mdlbtntxt2">Confirm</span>
            </Button>
            </Modal.Footer>
        </Modal>

        
        <Modal show={showModal3} onHide={handleCloseModal3} className="cstmmtmodal" >
            <Modal.Header closeButton>
                <Modal.Title>Edit Class</Modal.Title>
            </Modal.Header>
            <Modal.Body className="cstmmdlbdyhtt">
                <p className="clsmdlpcsd">Update classes to your classroom.</p>
                <div>
                    <div className="row m-0 mb-4">
                        <div className="col-sm-4">
                            <label className="mdllblcsds">Class</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text" placeholder="Add Class Name" className="tekila6 mdlclsnmer3" readOnly value="6th" />
                            <div className="errslct" id="mdlclsertxt3">Please enter class</div>
                        </div>
                    </div>
                    <div className="row m-0 mb-3">
                        <div className="col-sm-4">
                            <label className="mdllblcsds">Section</label>
                        </div>
                        <div className="col-sm-8" id="dynmcfldmdl">
                            <div className="row m-0">
                                <div className="col-sm-11 pl-0">
                                    <input type="text" placeholder="Add Section Name" className="tekila6 mdlsctnvl3" />
                                </div>
                                <div className="col-sm-1 p-0">
                                    <button onClick={addinptvl} className="mdlbtncsdd"><i title="Add more sections" className="adicngrn fa fa-plus"></i></button>
                                </div>
                            </div>
                            <div className="errslct" id="mdlsctnvlerr3">Please enter section</div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="brdr-tp">
                <Button variant="primary modalGrayBtn" onClick={handleCloseModal3}>
                    Cancel
                </Button>
                <Button variant="secondary modalRedBtn" onClick= {svvupdt} style={{minWidth: '80px'}}>
                    <span id="mdlbtnlodr3" className="hide">
                        <i className="fa fa-spinner fa-spin" style={{fontSize: '12px'}}></i>
                    </span>
                    <span id="mdlbtntxt3">Update</span>
                </Button>
            </Modal.Footer>
        </Modal>
        
        
        <Modal show={showModal4} onHide={handleCloseModal4} className="cstmmtmodal" >
            <Modal.Header closeButton>
                <Modal.Title>Edit Section</Modal.Title>
            </Modal.Header>
            <Modal.Body className="cstmmdlbdyhtt">
                <p className="clsmdlpcsd">Update section to this class.</p>
                <div>
                    <div className="row m-0 mb-4">
                        <div className="col-sm-4">
                            <label className="mdllblcsds">Class</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text" placeholder="Add Class Name" className="tekila6 mdlclsnmer3" readOnly value="6th" />
                            <div className="errslct" id="mdlclsertxt3">Please enter class</div>
                        </div>
                    </div>
                    <div className="row m-0 mb-3">
                        <div className="col-sm-4">
                            <label className="mdllblcsds">Section</label>
                        </div>
                        <div className="col-sm-8" id="dynmcfldmdl">
                            <div className="row m-0">
                                <div className="col-sm-12 pl-0 pr-0">
                                    <input type="text" placeholder="Add Section Name" className="tekila6 mdlsctnvl3" defaultValue="A" />
                                </div>
                            </div>
                            <div className="errslct" id="mdlsctnvlerr3">Please enter section</div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="brdr-tp">
                <Button variant="primary modalGrayBtn" onClick={handleCloseModal4}>
                    Cancel
                </Button>
                <Button variant="secondary modalRedBtn" onClick= {svvupdtsctn} style={{minWidth: '80px'}}>
                    <span id="mdlbtnlodr4" className="hide">
                        <i className="fa fa-spinner fa-spin" style={{fontSize: '12px'}}></i>
                    </span>
                    <span id="mdlbtntxt4">Update</span>
                </Button>
            </Modal.Footer>
        </Modal>

    </div>
}

// export default Details;
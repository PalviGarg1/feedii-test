import React, { useState, useRef, useEffect } from "react";
import $ from 'jquery';
import '../Content/Content/profilecss.css';
import { Headerdashboard} from '../headeruserdashboard';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';
import { isNamespaceExport } from "typescript";
import useLoader from "../useLoader";

export const Userprofile = () => {
    const [loader, showLoader, hideLoader] = useLoader();

    useEffect(() => {
        showLoader();
        $('#login').hide();
      }, []);

    var schoolidtosend = sessionStorage.getItem("schoolidsession");   
   
    const [schoolname, setschoolName] = useState([]);   
   
    
    const fetchData = () => {
        fetch('https://feedii-test-api.azurewebsites.net/api/Admin/getSchoolprofile/' + schoolidtosend)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setschoolName(data)
            hideLoader();
            $('#login').show();
          })
      }

      useEffect(() => {
        fetchData()
    }, [])
   
       

    
    const prsnalinfo = () => {
        $('#prnlinf-a').addClass('active');
        $('#acntinf-a').removeClass('active');
        $('#personalinfoddv1').show();
        $('#accountinfodvv1').hide();
    }

    const acntinfo = () => {
        $('#prnlinf-a').removeClass('active');
        $('#acntinf-a').addClass('active');
        $('#personalinfoddv1').hide();
        $('#accountinfodvv1').show();
    }

    const edtbscinfo = () => {
        $('#editbscinfoicn1').hide();
        $('#editbscinfoicn2').show();

        $('#profile').hide();
        $('#profile_open').show();
    }

    const edtbscinfocnclbtn = () => {
        $('#editbscinfoicn1').show();
        $('#editbscinfoicn2').hide();

        $('#profile').show();
        $('#profile_open').hide();
    }

    const edtbscinfosvbtn = () => {
        $('#editbscinfoicn1').show();
        $('#editbscinfoicn2').hide();
        
        $('#profile').show();
        $('#profile_open').hide();
    }

    const editcontactinfo = () => {
        $('#editcntctai1').hide();
        $('#editcntctai2').show();

        $('#contact').hide();
        $('#contact_open').show();
    }

    const editcontactinfocancelbtn = () => {
        $('#editcntctai1').show();
        $('#editcntctai2').hide();

        $('#contact').show();
        $('#contact_open').hide();
    }

    const editcontactinfosvbtn = () => {
        $('#editcntctai1').show();
        $('#editcntctai2').hide();

        $('#contact').show();
        $('#contact_open').hide();
    }

    return <div>
        <Headerdashboard />
        {loader}
        <div className="be-wrapper be-login innerwrapper mt-4p" id="login">
            
        <div className="padding cstmdpd mbvwpd" id="prflpg">
            <div className="row mt-6-cstm mt-4">
                <div className="col-md-2 col-lg-2 pr-0 tblt-vw-prfl1">
                    <div style={{position: 'relative'}}>
                        <div style={{inset: 0}}>
                        <div className="tblt-vw-prfl1-dv" style={{height: 152, width: 152, marginBottom: 8, marginLeft: 'auto'}}>
                            <div style={{boxSizing: 'border-box', borderRadius: '50%', opacity: 1, boxShadow: 'rgb(214,222,233) 0px 0px 0px 2px', display: 'flex', WebkitBoxPack: 'center', justifyContent: 'center', WebkitBoxAlign: 'center', alignItems: 'center', fontSize: 48, lineHeight: 1, fontWeight: 700, textTransform: 'none', letterSpacing: 'normal', color: 'rgb(255, 255, 255)', width: 152, minWidth: 152, minHeight: 152, height: 152}}>
                            <img src="https://res.cloudinary.com/infoi/image/upload/v1643706338/Profile%20Icon/Icon-150x150_o33qvq.png" style={{borderRadius: '50%'}} />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="tblt-vw-prfl2" style={{paddingTop: 32, paddingLeft: 12}}>
                        <div style={{color: 'rgb(18, 52, 102)', marginBottom: 0}}>
                        <ul style={{listStyle: 'none', flexDirection: 'column', margin: 0, padding: 0}}>
                            <li style={{padding: '10px 0 5px'}}>
                                <a className="prfl-ulla active" id="prnlinf-a" onClick={prsnalinfo}>
                                    <span>Personal Info</span>
                                </a>
                            </li>
                            {/* <li style={{padding: '5px 0 5px'}}>
                                <a className="prfl-ulla" id="acntinf-a" onClick={acntinfo}>
                                    <span>Account Info</span>
                                </a>
                            </li> */}
                        </ul>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-8 row  ml-1-5rm cs-st-pd tblt-prfl-vw-dv1">
                    <div className="col-sm-12 col-md-12 mt-4 mb-4">
                        <div style={{minHeight: 128, paddingBottom: 16, display: 'flex', WebkitBoxAlign: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
                        <div>
                            
                            {  schoolname.map((data) => {
                                    return(
                                        <h2 style={{fontSize: 32, lineHeight: '1.25', color: '#333e63', fontWeight: 600, margin: 0, textTransform: 'capitalize', letterSpacing: 'normal'}}>
                                            {data.contactPersonName}
                                        </h2>
                                    )
                                })
                            }
                            <div style={{fontSize: 14, lineHeight: '1.43', color: 'rgb(68, 68, 68)', textTransform: 'none', letterSpacing: 'normal', paddingTop: 4}}>
                                <ul style={{marginTop: 8, marginBottom: 8, paddingLeft: 0, listStyleType: 'none'}}>
                                
                                    
                                    {   schoolname.map((data) => {        
                                                return(
                                                    <li style={{paddingBottom: 8, color: '#333e63'}}>
                                                        Admin at Feedii (<span className="font-bold" title="School Code">{data.schoolcode}</span>)
                                                    </li>
                                                )
                                            })
                                        }
                                    {   schoolname.map((data) => {        
                                                return(
                                                    <li style={{color: '#333e63'}}>
                                                        Registered on {data.RegisteredOn}
                                                    </li>
                                                )
                                            })
                                        }
                                </ul>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="tab" id="personalinfoddv1" style={{display: "block"}}>
                        <div className="col-md-12 mb-5">
                            <div className="tekila1">
                                <div className="box-header cs-st-bx-hdr">
                                <h3 className="tekila2">
                                    <span style={{borderBottom: '2px solid #ff5745', paddingBottom: 12}}>Basic Info</span>
                                    {/* <a className="float-right" onClick={edtbscinfo} id="editbscinfoicn1" style={{zIndex: '1'}}>
                                        <i className="fas fa-pen tekila5" title="Edit" />
                                    </a>
                                    <a className="float-right" id="editbscinfoicn2" style={{display: 'none'}}>
                                        <i className="fas fa-pen tekila5" title="Edit" />
                                    </a> */}
                                </h3>
                                </div>
                                <div className="box-body cs-st-pd2" id="profile" style={{display: 'block'}}>
                                    <form>
                                        <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-4 col-xs-4 col-form-label tekila3">Name</label>
                                        <div className="col-sm-8 col-xs-8">
                                        {   schoolname.map((data) => {        
                                                return(
                                                    <label className="col-form-label tekila4">{data.contactPersonName}</label>
                                                )
                                            })
                                        }
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                        <label htmlFor className="col-sm-4 col-xs-4 col-form-label tekila3">School Name</label>
                                        <div className="col-sm-8 col-xs-8">
                                        {schoolname.map((data) => {        
                                            return(
                                                <label className="col-form-label tekila4">{data.schoolName}</label>
                                                )
                                            })
                                        }
                                        </div>
                                        </div>
                                        <div className="form-group row">
                                        <label htmlFor className="col-sm-4 col-xs-4 col-form-label tekila3">Designation</label>
                                        <div className="col-sm-8 col-xs-8">
                                        {schoolname.map((data) => {        
                                            return(
                                                <label className="col-form-label tekila4">{data.designation}</label>
                                                )
                                            })
                                        }
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="box-body cs-st-pd2" id="profile_open" style={{display: 'none'}}>
                                    <form id="add_basicinfo">
                                        <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-4 col-form-label tekila3">Name</label>
                                        <div className="col-sm-8 tekila9">
                                        {   schoolname.map((data) => {        
                                                return(
                                                    <input type="text" className="form-control tekila6" id="name" defaultValue={data.contactPersonName} readOnly />
                                                )
                                            })
                                        }
                                            
                                            <p className="text-danger cs-st-txt-danger" id="fstname" />
                                        </div>
                                        </div>
                                        <div className="form-group row">
                                        <label htmlFor className="col-sm-4 col-form-label tekila3">School Name</label>
                                        <div className="col-sm-8 tekila9">
                                        {schoolname.map((data) => {        
                                            return(
                                                <input type="text" className="form-control tekila6" defaultValue={data.schoolName} readOnly />
                                                )
                                            })
                                        }
                                            
                                            <p className="text-danger cs-st-txt-danger" id="schlnm" />
                                        </div>
                                        </div>
                                        <div className="form-group row">
                                        <label htmlFor className="col-sm-4 col-form-label tekila3">Designation</label>
                                        <div className="col-sm-8 tekila9">
                                        {schoolname.map((data) => {        
                                            return(
                                                <input type="text" className="form-control tekila6" defaultValue={data.designation} readOnly />
                                                )
                                            })
                                        }
                                            <p id="dsgntn" className="val_error cs-st-txt-danger" />
                                        </div>
                                        </div>
                                    </form>
                                    <div className="modal-footer">
                                        <button className="tekila7 cs-st-bx-btns btn-cstmprfl1" onClick={edtbscinfocnclbtn}>Cancel</button>
                                        <button className="tekila8 cs-st-bx-btns btn-cstmprfl2" type="submit" onClick={edtbscinfosvbtn}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 pt-16px mb-5">
                            <div className="tekila1">
                                <div className="box-header cs-st-bx-hdr">
                                <h3 className="tekila2">
                                    <span style={{borderBottom: '2px solid #ff5745', paddingBottom: 12}}>Contact Info</span>
                                    {/* <a onClick={editcontactinfo} id="editcntctai1">
                                        <i className="fas fa-pen float-right tekila5" title="Edit" />
                                    </a>
                                    <a id="editcntctai2" style={{display: 'none'}}>
                                        <i className="fas fa-pen float-right tekila5" title="Edit" />
                                    </a> */}
                                </h3>
                                </div>
                                <div className="box-body cs-st-pd2" id="contact">
                                <form>
                                   
                                    <div className="form-group row">
                                    <label htmlFor className="col-sm-4 col-xs-4 col-form-label tekila3">Email</label>
                                    <div className="col-sm-8 col-xs-8">
                                    {schoolname.map((data) => {        
                                        return(
                                            <label className="col-form-label tekila4">{data.Email}</label>
                                            )
                                        })
                                    }
                                    </div>
                                    </div>
                                    <div className="form-group row">
                                    <label htmlFor className="col-sm-4 col-xs-4 col-form-label tekila3">School Website</label>
                                    <div className="col-sm-8 col-xs-8">
                                    {schoolname.map((data) => {        
                                        return(
                                            <label className="col-form-label tekila4">{data.website}</label>
                                            )
                                        })
                                    }
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                    <label htmlFor className="col-sm-4 col-xs-4 col-form-label tekila3">City</label>
                                    <div className="col-sm-8 col-xs-8">
                                    {schoolname.map((data) => {        
                                            return(
                                                <label className="col-form-label tekila4">{data.city}</label>
                                            )
                                        })
                                    }
                                    </div>
                                    </div>
                                    <div className="form-group row">
                                    <label htmlFor className="col-sm-4 col-xs-4 col-form-label tekila3">State</label>
                                    <div className="col-sm-8 col-xs-8">
                                        {schoolname.map((data) => {        
                                                return(
                                                    <label className="col-form-label tekila4">{data.state}</label>
                                                )
                                            })
                                        }
                                        
                                    </div>
                                    </div>
                                    <div className="form-group row">
                                    <label htmlFor className="col-sm-4 col-xs-4 col-form-label tekila3">Country</label>
                                    <div className="col-sm-8 col-xs-8">
                                        {schoolname.map((data) => {        
                                                return(
                                                    <label className="col-form-label tekila4">{data.country}</label>
                                                )
                                            })
                                        }
                                    </div>
                                    </div>
                                </form>
                                </div>
                                <div className="box-body cs-st-pd2" id="contact_open" style={{display: 'none'}}>
                                <form action method="post" id="add_contactinfo">
                                    <div className="form-group row">
                                    <label htmlFor className="col-sm-4 col-form-label tekila3">Email</label>
                                    <div className="col-sm-8 tekila9">
                                        {schoolname.map((data) => {        
                                            return(
                                                <input type="text" className="form-control tekila6" readOnly id="email" value={data.Email} />
                                                )
                                            })
                                        }
                                        
                                        <p id="emailerr" className="val_error cs-st-txt-danger" />
                                    </div>
                                    </div>
                                    <div className="form-group row">
                                    <label htmlFor className="col-sm-4 col-form-label tekila3">School Website</label>
                                    <div className="col-sm-8 tekila9">
                                        {schoolname.map((data) => {        
                                            return(
                                                <input type="text" className="form-control tekila6" readOnly id="swbsite" value={data.website} />
                                                )
                                            })
                                        }
                                        <p id="entrwbsit" className="val_error cs-st-txt-danger" />
                                    </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor className="col-sm-4 col-form-label tekila3">City</label>
                                        <div className="col-sm-8 tekila9">
                                            {schoolname.map((data) => {        
                                                    return(
                                                        <input type="text" className="form-control tekila6" readOnly id="city" value={data.city} />
                                                    )
                                                })
                                            }
                                            <p id="entrcity" className="val_error cs-st-txt-danger" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor className="col-sm-4 col-form-label tekila3">State</label>
                                        <div className="col-sm-8 tekila9">
                                            {schoolname.map((data) => {        
                                                    return(
                                                        <input type="text" className="form-control tekila6" readOnly id="state" value={data.state} />
                                                    )
                                                })
                                            }
                                            <p id="entrstt" className="val_error cs-st-txt-danger" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor className="col-sm-4 col-form-label tekila3">Country</label>
                                        <div className="col-sm-8 tekila9">
                                            {schoolname.map((data) => {        
                                                    return(
                                                        <input type="text" className="form-control tekila6" readOnly id="cntryy" value={data.country} />
                                                    )
                                                })
                                            }
                                            <p id="entrcntry" className="val_error cs-st-txt-danger" />
                                        </div>
                                    </div>
                                </form>
                                <div className="modal-footer">
                                    <button className="tekila7 cs-st-bx-btns btn-cstmprfl1" onClick={editcontactinfocancelbtn}>Cancel</button>
                                    <button className="tekila8 cs-st-bx-btns btn-cstmprfl2" onClick={editcontactinfosvbtn} type="submit">Save</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="tab" id="accountinfodvv1">
                            <div className="col-md-12">
                                <div className="tekila1 mb-5">
                                    <div className="box-header cs-st-bx-hdr">
                                    <h3 className="tekila2">
                                        <span style={{borderBottom: '2px solid #ff5745', paddingBottom: 12}}>Account Information</span>
                                    </h3>
                                    </div>
                                    <div className="box-body cs-st-pd2" id="accntinfo">
                                    <form>
                                        <div className="form-group row">
                                        <label htmlFor className="col-sm-4 col-xs-4 col-form-label tekila3">ARN Number </label>
                                        <div className="col-sm-8 col-xs-8">
                                            <label className="col-form-label tekila4">Go premium to get ARN number!</label>
                                        </div>
                                        </div>
                                        <div className="form-group row">
                                        <label htmlFor className="col-sm-4 col-xs-4 col-form-label tekila3">Subscription Type</label>
                                        <div className="col-sm-8 col-xs-8">
                                            <label className="col-form-label tekila4">Free Account</label>
                                        </div>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

        </div>        
    </div>
}

// export default Details;


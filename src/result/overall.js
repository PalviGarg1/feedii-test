import React from "react";
import $ from 'jquery';
import '../Content/Content/result.css';
import { Headerdashboard } from '../headeruserdashboard';
import ArcProgress from "react-arc-progress";
import Select from 'react-select';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';

export const ResultOverallPage = () => {

    const progress = "0.8";
    const text = "80";
    const arcFillColor = { gradient: ["#54d4f2"] };

    
    const alclsdata = [{
        value: "0", label: "All Data"
    }];
    
    $('table.rslt-tbldv3tbl').on('scroll', function() {
        //alert('start');
        $("table.rslt-tbldv3tbl > *").width($("table.rslt-tbldv3tbl").width() + $("table.rslt-tbldv3tbl").scrollLeft());
    });

    return <div>
        <Headerdashboard />
        <div id="divLoader" style={{display: "none"}}> </div>
        <div className="be-wrapper be-login innerwrapper mt-4p" id="login">
            
            <div className="padding">
                <div className="row tab-content mb-3" id="srvydepdv">
                    <div className="col-sm-12 row tab-pane animate fadeIn text-muted active rsl-cspdng m-0" id="tab1">
                        
                        <div className="col-sm-12 col-md-12 p-0 row m-0 mb-5">
                            <div className="col-sm-6">
                                <div className="col-sm-12 pl-0">
                                    <h4 className="rsl-hdngh4">Overall Score</h4>
                                </div>
                                <div className="row m-0 rslt-dvv pb-2">
                                    <div className="col-sm-6 p-0">
                                        <div className="rsl-dv1">
                                            80
                                            <span className="rsl-dv1spn">Score (%)</span>
                                        </div>
                                        <ArcProgress className="rsl-dv2" progress={progress} thickness={20} fillColor={arcFillColor} style={{ position: "relative", height: 150, width: 150 }} />
                                    </div>
                                    <div className="col-sm-6 p-0">
                                        <div className="rsl-dv3">
                                            <div>
                                                <h3 className="rsl-dv3-h3">
                                                    10% 
                                                    <i className="fa fa-arrow-up rsl-dv3-faicngrn"></i>
                                                </h3>
                                                <div className="rsl-dv4">than the Surveys Average Score <br/> Benchmark Score - 70%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="col-sm-12 pl-0">
                                    <h4 className="rsl-hdngh4">Response Rate</h4>
                                </div>
                                <div className="rslt-dvv rslt-cstmpdb">
                                    <div className="col-sm-12 p-0 mb-5 mt-2">
                                        <div className="col-sm-12 row m-0 p-0">
                                            <div className="col-sm-8 pl-0">All Responses</div>
                                            <div className="col-sm-4 pr-0 text-right">80%</div>
                                        </div>
                                        <div>
                                            <div className="progress my-1 brdrrdscstm" style={{height: 6}}>
                                                <div className="progress-bar dark-green" style={{width: '80%'}} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 p-0 mb-csrslbtmm">
                                        <div className="col-sm-12 row m-0 p-0">
                                            <div className="col-sm-8 pl-0">Comments</div>
                                            <div className="col-sm-4 pr-0 text-right">40%</div>
                                        </div>
                                        <div>
                                            <div className="progress my-1 brdrrdscstm" style={{height: 6}}>
                                                <div className="progress-bar dark-green" style={{width: '40%'}} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 p-0 mb-5">
                            <div className="col-sm-12">
                                <div className="col-sm-12 pl-0">
                                    <h4 className="rsl-hdngh4">Engagement Score</h4>
                                </div>
                                <div className="rslt-dvv rslt-cstmpdb">
                                    <div className="col-sm-12 p-0">
                                        <div>
                                            <table id="rslttblcs" className="rslttblcsvll">
                                                <thead>
                                                    <tr>
                                                        <th>Participants</th>
                                                        <th className="text-right">Score</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="brdr-btm1">
                                                        <td>
                                                            <div className="text-truncate" title="Student to School"> Student to School </div>
                                                        </td>
                                                        <td className="text-right">
                                                            <div className="row m-0 col-sm-12 p-0">
                                                                <div className="col-sm-11 p-0 pt-1">
                                                                    <div className="progress my-1 brdrrdscstm" style={{height: 6}}>
                                                                        <div className="progress-bar dark-green" style={{width: '80%'}} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-1">
                                                                    <div className="rsltgrnclr">80%</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="brdr-btm1">
                                                        <td>
                                                            <div className="text-truncate" title="Student to Teacher"> Student to Teacher </div>
                                                        </td>
                                                        <td className="text-right">
                                                            <div className="row m-0 col-sm-12 p-0">
                                                                <div className="col-sm-11 p-0 pt-1">
                                                                    <div className="progress my-1 brdrrdscstm" style={{height: 6}}>
                                                                        <div className="progress-bar dark-red" style={{width: '20%'}} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-1">
                                                                    <div className="rsltredclr">20%</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="brdr-btm1">
                                                        <td>
                                                            <div className="text-truncate" title="Teacher to School"> Teacher to School </div>
                                                        </td>
                                                        <td className="text-right">
                                                            <div className="row m-0 col-sm-12 p-0">
                                                                <div className="col-sm-11 p-0 pt-1">
                                                                    <div className="progress my-1 brdrrdscstm" style={{height: 6}}>
                                                                        <div className="progress-bar dark-ylw" style={{width: '50%'}} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-1">
                                                                    <div className="rsltylwclr">50%</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 p-0 mb-5">
                            <div className="col-sm-12">
                                <div className="col-sm-12 pl-0">
                                    <h4 className="rsl-hdngh4">Overall Score Per Survey</h4>
                                </div>
                                <div className="rslt-dvv rslt-cstmpdb">
                                    <div className="col-sm-12 p-0 mb-3">
                                        <div>
                                            <table id="rslttblcs">
                                                <thead>
                                                    <tr className="brdr-btm1">
                                                        <th>Survey Name</th>
                                                        <th className="text-right">Your Score</th>
                                                        <th className="text-right">Benchmark</th>
                                                        <th className="text-right">Variance</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="brdr-btm1">
                                                        <td>
                                                            <Link to='/result/detailstchrtosch'>
                                                                <div className="text-truncate" title="Teacher School Relationship - (Part 1)">1. Teacher School Relationship - (Part 1)</div>
                                                                <div className="tbltddv2 cstmwdtbldv">Teacher <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> School</div>
                                                            </Link>
                                                        </td>
                                                        <td className="text-right">50%</td>
                                                        <td className="text-right">70%</td>
                                                        <td className="text-right">
                                                            <div className="rsltredclr">-20%</div>
                                                        </td>
                                                    </tr>
                                                    <tr className="brdr-btm1">
                                                        <td>
                                                            <Link to='/result/detailsstutotch'>
                                                                <div className="text-truncate" title="Student Teacher Relationship">2. Student Teacher Relationship</div>
                                                                <div className="tbltddv2 cstmwdtbldv">Student <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> Teacher</div>
                                                            </Link>
                                                        </td>
                                                        <td className="text-right">55%</td>
                                                        <td className="text-right">70%</td>
                                                        <td className="text-right">
                                                            <div className="rsltredclr">-15%</div>
                                                        </td>
                                                    </tr>
                                                    <tr className="brdr-btm1">
                                                        <td>
                                                            <Link to='/result/detailstchrtosch2'>
                                                                <div className="text-truncate" title="Teacher School Relationship - (Part 2)">3. Teacher School Relationship - (Part 2)</div>
                                                                <div className="tbltddv2 cstmwdtbldv">Teacher <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> School</div>
                                                            </Link>
                                                        </td>
                                                        <td className="text-right">40%</td>
                                                        <td className="text-right">70%</td>
                                                        <td className="text-right">
                                                            <div className="rsltredclr">-30%</div>
                                                        </td>
                                                    </tr>
                                                    <tr className="brdr-btm1">
                                                        <td>
                                                            <Link to='/result/detailsstutosch'>
                                                                <div className="text-truncate" title="Student School Relationship">4. Student School Relationship</div>
                                                                <div className="tbltddv2 cstmwdtbldv">Student <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> School</div>
                                                            </Link>
                                                        </td>
                                                        <td className="text-right">85%</td>
                                                        <td className="text-right">70%</td>
                                                        <td className="text-right">
                                                            <div className="rsltgrnclr">15%</div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 p-0 mb-5">
                            <div className="col-sm-12">
                                <div className="col-sm-12 pl-0">
                                    <h4 className="rsl-hdngh4">Engagement Score Heatmap</h4>
                                </div>
                                <div className="rslt-dvv rslt-cstmpdb">
                                    <div className="col-sm-12 p-0 mb-3">
                                        <div className="rslttbl3">
                                            <div className="outer">
                                                <div className="inner">
                                                    <table>
                                                    <tr>
                                                        <th className="fix nobrdr">
                                                            <div>
                                                                <div className="col-sm-5 pl-0 rsltblslmbcs">
                                                                    <Select className="rslttblslctt" options={alclsdata} defaultValue={{ label: "All Data", value: 0 }} />
                                                                </div>
                                                                <div className="rslttbldv4">Surveys</div>
                                                            </div>
                                                        </th>
                                                        <th className="nobrdr rslt-cspltddt">
                                                            <div className="rslt-tbldv3tblthddv" title="Topic Name 1"> Overall Score </div>
                                                        </th>
                                                        <th className="nobrdr rslt-cspltddt">
                                                            <div className="rslt-tbldv3tblthddv" title="Topic Name 2"> Jan - 2022 </div>
                                                        </th>
                                                        <th className="nobrdr rslt-cspltddt">
                                                            <div className="rslt-tbldv3tblthddv" title="Topic Name 3"> Sep - 2022 </div>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="fix rslttbl3cstmfx2">
                                                            <Link to='/result/detailstchrtosch'>
                                                                <div className="rslt-tbldv2-4 text-truncate" title="Teacher School Relationship- (Part 1)">
                                                                    1. Teacher School Relationship- (Part 1)
                                                                </div>
                                                                <div className="tbltddv2 cstmwdtbldv">Teacher <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> School</div>
                                                            </Link>
                                                        </th>
                                                        <td className="text-center rslt-tbl-dvv1 rslt-tbltdclr01">
                                                            <div>
                                                                10%
                                                            </div>
                                                        </td>
                                                        <td className="text-center rslt-tbl-dvv1 rslt-tbltdclr01">
                                                            <div>
                                                                20%
                                                            </div>
                                                        </td>
                                                        <td className="text-center rslt-tbl-dvv1 rslt-tbltdclr02">
                                                            <div>
                                                                30%
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="fix rslttbl3cstmfx2">
                                                            <Link to='/result/detailsstutotch'>
                                                                <div className="rslt-tbldv2-4 text-truncate" title="Student Teacher Relationship">
                                                                    2. Student Teacher Relationship
                                                                </div>
                                                                <div className="tbltddv2 cstmwdtbldv">Student <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> Teacher</div>
                                                            </Link>
                                                        </th>
                                                        <td className="text-center rslt-tbl-dvv1 rslt-tbltdclr01">
                                                            <div>
                                                                11%
                                                            </div>
                                                        </td>
                                                        <td className="text-center rslt-tbl-dvv1 rslt-tbltdclr01">
                                                            <div>
                                                                13%
                                                            </div>
                                                        </td>
                                                        <td className="text-center rslt-tbl-dvv1 rslt-tbltdclr01">
                                                            <div>
                                                                14%
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="fix rslttbl3cstmfx2">
                                                            <Link to='/result/detailstchrtosch2'>
                                                                <div className="rslt-tbldv2-4 text-truncate" title="Teacher School Relationship- (Part 2)">
                                                                    3. Teacher School Relationship- (Part 2)
                                                                </div>
                                                                <div className="tbltddv2 cstmwdtbldv">Teacher <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> School</div>
                                                            </Link>
                                                        </th>
                                                        <td className="text-center rslt-tbl-dvv1 rslt-tbltdclr03">
                                                            <div>
                                                                50%
                                                            </div>
                                                        </td>
                                                        <td className="text-center rslt-tbl-dvv1 rslt-tbltdclr04">
                                                            <div>
                                                                60%
                                                            </div>
                                                        </td>
                                                        <td className="text-center rslt-tbl-dvv1 rslt-tbltdclr05">
                                                            <div>
                                                                80%
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="fix rslttbl3cstmfx2">
                                                            <Link to='/result/detailsstutosch'>
                                                                <div className="rslt-tbldv2-4 text-truncate" title="Student School Relationship">
                                                                    4. Student School Relationship
                                                                </div>
                                                                <div className="tbltddv2 cstmwdtbldv">Student <img src="/Images/left-long-arrow.svg" width="20" alt="Arrow Image" className="srvytblrytarwimg" /> School</div>
                                                            </Link>
                                                        </th>
                                                        <td className="text-center rslt-tbl-dvv1 rslt-tbltdclr04">
                                                            <div>
                                                                60%
                                                            </div>
                                                        </td>
                                                        <td className="text-center rslt-tbl-dvv1 rslt-tbltdclr04">
                                                            <div>
                                                                70%
                                                            </div>
                                                        </td>
                                                        <td className="text-center rslt-tbl-dvv1 rslt-tbltdclr05">
                                                            <div>
                                                                80%
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="col-sm-12 row cstm--bxx">
                                            <div className="box mb-0">
                                                <div className="btn btn-lg rslt-tbltdclr01"></div>
                                                <div className="btn btn-lg rslt-tbltdclr02"></div>
                                                <div className="btn btn-lg rslt-tbltdclr03"></div>
                                                <p>Minimum</p>
                                            </div>
                                            <div className="box pl-1 mb-0">
                                                <div className="btn btn-lg rslt-tbltdclr04"></div>
                                                <div className="btn btn-lg rslt-tbltdclr05"></div>
                                                <p className="text-right">Maximum</p>
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
    </div>
}

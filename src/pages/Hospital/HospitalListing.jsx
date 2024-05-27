// import React from "react";
// import { Card, Badge } from "reactstrap";
// import avatarE from "../../images/avatar/e-sm.jpg";
// import avatarG from "../../images/avatar/g-sm.jpg";
// import avatarH from "../../images/avatar/h-sm.jpg";
// import avatarF from "../../images/avatar/f-sm.jpg";
// import avatarI from "../../images/avatar/i-sm.jpg";
// import avatarJ from "../../images/avatar/j-sm.jpg";
// import avatarK from "../../images/avatar/k-sm.jpg";
// import { Button } from "../../components/Component";

// const data = [
//   {
//     subject: "Adam Vital Ortus Hospital L.L.C",
//     created: "01 Dec 22",
//     channels: [
//       { name: "facebook", icon: "facebook-f" },
//       { name: "instagram", icon: "instagram" },
//       { name: "linkedin", icon: "linkedin" },
//       { name: "twitter", icon: "twitter" },
//       { name: "youtube", icon: "youtube-fill" },
//     ],
//     status: "Live Now",
//     assignee: [{ avatar: avatarE }, { avatar: avatarF }, { avatar: avatarG }, { avatar: avatarH }, { avatar: avatarI }],
//     daterange: "01 Dec - 07 Dec",
//   },
//   {
//     subject: "Ajman Specialty Hospital",
//     created: "01 Dec 22",
//     channels: [
//       { name: "linkedin", icon: "linkedin" },
//       { name: "facebook", icon: "facebook-f" },
//       { name: "instagram", icon: "instagram" },
//       { name: "youtube", icon: "youtube-fill" },
//     ],
//     status: "Live Now",
//     assignee: [
//       { avatar: avatarH },
//       { avatar: avatarI },
//       { avatar: avatarJ },
//       { avatar: avatarK },
//       { avatar: avatarE },
//       { avatar: avatarF },
//     ],
//     daterange: "01 Dec - 07 Dec",
//   },
//   {
//     subject: "Al Ahli Hosp Company Llc",
//     created: "01 Jan 23",
//     channels: [
//       { name: "twitter", icon: "twitter" },
//       { name: "instagram", icon: "instagram" },
//       { name: "linkedin", icon: "linkedin" },
//     ],
//     status: "Paused",
//     assignee: [
//       { avatar: avatarK },
//       { initial: "AE", theme: "pink" },
//       { avatar: avatarE },
//       { avatar: avatarF },
//       { avatar: avatarH },
//       { avatar: avatarG },
//     ],
//     daterange: "01 Jan - 07 Jan",
//   },
//   {
//     subject: "Al Ain Hospital-Seha",
//     created: "12 Dec 22",
//     channels: [
//       { name: "linkedin", icon: "linkedin" },
//       { name: "twitter", icon: "twitter" },
//       { name: "facebook", icon: "facebook-f" },
//       { name: "youtube", icon: "youtube-fill" },
//     ],
//     status: "Live Now",
//     assignee: [{ avatar: avatarI }, { avatar: avatarK }, { avatar: avatarE }, { avatar: avatarG }],
//     daterange: "12 Dec - 19 Dec",
//   },
// ];

// const HospitalListing = () => {
//   return (
//     <div>
//       <Card className="card-full">
//         <div className="card-inner">
//           <div className="card-title-group">
//             <div className="card-title">
//               <h6 className="title">Active Hospitals</h6>
//             </div>
//             <div className="card-tools">
//               <a href="#" className="link">
//                 View All
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="card-inner py-0 mt-n2">
//           <div className="nk-tb-list nk-tb-flush nk-tb-dashed">
//             <div className="nk-tb-item nk-tb-head">
//               <div className="nk-tb-col">
//                 <span>Facility</span>
//               </div>
//               <div className="nk-tb-col tb-col-mb">
//                 <span>Channels</span>
//               </div>
//               <div className="nk-tb-col tb-col-sm">
//                 <span>Status</span>
//               </div>
//               <div className="nk-tb-col tb-col-md">
//                 <span>Assignee</span>
//               </div>
//               <div className="nk-tb-col text-end">
//                 <span>Actions</span>
//               </div>
//             </div>
//             {data.map((item, index) => (
//               <div key={index} className="nk-tb-item">
//                 <div className="nk-tb-col">
//                   <span className="tb-lead">
//                     {item.subject}{" "}
//                     <span
//                       className={`dot dot-${
//                         item.status === "Live Now" ? "success" : item.status === "Paused" ? "warning" : ""
//                       } d-sm-none ms-1`}
//                     ></span>
//                   </span>
//                   <span className="tb-sub">Created on {item.created}</span>
//                 </div>
//                 <div className="nk-tb-col tb-col-mb">
//                   <ul className="d-flex gx-1">
//                     {item.channels.map((chanel, index) => (
//                       <li key={index} className={`text-${chanel.name}`}>
//                         <em className={`icon ni ni-${chanel.icon}`}></em>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="nk-tb-col tb-col-sm">
//                   <Badge
//                     className="badge-dim"
//                     color={item.status === "Live Now" ? "success" : item.status === "Paused" ? "warning" : ""}
//                   >
//                     {item.status}
//                   </Badge>
//                 </div>
//                 <div className="nk-tb-col tb-col-md">
//                   <div className="user-avatar-group">
//                     {item.assignee.length <= 4
//                       ? item.assignee.slice(0, 4).map((assignee, index) => (
//                           <div key={index} className={`user-avatar xs ${assignee.theme ? `bg-${assignee.theme}` : ""}`}>
//                             {assignee.initial && <span>{assignee.initial}</span>}
//                             {assignee.avatar && <img src={assignee.avatar} alt="" />}
//                           </div>
//                         ))
//                       : item.assignee.slice(0, 3).map((assignee, index) => (
//                           <div key={index} className={`user-avatar xs ${assignee.theme ? `bg-${assignee.theme}` : ""}`}>
//                             {assignee.initial && <span>{assignee.initial}</span>}
//                             {assignee.avatar && <img src={assignee.avatar} alt="" />}
//                           </div>
//                         ))}
//                     {item.assignee.length > 4 && (
//                       <div className="user-avatar xs">
//                         <span>{item.assignee.length - 3}+</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="nk-tb-col text-end">
//                   {/* <span>{item.daterange}</span> */}
//                   <Button className="btn-dim " size="sm" color="success">
//                     Edit
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default HospitalListing;
import React from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  BackTo,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  PreviewCard,
  RSelect,
} from "../../components/Component";
import {
  Card,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Tooltip,
  Button,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
} from "reactstrap";
//import teamData from "./data/team";
import { findUpper } from "../../utils/Utils";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const HospitalListing = () => {
  const [hospitalList, setHosptalList] = useState([]);
  const [modalForm, setModalForm] = useState(false);
  const [page, setPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(1);

  const token = localStorage.getItem("userToken");
  const userLocal = localStorage.getItem("user");
  const parsedData = JSON.parse(userLocal);
  const userId = parsedData.uid;

  useEffect(() => {
    fetchData();
  }, [page]);

  async function fetchData() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/resource/Hospital?filters=[["owner", "=", "${userId}"],["facility_type", "=", "Hospital"]]&fields=["hospital_name","location","category","image","name","country","status"]&limit_start=${page}&limit_page_length=10`,
        {
          headers: { Authorization: token, "Content-Type": "application/json" },
        }
      );

      setHosptalList(response.data.data);
    } catch (err) {
      console.log("this is the", err);
    }
    return;
  }

  const handleAdvanced3 = (name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/api/resource/Hospital/${name}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((respone) => {
            console.log(respone);
            fetchData();
          });

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const TooltipItem = (props) => {
    const { item, id } = props;
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    return (
      <Tooltip placement={item.placement} isOpen={tooltipOpen} target={id} toggle={toggle}>
        {item.text}
      </Tooltip>
    );
  };
  return (
    <React.Fragment>
      <Head title="Team"></Head>
      <Content>
        <BlockHead size="lg">
          <div className="nk-block-head-sub">
            <span>Hospitals</span>
          </div>
          <BlockBetween className="g-4" size="md">
            <BlockHeadContent>
              <BlockTitle tag="h2" className="fw-normal">
                Manage Hospitals
              </BlockTitle>
              <BlockDes>
                <p>You can add and remove team member as you want.</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools gx-3">
                <li>
                  {/*  <Link to={`${process.env.PUBLIC_URL}/subscription/hospital`} className="btn btn-primary">
                Add New Hospital
              </Link> */}
                  <Link to={`${process.env.PUBLIC_URL}/subscription/hospital`} className="btn btn-primary">
                    Add New Hospital
                  </Link>
                  {/* <a href="#" className="btn btn-primary"></a> */}
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Card className="card-bordered">
            <table className="table table-member table-lg">
              <thead className="tb-member-head table-light">
                <tr className="tb-member-item">
                  <th className="tb-member-Hospital tb-col-lg ">
                    <span className="overline-title">Hospital</span>
                  </th>
                  <th className="tb-member-Catogery ">
                    <span className="overline-title">Catogery</span>
                  </th>
                  <th className="tb-member-Location ">
                    <span className="overline-title">Location</span>
                  </th>
                  <th className="tb-member-Status ">
                    <span className="overline-title">Status</span>
                  </th>
                  <th className="tb-member-action b-col-lg ">
                    <span className="overline-title">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="tb-member-body">
                {hospitalList.map((item, index) => {
                  return (
                    <tr key={index} className="tb-member-item">
                      <td className="tb-member-Hospital b-col-lg ">
                        <div className="user-card">
                          <div className={`user-avatar bg-purple`}>
                            {/*  {item.image ? <img src={item.image} alt="" /> : <span>{findUpper(item.name)}</span>} */}

                            <span>{findUpper(item.hospital_name)}</span>
                          </div>
                          <div className="user-info ">
                            <Link to={`${process.env.PUBLIC_URL}/subscription/preview-hospital/${item.name}`}>
                              <span className="lead-text">{item.hospital_name}</span>
                            </Link>
                            {/* <span className="sub-text">{item.email}</span> */}
                          </div>
                        </div>
                      </td>
                      <td className="tb-member-Catogery ">
                        {/* <span>{item.permission}</span> */}
                        {item.category}
                      </td>
                      <td className="tb-member-Location ">
                        {/*   {item.role === "All" ? (
                      <span>All</span>
                    ) : (
                      <RSelect
                        options={teamRole}
                        defaultValue={[
                          {
                            value: item.role,
                            label: item.role,
                          },
                        ]}
                      />
                    )} */}
                        <span>{item.country}</span>
                      </td>
                      <td className="tb-member-Status ">
                        <span>
                          {item.status === "Approved" ? (
                            <Badge className="badge-dim" color="success">
                              {item.status}
                            </Badge>
                          ) : item.status === "Cancelled" ? (
                            <Badge className="badge-dim" color="danger">
                              {item.status}
                            </Badge>
                          ) : (
                            <Badge className="badge-dim" color="warning">
                              {item.status}
                            </Badge>
                          )}
                        </span>
                      </td>
                      <td className="tb-member-action tb-col-lg">
                        <div className="d-none d-md-inline">
                          <a
                            href={`https://hdir.prismaticsoft.com/ListInnerPage/${item.name}`}
                            className="link link-sm"
                            target="_blank"
                          >
                            <span>
                              <Icon name="question" id={"Preview-Hospital"} className="pe-auto" />
                              <TooltipItem
                                item={{
                                  placement: "top",
                                  text: "Preview-Hospital",
                                }}
                                id={"Preview-Hospital"}
                              />
                            </span>
                          </a>

                          <Link
                            to={`${process.env.PUBLIC_URL}/subscription/department/${item.name}`}
                            className="link link-sm"
                          >
                            <span>
                              <Icon name="plus-circle-fill" id={"Add-Department"} className="pe-auto" />
                              <TooltipItem
                                item={{
                                  placement: "top",
                                  text: "Manage Department",
                                }}
                                id={"Add-Department"}
                              />
                            </span>
                          </Link>
                          <Link
                            to={`${process.env.PUBLIC_URL}/subscription/hospital-editing/${item.name}`}
                            className="link link-sm"
                          >
                            <span>
                              <Icon name="edit" id={"Edit-Hospital"} className="pe-auto" />
                              <TooltipItem
                                item={{
                                  placement: "top",
                                  text: "Manage Hospital",
                                }}
                                id={"Edit-Hospital"}
                              />
                            </span>
                          </Link>
                          <a
                            href="#"
                            className="link link-sm link-danger"
                            onClick={() => {
                              handleAdvanced3(item.name);
                            }}
                          >
                            <span>
                              <Icon name="trash-fill" id={"Delete-Hospital"} />
                              <TooltipItem
                                item={{
                                  placement: "top",
                                  text: "Delete Hospital",
                                }}
                                id={"Delete-Hospital"}
                              />
                            </span>
                          </a>
                        </div>
                        <UncontrolledDropdown className="d-md-none">
                          <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                            <Icon name="more-v"></Icon>
                          </DropdownToggle>
                          <DropdownMenu size="xs" end>
                            <ul className="link-list-plain no-bdr">
                              <li className="active">
                                <a className="link link-sm" href="#">
                                  Edit
                                </a>
                              </li>
                              <li>
                                <a className="link link-sm link-danger" href="#">
                                  Remove
                                </a>
                              </li>
                            </ul>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </Block>
        <Block>
          <div>
            {/* <Pagination aria-label="Page navigation example" listClassName="justify-content-center">
              <PaginationItem>
                <PaginationLink
                  className="page-link-prev"
                  href="#prev"
                  onClick={(ev) => {
                    ev.preventDefault();
                    paginationPrev();
                  }}
                >
                  <Icon name="chevrons-left" />
                  <span>Prev</span>
                </PaginationLink>
              </PaginationItem>

              {mappedArray.map((data, index) => (
                <PaginationItem className={activeIndex === index + 1 ? "active" : ""}>
                  <PaginationLink
                    href="#item"
                    onClick={(ev) => {
                      ev.preventDefault();
                      activePage(index + 1);
                    }}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationLink
                  className="page-link-next"
                  href="#next"
                  onClick={(ev) => {
                    ev.preventDefault();
                    paginationNext();
                  }}
                >
                  <span>Next</span>
                  <Icon name="chevrons-right" />
                </PaginationLink>
              </PaginationItem>
            </Pagination> */}
          </div>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default HospitalListing;

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

import { findUpper } from "../../utils/Utils";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import CustomPagination from "../../components/Custom/CustomPagination";

const HospitalListing = () => {
  const [hospitalList, setHosptalList] = useState([]);
  const [modalForm, setModalForm] = useState(false);
  const [page, setPage] = useState(0);

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
                  <Link to={`${process.env.PUBLIC_URL}/hospital`} className="btn btn-primary">
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

                          <Link to={`${process.env.PUBLIC_URL}/department/${item.name}`} className="link link-sm">
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
                          <Link to={`${process.env.PUBLIC_URL}/hospital-editing/${item.name}`} className="link link-sm">
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
            <CustomPagination hospitalList={hospitalList} page={page} setPage={setPage} />
          </div>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default HospitalListing;

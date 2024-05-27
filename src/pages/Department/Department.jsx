import React, { useState, useEffect } from "react";
import {
  Col,
  Icon,
  Row,
  Button,
  BlockHead,
  BlockHeadContent,
  BackTo,
  PreviewCard,
  BlockTitle,
} from "../../../../components/Component";
import avatarImg from "../../../../images/avatar/avatar.JPG.png";
import axios from "axios";
import { Alert, Form, Tooltip } from "reactstrap";
import Content from "../../../../layout/content/Content";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import ModalFormInput from "../Modal/DepartmentEditModal";

function Department() {
  const { hospitalName } = useParams();
  const [departmentData, setDepartmentData] = useState("");
  const [imgFile, setImgFile] = useState(false);
  const [url, setUrl] = useState();
  const [display, setDisplay] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [modalForm, setModalForm] = useState(false);
  console.log("this is an display", display);
  //console.log("this is an departmentData", departmentData);
  const toggleForm = () => setModalForm(!modalForm);
  useEffect(() => {
    getData();
  }, []);

  const CloseButton = () => {
    return (
      <span className="btn-trigger toast-close-button" role="button">
        <Icon name="cross"></Icon>
      </span>
    );
  };
  const CustomToast = () => {
    return (
      <div className="toastr-text">
        <h5>Update Successfully</h5>
        <p>Department has been successfully added.</p>
      </div>
    );
  };

  const messageToast = () => {
    toast.success(<CustomToast />, {
      position: "bottom-right",
      autoClose: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      closeButton: <CloseButton />,
    });
  };

  const API_URL = process.env.REACT_APP_API_URL;
  const onInputChange = (e) => {
    setDepartmentData({ ...departmentData, [e.target.name]: e.target.value });
  };
  //console.log(departmentData);
  //Axios for posting data's.......
  const handleSubmit = (e) => {
    e.preventDefault();

    const newDepartmentData = {
      ...departmentData,
      head_image: imgFile,
      hospital: hospitalName,
    };
    //console.log("this is department data", newDepartmentData);
    if (departmentData) {
      const token = localStorage.getItem("userToken");
      axios
        .post(API_URL + "/api/resource/Department", newDepartmentData, {
          headers: { Authorization: token, "Content-Type": "application/json" },
        })
        .then((response) => {
          setDisplay((prev) => [...prev, response.data.data]);
          //setDisplay(...display, response.data.data);
          messageToast();
          setDepartmentData("");
          //console.log("department name", response.data.data["name"]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const getData = async () => {
    try {
      const token = localStorage.getItem("userToken");

      const response = await axios.get(
        API_URL +
          `/api/resource/Department?filters=[["Department", "hospital", "=","${hospitalName}"]]&fields=["department_name","department_head","specialization","name"]`,
        {
          headers: { Authorization: token, "Content-Type": "application/json" },
        }
      );

      //alert("ok");
      //console.log("this is d data", response.data.data);
      const newData = response.data.data;
      setDisplay(newData);
    } catch (error) {
      //alert("not ok");
      console.error(error);
    }
  };

  //axios for getting image path....
  const handleFileChange = (e) => {
    const token = localStorage.getItem("userToken");
    const selectedFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    setUrl(imageUrl);
    if (selectedFile) {
      // Create a FormData object and append the file and its URL
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("imageUrl", imageUrl);
      //console.log("this is data", data);

      axios
        .post(encodeURI(process.env.REACT_APP_API_URL + "/api/method/upload_file"), data, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data", // Set the content type correctly
          },
        })
        .then((response) => {
          let Fileinfo = response.data.message.file_url;
          setImgFile(Fileinfo);
          // console.log("this is 1 ", imgFile);
        })

        .catch((error) => console.error("Error:", error));
    }
  };

  //Axios for delete
  const handleDelete = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("userToken");
        const removeData = async () => {
          try {
            const response = await axios.delete(`${API_URL}/api/resource/Department/${data}`, {
              headers: {
                Authorization: token,
                "Content-Type": "multipart/form-data", // Set the content type correctly
              },
            });
            getData();
          } catch (error) {
            console.log("delete", error);
          }
        };

        removeData();
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
    <Content>
      <BlockHead size="lg">
        <BlockHeadContent>
          <BackTo link="/subscription/hospital-listing" icon="arrow-left">
            Go back
          </BackTo>
          <BlockTitle tag="h5">New Department Adding</BlockTitle>
          <p>Please fill the all fields</p>
        </BlockHeadContent>
      </BlockHead>
      <Form onSubmit={handleSubmit}>
        {display.length > 0 && (
          <table className="table">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Department Name</th>
                <th scope="col">Doctor Name</th>
                <th scope="col">Specialization</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {display.map((itm, k) => (
                <tr>
                  <th scope="row">{k + 1}</th>
                  <th scope="row">{itm.department_name}</th>
                  <td>{itm.department_head}</td>
                  <td> {itm.specialization}</td>
                  <td>
                    <Icon
                      name="edit"
                      className=" h5"
                      id={"Edit-Department"}
                      onClick={() => {
                        setModalForm(true);
                        setDepartmentName(itm.name);
                      }}
                    />
                    <TooltipItem
                      item={{
                        placement: "top",
                        text: "Edit Department",
                      }}
                      id={"Edit-Department"}
                    />
                  </td>
                  <td>
                    <Icon
                      name="trash-fill"
                      className="text-danger h5"
                      id={"Delete-Department"}
                      onClick={() => handleDelete(itm.name)}
                    />
                    <TooltipItem
                      item={{
                        placement: "top",
                        text: "Delete Department",
                      }}
                      id={"Delete-Department"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <PreviewCard>
          <div className="container mt-4">
            <Row>
              <Col lg="6">
                <div className="mb-3">
                  <label htmlFor="department_name" className="form-label">
                    Department Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="department_name"
                    name="department_name"
                    required
                    onChange={(e) => onInputChange(e)}
                    value={departmentData.department_name}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="doctorName" className="form-label">
                    Department Head
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="doctorName"
                    name="department_head"
                    onChange={(e) => onInputChange(e)}
                    value={departmentData.department_head}
                  />
                </div>
              </Col>
              <Col lg="5">
                <div style={{ float: "right" }}>
                  {imgFile ? (
                    <img src={`${API_URL}${imgFile}`} alt="profile img" width={100} />
                  ) : (
                    <img src={avatarImg} width={100} />
                  )}
                </div>
              </Col>

              <Col lg="1">
                <input type="file" onChange={handleFileChange} style={{ display: "none" }} id="fileInput" />
                <label htmlFor="fileInput">
                  <div>
                    <Icon name="edit" className="pe-auto h5" id={"Edit"} />
                    <TooltipItem
                      item={{
                        placement: "top",
                        text: "Edit",
                      }}
                      id={"Edit"}
                    />
                  </div>
                </label>

                <div>
                  <Icon
                    name="trash-alt"
                    className=" h5 text-danger pe-auto"
                    id={"Delete"}
                    onClick={() => setImgFile(false)}
                  />
                  <TooltipItem
                    item={{
                      placement: "top",
                      text: "Delete",
                    }}
                    id={"Delete"}
                  />
                </div>
              </Col>
            </Row>
            <Col lg="6">
              <div className="mb-3">
                <label htmlFor="specialization" className="form-label">
                  Specialization
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="doctorSpecialization"
                  name="specialization"
                  required
                  onChange={(e) => onInputChange(e)}
                  value={departmentData.specialization}
                />
              </div>
            </Col>
            <div>
              <label htmlFor="specialization" className="form-label">
                Qualification
              </label>
              <textarea
                type="text"
                name="qualification"
                id="DoctorQualification"
                onChange={(e) => onInputChange(e)}
                value={departmentData.qualification}
                className="form-control"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="departmentDescription" className="form-label">
                Department Details
              </label>
              <textarea
                className="form-control"
                id="department_details"
                name="department_details"
                rows="3"
                required
                onChange={(e) => onInputChange(e)}
                value={departmentData.department_details}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Department
            </button>
          </div>
          <br />
        </PreviewCard>
        <ToastContainer />
      </Form>
      <ModalFormInput modalForm={modalForm} toggleForm={toggleForm} departmentName={departmentName} />
    </Content>
  );
}

export default Department;

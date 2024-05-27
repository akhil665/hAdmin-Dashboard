import React, { useEffect, useState } from "react";
import { ModalBody, ModalFooter, ModalHeader, Modal, Label, Input, Tooltip } from "reactstrap";
import { Button, Col, Icon, Row } from "../../components/Component";
import { thumbunailChange } from "../../utils/ImageAxiosPage";
import avatarImg from "../../images/avatar/avatar.jpg";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

function ModalFormInput({ toggleForm, modalForm, departmentName }) {
  const [data, setData] = useState([]);

  const [thumbnailImg, setThumbunailImg] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;
  console.log(thumbnailImg, "==thumbnailImg");
  useEffect(() => {
    fetchData();
  }, [modalForm]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/resource/Department/${departmentName}`);
      //console.log("this is response data", response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editedData = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    const datas = {
      ...data,
      head_image: thumbnailImg,
    };

    try {
      const response = await axios.put(`${API_URL}/api/resource/Department/${departmentName}`, datas, {
        headers: { Authorization: token, "Content-Type": "application/json" },
      });
      console.log("this is response data", response.data.data);
      setData(response.data.data);
      messageToast();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    thumbunailChange(e, setThumbunailImg);
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

  const CustomToast = () => {
    return (
      <div className="toastr-text">
        <h5>Update Successfully</h5>
        <p>Department has been successfully updated.</p>
      </div>
    );
  };
  const CloseButton = () => {
    return (
      <span className="btn-trigger toast-close-button" role="button">
        <Icon name="cross"></Icon>
      </span>
    );
  };

  const messageToast = () => {
    toast.success(<CustomToast />, {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      closeButton: <CloseButton />,
    });
  };
  const sanitizedHTML = {
    __html: data.department_details,
  };
  return (
    <React.Fragment>
      <Modal size="lg" isOpen={modalForm} toggle={toggleForm}>
        <ModalHeader
          toggle={toggleForm}
          close={
            <button className="close" onClick={toggleForm}>
              <Icon name="cross" />
            </button>
          }
        >
          Customer Info
        </ModalHeader>
        <ModalBody>
          <form>
            <Row>
              <Col md={6}>
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name">
                    Department Name
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      id="Department Name"
                      value={data.department_name}
                      name="department_name"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Department Head
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      id="Department Head"
                      value={data.department_head}
                      name="department_head"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </Col>
              <Col md={6} className="d-flex ">
                <div className="form-group mt-3">
                  <Label htmlFor="customFile" className="form-label">
                    Photo File Upload
                  </Label>
                  <div className="form-control-wrap">
                    <div className="form-file">
                      <Input id="customFile" type="file" onChange={handleFileChange} />
                    </div>
                  </div>
                </div>
                <div className="d-flex p-3">
                  {thumbnailImg ? (
                    <img src={API_URL + thumbnailImg} width={100} />
                  ) : (
                    <img src={avatarImg} width={100} />
                  )}

                  <Icon
                    name="trash-fill"
                    className="text-danger h5 pe-auto"
                    id={"Remove-Picture"}
                    onClick={() => setThumbunailImg("")}
                  />
                  <TooltipItem
                    item={{
                      placement: "top",
                      text: "Remove Picture",
                    }}
                    id={"Remove-Picture"}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mt-3">
                  <label htmlFor="specialization" className="form-label">
                    Specialization
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="doctorSpecialization"
                    name="specialization"
                    value={data.specialization}
                    onChange={handleChange}
                  />
                </div>
              </Col>

              <Col md={12}>
                <div className="form-group">
                  <label className="form-label" htmlFor="cf-default-textarea">
                    Department Details
                  </label>
                  <div className="form-control-wrap">
                    <textarea
                      className="form-control form-control-sm"
                      id="cf-default-textarea"
                      placeholder="Write your message"
                      name="department_details"
                      value={data.department_details}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </Col>
              <Col md={12}>
                <div className="form-group">
                  <label className="form-label" htmlFor="cf-default-textarea">
                    Qualification
                  </label>
                  <div className="form-control-wrap">
                    <textarea
                      className="form-control form-control-sm"
                      id="cf-default-textarea"
                      placeholder="Write your message"
                      name="qualification"
                      value={data.qualification}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </Col>

              <div className="form-group mt-2">
                <Button color="primary" type="submit" onClick={editedData} size="lg">
                  Save Information
                </Button>
              </div>
            </Row>
            <ToastContainer />
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default ModalFormInput;

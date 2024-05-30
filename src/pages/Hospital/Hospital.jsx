import React from "react";
import { useEffect, useState } from "react";
import {
  Block,
  BlockHead,
  BlockDes,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  PreviewCard,
  Row,
  RSelect,
  BackTo,
  Icon,
} from "../../components/Component";
import { Label, Input } from "reactstrap";
import { Form } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Content from "../../layout/content/Content";
import { thumbunailChange, headPhysicianChange, handleChange } from "../../utils/ImageAxiosPage";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import ReactQuill from "react-quill";
import noImage from "../../images/avatar/avatar.jpg";
function Hospital() {
  const [hospitalData, setHospitalData] = useState([]);
  const [imgFile, setImgFile] = useState([]);
  const [thumbnailImg, setThumbunailImg] = useState("");
  const [headPhysicianImg, setHeadPhysicianImg] = useState("");
  const [diseaseData, setDiseaseData] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [mainCategory, setMainCategory] = useState("");
  const [multipleCategory, setMultipleCategory] = useState([]);
  const [quillData, setquillData] = useState([]);

  const navigate = useNavigate();

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
        <h5>Added Successfully</h5>
        <p>Your Hospital has been successfully added.</p>
      </div>
    );
  };
  //Alert message....
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

  //Input OnChange Func...
  const onInputChange = (e) => {
    setHospitalData({ ...hospitalData, [e.target.name]: e.target.value });
  };

  // Submit Func....
  const API_URL = process.env.REACT_APP_API_URL;

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const imageData =
  //     imgFile.multiImg && imgFile.multiImg.length > 0
  //       ? imgFile.multiImg.map((singlePath) => ({ image: singlePath }))
  //       : null;
  //   const certificate =
  //     imgFile.certificateImg && imgFile.certificateImg.length > 0
  //       ? imgFile.certificateImg.map((singlePath) => ({ title: singlePath }))
  //       : null;
  //   const reSelectData = selectedValues.map((singleValue) => ({ disease: singleValue.label }));
  //   const otherCategories = multipleCategory.map((singleValue) => ({ category: singleValue.label }));

  //   const newHospitalData = {
  //     ...hospitalData,
  //     images: imageData,
  //     image: thumbnailImg,
  //     hospital_disease: reSelectData,
  //     img: headPhysicianImg,
  //     accomodation: quillData.accomodation,
  //     about: quillData.about,
  //     category: mainCategory["value"],
  //     categories: otherCategories,
  //     hospital_certificate: certificate,
  //     facility_type: "Hospital",
  //   };
  //   //console.log("Form submitted with data:", newHospitalData);

  //   //Axios for Adding New hospital Adding

  //   const token = localStorage.getItem("userToken");
  //   axios
  //     .post(API_URL + "/api/resource/Hospital", newHospitalData, {
  //       headers: { Authorization: token, "content-type": "application/json" },
  //     })

  //     .then((response) => {
  //       console.log(response.data);
  //       messageToast();
  //       setTimeout(() => {
  //         navigate(-1); // Navigate after 3 seconds
  //       }, 3000);
  //     })

  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Optional chaining and nullish coalescing for image data
    const imageData = imgFile.multiImg?.length ? imgFile.multiImg.map((singlePath) => ({ image: singlePath })) : null;
    const certificateData = imgFile.certificateImg?.length
      ? imgFile.certificateImg.map((singlePath) => ({ title: singlePath }))
      : null;

    // Mapping selected values and categories
    const reSelectData = selectedValues.map((singleValue) => ({ disease: singleValue.label }));
    const otherCategories = multipleCategory.map((singleValue) => ({ category: singleValue.label }));

    // Constructing the new hospital data object
    const newHospitalData = {
      ...hospitalData,
      images: imageData,
      image: thumbnailImg,
      hospital_disease: reSelectData,
      img: headPhysicianImg,
      accomodation: quillData.accomodation,
      about: quillData.about,
      category: mainCategory.value,
      categories: otherCategories,
      hospital_certificate: certificateData,
      facility_type: "Hospital",
    };

    // Validation
    if (!thumbnailImg || !headPhysicianImg || !mainCategory.value) {
      alert("Please fill all the required fields.");
      return;
    }

    // Retrieve token
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("User is not authenticated. Please log in.");
      navigate("/login"); // Redirect to login page
      return;
    }

    // Axios request to add a new hospital
    axios
      .post(`${API_URL}/api/resource/Hospital`, newHospitalData, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        messageToast();
        setTimeout(() => {
          navigate(-1); // Navigate back after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while submitting the form. Please try again.");
      });
  };

  const multiImghandleChange = async (e) => {
    try {
      const response = await handleChange(e);
      setImgFile({ ...imgFile, ["multiImg"]: response });
      console.log(response, "muit===");
    } catch (err) {
      console.log(err);
    }
  };
  //Axios for Getting Thumbunail Image path...

  const certificateImg = async (e) => {
    try {
      const response = await handleChange(e);
      setImgFile({ ...imgFile, ["certificateImg"]: response });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleFileChange = (e) => {
    thumbunailChange(e, setThumbunailImg);
  };

  const headPhysicianImageChange = (e) => {
    headPhysicianChange(e, setHeadPhysicianImg);
  };

  //quill change..
  const quillChange = (key, e) => {
    setquillData({ ...quillData, [key]: e });
  };

  //Reselect disease func...
  const handleSelectChange = (selectedOptions) => {
    setSelectedValues(selectedOptions);
  };

  //Main Category func...
  const mainCategoryChange = (selectedOption) => {
    setMainCategory(selectedOption);
  };
  //Multiple Category func..
  const multipleCategories = (selectedOption) => {
    setMultipleCategory(selectedOption);
    //console.log(selectedOption);
  };

  //Axios for Reselect options
  useEffect(() => {
    axios
      .get(`${API_URL}/api/method/hdir.api.get_category`)
      .then((response) => {
        setDiseaseData(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <Content>
      <Block size="lg">
        <BlockHead>
          <BlockHeadContent>
            <BackTo link="/hospital-listing" icon="arrow-left">
              Go back
            </BackTo>
            <BlockTitle tag="h5">New Hospital Adding </BlockTitle>
            <p>Pleaase fill all the fields</p>
          </BlockHeadContent>
        </BlockHead>

        <Form onSubmit={handleSubmit}>
          <PreviewCard>
            <Row className="g-3">
              <Col lg="6">
                <div className="form-group" style={{ paddingTop: "1em" }}>
                  <label className="form-label" htmlFor="full-name-1">
                    Hospital Name
                  </label>

                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="full-name-1"
                      className="form-control"
                      name="hospital_name"
                      onChange={(e) => onInputChange(e)}
                      value={hospitalData.hospital_name}
                      required
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group" style={{ paddingTop: "1em" }}>
                  <Col>
                    <div className="form-group">
                      <label className="form-label"> Main Category</label>
                      <RSelect
                        options={diseaseData.map((data) => ({
                          value: data.name,
                          label: data.name,
                        }))}
                        name="category"
                        required
                        onChange={mainCategoryChange}
                        value={hospitalData.category}
                      />
                    </div>
                  </Col>
                </div>
              </Col>

              <Col lg="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="email-address-1">
                    Email address
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="email"
                      id="email-address-1"
                      className="form-control "
                      required
                      name="email"
                      onChange={(e) => onInputChange(e)}
                      value={hospitalData.email}
                    />
                  </div>
                </div>
              </Col>
              <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Other Categories</label>

                  <RSelect
                    name="select"
                    closeMenuOnSelect={false}
                    log
                    isMulti
                    options={diseaseData.map((data) => ({
                      value: data.name,
                      label: data.name,
                    }))}
                    onChange={multipleCategories}
                    value={multipleCategory}
                  />
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone-no-1">
                    Phone No
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="number"
                      id="phone-no-1"
                      className="form-control"
                      name="contact"
                      onChange={(e) => onInputChange(e)}
                      value={hospitalData.contact}
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="pay-amount-1">
                    Location
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="pay-amount-1"
                      className="form-control"
                      name="location"
                      onChange={(e) => onInputChange(e)}
                      value={hospitalData.location}
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="pay-amount-1">
                    Country
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="pay-amount-1"
                      className="form-control"
                      name="country"
                      onChange={(e) => onInputChange(e)}
                      value={hospitalData.country}
                    />
                  </div>
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label className="form-label">Select diseases</label>

                  <RSelect
                    name="select"
                    closeMenuOnSelect={false}
                    log
                    isMulti
                    options={diseaseData.flatMap((data) =>
                      data.subs.map((sub) => ({
                        value: sub.name, // Replace with the actual value from data
                        label: sub.name, // Replace with the actual label from data
                      }))
                    )}
                    onChange={handleSelectChange}
                    value={selectedValues}
                  />
                </div>
              </Col>
              <Col sm="12">
                <BlockHead>
                  <BlockHeadContent>
                    <BlockTitle tag="h5">Accomodation</BlockTitle>
                    <BlockDes>
                      <p>You can add the accomodation details here.</p>
                    </BlockDes>
                  </BlockHeadContent>
                </BlockHead>

                <ReactQuill
                  onChange={(e) => quillChange("accomodation", e)}
                  theme="snow"
                  value={quillData.accomodation}
                />
              </Col>
              <Col sm="12">
                <BlockHead>
                  <BlockHeadContent>
                    <BlockTitle tag="h5">About</BlockTitle>
                    <BlockDes>
                      <p>You can add about details here</p>
                    </BlockDes>
                  </BlockHeadContent>
                </BlockHead>

                <ReactQuill onChange={(e) => quillChange("about", e)} theme="snow" value={quillData.about} />
              </Col>
              <Col lg="6">
                <div>
                  <div className="form-group">
                    <Label htmlFor="customFile" className="form-label">
                      Thumbnail Image
                    </Label>
                    <div className="form-control-wrap">
                      <div className="form-file">
                        <Input id="customFile" type="file" onChange={handleFileChange} />
                      </div>
                    </div>
                    {thumbnailImg ? (
                      <img
                        src={process.env.REACT_APP_API_URL + thumbnailImg}
                        style={{ padding: "1em", width: "150px" }}
                      />
                    ) : (
                      <img src={noImage} style={{ padding: "1em", width: "150px" }} />
                    )}
                  </div>
                  <Button className="btn-dim mt-2" color="secondary" type="button" onClick={() => setThumbunailImg("")}>
                    Delete
                  </Button>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <Label htmlFor="customFile" className="form-label">
                    Slider Images
                  </Label>
                  <div className="form-control-wrap">
                    <div className="form-file">
                      <Input id="customFile" type="file" onChange={multiImghandleChange} multiple />
                    </div>
                    <div style={{ display: "inline-flex", overflow: "scroll" }}>
                      {imgFile.multiImg && imgFile.multiImg.length > 0 ? (
                        imgFile.multiImg.map((url, index) => (
                          <img
                            key={index}
                            src={process.env.REACT_APP_API_URL + url}
                            style={{ padding: "1em", width: "150px" }}
                          />
                        ))
                      ) : (
                        <img src={noImage} style={{ padding: "1em", width: "150px" }} />
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  className="btn-dim mt-2"
                  color="secondary"
                  type="button"
                  onClick={() => {
                    setImgFile({ ...imgFile, multiImg: [] });
                  }}
                >
                  Delete
                </Button>
              </Col>
              <Col lg="6">
                <div>
                  <div className="form-group">
                    <Label htmlFor="customFile" className="form-label">
                      Head Physician Image
                    </Label>
                    <div className="form-control-wrap">
                      <div className="form-file">
                        <Input id="customFile" type="file" onChange={headPhysicianImageChange} />
                      </div>
                    </div>
                    {headPhysicianImg ? (
                      <img
                        src={process.env.REACT_APP_API_URL + headPhysicianImg}
                        style={{ padding: "1em", width: "150px" }}
                      />
                    ) : (
                      <img src={noImage} style={{ padding: "1em", width: "150px" }} />
                    )}
                  </div>
                  <Button
                    className="btn-dim mt-2"
                    color="secondary"
                    type="button"
                    onClick={() => setHeadPhysicianImg("")}
                  >
                    Delete
                  </Button>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <Label htmlFor="customFile" className="form-label">
                    Certificate Images
                  </Label>
                  <div className="form-control-wrap">
                    <div className="form-file">
                      <Input id="customFile" type="file" onChange={certificateImg} multiple />
                    </div>
                    <div style={{ display: "inline-flex", overflow: "scroll" }}>
                      {imgFile.certificateImg && imgFile.certificateImg.length > 0 ? (
                        imgFile.certificateImg.map((url, index) => (
                          <img
                            key={index}
                            src={process.env.REACT_APP_API_URL + url}
                            style={{ padding: "1em", width: "150px" }}
                          />
                        ))
                      ) : (
                        <img src={noImage} style={{ padding: "1em", width: "150px" }} />
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  className="btn-dim mt-2"
                  color="secondary"
                  type="button"
                  onClick={() => setImgFile({ ...imgFile, certificateImg: [] })}
                >
                  Delete
                </Button>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <label className="form-label">Communication</label>
                  <ul className="custom-control-group g-3 align-center">
                    <li>
                      <div className="custom-control custom-control-sm custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="com-email-1" />
                        <label className="custom-control-label" htmlFor="com-email-1">
                          Email
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="custom-control custom-control-sm custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="com-sms-1" />
                        <label className="custom-control-label" htmlFor="com-sms-1">
                          SMS
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="custom-control custom-control-sm custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="com-phone-1" />
                        <label className="custom-control-label" htmlFor="com-phone-1">
                          Phone
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col xl="12">
                <Button color="primary" size="lg" type="submit" /* onClick={handleSubmit} */>
                  Update
                </Button>
                <ToastContainer />
              </Col>
            </Row>
          </PreviewCard>
        </Form>
      </Block>
    </Content>
  );
}

export default Hospital;

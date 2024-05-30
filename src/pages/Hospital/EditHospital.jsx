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
import Content from "../../layout/content/Content";
import { Form, Input, Label } from "reactstrap";
import axios from "axios";
import { useParams } from "react-router";
import { thumbunailChange, headPhysicianChange, handleChange } from "../../utils/ImageAxiosPage";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import ReactQuill from "react-quill";
import noImage from "../../images/avatar/avatar.jpg";

function EditHospital() {
  const { id } = useParams();
  const [diseaseData, setDiseaseData] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [hospitalData, setHospitalData] = useState([]);
  const [thumbnailImg, setThumbunailImg] = useState("");
  const [headPhysicianImg, setHeadPhysicianImg] = useState("");
  const [imgFile, setImgFile] = useState([]);
  const [mainCategory, setMainCategory] = useState("");
  const [multipleCategory, setMultipleCategory] = useState([]);
  const [flag, setFlag] = useState(false);

  //const [newData, setNewDate] = useState([]);
  console.log("this is newdata", multipleCategory);
  const token = localStorage.getItem("userToken");

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
        <p>Your Hospital has been successfully updated.</p>
      </div>
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

  useEffect(() => {
    diseaseFetchData();
    hospitalFetchData();
  }, []);

  //Axios for Getting Hospital Data.....
  const hospitalFetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/resource/Hospital/${id}`);
      setHospitalData(response.data.data);
    } catch (error) {
      console.log("this is error", error);
    }
  };

  //Axios for Reselect Options.....
  const diseaseFetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/method/hdir.api.get_category`);
      setDiseaseData(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Axios for Edited the data put...

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageData = imgFile.multiImg && imgFile.multiImg.map((singlePath) => ({ image: singlePath }));
    const reSelectData = selectedValues.map((singleValue) => ({ disease: singleValue.label }));
    const otherCategories = multipleCategory.map((singleValue) => ({ category: singleValue.label }));
    const certificate = imgFile.certificateImg && imgFile.certificateImg.map((singlePath) => ({ title: singlePath }));
    const newEditedData = {
      ...hospitalData,
      hospital_disease: reSelectData,
      category: mainCategory["value"],
      /*  images: imageData,
      image: thumbna ilImg,
      img: headPhysicianImg, */
      ...(imageData && imageData.length > 0 ? { images: imageData } : null),
      ...(thumbnailImg ? { image: thumbnailImg } : null),
      ...(headPhysicianImg ? { img: headPhysicianImg } : null),
      ...(certificate && certificate.length > 0 ? { hospital_certificate: certificate } : null),
      categories: otherCategories,
    };
    const editData = async () => {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/resource/Hospital/${id}`,
          newEditedData,
          {
            headers: { Authorization: token, "content-type": "application/json" },
          }
        );
        messageToast();
      } catch (error) {
        console.log("this is error", error);
      }
    };
    editData();
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedValues(selectedOptions);
  };
  const mainCategoryChange = (selectedOption) => {
    setMainCategory(selectedOption);
  };

  useEffect(() => {
    if (hospitalData.hospital_disease && !selectedValues.length) {
      const initialSelectedOptions = hospitalData.hospital_disease.map((data) => ({
        value: data.disease,
        label: data.disease,
      }));

      setSelectedValues(initialSelectedOptions);
    }
  }, [hospitalData]);

  useEffect(() => {
    if (hospitalData.category && !flag) {
      const initialSelectedOptions = {
        value: hospitalData.category,
        label: hospitalData.category,
      };

      setMainCategory(initialSelectedOptions);
      setFlag(true);
    }
  }, [hospitalData]);

  useEffect(() => {
    if (hospitalData.categories && !multipleCategory.length) {
      const initialSelectedOptions = hospitalData.categories.map((data) => ({
        value: data.category,
        label: data.category,
      }));

      setMultipleCategory(initialSelectedOptions);
    }
  }, [hospitalData]);

  //New date adding in a state variable...
  const onInputChange = (e) => {
    setHospitalData({ ...hospitalData, [e.target.name]: e.target.value });
  };

  //Axios for Thumbnail image change...

  const handleFileChange = async (e) => {
    try {
      await thumbunailChange(e, setThumbunailImg);
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  };

  //Axios for headphysician image change...
  const headPhysicianImageChange = (e) => {
    headPhysicianChange(e, setHeadPhysicianImg);
  };
  //Axios for Multiple image....
  const multiImghandleChange = async (e) => {
    try {
      const response = await handleChange(e);
      setImgFile({ ...imgFile, ["multiImg"]: response });
    } catch (err) {
      console.log(err);
    }
  };

  const CertificateImg = async (e) => {
    try {
      const response = await handleChange(e);
      setImgFile({ ...imgFile, ["certificateImg"]: response });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  //Multiple Category func..
  const multipleCategories = (selectedOption) => {
    setMultipleCategory(selectedOption);
    //console.log(selectedOption);
  };

  return (
    <React.Fragment>
      <Content>
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BackTo link="/hospital-listing" icon="arrow-left">
                Go back
              </BackTo>
              <BlockTitle tag="h5">Edit the Hospital </BlockTitle>
              <p>You can alow display form in column as example below.</p>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="Hospital-name-1">
                      Hospital Name
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="Hospital-name-1"
                        className="form-control"
                        value={hospitalData.hospital_name}
                        name="hospital_name"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
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
                      value={mainCategory}
                    />
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email-address-1">
                      Email address
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="email-address-1"
                        className="form-control"
                        value={hospitalData.email}
                        name="email"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="form-group">
                    <label className="form-label">Other Categories</label>

                    <RSelect
                      name="other-categories"
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
                    <label className="form-label" htmlFor="phone-no">
                      Phone No
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        id="phone-no"
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
                    <label className="form-label" htmlFor="Location-1">
                      Location
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="Location-1"
                        className="form-control"
                        value={hospitalData.location}
                        name="location"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="Country-1">
                      Country
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="Country-1"
                        className="form-control"
                        name="country"
                        onChange={(e) => onInputChange(e)}
                        value={hospitalData.country}
                      />
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
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
                <Col lg="12">
                  <BlockHead>
                    <BlockHeadContent>
                      <BlockTitle tag="h5">Accomodation</BlockTitle>
                      <BlockDes>
                        <p>You can add the accomodation details here.</p>
                      </BlockDes>
                    </BlockHeadContent>
                  </BlockHead>

                  <ReactQuill
                    onChange={(e) => setHospitalData({ ...hospitalData, ["accomodation"]: e })}
                    theme="snow"
                    value={hospitalData.accomodation}
                  />
                </Col>
                <Col lg="12">
                  <BlockHead>
                    <BlockHeadContent>
                      <BlockTitle tag="h5">About</BlockTitle>
                      <BlockDes>
                        <p>You can add about details here</p>
                      </BlockDes>
                    </BlockHeadContent>
                  </BlockHead>

                  <ReactQuill
                    onChange={(e) => setHospitalData({ ...hospitalData, ["about"]: e })}
                    theme="snow"
                    value={hospitalData.about}
                  />
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <Label htmlFor="customFile" className="form-label">
                      Thumbnail Image
                    </Label>
                    <div className="form-control-wrap">
                      <div className="form-file">
                        <Input id="customFile" type="file" onChange={handleFileChange} />
                      </div>
                    </div>
                    {thumbnailImg || hospitalData.image ? (
                      <img
                        src={process.env.REACT_APP_API_URL + (thumbnailImg || hospitalData.image)}
                        style={{ padding: "1em", width: "150px" }}
                        alt="Thumbnail Image"
                      />
                    ) : (
                      <img src={noImage} style={{ padding: "1em", width: "150px" }} />
                    )}
                  </div>
                  <Button
                    className="btn-dim mt-2"
                    color="secondary"
                    type="button"
                    onClick={() => {
                      setThumbunailImg("");
                      setHospitalData({ ...hospitalData, image: "" });
                    }}
                  >
                    Delete
                  </Button>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <Label htmlFor="customFile" className="form-label">
                      Slider Images
                    </Label>
                    <div className="form-control-wrap">
                      <div className="form-file">
                        <Input id="customFile" type="file" multiple onChange={multiImghandleChange} />
                        <div style={{ display: "inline-flex", overflow: "scroll" }}>
                          {imgFile.multiImg && imgFile.multiImg.length > 0 ? (
                            imgFile.multiImg.map((data, index) => (
                              <img
                                key={index}
                                src={process.env.REACT_APP_API_URL + data}
                                style={{ padding: "1em", width: "150px" }}
                                alt={`Image ${index}`}
                              />
                            ))
                          ) : hospitalData.images && hospitalData.images.length > 0 ? (
                            hospitalData.images.map((url, index) => (
                              <img
                                key={index}
                                src={process.env.REACT_APP_API_URL + url.image}
                                style={{ padding: "1em", width: "150px" }}
                                alt={`Image ${index}`}
                              />
                            ))
                          ) : (
                            <img src={noImage} style={{ padding: "1em", width: "150px" }} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="btn-dim mt-2"
                    color="secondary"
                    type="button"
                    onClick={() => {
                      setImgFile({ ...imgFile, multiImg: [] });
                      setHospitalData({ ...hospitalData, images: [] });
                    }}
                  >
                    Delete
                  </Button>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <Label htmlFor="customFile" className="form-label">
                      Head Physician Image
                    </Label>
                    <div className="form-control-wrap">
                      <div className="form-file">
                        <Input id="customFile" type="file" onChange={headPhysicianImageChange} />
                      </div>
                    </div>
                    {headPhysicianImg || hospitalData.img ? (
                      <img
                        src={process.env.REACT_APP_API_URL + (headPhysicianImg || hospitalData.img)}
                        style={{ padding: "1em", width: "150px" }}
                        alt="Head Physician Image"
                      />
                    ) : (
                      <img src={noImage} style={{ padding: "1em", width: "150px" }} />
                    )}
                  </div>
                  <Button
                    className="btn-dim mt-2"
                    color="secondary"
                    type="button"
                    onClick={() => {
                      setHeadPhysicianImg(" ");
                      setHospitalData({ ...hospitalData, img: "" });
                    }}
                  >
                    Delete
                  </Button>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <Label htmlFor="customFile" className="form-label">
                      Certificate Images
                    </Label>
                    <div className="form-control-wrap">
                      <div className="form-file">
                        <Input id="customFile" type="file" multiple onChange={CertificateImg} />
                        <div style={{ display: "inline-flex", overflow: "scroll" }}>
                          {imgFile.certificateImg && imgFile.certificateImg.length > 0 ? (
                            imgFile.certificateImg.map((data, index) => (
                              <img
                                key={index}
                                src={process.env.REACT_APP_API_URL + data}
                                style={{ padding: "1em", maxWidth: "80px" }}
                                alt={`Image ${index}`}
                              />
                            ))
                          ) : hospitalData.hospital_certificate && hospitalData.hospital_certificate.length > 0 ? (
                            hospitalData.hospital_certificate.map((url, index) => (
                              <img
                                key={index}
                                src={process.env.REACT_APP_API_URL + url.title}
                                style={{ padding: "1em", maxWidth: "80px" }}
                                alt={`Image ${index}`}
                              />
                            ))
                          ) : (
                            <img src={noImage} style={{ padding: "1em", width: "150px" }} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="btn-dim mt-2"
                    color="secondary"
                    type="button"
                    onClick={() => {
                      setImgFile({ ...imgFile, certificateImg: [] });
                      setHospitalData({ ...hospitalData, hospital_certificate: [] });
                    }}
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
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label">Payment Methods</label>
                    <ul className="custom-control-group g-3 align-center">
                      <li>
                        <div className="custom-control custom-control-sm custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="pay-card-1" />
                          <label className="custom-control-label" htmlFor="pay-card-1">
                            Card
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="pay-bitcoin-1" />
                          <label className="custom-control-label" htmlFor="pay-bitcoin-1">
                            Bitcoin
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="pay-cash-1" />
                          <label className="custom-control-label" htmlFor="pay-cash-1">
                            Cash
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col xl="12">
                  <Button color="primary" size="lg" type="submit" /* onClick={handleSubmit} */>
                    Save Information
                  </Button>
                </Col>
                <ToastContainer />
              </Row>
            </Form>
          </PreviewCard>
        </Block>
      </Content>
    </React.Fragment>
  );
}

export default EditHospital;

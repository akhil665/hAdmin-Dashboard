import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Icon } from "../../../components/Component";
import { useState } from "react";
import * as Components from "./NewLoginStyles";
import OtpInput from "react-otp-input";
import { checkOTP, sendOTP } from "../../../services/auth";
import { useNavigate } from "react-router";

const NowLoginModal = ({ setModalSm, modalSm }) => {
  const [phone, setPhone] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const toggleSm = () => {
    setModalSm(!modalSm);
    setOtpModal(false);
    setOtp("");
    setResponse("");
    setPhone("");
  };
  const handleSubmit = async () => {
    const formData = {
      number: phone,
    };

    try {
      const response = await sendOTP(formData);
    } catch (err) {
      console.log(err);
    }
  };

  const optSubmit = async () => {
    const details = {
      number: phone,
    };
    try {
      const response = await checkOTP(details, otp);
      setResponse(response);
      if (response.msg === "OTP VERIFIED & LOGGING IN") {
        setTimeout(() => {
          navigate("/demo9");
        }, 1000);
      } else {
        setResponse({ msg: "No User found", class: "text-danger" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {" "}
      <Modal size="sm" isOpen={modalSm} toggle={toggleSm}>
        <ModalHeader
          toggle={toggleSm}
          close={
            <button className="close" onClick={toggleSm}>
              <Icon name="cross" />
            </button>
          }
        >
          {otpModal ? "Enter OTP" : "Enter Mobile number"}
        </ModalHeader>
        <div>{response && <p className={`${response.class} align center pt-4`}>{response.msg}</p>}</div>
        {otpModal ? (
          <>
            <ModalBody className="align center flex-colomn py-2">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} style={{ width: "20px", margin: "0 5px" }} />}
              />
            </ModalBody>
            <div className="pb-2 align center">
              <Button className="btn-round " color="primary" size="sm" onClick={optSubmit}>
                Submit
              </Button>
            </div>
          </>
        ) : (
          <>
            <ModalBody className="align center flex-colomn py-2">
              {/* <PhoneInput defaultCountry="ua" value={phone} onChange={(phone) => setPhone(phone)} /> */}
              <Components.Input
                type="number"
                id="name"
                placeholder="Enter your mobile number"
                className="form-control-lg form-control"
                onChange={(e) => setPhone(e.target.value)}
                //onPaste={(e) => setPhone(e.clipboardData.getData("Text"))}
                value={phone}
              />
            </ModalBody>
            <div className="pb-2 align center">
              <Button
                className="btn-round "
                color="primary"
                size="sm"
                onClick={() => {
                  setOtpModal(true);
                  handleSubmit();
                }}
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default NowLoginModal;

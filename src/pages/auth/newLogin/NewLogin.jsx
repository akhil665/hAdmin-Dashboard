import React from "react";
import * as Components from "./NewLoginStyles";
import Logo from "../../../images/transparentlogo.png";
import LogoDark from "../../../images/transparentlogo.png";
import registrationImg from "../../../images/register-manager.jpg";
import Head from "../../../layout/head/Head";
import AuthFooter from "../../auth/AuthFooter";
import { Block, Icon } from "../../../components/Component";
import { Form, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../../../services/auth";
import NewLoginModal from "./NowLoginModal";

const NewLogin = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const [signIn, toggle] = useState(true);
  const [modalSm, setModalSm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Facility Manager");

  const onFormSubmit = (formData) => {
    login(formData, setError, setLoading);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <Head title="Login" />
      <Block className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <div className="brand-logo pb-4 text-center">
          <Link to={process.env.PUBLIC_URL} className="logo-link">
            <img className="logo-light logo-img logo-img-md" src={Logo} alt="logo" />
            <img className="logo-dark logo-img logo-img-md" src={LogoDark} alt="logo-dark" />
          </Link>
        </div>
        {errorVal && (
          <div className="mb-3">
            <Alert color="danger" className="alert-icon">
              <Icon name="alert-circle" /> Unable to login with credentials{" "}
            </Alert>
          </div>
        )}
        <div>
          <Components.Container>
            {/* <NewRegister signIn={signIn} /> */}

            <Components.SignInContainer signingIn={signIn}>
              <Components.Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                <Components.Title>
                  <h5>Sign in</h5>
                </Components.Title>
                <ul className="custom-control-group pt-2 pb-2">
                  <li>
                    <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="btnRadioControl"
                        id="btnRadioControl1"
                        value="Facility Manager"
                        checked={selectedOption === "Facility Manager"}
                        onChange={handleChange}
                      />
                      <label className="custom-control-label" htmlFor="btnRadioControl1">
                        Facility Manager
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="custom-control custom-control-sm custom-radio custom-control-pro">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="btnRadioControl"
                        id="btnRadioControl2"
                        value="Individual"
                        checked={selectedOption === "Individual"}
                        onChange={handleChange}
                      />
                      <label className="custom-control-label" htmlFor="btnRadioControl2">
                        Individual
                      </label>
                    </div>
                  </li>
                </ul>
                {/* {selectedOption === "Individual" && (
                  <Components.SocialDiv>
                    <FacebookLogin />
                    <GoogleLogIn />
                    <Icon name="apple" />
                  </Components.SocialDiv>
                )} */}

                <div className="form-control-wrap">
                  <Components.Input
                    type="text"
                    id="default-01"
                    {...register("name", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address format",
                      },
                    })}
                    placeholder="Enter your email address"
                    className="form-control-lg form-control"
                    /*  defaultValue="admin@hospital.com" */
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show mt-3"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide mt-3"></Icon>
                  </a>
                  <Components.Input
                    type={passState ? "text" : "password"}
                    id="password"
                    {...register("passcode", { required: "This field is required" })}
                    placeholder="Enter your passcode"
                    className={` form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>

                <Components.Anchor href="#">Forgot your password?</Components.Anchor>
                <Components.Anchor href="#"> OR</Components.Anchor>
                <Components.Anchor href="#" onClick={() => setModalSm(true)}>
                  Log in With OTP
                </Components.Anchor>
                <Components.Button type="submit">
                  {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
                </Components.Button>
              </Components.Form>
            </Components.SignInContainer>
            <Components.OverlayContainer signingIn={signIn}>
              {/* <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>
                <h5 style={{ color: "white" }}>Welcome Back!</h5>
              </Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>Sign In</Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>
                <h5 style={{ color: "white" }}>Hello, Friend!</h5>
              </Components.Title>
              <Components.Paragraph>Enter your personal details and start journey with us</Components.Paragraph>
              {/*  <Components.GhostButton onClick={() => toggle(false)}>Sign Up</Components.GhostButton> 

            </Components.RightOverlayPanel>
          </Components.Overlay> */}
              <img src={registrationImg} style={{ height: "inherit", objectFit: "fill", minWidth: "-moz-available" }} />
            </Components.OverlayContainer>
          </Components.Container>
        </div>
        <NewLoginModal setModalSm={setModalSm} modalSm={modalSm} />
      </Block>
      <AuthFooter />
    </>
  );
};

export default NewLogin;

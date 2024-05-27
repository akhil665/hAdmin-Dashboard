import axios from "axios";
//login page axios code
import { API_URL } from "../utils/const";

// const API_URL = process.env.REACT_APP_API_URL;
console.log("🚀 + API_URL:", API_URL);
const token = localStorage.getItem("userToken");

const login = (formData, setError, setLoading) => {
  setLoading(true);
  const username = formData.name;
  const password = formData.passcode;
  const postData = {
    usr: username,
    pwd: password,
  };
  axios
    .post(API_URL + "/api/method/hdir.api.login", postData)
    .then((response) => {
      //console.log("🚀 + .then + response:", response.data.message.token);
      //console.log(response.data);
      if (response.data.message.status_code === 200) {
        const userData = {
          full_name: response.data.full_name,
          uid: response.data.message.user,
          role: response.data.message.role,
        };
        localStorage.setItem("userToken", "token " + response.data.message.token);
        localStorage.setItem("user", JSON.stringify(userData));
        if (response.data.message.token) {
          window.location.href = "/demo9";
        } else {
          window.location.href = "/auth-login";
        }
      } else {
        setTimeout(() => {
          setError("Cannot login with credentials");
          setLoading(false);
        }, 1000);
      }
    })
    .catch((error) => console.log(error));
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

//Log out
const logout = () => {
  clearStorage();
};

const sendOTP = async (formData, setModalSm) => {
  const mobile = formData.number;
  const userData = {
    mobile: mobile,
  };
  console.log(formData, "sss");

  try {
    const response = await axios.post(API_URL + "/api/method/hdir.api.signup", userData, {
      headers: { Authorization: process.env.REACT_APP_TOKEN, "content-type": "application/json" },
    });
    console.log(response);
    setModalSm(true);
  } catch (error) {
    console.log(error);
  }
};

const checkOTP = async (details, otp) => {
  const userData = {
    mobile: details.number,
    otp: otp,
  };

  //console.log(details, "this is data ");
  try {
    const response = await axios.post(API_URL + "/api/method/hdir.api.verifyOTP", userData, {
      headers: { Authorization: process.env.REACT_APP_TOKEN, "content-type": "application/json" },
    });
    console.log("🚀 + checkOTP + response:", response);
    //console.log(response.data.message, "otp response");

    if (typeof response.data.message === "object") {
      const userData = {
        full_name: response.data["message"].full_name,
        api_key: response.data["message"].api_key,
        api_secret: response.data["message"].api_secret,
        uid: response.data["message"].email,
        mobile_no: response.data["message"].mobile_no,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userType", "Auth");
      localStorage.setItem("userType", response.data["message"].type);
      localStorage.setItem(
        "userToken",
        "token " + response.data["message"].api_key + ":" + response.data["message"].api_secret
      );
      //console.log(response);
      const msg = {
        msg: "OTP VERIFIED & LOGGING IN",
        class: "text-success",
      };
      return msg;
    } else if (response.data.message === "Invalid OTP") {
      const msg = {
        msg: "Invalid OTP",
        class: "text-danger",
      };
      return msg;
    } else if (response.data.message === "verified") {
      const msg = {
        msg: "OTP VERIFIED",
        class: "text-success",
      };
      return msg;
    } /* else if (response.data.message === "verified") {
      const msg = {
        msg: "OTP VERIFIED",
        class: "text-success",
      };
      return msg;
    }  */ else {
    }
  } catch (error) {
    console.log(error);
  }
};

const register = async (details) => {
  const userData = {
    full_name: details.name,
    email: details.email,
    mobile: details.number,
    //new_password: details.passcode,
  };
  //console.log(userData, "this is data ");
  try {
    const response = await axios.post(API_URL + "/api/method/hdir.api.user_register", userData, {
      headers: { Authorization: process.env.REACT_APP_TOKEN, "content-type": "application/json" },
    });
    //console.log(response.data.message, "response");

    const newUserData = {
      full_name: response.data.message.full_name,
      api_key: response.data.message.api_key,
      api_secret: response.data.message.api_secret,
      uid: response.data.message.email,
    };
    //console.log(newUserData, "User details");

    localStorage.setItem("user", JSON.stringify(newUserData));

    localStorage.setItem("userType", "Auth");
    localStorage.setItem(
      "userToken",
      "token " + response.data["message"].api_key + ":" + response.data["message"].api_secret
    );
    const msg = {
      msg: "Registration successful!",
      class: "text-success",
    };
    return msg;
  } catch (err) {
    const msg = {
      msg: "Email id already exists !",
      class: "text-danger",
    };
    return msg;
  }
};

const clearStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("guestuser");
  localStorage.removeItem("userType");
  localStorage.removeItem("userToken");
  localStorage.removeItem("userIP");
  localStorage.removeItem("userRole");
};

export { login, logout, getCurrentUser, sendOTP, checkOTP, register };

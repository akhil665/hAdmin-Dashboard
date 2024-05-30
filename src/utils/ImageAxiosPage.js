import axios from "axios";
//Axios for Thumbunail Image....
const thumbunailChange = async (e, setthumbunailImg) => {
  const token = localStorage.getItem("userToken");
  const selectedFile = e.target.files[0];
  const imgUrl = URL.createObjectURL(selectedFile);

  // Create a FormData object and append the file and its URL
  if (imgUrl) {
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("imageUrl", imgUrl);
    console.log(" this is Thumbunail Img data", data);
    try {
      const response = await axios.post(encodeURI(process.env.REACT_APP_API_URL + "/api/method/upload_file"), data, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data", // Set the content type correctly
        },
      });

      //console.log(response.data.file_url);
      let Fileinfo = response.data.message.file_url;
      setthumbunailImg(Fileinfo);
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

//Axios for headPhyician Image....
const headPhysicianChange = async (e, setHeadPhysicianImg) => {
  const token = localStorage.getItem("userToken");
  const selectedFile = e.target.files[0];
  const imgUrl = URL.createObjectURL(selectedFile);

  // Create a FormData object and append the file and its URL
  if (imgUrl) {
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("imageUrl", imgUrl);
    console.log(" this is Thumbunail Img data", data);
    try {
      const response = await axios.post(encodeURI(process.env.REACT_APP_API_URL + "/api/method/upload_file"), data, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data", // Set the content type correctly
        },
      });

      //console.log(response.data.file_url);
      let Fileinfo = response.data.message.file_url;
      setHeadPhysicianImg(Fileinfo);
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

////Axios for multiple Image....
const handleChange = async (e) => {
  const token = localStorage.getItem("userToken");
  const selectedFiles = e.target.files; // Get an array of selected files
  console.log(selectedFiles, "selectedfiles");
  console.log(" files", selectedFiles);
  if (selectedFiles) {
    let imageUrls = [];

    for (const selectedFile of selectedFiles) {
      // this will select all object keys and values at one
      console.log(selectedFile, "form");
      const imageUrl = URL.createObjectURL(selectedFile);

      // FormData object and append the file and its URL
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("imageUrl", imageUrl);

      try {
        const response = await axios.post(encodeURI(process.env.REACT_APP_API_URL + "/api/method/upload_file"), data, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        });
        imageUrls.push(response.data.message.file_url);
      } catch (error) {
        console.error("Error:", error);
        // Handle the error as needed
      }
    }

    return imageUrls;
    // Now imageUrls contains the URLs for all uploaded files
    //setImgFile(imageUrls);
  }
};

export { thumbunailChange, headPhysicianChange, handleChange };

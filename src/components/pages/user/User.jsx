import React, { useState } from "react";
import "./user.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import PublishIcon from "@mui/icons-material/Publish";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
import { updateUser } from "../../../redux/apiCalls";

const User = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) =>
    state.user.users.find((user) => user._id === userId)
  );

  const [imgURL, setImgURL] = useState(user.img);
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState({
    username: user.username,
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleImgChange = (e) => {
    const [f] = e.target.files;
    setFile(f);
    setImgURL(URL.createObjectURL(f));
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("default");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const updatedUser = {
              ...inputs,
              img: downloadURL,
            };
            updateUser(userId, updatedUser, dispatch);
          });
        }
      );
    } else {
      const updateWithoutFile = inputs;
      updateUser(userId, updateWithoutFile, dispatch);
    }
  };

  return (
    <div className="user">
      <div className="userTitle-container">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="user-container">
        <div className="userShow">
          <div className="userShow-top">
            <img src={user.img} alt="" className="userShow-img" />
            <div className="userShow-top-title">
              <span className="userShow-name">{user.fullname}</span>
              <span className="userShow-title">Software</span>
            </div>
          </div>
          <div className="userShow-bottom">
            <span className="userShow-bottom-title">Account Details</span>
            <div className="userShow-info">
              <PermIdentityIcon className="userShow-icon" />
              <span className="userShow-info-title">{user.username}</span>
            </div>
            <div className="userShow-info">
              <CalendarTodayIcon className="userShow-icon" />
              <span className="userShow-info-title">22 Jul 1999</span>
            </div>
            <span className="userShow-bottom-title">Contact Details</span>

            <div className="userShow-info">
              <PhoneAndroidIcon className="userShow-icon" />
              <span className="userShow-info-title">{user.phone}</span>
            </div>
            <div className="userShow-info">
              <EmailOutlinedIcon className="userShow-icon" />
              <span className="userShow-info-title">{user.email}</span>
            </div>
            <div className="userShow-info">
              <LocationSearchingIcon className="userShow-icon" />
              <span className="userShow-info-title">{user.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdate-title">Edit</span>
          <form className="userUpdate-form">
            <div className="userUpdate-left">
              <div className="userUpdate-item">
                <label>Username</label>
                <input
                  name="username"
                  value={inputs.username}
                  onChange={handleChange}
                  type="text"
                  placeholder="annabeck99"
                  className="userUpdate-input"
                />
              </div>
              <div className="userUpdate-item">
                <label>Full Name</label>
                <input
                  name="fullname"
                  value={inputs.fullname}
                  onChange={handleChange}
                  type="text"
                  placeholder="Anna Becker"
                  className="userUpdate-input"
                />
              </div>
              <div className="userUpdate-item">
                <label>Email </label>
                <input
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="userUpdate-input"
                />
              </div>
              <div className="userUpdate-item">
                <label>Phone </label>
                <input
                  name="phone"
                  value={inputs.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="+84 123456"
                  className="userUpdate-input"
                />
              </div>
              <div className="userUpdate-item">
                <label>Address: </label>
                <input
                  name="address"
                  value={inputs.address}
                  onChange={handleChange}
                  type="text"
                  placeholder="LA | USA"
                  className="userUpdate-input"
                />
              </div>
            </div>
            <div className="userUpdate-right">
              <div className="userUpdate-upload">
                <img src={imgURL} alt="" className="userUpdate-img" />
                <label htmlFor="file">
                  <PublishIcon className="userUpdate-icon" />{" "}
                </label>
                <input
                  onChange={handleImgChange}
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                />
              </div>
              <button onClick={handleUpdateUser} className="userUpdate-btn">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;

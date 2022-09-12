import React, { useState } from "react";
import "./topbar.css";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Topbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const handleShow = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="topbar">
      <div className="topbar-wrapper">
        <div className="topbar-left">
          <span className="logo">Admin</span>
        </div>
        <div className="topbar-right">
          <div className="topbar-iconContainer">
            <NotificationsNoneOutlinedIcon />
            <span className="topbar-iconBag">2</span>
          </div>
          <div className="topbar-iconContainer">
            <LanguageOutlinedIcon />
            <span className="topbar-iconBag">2</span>
          </div>
          <div onClick={handleShow} className="topbar-iconContainer">
            <SettingsIcon />
          </div>
          {open && (
            <div className="setting-section">
              <button onClick={handleLogout}>Logout</button>
              <span>Language</span>
            </div>
          )}
          <img
            src="https://lh4.googleusercontent.com/N8zRhskPSotKzWxs5wm68JaDX0yCGY-ASI7g3AOqgBeFBD24sPQMd62CEsQT_WJRJ5RhFuBnEzzhcuTa-ZMussF_MQhbEYCKqKTCyL3zL6q17MYOpNpE3YqtUtyXIuBFkpyYlX-z"
            alt=""
            className="topbar-avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;

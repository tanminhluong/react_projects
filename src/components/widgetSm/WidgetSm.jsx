import React, { useEffect, useState } from "react";
import "./widgetSm.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { userRequest } from "../../requestMethods";

const WidgetSm = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users");
        setUsers(res.data);
      } catch (err) {}
    };
    getUsers();
  }, []);
  return (
    <div className="widgetSm">
      <span className="widgetSm-title">New join member</span>
      <ul className="widgetSm-list">
        {users.map((user) => (
          <li key={user._id} className="widgetSm-list-item">
            <img src={user.img} alt="" className="widgetSm-img" />
            <div className="widgetSm-user">
              <span className="widgetSm-user-name">{user.username}</span>
            </div>
            <button className="widgetSm-btn">
              <VisibilityIcon className="widgetSm-icon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSm;

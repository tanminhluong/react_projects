import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/apiCalls";
import "./newUser.css";

const NewUser = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleCreate = (e) => {
    e.preventDefault();
    addUser(inputs, dispatch);
    setInputs({});
  };

  return (
    <div className="newUser">
      <h1 className="newUser-title">New User</h1>
      <form className="newUser-form">
        <div className="newUser-item">
          <label>Username</label>
          <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="john"
          />
        </div>
        <div className="newUser-item">
          <label>Full Name</label>
          <input
            onChange={handleChange}
            name="fullname"
            type="text"
            placeholder="John Smith"
          />
        </div>

        <div className="newUser-item">
          <label>Email</label>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="john@gmail.com"
          />
        </div>
        <div className="newUser-item">
          <label>Password</label>
          <input onChange={handleChange} name="password" type="password" />
        </div>
        <div className="newUser-item">
          <label>Phone</label>
          <input
            onChange={handleChange}
            name="phone"
            type="text"
            placeholder="+123 456 789"
          />
        </div>
        <div className="newUser-item">
          <label>Address</label>
          <input
            onChange={handleChange}
            name="address"
            type="text"
            placeholder="LA | USA"
          />
        </div>
        <div className="newUser-item">
          <label>Gender</label>
          <div className="newUser-gender">
            <input
              onChange={handleChange}
              type="radio"
              id="male"
              value="male"
              name="gender"
            />
            <label for="male">Male</label>
            <input
              onChange={handleChange}
              type="radio"
              id="female"
              value="female"
              name="gender"
            />
            <label for="female">Female</label>
            <input
              onChange={handleChange}
              type="radio"
              id="other"
              value="other"
              name="gender"
            />
            <label for="other">other</label>
          </div>
        </div>
        <div className="newUser-item">
          <label>Active</label>
          <select
            onChange={handleChange}
            name="active"
            id="active"
            className="newUser-select"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button onClick={handleCreate} className="newUser-btn">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewUser;

import React from "react";
import "./single.css";
const Single = ({ user, index }) => {
  console.log(user);
  return (
    <div className="single__content__wrapper">
      <div className="single__content">
        <div className="info">
          <span className="result__index">{index + 1}</span>
          <img src={user.ProfilePicture} alt="" className="single__userimage" />
          <span className="single__id">#{user.ID}</span>
        </div>
        <div className="FirstNameLastName">{user.FirstNameLastName}</div>
        <div className="occupation">{user.JobTitle}</div>
        <div className="emailContainer">
          <span className="emailIcon">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="emailText">{user.Email}</span>
        </div>
        <div className="phoneContainer">
          <span className="phoneIcon">
            <i className="fas fa-phone-alt"></i>
          </span>
          <span className="phoneText">{user.Phone}</span>
        </div>
        <div className="companyContainer">{user.Company}</div>
      </div>
    </div>
  );
};

export default Single;

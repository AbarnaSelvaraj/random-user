import React from "react";

import { NavLink } from "react-bootstrap";

export default function NavBar({
  usernameStart,
  searchUser,
  setGender,
  setUserNameStart,
  updateGender,
}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-4 mb-5">
      <div className="container">
        <span className="navbar-brand ">
          <h1>
            <NavLink
              onClick={(e) => {
                searchUser("");
              }}
              className="badge bg-secondary text-bg-info "
            >
              Random User
            </NavLink>{" "}
          </h1>
        </span>

        <div className="navbar-collapse collapse">
          <div className="mx-auto ">
            <div className="form-floating input-group-lg">
              <select
                className="form-select input-group-lg"
                onChange={(e) => {
                  updateGender(e.target.value);
                }}
              >
                <option className="text-center" value="">
                  Both
                </option>

                <option className="text-center" value="female">
                  Female
                </option>
                <option className="text-center" value="male">
                  Male
                </option>
              </select>
              <label className="text-center" for="floatingSelect">
                <h6> Select Gender </h6>
              </label>
            </div>
          </div>
          <form className="d-flex">
            <div className="input-group input-group-lg">
              <span className="input-group-text">
                <i className="fa fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="find user"
                value={usernameStart}
                onChange={(e) => {
                  searchUser(e.target.value);
                }}
                // searchUser(e.target.value)}
                // onInput={(e) => {
                //   setUserNameStart(e.target.value);
                //   console.log({ usernameStart }, e.target.value, e);
                //   searchUser();
                // }}
              />
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

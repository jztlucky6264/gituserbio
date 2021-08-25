import React from "react";

const Input = (props) => {
  const inputdata = (e) => {
    props.searchdata(e.target.value);
  };
  return (
    <>
      <div className="container-fluid search_box ">
        <label>Enter a username to fetch user info and repos</label>
        <input
          autoComplete="off"
          type="text"
          name="searchterm"
          value={props.search}
          onChange={inputdata}
          className="form-control "
          placeholder="User Name"
        />
      </div>
    </>
  );
};

export default Input;

import React, { useEffect, useState } from "react";
import Input from "./Input";
import Repository from "./Repository";

const Userprofile = (props) => {
  const [searchTerm, setSearchTerm] = useState("bh");
  const [userdata, setUserData] = useState("");
  const [repo, setRepo] = useState([]);

  const searchHandler = (e) => {
    setSearchTerm(e);
  };

  useEffect(() => {
    const getUserBio = async () => {
      try {
        let res = await fetch(`https://api.github.com/users/${searchTerm}`);
        let repository = await fetch(
          `https://api.github.com/users/${searchTerm}/repos`
        );
        let data = await res.json();
        let repoData = await repository.json();
        setUserData(data);
        setRepo(repoData);
      } catch (err) {
        console.log(err);
      }
    };
    return getUserBio();
  }, [searchTerm]);

  if (!userdata) {
    return (
      <>
        <Input search={searchTerm} searchdata={searchHandler} />
        <h1>Data is Loading</h1>
      </>
    );
  }

  return (
    <>
      <Input search={searchTerm} searchdata={searchHandler} />

      <div className="desktop_mod">
        <div className=" searchbox_div mt-5 d-flex justify-content-around  align-items-center flex-column">
          <img
            style={{ height: "25vh" }}
            src={userdata.avatar_url}
            className="rounded mx-auto d-block"
            alt="..."
          />
          <a href={userdata.html_url}>
            <button className="btn"> View Profile</button>
          </a>
        </div>
        <div className="bio_div">
          <div className="btn_grp d-flex justify-content-around flex-row">
            <button type="button" className="btn btn-primary g-2">
              public repos: {userdata.public_repos}
            </button>
            <button type="button" className="btn btn-secondary">
              Public gist: {userdata.public_gists}
            </button>
            <button type="button" className="btn btn-success">
              Followers: {userdata.followers}
            </button>
            <button type="button" className="btn btn-danger bg-gradient">
              Following: {userdata.following}
            </button>
          </div>

          <div className="bio_list">
            <ul className="list-group  container  ">
              <li className="list-group-item">Website: {userdata.blog}</li>
              <li className="list-group-item">Company: {userdata.company}</li>
              <li className="list-group-item">Location: {userdata.location}</li>
              <li className="list-group-item">
                Member Since: {userdata.created_at}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Repository repodata={repo} />
    </>
  );
};

export default Userprofile;

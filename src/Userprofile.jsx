import React, { useEffect, useState } from "react";

const Userprofile = () => {
  const [searchTerm, setSearchTerm] = useState("jzt");
  const [userdata, setUserData] = useState("");
  const [repo, setRepo] = useState([]);

  const searchdata = (e) => {
    setSearchTerm(e.target.value);
    //console.log(e.target.value);
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
        //console.log(searchTerm);
        setRepo(repoData);
        //console.log(repoData);
        //console.log(repoData);
        console.log(userdata);
      } catch (err) {
        console.log(err);
      }
    };

    return getUserBio();
  }, [searchTerm]);
  //console.log(repo);

  const date = new Date().getFullYear();

  if (!userdata) {
    return (
      <>
        <h1 className="text-center mt-3 mb-3">Search Github Users</h1>
        <div className="container-fluid ">
          <label>Enter a username to fetch user info and repos</label>
          <input
            autoComplete="off"
            type="text"
            name="searchterm"
            value={searchTerm}
            onChange={searchdata}
            className="form-control "
            placeholder="User Name"
          />
        </div>
        <h1>Data is Loading</h1>
      </>
    );
  }
  let listitem;
  if (repo.length >= 0) {
    listitem = repo.map((respo) => (
      <li key={respo.id} className="list-group-item">
        <a href={respo.html_url}>{respo.name}</a>
        <span>
          <button className=" btun b_1">
            Watchers: {respo.watchers_count}
          </button>
          <button className="btun b_2">Stars: {respo.stargazers_count}</button>
          <button className="btun b_3">Forks: {respo.forks_count}</button>
        </span>
      </li>
    ));
  } else {
    listitem = <h1>Loading...</h1>;
  }

  return (
    <>
      <h1 className="text-center mt-3 mb-3">Search Github Users</h1>
      <div className="container-fluid search_box ">
        <label>Enter a username to fetch user info and repos</label>
        <input
          type="text"
          name="searchterm"
          value={searchTerm}
          onChange={searchdata}
          className="form-control "
          placeholder="User Name"
        />
      </div>
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
      <div className="repos_list  ">
        <h2 className="list-group-item active">All Repos</h2>
        <ul className="list-group">{listitem}</ul>
      </div>

      <div className="mt-5">
        <p className="text-center mt-5">© Copyright {date}</p>
      </div>
    </>
  );
};

export default Userprofile;

import React from "react";

const Repository = (props) => {
  const date = new Date().getFullYear();
  let listitem;
  if (props.repodata.length >= 0) {
    listitem = props.repodata.map((respo) => (
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

export default Repository;

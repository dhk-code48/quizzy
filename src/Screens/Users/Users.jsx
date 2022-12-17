import "./_users.css";
import React from "react";
import Avatar from "react-avatar";
import { useParams } from "react-router-dom";
import Achieved from "../Quiz/Achieved";

const Users = () => {
  const { name, regidNo } = useParams("name", "regidNo");
  console.log(regidNo);
  console.log(name);
  return (
    <div className="users">
      <div className="users_profile">
        <Avatar name={name} size="45" round className="avatar" />
        <h2>{name}</h2>
      </div>

      <Achieved name={name} regidNo={regidNo} />
    </div>
  );
};

export default Users;

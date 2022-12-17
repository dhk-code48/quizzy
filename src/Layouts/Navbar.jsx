import React from "react";
import "./_navbar.css";
import { HiColorSwatch } from "react-icons/hi";
import { Button } from "../Components";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo display">
        <h1>QU</h1>
        <p>IZZY</p>
      </div>
      <div className="flex">
        <Link to={"/start"}>
          <Button>Start Quiz</Button>
        </Link>
        <div className="icon-btn">
          <HiColorSwatch size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

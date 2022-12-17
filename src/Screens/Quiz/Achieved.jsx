import React, { useEffect, useState } from "react";
import { getStats } from "../../Firebase";

const Achieved = ({ name, regidNo }) => {
  const points = getStats({ type: "Points" });
  const streak = getStats({ type: "Streak" });
  const [arr, setArr] = useState({ position: 0 });
  const [str, setStr] = useState({ position: 0 });
  //   console.log("Points", points);
  //   console.log("Points", streak);

  useEffect(() => {
    for (let i = 0; i < points.length; i++) {
      const element = points[i];
      //   console.log("LOOP", element.score);
      if (
        element.name === name &&
        parseInt(element.regidNo) === parseInt(regidNo)
      ) {
        console.log("OKAY");
        setArr({ ...element, position: i + 1 });
      }
    }
  }, [points]);
  useEffect(() => {
    for (let i = 0; i < streak.length; i++) {
      const element = points[i];
      //   console.log("LOOP", element.score);
      if (
        element.name === name &&
        parseInt(element.regidNo) === parseInt(regidNo)
      ) {
        console.log("OKAY");
        setStr({ ...element, position: i + 1 });
      }
    }
  }, [streak]);

  // useEffect(() => {
  //   console.log("ELEMENT", arr);
  // }, [arr]);

  // var newArray = points.filter(function (el) {
  //   return el.name === name && parseInt(el.score) === parseInt(pnt);
  // });
  //   useEffect(() => {
  //     console.log("NEW ARRAY", newArray);
  //   }, [newArray]);

  return (
    <div className="what_you_achived">
      <div className="container">
        <h1>#{arr.position} Rank In</h1>
        <h5>
          <i>Higest Streak Leaderboard</i>
        </h5>
        <p>see more </p>
      </div>{" "}
      <div className="container">
        <h1>#{str.position} Rank In</h1>
        <h5>
          <i>Higest Streak Leaderboard</i>
        </h5>
        <p>see more </p>
      </div>
    </div>
  );
};

export default Achieved;

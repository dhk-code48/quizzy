import React, { useState } from "react";
import "./_leaderboard.css";
import Avatar from "react-avatar";
import { getStats } from "../../Firebase";
import { details } from "./_data";

const Leaderboard = () => {
  const [type, setType] = useState("Points");
  const [subject, setSubject] = useState("All");
  const [chapter, setChapter] = useState("All");
  const points = getStats({ type: "Points" });
  const streak = getStats({ type: "Streak" });
  console.log(points);
  return (
    <div className="leaderboard">
      <h1 className="leaderboard__title">Leaderboard</h1>
      <table>
        <thead>
          <div className="tableth">
            <td className="leaderboard__type">
              <select
                value={subject}
                onChange={(e) => {
                  setChapter("All");
                  setSubject(e.target.value);
                }}
              >
                <option value={"All"}>All</option>
                {Object.keys(details).map((subjectName, index) => {
                  return (
                    <option key={index + 1} value={subjectName}>
                      {subjectName}
                    </option>
                  );
                })}
              </select>
              {subject !== "All" && (
                <select
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                >
                  <option value={"All"}>All</option>
                  {subject !== "All" && (
                    <>
                      {details[subject].chapters.map((chapter, index) => {
                        return <option key={index + 1}>{chapter}</option>;
                      })}
                    </>
                  )}
                </select>
              )}
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value={"Points"}>Highest Points</option>
                <option value={"Streak"}>Highest Streak</option>
              </select>
            </td>
          </div>
        </thead>
        <tbody className="leaderboard__table">
          {type === "Points"
            ? points.map((record, index) => {
                if (subject === "All") {
                  return (
                    <div key={index + 1} className="tableTr">
                      <td className="user_profile">
                        <Avatar
                          name={record.name}
                          size="45"
                          round
                          className="avatar"
                        />
                        {record.name}
                      </td>
                      <td>Points : {record.score}</td>
                    </div>
                  );
                } else if (subject === record.subject) {
                  if (chapter === "All") {
                    return (
                      <div key={index + 1} className="tableTr">
                        <td className="user_profile">
                          <Avatar
                            name={record.name}
                            size="45"
                            round
                            className="avatar"
                          />
                          {record.name}
                        </td>
                        <td>Points : {record.score}</td>
                      </div>
                    );
                  } else if (chapter === record.chapter) {
                    return (
                      <div key={index + 1} className="tableTr">
                        <td className="user_profile">
                          <Avatar
                            name={record.name}
                            size="45"
                            round
                            className="avatar"
                          />
                          {record.name}
                        </td>
                        <td>Points : {record.score}</td>
                      </div>
                    );
                  }
                }
              })
            : streak.map((record, index) => {
                if (subject === "All") {
                  return (
                    <div key={index + 1} className="tableTr">
                      <td className="user_profile">
                        <Avatar
                          name={record.name}
                          size="45"
                          round
                          className="avatar"
                        />
                        {record.name}
                      </td>
                      <td>Streak : {record.streak}</td>
                    </div>
                  );
                } else if (subject === record.subject) {
                  if (chapter === "All") {
                    return (
                      <div key={index + 1} className="tableTr">
                        <td className="user_profile">
                          <Avatar
                            name={record.name}
                            size="45"
                            round
                            className="avatar"
                          />
                          {record.name}
                        </td>
                        <td>Streak : {record.streak}</td>
                      </div>
                    );
                  } else if (chapter === record.chapter) {
                    return (
                      <div key={index + 1} className="tableTr">
                        <td className="user_profile">
                          <Avatar
                            name={record.name}
                            size="45"
                            round
                            className="avatar"
                          />
                          {record.name}
                        </td>
                        <td>Streak : {record.streak}</td>
                      </div>
                    );
                  }
                }
              })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

import React, { useState } from "react";
import "./_start.css";
import { details } from ".";
import { Button } from "../../Components";
import { FaRandom } from "react-icons/fa";
import { Link } from "react-router-dom";

const Start = () => {
  const [type, setType] = useState("Course");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");

  return (
    <div className="start">
      <h1>
        Start <p>Quiz</p>
      </h1>
      <div className="start__options">
        <div>
          <p>Type :</p>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Course">Course</option>
            <option value="General Knowledge">General Knowledge</option>
          </select>
        </div>
        <div>
          <p>Subject :</p>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            {details[type === "Course" ? 0 : 1].subjects.map((subject) => {
              return <option>{subject.subjectName}</option>;
            })}
          </select>
        </div>
        <div>
          <p>Chapter :</p>
          <select value={chapter} onChange={(e) => setChapter(e.target.value)}>
            {/* {details[type === "Course" ? 0 : 1].subjects.map((subj) =>
              subj.subjectName === subject
                ? subj.chapters.map((chapter) => {
                    return <option value={chapter}>{chapter}</option>;
                  })
                : ""
            )} */}
            <option value={"all"}>All</option>
          </select>
        </div>
        <Link to={`/quiz/random/all/all`}>
          <Button>
            <p>Start Random</p>
            <FaRandom />
          </Button>
        </Link>
        <br />
        <Link to={`/quiz/${type}/${subject}/${chapter}`}>
          <Button>Start</Button>
        </Link>
      </div>
    </div>
  );
};

export default Start;

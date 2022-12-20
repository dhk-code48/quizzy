import React, { useState } from "react";
import "./_start.css";
import { details } from ".";
import { Button } from "../../Components";
// import { FaRandom } from "react-icons/fa";
import { addUsers, getUsers } from "../../Firebase";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const users = getUsers();
  console.log("Users", users);

  const navigate = useNavigate();
  const [type, setType] = useState("Course");
  const [name, setName] = useState("");
  const [regidNo, setRegidNo] = useState("");
  const [subject, setSubject] = useState("All");
  // const [chapter, setChapter] = useState("All");

  function startQuiz (){
    users.map((user)=>{
      if(user.name !== name && parseInt(user.regid) !== parseInt(regidNo)){
        addUsers({name:name,regid:regidNo})
      }
    })
    const location =  `/quiz/${name}/${regidNo}/${type}/${subject}/all`
    navigate(location);
  }

  return (
    <div className="start">
      <h1>
        Start <p>Quiz</p>
      </h1>
      <div className="start__options">
        <br />
        <div>
          <p>Name : </p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter Your Name"
          />
        </div>
        <br />
        <div>
          <p>Registration : </p>
          <input
            onChange={(e) => setRegidNo(e.target.value)}
            value={regidNo}
            placeholder="Enter Your Registration"
          />
        </div>

        <div>
          <p>Type :</p>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option defaultValue value="Course">
              Course
            </option>
            <option value="General Knowledge">General Knowledge</option>
          </select>
        </div>
        <div>
          <p>Subject :</p>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option defaultValue>All</option>
            {details[type === "Course" ? 0 : 1].subjects.map(
              (subject, index) => {
                return <option key={index + 1}>{subject.subjectName}</option>;
              }
            )}
          </select>
        </div>
        {/* <div>
          <p>Chapter :</p>
          <select value={chapter} onChange={(e) => setChapter(e.target.value)}>
            {details[type === "Course" ? 0 : 1].subjects.map((subj) =>
              subj.subjectName === subject
                ? subj.chapters.map((chapter) => {
                    return <option value={chapter}>{chapter}</option>;
                  })
                : ""
            )}
            <option defaultValue value={"all"}>
              All
            </option>
          </select>
        </div> */}

        <div>
          {/* <Link to={`/quiz/random/all/all`}>
            <Button>
              <p>Start Random</p>
              <FaRandom />
            </Button>
          </Link> */}
          <br />
            <Button onClick={startQuiz}>Start</Button>
          
        </div>
      </div>
    </div>
  );
};

export default Start;

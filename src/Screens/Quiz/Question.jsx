import React, { useEffect, useState } from "react";
import Result from "./Result";
// import { math } from "./_data";
import axios from "axios";

const Question = ({
  questions,
  type,
  regidNo,
  name,
  quiz_type,
  subject,
  chapter,
}) => {
  const [timer, setTimer] = useState(30);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [bgColors, setBgColors] = useState({
    0: "#ffd6a5",
    1: "#caffbf",
    2: "#9bf6ff",
    3: "#ffc6ff",
  });

  const [questionIndex, setQuestionIndex] = useState(0);

  const [disable, setDisabled] = useState(false);

  const [streak, setStreak] = useState([]);
  const [points, setPoints] = useState([]);
  const [timeTaken, setTimeTaken] = useState([]);
  const [status, setStatus] = useState([]);

  const [totalPoints, setTotalPoints] = useState(0);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [averageTime, setAverageTime] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalInCorrect, setTotalInCorrect] = useState(0);
  const [fullPoints, setFullPoints] = useState(0);

  const [optionIndex, setOptionIndex] = useState([]);

  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        setInterval(() => {
          setTimer(30);
          setQuestionIndex((prev) => prev + 1);
          setDisabled(true);
          setBgColors({
            0: "#ffd6a5",
            1: "#caffbf",
            2: "#9bf6ff",
            3: "#ffc6ff",
          });
        }, 1000);
        setDisabled(false);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    setSliderWidth((timer / 30) * 100);
  }, [timer]);

  const options = [
    "Always Less Then One",
    "Equals or Less Then One",
    "Always Greate Then One",
    "Always Equals Then One",
  ];
  function handleAnswer(i, j) {
    setOptionIndex((prev) => [...prev, i]);
    setDisabled(true);
    const question = questions[j];
    setFullPoints((prev) => prev + parseInt(question.points));
    // console.log("QUESION POINTS + ", parseInt(question.points));

    if (question.options[i] === question.correct_answer) {
      setTotalCorrect((prev) => prev + 1);
      let gainedPoint =
        30 - timer <= parseInt(question.avgTime)
          ? parseInt(question.points)
          : 1;

      setPoints((prev) => prev + gainedPoint);
      setTimeTaken((prev) => prev + (30 - timer));
      setStatus((prev) => [...prev, 1]);

      setTotalTimeTaken((prev) => prev + (30 - timer));
      setTotalPoints((prev) => prev + gainedPoint);

      setBgColors(() => ({
        0: "#ccc",
        1: "#ccc",
        2: "#ccc",
        3: "#ccc",
        [i]: "#34e065",
      }));
    } else {
      setTotalInCorrect((prev) => prev + 1);
      let gainedPoint =
        30 - timer <= parseInt(question.avgTime)
          ? parseInt(question.points)
          : 1;

      setPoints((prev) => [...prev, gainedPoint]);
      setTimeTaken((prev) => prev + (30 - timer));
      setStatus((prev) => [...prev, 0]);

      setBgColors(() => ({
        0: "#ccc",
        1: "#ccc",
        2: "#ccc",
        3: "#ccc",
        [question.correct]: "#34e065",
        [i]: "#e63946",
      }));
    }

    setTimeout(() => {
      setTimer(30);
      setQuestionIndex((prev) => prev + 1);
      setDisabled(false);
      setBgColors({
        0: "#ffd6a5",
        1: "#caffbf",
        2: "#9bf6ff",
        3: "#ffc6ff",
      });
    }, 500);
  }

  // ---------- AFTER FINISHING THE QUIZ ---------- //

  useEffect(() => {
    // Checking if the quiz is finished
    if (questionIndex >= questions.length) {
      setFinished(true);
      setAverageTime((totalTimeTaken / questions.length).toFixed(2));
      let tab = [...status];
      let streaks00 = tab.reduce(
        (res, n) => (n ? res[res.length - 1]++ : res.push(0), res),
        [0]
      );
      streaks00.join(",");
      setStreak(Math.max(...streaks00));
    } else {
      setFinished(false);
    }
  }, [questionIndex]);

  return (
    <div className="question">
      {!finished && (
        <>
          <div className="question_counter">
            {questionIndex + 1}/{questions.length}
          </div>
          <div className="question__timeSlider">
            <div style={{ width: `${sliderWidth}%` }}></div>
          </div>
          <div className="question__timer">{timer}</div>
        </>
      )}
      {questionIndex < questions.length ? (
        <>
          <h2>{questions[questionIndex].question}</h2>
          <div className="question__option">
            {questions[questionIndex].options.map((opt, index) => (
              <button
                key={index + 1}
                onClick={() => handleAnswer(index, questionIndex)}
                style={{ background: bgColors[index] }}
                disabled={disable}
              >
                {/* {opt.label} */}
                {opt}
              </button>
            ))}
          </div>
        </>
      ) : (
        <Result
          question={[...questions]}
          type={type}
          regidNo={regidNo}
          name={name}
          quiz_type={quiz_type}
          subject={subject}
          chapter={chapter}
          data={{
            streak: streak,
            timeTaken: totalTimeTaken,
            points: totalPoints,
            averageTime: averageTime,
            totalPoints: fullPoints,
            totalQuestion: questions.length,
            totalCorrect: totalCorrect,
            optionIndex: optionIndex,
            totalInCorrect: totalInCorrect,
          }}
        />
      )}
    </div>
  );
};

export default Question;

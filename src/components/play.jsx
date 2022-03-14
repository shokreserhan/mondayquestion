import React, { useEffect, useState } from "react";
import axios from "axios";
import Win from "./Win";
import Lose from "./Lose";

import "../style/style.css"

function Play() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [index , setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finish, setFinish] = useState(false);

const shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

  useEffect(async () => {
    let tempAnswers = []
    let tempQues = await( await axios.get("https://opentdb.com/api.php?amount=5")).data
    setQuestions(() => tempQues.results)
    tempAnswers = tempQues.results[index].incorrect_answers
    tempAnswers.push(tempQues.results[index].correct_answer)
    console.log(tempQues.results[index].correct_answer);
    tempAnswers = shuffle(tempAnswers)
    setAnswers(() => tempAnswers)
  }, []);

  useEffect(() => {
    if(index < questions.length){
      let tempAnswers = []
      tempAnswers = questions[index].incorrect_answers
      console.log(questions[index].correct_answer);
      tempAnswers.push(questions[index].correct_answer)
      tempAnswers = shuffle(tempAnswers)
      setAnswers(() => tempAnswers)
    }
    else{
      setFinish(true)
    }
  }, [index]);

  const checkAnswer = (answer) =>{
    console.log(answer , questions[index].correct_answer);
    if(answer === questions[index].correct_answer){
      setScore(score + 10)
    }
    setIndex(index+1)
  }

  return (
    <>
    {questions && questions.length > 0 && questions.length > index ?
    (<div >
      <div className="score">
        <span className="score-span">Score : {score}</span>
      </div>
      <div className="question">
        <h3 className="question-title">{questions[index].question}</h3>
        {questions[index].type === "boolean" ? 
        <div className="boolean">
          <button className="" onClick={() => checkAnswer("True")}>&#9989;</button>
          <button className="" onClick={() => checkAnswer("False")}>&#10060;</button>
        </div> : 
        <div className="multiple">
          <button onClick={() => checkAnswer(answers[0])}>{answers[0]}</button>
          <button onClick={() => checkAnswer(answers[1])}>{answers[1]}</button>
          <button onClick={() => checkAnswer(answers[2])}>{answers[2]}</button>
          <button onClick={() => checkAnswer(answers[3])}>{answers[3]}</button>
        </div>
        }
      </div>
    </div>)
    :questions && finish && score > (questions.length * 10)/2 ? <Win /> : <Lose /> }
    </>
  );
}

export default Play;

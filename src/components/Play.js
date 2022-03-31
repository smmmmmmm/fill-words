import { useState, useEffect} from 'react';
import React from 'react';
import { useSnackbar } from 'notistack';
import { Grid } from '@material-ui/core'
import { qwords, dummyQwords, prefectures} from "./data"
import { useNavigate } from 'react-router-dom';
import { Spacer } from './Spacer'
import { useSearchParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Fade from '@material-ui/core/Fade';


// function getRandomWord () {
//   return prefectures[Math.floor(Math.random() * prefectures.length)]
// }

function shuffleArray(arr){
  arr.sort(()=> Math.random() - 0.5);
}

function getAnswers (qword) {
  const reQword = new RegExp("^" + qword.replaceAll("?", ".") + "$");
  return prefectures.filter(x => x.match(reQword))
}

// function generateRandomQuestion () {
//   const word = getRandomWord()
//   const qword = word.substring(0, 1) + "?".repeat(word.length - 1)
//   const answers = getAnswers(qword)
//   return {
//     "qword": qword,
//     "answers": answers,
//   }
// }

function initQuestions (difficulty) {
  let shuffledQwords = qwords.slice(0, qwords.length);

  if (difficulty === "hard") {
    let shuffledDummyQwords = dummyQwords.slice(0, dummyQwords.length);
    shuffleArray(shuffledDummyQwords)
    shuffledQwords = shuffledQwords.concat(shuffledDummyQwords.slice(0, 10))
  }

  shuffleArray(shuffledQwords)
  const answers = shuffledQwords.map(qword => getAnswers(qword))
  return {
    "number": 0,
    "qwords": shuffledQwords,
    "answers": answers,
  }
}

const checkAnswer = function (qword, answers, inputAnswers) {
  let corrects = new Array(answers.length).fill(false)
  let çorrectAnswers = []
  let extraAnswers = []

  inputAnswers.forEach((val) => {
    if (val === ""){ // 空の回答は評価しない
      return
    } else {
      const idx = answers.findIndex((elm) => elm === val)
      if (idx >= 0 && !corrects[idx]) {
        corrects[idx] = true
        çorrectAnswers.push(val)
      } else {
        extraAnswers.push(val)
      }
    }
  });
  let shortageAnswers = answers.filter((e, i) => !(corrects[i]));
  return {
    qword: qword,
    isCorrect:(extraAnswers.length === 0 && shortageAnswers.length === 0), 
    extraAnswers: extraAnswers, 
    shortageAnswers: shortageAnswers,
    answers: answers,
    inputAnswers: inputAnswers,
  }
};

function Play(props) {
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get("difficulty")

  const [questions, setQuestions] = useState(() => initQuestions(difficulty));
  const [inputAnswers, setInputAnswers] = useState([""]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [time, setTime] = React.useState(0);
  const [answerHistory, setAnswerHistory] = useState([]);


  // redux
  const navigate = useNavigate();

  // 時間計測
  React.useEffect(() => {
    const id = setInterval(() => {
      setTime(t => t + 0.1);
    }, 100);
    return () => clearInterval(id);
  }, []);

  // focus
  const inputEl = React.createRef();
  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus()
    }
  }, [inputAnswers]);

  const changeWord = () => {
    const answers = questions.answers[questions.number]
    let result = checkAnswer(questions.qwords[questions.number], answers, inputAnswers)
    if (result.isCorrect) {
      enqueueSnackbar('Correct', {
        variant: 'success',
        autoHideDuration: 700,
        TransitionComponent: Fade,
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
      });
    } else {
      enqueueSnackbar('Wrong', {
        variant: 'error',
        autoHideDuration: 700,
        TransitionComponent: Fade,
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
        action: () => (
          <div align="left"> 
            {result.extraAnswers.length>0 && <div> extra: {result.extraAnswers.join(", ")} </div> }
            {result.shortageAnswers.length>0 && <div> shortage: {result.shortageAnswers.join(", ")} </div> }
            {/* shortage items: {result.shortageAnswers.join(", ")}  <br /> */}
          </div>
        )
      });
    }

    let tmpAnswerHistory = answerHistory.slice(0, answerHistory.length);
    tmpAnswerHistory.push(result)
    setAnswerHistory(tmpAnswerHistory)
    setQuestions(
      {
        number: questions.number + 1,
        qwords: questions.qwords,
        answers: questions.answers,
      }
    )
    if (questions.number === (questions.qwords.length-1)) {
      // console.log(tmpAnswerHistory)
      // dispath({type: "UPDATE", result: tmpAnswerHistory})
      navigate('/result', {state: {
        results: tmpAnswerHistory,
        time: time,
        difficulty: difficulty,
      }})
    }
    setInputAnswers([""])
  }

  const addInputAnswer = () => {
    let tmpInputAnswer = inputAnswers.slice(0, inputAnswers.length);
    tmpInputAnswer.push("")
    setInputAnswers(tmpInputAnswer)
  }

  const handleChange = (event) => {
    let tmpInputAnswer = inputAnswers.slice(0, inputAnswers.length);
    tmpInputAnswer[inputAnswers.length-1] = event.target.value
    setInputAnswers(tmpInputAnswer)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {         
      addInputAnswer()
    }
    if (e.key === 'Enter' && e.shiftKey) {         
      changeWord()
    }
  }

  return (
    <Grid container alignItems="center" justify="center">
        <div align="center">
          <Spacer size={20}/>
          <Stack spacing={2} direction="row">
            <div align="left" style={{minWidth: 120}}> time : {time.toFixed(1)} </div>
            <div align="right" style={{minWidth: 120}}> 正解率 : {answerHistory.reduce((a, b) => a + b.isCorrect, 0)} / {answerHistory.length} 
            </div>
          </Stack>
          <h1> { questions.qwords[questions.number] } </h1>
          { difficulty === "easy" && <h4> 解の数: {questions.answers[questions.number].length} </h4>}
          <div>
            <Stack spacing={1} direction="column" alignItems="center">
              {inputAnswers.map((ans, index) => {
                return <TextField 
                  // autoFocus
                  inputRef={inputEl}
                  type="text"
                  style={{maxWidth:200}}
                  name={"answer" + index}
                  value={ans}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  autoComplete="off"
                  size="small"
                />;
              })}
            </Stack>
          </div>
          <Spacer size={12}/>
          <Stack spacing={2} direction="row">
            <Button variant="contained" size="large" onClick={addInputAnswer} style={{minWidth: 120, minHeight: 50}}> Add </Button>
            <Button variant="contained" size="large" onClick={changeWord} style={{minWidth: 120, minHeight: 50}}> Answer </Button>
          </Stack>
        </div>
    </Grid>
  );
}
export default Play;

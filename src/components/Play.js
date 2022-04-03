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

// function generateRandomQuestion () {
//   const word = getRandomWord()
//   const qword = word.substring(0, 1) + "?".repeat(word.length - 1)
//   const answers = getAnswers(qword)
//   return {
//     "qword": qword,
//     "answers": answers,
//   }
// }

class Question {
  constructor(qword) {
    this.qword = qword;
    this.answers = prefectures.filter(
      x => x.match(RegExp("^" + qword.replaceAll("?", ".") + "$"))
    );
  }

  check(inputAnswers) {
    let corrects = new Array(this.answers.length).fill(false)
    let extraAnswers = []
    inputAnswers.forEach((val) => {
      if (val === ""){ // 空の回答は評価しない
        return
      } else {
        const idx = this.answers.findIndex((elm) => elm === val)
        if (idx >= 0 && !corrects[idx]) {
          corrects[idx] = true
        } else {
          extraAnswers.push(val)
        }
      }
    });
    let shortageAnswers = this.answers.filter((e, i) => !(corrects[i]));

    return {
      "qword": this.qword,
      "answers": this.answers,
      "inputAnswers": inputAnswers,
      "isCorrect": (extraAnswers.length === 0 && shortageAnswers.length === 0),
      "extraAnswers": extraAnswers,
      "shortageAnswers": shortageAnswers,
    }
  }

}

function shuffleArray(arr){
  arr.sort(()=> Math.random() - 0.5);
}

function initQuestions (difficulty) {
  let shuffledQwords = qwords.slice(0, qwords.length);

  if (difficulty === "hard") {
    let shuffledDummyQwords = dummyQwords.slice(0, dummyQwords.length);
    shuffleArray(shuffledDummyQwords)
    shuffledQwords = shuffledQwords.concat(shuffledDummyQwords.slice(0, 10))
  }

  shuffleArray(shuffledQwords)
  return shuffledQwords.map(qword => new Question(qword))
}


function Play() {
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get("difficulty")

  const [questions] = useState(() => initQuestions(difficulty));
  const [qNumber, setQNumber] = useState(0);
  const [inputAnswers, setInputAnswers] = useState([""]);
  const { enqueueSnackbar } = useSnackbar();
  const [time, setTime] = React.useState(0);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [focusArea, setFocusArea] = useState(0);


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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeWord = () => {
    const result = questions[qNumber].check(inputAnswers)
    if (result.isCorrect) {
      enqueueSnackbar('Correct', {
        variant: 'success',
        autoHideDuration: 700,
        TransitionComponent: Fade,
        anchorOrigin: {vertical: 'top',horizontal: 'right'},
      });
    } else {
      enqueueSnackbar('Wrong', {
        variant: 'error',
        autoHideDuration: 700,
        TransitionComponent: Fade,
        anchorOrigin: {vertical: 'top',horizontal: 'right'},
        action: () => (
          <div align="left"> 
            {result.extraAnswers.length>0 && <div> extra: {result.extraAnswers.join(", ")} </div> }
            {result.shortageAnswers.length>0 && <div> shortage: {result.shortageAnswers.join(", ")} </div> }
          </div>
        )
      });
    }

    // save result
    let tmpAnswerHistory = answerHistory.slice(0, answerHistory.length);
    tmpAnswerHistory.push(result)
    setAnswerHistory(tmpAnswerHistory)

    // 解答欄リセット
    setQNumber(qNumber + 1) // increment question ID
    setInputAnswers([""]) // input を空にする
    setFocusArea(0) // focus を最初のエリアにする

    // 終了処理
    if (qNumber === (questions.length - 1)) {
      navigate('/result', {state: {
        results: tmpAnswerHistory,
        time: time,
        difficulty: difficulty,
      }})
    }
  }

  const addInputAnswer = () => {
    let tmpInputAnswer = inputAnswers.slice(0, inputAnswers.length);
    tmpInputAnswer.push("")
    setFocusArea(tmpInputAnswer.length - 1)
    setInputAnswers(tmpInputAnswer)
  }

  const handleChange = (event) => {
    let tmpInputAnswer = inputAnswers.slice(0, inputAnswers.length);
    tmpInputAnswer[event.target.name] = event.target.value
    setFocusArea(event.target.name)
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
          <h1> { questions[qNumber].qword } </h1>
          { difficulty === "easy" && <h4> 解の数: {questions[qNumber].answers.length} </h4>}
          <div>
            <Stack spacing={1} direction="column" alignItems="center">
              {inputAnswers.map((ans, index) => {
                return <TextField 
                  // autoFocus
                  inputRef={(focusArea === index) && inputEl}
                  type="text"
                  style={{maxWidth:200}}
                  name={index}
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

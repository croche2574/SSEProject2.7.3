import React, { memo, useCallback, useEffect, useState } from "react"
import { Button, Grid, Typography, createTheme } from "@mui/material"
import { getDatabase, ref, get, set } from "firebase/database"
import { Link as RouterLink } from "react-router-dom"

const AnswerButton = memo(({ answer, correct, setScore, setAnswered }) => {
    const [clicked, setClicked] = useState(false)
    const theme = createTheme()
    const answerColor = correct ? theme.palette.success.main : theme.palette.error.main

    const clickHandler = useCallback((e) => {
        setClicked(true)
        let scoreDelta = correct ? 1 : -0.5
        setScore((score) => {
            return ((score += scoreDelta) > 0) ? score : 0
        })
        if (correct) { setAnswered(true) }
    }, [correct])

    useEffect(() => {
        setClicked(false)
    }, [answer])

    return (
        <Button variant="outlined" onClick={clickHandler} sx={{
            textTransform: "none",
            "&.Mui-disabled": {
                color: answerColor,
                borderColor: answerColor
            }
        }} disabled={clicked}>
            <Typography>{answer}</Typography>
        </Button>
    )

})

const QuestionPanel = memo(({ question, answers, index, setIndex, setScore }) => {
    const [answered, setAnswered] = useState(false)
    const theme = createTheme()
    const [shuffled, setShuffled] = useState([])

    useEffect(() => {
        setShuffled([...answers].sort(() => 0.5 - Math.random()))
    }, [answers])

    const clickHandler = useCallback(() => {
        setIndex((index) => {return index += 1})
        setAnswered(false)
    })

    return (
        <>
            <Typography component="h1" variant="h5"> Question {index}:</Typography>
            <Typography>{question}</Typography>
            <Grid container >
                {shuffled.map((answer, index) => {
                    return (
                        <Grid xs={12} md={5} item key={index} sx={{ margin: theme.spacing(1, 1), display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <AnswerButton answer={answer.text} correct={answer.correct} setScore={setScore} setAnswered={setAnswered} />
                        </Grid>
                    )
                })}
            </Grid>
            <Button variant="contained" onClick={clickHandler} disabled={!answered}>Next Question</Button>
        </>
    )
})

const StartPanel = memo(({ startHandler }) => {

    return (
        <>
            <Typography component="h1" variant="h5" >Quiz: Social Engineering</Typography>
            <Typography>Click the button below to begin the quiz.</Typography>
            <Button onClick={startHandler}>Start Quiz</Button>
        </>
    )
})

const EndPanel = memo(({ score, refreshHandler, uid, highscore }) => {
    const theme = createTheme()
    const userDB = getDatabase()
    
    useEffect(() => {
        if (score > highscore) { set(ref(userDB, 'users/' + uid + '/highScore'), score)}
    }, [score, highscore, uid])

    return (
        <>
            <Typography component="h1" variant="h5" >Quiz: Social Engineering</Typography>
            <Typography>Your score was {score}. Check the scoreboard to see how you rank!</Typography>
            <Grid container sx={{ margin: theme.spacing(1, 1), display: "flex", alignItems: "center", justifyContent: "center" }} >
                <Button variant="contained" component={RouterLink} to={"/scoreboard"}>Scoreboard</Button>
                <Button variant="contained" onClick={refreshHandler}>Try Again!</Button>
            </Grid>
        </>
    )
})

export const QuizPage = memo(({uid, highscore}) => {
    const [score, setScore] = useState(0)
    const [index, setIndex] = useState(1)
    const [questions, setQuestions] = useState([])
    const [questionSet, setQuestionSet] = useState([])
    const [quizStarted, setQuizStarted] = useState(false)
    const length = 10

    const userDB = getDatabase()

    const startQuiz = useCallback(() => {
        const shuffled = [...questions].sort(() => 0.5 - Math.random()) // Copy and shuffle array
        const selected = shuffled.slice(0, length) // Get sub-array of first n elements after shuffled
        console.log(selected)
        setQuestionSet(selected)
        setQuizStarted(true)
    }, [questions])

    const refreshHandler = useCallback(() => {
        setQuizStarted(false)
        setScore(0)
        setIndex(1)
    })

    useEffect(() => {
        get(ref(userDB, 'questions')).then((values) => {
            console.log(values.val())
            setQuestions(values.val())
        })
    }, [])

    useEffect(() => {
        console.log(score)
    }, [score])

    return (
        <>
            {index > length  ? 
                <EndPanel score={score} refreshHandler={refreshHandler} uid={uid} highscore={highscore} /> : quizStarted ?
                <QuestionPanel question={questionSet[index-1].question} answers={questionSet[index-1].options} index={index} setIndex={setIndex} setScore={setScore} /> :                 
                <StartPanel startHandler={startQuiz} />}
        </>
    )
})
import React, { memo, useCallback, useEffect, useState } from "react"
import { Button, Grid, Typography, createTheme } from "@mui/material"

const AnswerButton = memo(({ answer, correct, setScore, setAnswered }) => {
    const [clicked, setClicked] = useState(false)
    const theme = createTheme()
    const answerColor = correct ? theme.palette.success : theme.palette.error
    

    const clickHandler = useCallback((e) => {
        setClicked(true)
        let scoreDelta = correct ? 1 : -0.5
        setScore((score) => {
            return (score += scoreDelta > 0) ? score : 0
        })
        if (correct) {setAnswered(true)}
    })

    return (
        <Button variant="outlined" onClick={clickHandler} sx={{
            textTransform: "none",
            "&.Mui-disabled": {
                color: theme[clicked ? answerColor : theme.palette.primary]
            }
        }} disabled={clicked}>
            <Typography>{answer}</Typography>
        </Button>
    )

})

const QuestionPanel = memo(({ question, answers, index, setScore }) => {
    const [answered, setAnswered] = useState(false)
    const theme = createTheme()

    return (
        <>
            <Typography component="h1" variant="h5"> Question {index}:</Typography>
            <Typography>{question}</Typography>
            <Grid container >
                {answers.map((answer) => {
                    return (
                        <Grid  xs={12} md={5} item key={answer.answer} sx={{ margin: theme.spacing(1, 1), display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <AnswerButton answer={answer.answer} correct={answer.correct} setScore={setScore} setAnswered={setAnswered} />
                        </Grid>
                    )
                })}
            </Grid>
            <Button variant="contained" disabled={!answered}>Next Question</Button>
        </>
    )
})

const StartPanel = memo((props) => {

})

export const QuizPage = memo((props) => {
    const questions = [{
        question: "What color is the sky?",
        answers: [
            { answer: "red", correct: false },
            { answer: "yellow", correct: false },
            { answer: "green", correct: false },
            { answer: "blue", correct: true }
        ]
    }]
    const [score, setScore] = useState(0)
    const [index, setIndex] = useState(1)

    useEffect(() => {
        console.log(score)
    }, [score])

    return (
        <QuestionPanel question={questions[0].question} answers={questions[0].answers} index={1} setScore={setScore} />
    )

})
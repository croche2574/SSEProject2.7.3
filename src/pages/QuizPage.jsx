import React, { memo, useCallback, useEffect, useState } from "react"
import { Button, Grid, Typography, createTheme } from "@mui/material"
import { getDatabase, ref, get, set } from "firebase/database"
import { Link as RouterLink } from "react-router-dom"

/**
 * Component for quiz response buttons
 * @component
 * @private
 * @param {string} answer - Answer text that goes on button
 * @param {boolean} correct - Whether the button is the right answer
 * @param {function} setScore - Setter for the user's score
 * @param {function} setAnswered - Setter for whether the question has been correctly answered
 * @returns {JSX.Element} 
 * @example
 * // Renders Quiz answer
 * <AnswerButton answer={answer.text} correct={answer.correct} setScore={setScore} setAnswered={setAnswered} />
 */
const AnswerButton = memo(({ answer, correct, setScore, setAnswered }) => {
    const [clicked, setClicked] = useState(false)
    const theme = createTheme()
    const answerColor = correct ? theme.palette.success.main : theme.palette.error.main

    /**
     * Handles the button click. Increments the score by 1 for every correct answer and decrements by 0.5 for each incorrect answer. 
     * Sets answered to true if answer is correct
     * @private
     * @function
     * @param {*} e - Unused
     */
    const clickHandler = useCallback((e) => {
        setClicked(true)
        let scoreDelta = correct ? 1 : -0.5
        setScore((score) => {
            return ((score += scoreDelta) > 0) ? score : 0
        })
        if (correct) { setAnswered(true) }
    }, [correct])

    // Side Effect (runs everytime answer changes) to change clicked to false whent the question changes
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

/**
 * Panel that contains the quiz question layout and logic
 * @component
 * @private
 * @param {string} question - The current question
 * @param {Array} answers - Array of objects containing the answer options for the question
 * @param {number} index - The current question number
 * @param {function} setIndex - Setter for the index
 * @param {function} setScore - Setter for the user's score
 * @returns {JSX.Element}
 */
const QuestionPanel = memo(({ question, answers, index, setIndex, setScore }) => {
    const [answered, setAnswered] = useState(false)
    const theme = createTheme()
    const [shuffled, setShuffled] = useState([])

    // Side Effect (runs every time the question changes) to randomly shuffle the answer choices
    useEffect(() => {
        setShuffled([...answers].sort(() => 0.5 - Math.random()))
    }, [answers])

    /**
     * Handler callback for incrementing the question index
     * @function
     * @private
     */
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

/**
 * Opening screen for the quiz
 * @component
 * @private
 * @param {function} startHandler - Initializes the quiz
 * @returns {JSX.Element}
 * @example
 * // Loads the start screen
 * <StartPanel startHandler={startQuiz} />
 */
const StartPanel = memo(({ startHandler }) => {
    return (
        <>
            <Typography component="h1" variant="h5" >Quiz: Social Engineering</Typography>
            <Typography>Click the button below to begin the quiz.</Typography>
            <Button onClick={startHandler}>Start Quiz</Button>
        </>
    )
})

/**
 * End screen for the quiz
 * @component
 * @private
 * @param {number} score - the user's current score
 * @param {function} refreshHandler - Resets the states for a new quiz
 * @param {string} uid - the user's id number for writing score to firebase
 * @param {number} highscore - The user's current high score
 * @returns {JSX.Element}
 */
const EndPanel = memo(({ score, refreshHandler, uid, highscore }) => {
    const theme = createTheme()
    const userDB = getDatabase()
    
    // Side effect (runs whenever scores or user changes) checks if the new score is higher and then sets the value in the DB
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

/**
 * Page component for the quiz route
 * @component
 * @param {string} uid - User's id number
 * @param {number} highscore - User's current high score
 * @returns {JSX.Element}
 */
export const QuizPage = memo(({uid, highscore}) => {
    const [score, setScore] = useState(0)
    const [index, setIndex] = useState(1)
    const [questions, setQuestions] = useState([])
    const [questionSet, setQuestionSet] = useState([])
    const [quizStarted, setQuizStarted] = useState(false)
    const length = 10

    const userDB = getDatabase()

    /**
     * Callback that starts the quiz. Shuffles the questions, selects n=quiz length questions, and sets the states
     * @function
     * @private
     */
    const startQuiz = useCallback(() => {
        const shuffled = [...questions].sort(() => 0.5 - Math.random()) // Copy and shuffle array
        const selected = shuffled.slice(0, length) // Get sub-array of first n elements after shuffled
        console.log(selected)
        setQuestionSet(selected)
        setQuizStarted(true)
    }, [questions])

    /**
     * Refreshes the quiz for restart
     * @function
     * @private
     */
    const refreshHandler = useCallback(() => {
        setQuizStarted(false)
        setScore(0)
        setIndex(1)
    })

    // Side Effect (runs once after first render) to get the questions from the db and save them to a state
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
            {index > length  ? //Loads the end panel if the index is larger than the number of questions
                <EndPanel score={score} refreshHandler={refreshHandler} uid={uid} highscore={highscore} /> : quizStarted ?
                <QuestionPanel question={questionSet[index-1].question} answers={questionSet[index-1].options} index={index} setIndex={setIndex} setScore={setScore} /> :                 
                <StartPanel startHandler={startQuiz} />}
        </>
    )
})
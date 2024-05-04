import React, { StrictMode, useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root"
import { LoginPage } from "./pages/LoginPage"
import { CreateAccountPage } from "./pages/CreateAccountPage"
import { QuizPage } from "./pages/QuizPage"
import { ScorePage } from "./pages/ScorePage"
import { ErrorPage } from "./pages/ErrorPage"
import './styles.css'
import { onChildChanged, ref, getDatabase } from "firebase/database";

const RouteCompontent = (props) => {
    const [error, setError] = useState('')
    const [uid, setUid] = useState('')
    const [highscore, setHighscore] = useState(0)
    const userDB = getDatabase()

    useEffect(() => {
        onChildChanged(ref(userDB, 'users' + uid), (snapshot) => {
            setHighscore(snapshot.val().highscore)
        })
    })

    return (
        <Routes>
            <Route path="/" element={<Root setError={setError} setUid={setUid} setHighscore={setHighscore} />}>
                <Route index element={<LoginPage error={error} setError={setError} />} errorElement={<ErrorPage />} />
                <Route path="/signup" element={<CreateAccountPage error={error} setError={setError} />} errorElement={<ErrorPage />} />
                <Route path="/quiz" element={<QuizPage uid={uid} highscore={highscore} />} errorElement={<ErrorPage />} />
                <Route path="/scoreboard" element={<ScorePage />} errorElement={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

document.addEventListener('DOMContentLoaded', function () {
    const ndRoot = document.getElementById('react-root')
    const root = createRoot(ndRoot)
    root.render(
        <BrowserRouter>
            <RouteCompontent />
        </BrowserRouter>
    )
})
import React, { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root"
import { LoginPage } from "./pages/LoginPage"
import { CreateAccountPage } from "./pages/CreateAccountPage"
import { QuizPage } from "./pages/QuizPage"
import { ScorePage } from "./pages/ScorePage"
import { ErrorPage } from "./pages/ErrorPage"
import './styles.css'

const RouteCompontent = (props) => {
    const [error, setError] = useState('')

    return (
        <Routes>
            <Route path="/" element={<Root setError={setError} /> }>
                <Route index element={<LoginPage error={error} setError={setError} /> } errorElement={<ErrorPage />} />
                <Route path="/signup" element={<CreateAccountPage error={error} setError={setError} /> } errorElement={<ErrorPage />} />
                <Route path="/quiz" element={<QuizPage />} errorElement={<ErrorPage />} />
                <Route path="/scoreboard" element={<ScorePage />} errorElement={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

document.addEventListener('DOMContentLoaded', function () {
    const ndRoot = document.getElementById('react-root')
    const root = createRoot(ndRoot)
    root.render(
        <StrictMode>
            <BrowserRouter>
                <RouteCompontent />
            </BrowserRouter>
        </StrictMode>
    )
})
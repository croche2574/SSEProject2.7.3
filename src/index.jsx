import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./pages/Root"
import { LoginPage } from "./pages/LoginPage"
import { CreateAccountPage } from "./pages/CreateAccountPage"
import { QuizPage } from "./pages/QuizPage"
import { ScorePage } from "./pages/ScorePage"
import { ErrorPage } from "./pages/ErrorPage"
import './styles.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
                errorElement: <ErrorPage />
            },
            {
                path: "/signup",
                element: <CreateAccountPage />,
                errorElement: <ErrorPage />
            },
            {
                path: "/quiz",
                element: <QuizPage />,
                errorElement: <ErrorPage />
            },
            {
                path: "/scoreboard",
                element: <ScorePage />,
                errorElement: <ErrorPage />
            }
        ]
    }
])

document.addEventListener('DOMContentLoaded', function () {
    const ndRoot = document.getElementById('react-root')
    const root = createRoot(ndRoot)
    root.render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    )
})
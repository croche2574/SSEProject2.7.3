import { Typography } from "@mui/material";
import React, { useState, memo } from "react";
import { QuizHandler } from "./features/QuizHandler/QuizHandler";
import { LoginHandler } from "./features/LoginHandler/LoginHandler";

export const App = memo((props) => {
    const [loggedIn, setLoggedIn] = useState(false)



    return (
        <LoginHandler setLoggedIn={setLoggedIn} />

    )
})
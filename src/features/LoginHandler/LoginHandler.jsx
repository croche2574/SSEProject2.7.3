import React, {useState, memo, useEffect} from "react";

export const LoginHandler = memo((props) => {
    const { setLoggedIn } = props

    setLoggedIn(true)
})
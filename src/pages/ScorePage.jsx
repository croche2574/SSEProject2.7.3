import React, { memo, useEffect, useRef, useState } from "react"
import { getDatabase, ref, onValue, onChildChanged } from "firebase/database"

const Scoreboard = memo((props) => {
    
})

export const ScorePage = memo((props) => {
    const [userScores, setUserScores] = useState()
    const userDB = getDatabase()
    const userRef = ref(userDB, 'users')

    useEffect(() => {
        onChildChanged(userRef, (newValue) => {
            console.log(newValue.val())
        })
    })
})
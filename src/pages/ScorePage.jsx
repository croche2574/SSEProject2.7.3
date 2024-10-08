import React, { memo, useEffect, useState } from "react"
import { getDatabase, ref, onChildChanged, get } from "firebase/database"
import { Typography } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

/**
 * Scoreboard Component
 * @component
 * @private
 * @param {Array} userScores - Array of objects containing user high scores and usernames
 * @returns {JSX.Element}
 * @example
 * // Scoreboard Component Example
 * <Scoreboard userScores={userScores} />
 */
const Scoreboard = memo(({ userScores }) => {
    const columns = [
        { id: 'username', label: 'Username', minWidth: 270 },
        { id: 'highScore', label: 'High Score', minWidth: 100, align: 'center' }
    ]

    return (
        <>
            <Typography component="h1" variant="h5">
                Scoreboard
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => {
                                return (
                                    <TableCell
                                        key={column.id + Date.now().toString()}
                                        align={column.align}
                                        sx={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userScores.map((row, idx) => {
                            return (
                                <TableRow hover key={row.username + Date.now().toString()} >
                                    {columns.map((column) => {
                                        const value = row[column.id]
                                        return (
                                            <TableCell key={column.id + Date.now().toString()} align={column.align}>
                                                {value}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
})

/**
 * Score page route component. Renders a table of high scores and sorts it; updates in real time from firebase
 * @component
 * @param {Object} props - Unused
 * @returns {JSX.Element}
 */
export const ScorePage = memo((props) => {
    const [userScores, setUserScores] = useState([])
    const userDB = getDatabase()
    const userRef = ref(userDB, 'users')

    // Side Effect (runs once after first render) to sort the user scores by score
    useEffect(() => {
        get(userRef).then((values) => {
            setUserScores(Object.values(values.val()).sort(((b, a) => { return a.highScore - b.highScore })))
        })
    }, [])

    // Side Effect (runs every time user data updates) to update the user score array if the DB changes
    useEffect(() => {
        onChildChanged(userRef, (newValue) => {
            const val = newValue.val()
            console.log(val)
            setUserScores((prevScores) => {
                let temp = prevScores.filter((record) => { // Filter out the old record
                    if (record.username != val.username) {
                        return record
                    }
                })
                temp = [...temp, val] // Add the new record back in
                return (
                    Object.values(temp).sort(((b, a) => { return a.highScore - b.highScore }))
                )
            })
        })
    })

    return (
        <Scoreboard userScores={userScores} />
    )
})
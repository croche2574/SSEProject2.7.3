import React, { memo, useCallback, useEffect, useState } from "react"
import { Outlet, useNavigate, Link as RouterLink } from "react-router-dom"
import { Box, AppBar, Drawer, Typography, Toolbar, IconButton, MenuItem, Menu, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import QuizIcon from '@mui/icons-material/Quiz';
import LoginIcon from '@mui/icons-material/Login';
import { onAuthStateChanged, signOut, sendEmailVerification } from "firebase/auth";
import { get, getDatabase, onChildChanged, orderByKey, query, ref, set } from "firebase/database"
import { auth } from "../firebase"
import { PageBackground } from "../components/PageBackground"

const SideMenu = memo((props) => {
    const { open, toggleMenu, loggedIn } = props

    const MenuList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleMenu(false)}>
            <List>
                <ListItem>
                    <ListItemButton component={RouterLink} to={loggedIn ? "/quiz" : "/"}>
                        <ListItemIcon>
                            {loggedIn ? <QuizIcon /> : <LoginIcon />}
                        </ListItemIcon>
                        <ListItemText>
                            {loggedIn ? "Take Quiz" : "Login / Sign Up"}
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton component={RouterLink} to={"/scoreboard"}>
                        <ListItemIcon>
                            <ScoreboardIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Scoreboard
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )

    return (
        <Drawer open={open} onClose={toggleMenu(false)}>
            {MenuList}
        </Drawer>
    )
})

export const Root = memo(({setError, setUid}) => {
    const [loggedIn, setLoggedIn] = useState(true)
    const [username, setUsername] = useState('')
    const userDB = getDatabase()

    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const navigate = useNavigate()

    const userExists = (user) => {
        console.log(user.uid)
        setUid(user.uid)
        const userRef = ref(userDB, 'users/' + user.uid)
        const results = query(userRef, orderByKey())
        get(results).then((r) => {
            console.log(r)
            if (r.val()) {
                console.log(r.val())
            } else {
                set(userRef, {
                    username: user.displayName,
                    highScore: 0
                })
            }
        })
    }
 
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                // ...
                console.log(user)
                if (user.emailVerified) {
                    setLoggedIn(true)
                    setUsername(user.displayName)
                    userExists(user)
                    console.log(user.displayName + " logged in.")
                    navigate("/quiz")
                } else {
                    console.log("Email not verified")
                    setError("Email not verified")
                    setLoggedIn(false)
                    sendEmailVerification(user).then((v) => { console.log("Email sent") })
                    navigate("/")
                }
            } else {
                // User is signed out
                // ...
                console.log("user is logged out")
                setLoggedIn(false)
            }
        });

    }, [])

    const toggleSideMenu = (newOpen) => () => { setOpen(newOpen) }

    const handleMenu = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    })

    const handleClose = useCallback(() => {
        setAnchorEl(null)
    }, [])

    const logoutHandler = useCallback(() => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
            console.log(error)
        })
        handleClose()
    }, [auth])

    return (
        <>
            <Box style={{ zIndex: 99999 }}>
                <AppBar style={{ position: 'fixed', top: 0 }}>
                    <Toolbar>
                        <IconButton
                            onClick={toggleSideMenu(true)}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            SSE Quiz
                        </Typography>

                        {loggedIn && (

                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircleIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={logoutHandler}>Sign Out</MenuItem>
                                </Menu>
                            </div>


                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <SideMenu open={open} setOpen={setOpen} loggedIn={loggedIn} toggleMenu={toggleSideMenu} />
            <div id="content">
                <PageBackground>
                    <Outlet />
                </PageBackground>
            </div>
        </>
    )
})
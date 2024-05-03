import React, { memo, useEffect, useState } from "react"
import {
    Button,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    createTheme,
    Paper,
} from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { Copyright } from "../components/Copyright"

export const LoginPage = memo((props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, setError } = props

    const theme = createTheme()

    useEffect(() => {
        setError('')
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                switch (errorCode) {
                    case "auth/invalid-email":
                        setError("Invalid email. Please try again.")
                        break;

                    default:
                        setError(errorMessage)
                        break;
                }
                // ..
            }
            )
    }

    return (
        <>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form noValidate sx={{ marginTop: theme.spacing(1) }}>
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoFocus
                />
                <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ margin: theme.spacing(3, 0, 2) }}
                    onClick={onSubmit}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item>
                        <Link component={RouterLink} to="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item>
                        <Typography color="error">{error}</Typography>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </form>
        </>
    );
})
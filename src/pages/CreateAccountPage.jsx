import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import React, { memo, useState } from "react"
import { auth } from "../firebase"
import {
    Button,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    createTheme,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom";
import { Copyright } from "../components/Copyright";

export const CreateAccountPage = memo((props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const { error, setError } = props

    const theme = createTheme()

    const onSubmit = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                updateProfile(user, { displayName: username })
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                switch (errorCode) {
                    case "auth/email-already-in-use":
                        setError("Email already in use. Please try again.")
                        break;

                    default:
                        setError(errorMessage)
                        break;
                }
            }
            )
    }

    return (
        <>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <form noValidate sx={{ marginTop: theme.spacing(1) }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
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
                    Create Account
                </Button>
                <Grid container>
                    <Grid item>
                        <Link component={RouterLink} to="/" variant="body2">
                            {"Already have an account? Sign In"}
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
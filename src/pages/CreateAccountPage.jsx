import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import React, { memo, useState } from "react"
import { auth } from "../firebase"
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Paper,
    Typography,
    createTheme,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom";


const Copyright = (props) => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://github.com/nhill1113/SSEProject2.7.3">
                SSE Quiz Project
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export const CreateAccountPage = memo((props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const theme = createTheme()

    const onSubmit = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                updateProfile(user, { displayName: username })
                console.log(user);
                navigate("/quiz")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            }
            )
    }

    return (
        <Grid container component="main" sx={{
            height: "100vh",
            backgroundColor: theme.palette.grey[50],
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <CssBaseline />
            <Grid component={Paper} item elevation={1} xs={12} sm={8} md={5} square sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Box sx={{ margin: theme.spacing(2, 6), display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography component="h1" variant="h5">
                        Create Account
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
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link component={RouterLink} to="/" variant="body2">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
})
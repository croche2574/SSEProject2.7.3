import React, { memo } from 'react'
import {
    Link,
    Typography
} from '@mui/material'

export const Copyright = memo((props) => {
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
})
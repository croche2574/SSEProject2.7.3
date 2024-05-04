import React, { memo } from 'react'
import {
    Link,
    Typography
} from '@mui/material'

/**
 * Component to display Copyright message on login screens
 * 
 * @component
 * @param {Object} props - No props accepted
 * @returns {JSX.Element} 
 * 
 * @example
 * // Renders Copyright text and link
 * <Copyright />
 */
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
    )
})
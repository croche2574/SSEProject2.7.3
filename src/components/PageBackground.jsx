import React, { memo } from 'react'
import {
    CssBaseline,
    Grid,
    Box,
    Paper,
    createTheme
} from "@mui/material"

/**
 * Component that renders background and main box on all pages
 * 
 * @component
 * @param {JSX.Element} children - The content that PageBackground wraps
 * @returns {JSX.Element}
 * 
 * @example
 * // Wrap around page content
 * <PageBackground>{content}</PageBackground>
 */
export const PageBackground = memo(({children}) => {
    const theme = createTheme()
    
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
                    {children}
                </Box>
            </Grid>
        </Grid>
    )
})
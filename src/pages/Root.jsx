import React, { memo, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Box, AppBar, Typography, Toolbar, IconButton, MenuItem } from "@mui/material"
import MenuIcon from "@mui/material/Icon"

export const Root = memo((props) => {
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <Box style={{ zIndex: 99999 }}>
            <AppBar style={{ position: 'fixed', top: 0 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="white"
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
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Sign Out</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>

        </Box>
    )
})
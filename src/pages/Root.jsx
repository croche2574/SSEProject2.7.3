import React, { memo, useCallback, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Box, AppBar, Drawer, Typography, Toolbar, IconButton, MenuItem, Menu } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SideMenu = memo((props) => {
    const { open, setOpen } = props

    const toggleMenu = (newOpen) => () => { setOpen(newOpen) }

    const MenuList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleMenu(false)}>

        </Box>
    )

    return (
        <Drawer open={open} onClose={toggleMenu(false)}>
            {MenuList}
        </Drawer>
    )
})

export const Root = memo((props) => {
    const [loggedIn, setLoggedIn] = useState(true)
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box style={{ zIndex: 99999 }}>
                <AppBar style={{ position: 'fixed', top: 0 }}>
                    <Toolbar>


                        {loggedIn && (
                            <>
                                <IconButton
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
                            </>

                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <SideMenu open={open} setOpen={setOpen} />
            <div id="content">
                <Outlet />
            </div>
        </>
    )
})
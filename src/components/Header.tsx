import {
    AppBar,
    Avatar,
    Box,
    Button, Chip, Divider,
    IconButton, ListItemIcon,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useMediaQuery
} from "@mui/material";
import {Collections, Home, Logout, Person, Settings, SportsBar} from "@mui/icons-material";

import React, {useEffect, useState} from "react";
import {ThemeSwitch} from "./Switchs.tsx";
import useDarkMode from "../hooks/useDarkMode.tsx";
import {Link} from "react-router-dom";

const Header = ({isScrollEffect}: { isScrollEffect: boolean }) => {

    const isMobile = useMediaQuery('(max-width: 600px)');

    const {isDarkMode, toggleDarkMode} = useDarkMode();

    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        // Scroll event listener for updating opacity
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const pageHeight = window.innerHeight;
            let calculatedOpacity = scrollPosition / pageHeight;

            if (calculatedOpacity >= 0.95) {
                calculatedOpacity = 0.95;
            }

            setOpacity(calculatedOpacity);
        };

        if (isScrollEffect) {
            // Add scroll event listener
            window.addEventListener('scroll', handleScroll);
        }

        // Cleanup scroll event listener on component unmount
        return () => {
            if (isScrollEffect) {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isScrollEffect]);

    let color;
    if (isDarkMode) {
        color = `rgba(39, 39, 42, ${opacity})`;
    } else {
        color = `rgba(244, 244, 245, ${opacity})`;
    }

    const [isAuth, setIsAuth] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // Optionally, validate token with the server or decode if using JWT
            setIsAuth(true);
        }
    }, []);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget as HTMLElement);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setIsAuth(false);
        handleMenuClose();
    };

    return (
        <AppBar position="fixed" className={`w-full h-[70px] z-50`}
                sx={{
                    backgroundColor: `${color}`,
                    transition: 'box-shadow 0.3s ease',
                    boxShadow: `0 12px 12px rgba(0, 0, 0, ${opacity * 0.28})`,
                }}>
            <Toolbar className="flex justify-center mx-1.5 p-0">
                <img src="/src/assets/img/logo-arzon.png" alt="Logo"
                     className="w-16 h-16 mt-3 drop-shadow-lg sm:w-20 sm:h-20 sm:mt-4"/>

                <Box className="flex flex-grow justify-center items-center">
                    <Link to="/" className="no-underline">
                        <Button className="btnHeader">
                            {isMobile ? (
                                <Home
                                    className="fill-zinc-900 dark:fill-zinc-100 w-8 h-8 hover:fill-zinc-100 dark:hover:fill-zinc-800"/>
                            ) : (
                                <Typography className="text-xl sm:text-2xl font-bold">
                                    Accueil
                                </Typography>
                            )}
                        </Button>
                    </Link>

                    <Divider orientation="vertical" flexItem className="border-zinc-900 dark:border-zinc-100"/>

                    <Link to="/records" className="no-underline">
                        <Button className="btnHeader">
                            {isMobile ? (
                                <SportsBar
                                    className="fill-zinc-900 dark:fill-zinc-100 w-8 h-8 hover:fill-zinc-100 dark:hover:fill-zinc-800"/>
                            ) : (
                                <Typography className="text-xl sm:text-2xl font-bold">
                                    Records
                                </Typography>
                            )}
                        </Button>
                    </Link>

                    <Divider orientation="vertical" flexItem className="border-zinc-900 dark:border-zinc-100"/>

                    <Link to="/arzondex" className="no-underline">
                        <Button className="btnHeader">
                            {isMobile ? (
                                <Collections
                                    className="fill-zinc-900 dark:fill-zinc-100 w-8 h-8 hover:fill-zinc-100 dark:hover:fill-zinc-800"/>
                            ) : (
                                <Typography className="text-xl sm:text-2xl font-bold">
                                    Arzondex
                                </Typography>
                            )}
                        </Button>
                    </Link>
                </Box>
                {isAuth ? (
                    <>
                        <IconButton onClick={handleMenuOpen} className="w-10 h-10 mx-1.5 sm:w-12 sm:h-12">
                            <Avatar className="w-10 h-10 mx-1.5 sm:w-12 sm:h-12 cursor-pointer drop-shadow-lg"/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            sx={{
                                '& .MuiPaper-root': {
                                    backgroundColor: isDarkMode ? 'rgba(39, 39, 42, 1)' : 'rgba(244, 244, 245, 1)',
                                },
                            }}
                        >
                            <Link to="/profile" className="no-underline">
                                <MenuItem onClick={handleMenuClose}
                                          sx={{color: isDarkMode ? 'rgba(244, 244, 245, 1)' : 'rgba(39, 39, 42, 1)'}}>
                                    <ListItemIcon>
                                        <Person
                                            sx={{fill: isDarkMode ? 'rgba(244, 244, 245, 1)' : 'rgba(39, 39, 42, 1)'}}/>
                                    </ListItemIcon>
                                    Profil
                                </MenuItem>
                            </Link>
                            <Divider/>
                            <MenuItem onClick={toggleDarkMode}>
                                <ThemeSwitch/>
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}
                                      sx={{color: isDarkMode ? 'rgba(244, 244, 245, 1)' : 'rgba(39, 39, 42, 1)'}}>
                                <ListItemIcon>
                                    <Settings
                                        sx={{fill: isDarkMode ? 'rgba(244, 244, 245, 1)' : 'rgba(39, 39, 42, 1)'}}/>
                                </ListItemIcon>
                                Paramètres
                            </MenuItem>
                            <MenuItem onClick={handleLogout}
                                      sx={{color: isDarkMode ? 'rgba(244, 244, 245, 1)' : 'rgba(39, 39, 42, 1)'}}>
                                <ListItemIcon>
                                    <Logout sx={{fill: isDarkMode ? 'rgba(244, 244, 245, 1)' : 'rgba(39, 39, 42, 1)'}}/>
                                </ListItemIcon>
                                Déconnexion
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Chip label="Login" onClick={() => setIsAuth(true)}
                          className="bg-[rgba(39,39,42,.08)] dark:bg-[rgba(244,244,245,.08)] text-zinc-900 dark:text-zinc-100 uppercase font-bold text-sm sm:text-xl mx-1.5"
                          sx={{
                              '& .MuiChip-label': {
                                  padding: '0 6px'
                              },
                          }}/>
                )}

            </Toolbar>
        </AppBar>
    );
}

export default Header;
import {
    Box, Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid2, IconButton, InputAdornment,
    Modal,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import {Visibility, VisibilityOff} from "@mui/icons-material";

import {FC, useEffect, useState} from "react";

import Logo from "../assets/img/logo-arzon.png";
import LoginImage from "../assets/img/arzon-login.jpg";
import axios from "axios";

interface LoginPopUpProps {
    open: boolean;
    handleClose: () => void;
}

const LoginPopUp: FC<LoginPopUpProps> = ({open, handleClose}) => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const isMd = useMediaQuery('(min-width: 768px)');

    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorUsername, setErrorUsername] = useState('Identifiant incorrect');
    const [errorPassword, setErrorPassword] = useState('Mot de passe incorrect');

    useEffect(() => {
        if (!open) {
            setShowPassword(false);
            setPasswordError(false);
            setUsernameError(false);
            setUsername('');
            setPassword('');
            setErrorUsername('Identifiant incorrect');
            setErrorPassword('Mot de passe incorrect');
        }
    }, [open]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickLogin = async () => {
        setUsernameError(false);
        setPasswordError(false);
        let error = false;
        if (username === '') {
            setErrorUsername('Identifiant requis');
            setUsernameError(true);
            error = true;
        }
        if (password === '') {
            setErrorPassword('Mot de pass requis');
            setPasswordError(true);
            error = true;
        }
        if (error) {
            return;
        }
        try {
            const reponse = await axios.post(`${import.meta.env.VITE_API_URL}/auth/checkLogin`, {username, password});
            localStorage.setItem('authToken', reponse.data);
            handleClose();
            window.location.reload();
        } catch (e: any) {
            console.error(e);
            const error: string = e.response.data;
            if (error === "Invalid username") {
                setErrorUsername('Identifiant incorrect');
                setUsernameError(true);
            }
            if (error === "Invalid password") {
                setErrorPassword('Mot de passe incorrect');
                setPasswordError(true);
            }
        }

    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="login-popup-title"
            aria-describedby="login-popup-description"
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: 'blur(4px)',
                    },
                },
            }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container sx={{my: 4}}>
                <Card sx={{borderRadius: '8px'}}>
                    <Grid2 container spacing={0}>
                        {isMobile ? (
                            <></>
                        ) : (
                            <Grid2 size={6}>
                                <CardMedia
                                    component="img"
                                    image={LoginImage}
                                    alt="login form"
                                    sx={{width: '100%', maxHeight: '95vh', objectFit: 'cover'}}
                                />
                            </Grid2>
                        )}
                        <Grid2 size="grow">
                            <CardContent sx={{display: 'flex', flexDirection: 'column', p: 4}}>
                                {/* Logo Section */}
                                <Box sx={{display: 'flex', alignItems: 'center', my: 2}}>
                                    <img src={Logo} alt="Logo"
                                         style={{width: '80px', height: '80px', marginTop: '15px'}}/>
                                    <Typography variant={isMd ? 'h3' : 'h4'}
                                                sx={{fontWeight: 'bold', marginLeft: '8px'}}>Connexion</Typography>
                                </Box>

                                {/* Input Fields */}
                                <TextField
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    fullWidth
                                    required
                                    margin="normal"
                                    label="Identifiant"
                                    type="email"
                                    variant="outlined"
                                    size={isMd ? 'medium' : 'small'}
                                    error={usernameError}
                                    helperText={usernameError ? errorUsername : ''}
                                />
                                <TextField
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    required
                                    margin="normal"
                                    label="Mot de passe"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    size={isMd ? 'medium' : 'small'}
                                    error={passwordError}
                                    helperText={passwordError ? errorPassword : ''}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                {/* Login Button */}
                                <Button variant="contained" color="primary" size="large" sx={{mt: 2, mb: 4, px: 5}}
                                        onClick={handleClickLogin}>
                                    Se connecter
                                </Button>
                            </CardContent>
                        </Grid2>
                    </Grid2>
                </Card>
            </Container>
        </Modal>
    );
};

export default LoginPopUp;

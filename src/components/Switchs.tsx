import {styled, Switch} from "@mui/material";
import {useEffect, useState} from "react";
import useDarkMode from "../hooks/useDarkMode.tsx";

const ThemeSwitchMUI = styled(Switch)(() => ({
    width: 66,
    height: 30,
    padding: 0,
    display: 'flex',

    '& .MuiSwitch-switchBase': {
        padding: 3,
        top: 0,
        left: 0,
        '&.Mui-checked': {
            transform: 'translateX(36px)',
            '& .MuiSwitch-thumb': {
                background: 'linear-gradient(to right, #a1a1aa, #e4e4e7)',
                transition: 'width 0.3s, transform 0.3s, border-radius 0.3s',
            },
            '& + .MuiSwitch-track': {
                backgroundColor: '#71717a',
                transition: '0.3s',
                opacity: 1,
            },
            '&:active .MuiSwitch-thumb': {
                width: 28,
                borderRadius: 30,
                transform: 'translateX(-4px)',
            },
        },
        '&:active .MuiSwitch-thumb': {
            width: 28,
            borderRadius: 30,
        },
    },

    '& .MuiSwitch-thumb': {
        width: 24,
        height: 24,
        background: 'linear-gradient(to right, #f97316, #facc15)',
        transition: '0.3s',
    },

    '& .MuiSwitch-track': {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: '#fff',
        position: 'relative',
        transition: '0.3s',
    },
}));

export const ThemeSwitch = () => {

    const {isDarkMode, toggleDarkMode} = useDarkMode();
    const [checked, setChecked] = useState(isDarkMode);

    useEffect(() => {
        setChecked(isDarkMode);
    }, [isDarkMode]);

    const handleChange = () => {
        setChecked(!checked);
        toggleDarkMode();
    };

    return (
        <ThemeSwitchMUI
            checked={checked}
            onChange={handleChange}
            disableRipple disableFocusRipple/>
    );
}

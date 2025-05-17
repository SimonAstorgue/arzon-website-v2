import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Collapse,
    Container,
    IconButton,
    InputAdornment,
    Modal,
    Tab,
    Tabs,
    TextField,
    useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import {FC, SyntheticEvent, useEffect, useState} from "react";
import {toPascalCase} from "../helpers/Utils.ts";
import axios from "axios";

interface AddRecordsFormProps {
    open: boolean;
    handleClose: () => void;
}

type OptionType = { label: string, id: number } | null;

const AddRecordForm: FC<AddRecordsFormProps> = ({open, handleClose}) => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
                const data = await response.json();
                const formattedData = data.map((category: { name: string; category_id: number }) => ({
                    label: category.name,
                    id: category.category_id,
                }));
                setCategories(formattedData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
                const data = await response.json();
                const formattedData = data.map((user: { username: string; user_id: number }) => ({
                    label: toPascalCase(user.username),
                    id: user.user_id,
                }));
                setUsers(formattedData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchCategories().then();
        fetchUsers().then();
    }, []);

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    // Variables for the form records
    const [category, setCategory] = useState<OptionType>(null);
    const [user, setUser] = useState<OptionType>(null);
    const [record, setRecord] = useState(0);

    // Variables for the form categories
    const [categoryName, setCategoryName] = useState('');
    const [arzonTime, setArzonTime] = useState(0);
    const [goldTime, setGoldTime] = useState(0);
    const [silverTime, setSilverTime] = useState(0);
    const [bronzeTime, setBronzeTime] = useState(0);

    const [error, setError] = useState(false);

    useEffect(() => {
        if (!open) {
            setTabIndex(0);
            setCategory(null);
            setUser(null);
            setRecord(0);
            setCategoryName('');
            setArzonTime(0);
            setGoldTime(0);
            setSilverTime(0);
            setBronzeTime(0);
            setError(false);
        }
    }, [open]);

    const handleClickAdd = async () => {
        setLoading(true);
        if (tabIndex === 0) {
            if (category === null || user === null || record === 0) {
                setLoading(false);
                setError(true);
                return;
            }
            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/record`, {
                    user_id: user.id,
                    category_id: category.id,
                    time: record
                });
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        } else {
            if (categoryName === '' || arzonTime === 0 || goldTime === 0 || silverTime === 0 || bronzeTime === 0) {
                setLoading(false);
                setError(true);
                return;
            }
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/category`, {name: categoryName});
                const categoryId = response.data.category_id;
                await axios.post(`${import.meta.env.VITE_API_URL}/medal`, {
                    category_id: categoryId,
                    name: "Arzon",
                    time: arzonTime,
                    power: 1
                });
                await axios.post(`${import.meta.env.VITE_API_URL}/medal`, {
                    category_id: categoryId,
                    name: "Or",
                    time: goldTime,
                    power: 2
                });
                await axios.post(`${import.meta.env.VITE_API_URL}/medal`, {
                    category_id: categoryId,
                    name: "Argent",
                    time: silverTime,
                    power: 3
                });
                await axios.post(`${import.meta.env.VITE_API_URL}/medal`, {
                    category_id: categoryId,
                    name: "Bronze",
                    time: bronzeTime,
                    power: 4
                });
                await axios.post(`${import.meta.env.VITE_API_URL}/medal`, {
                    category_id: categoryId,
                    name: "Papier Bulle",
                    time: 999999,
                    power: 5
                });
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        }
        setLoading(false);
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={() => {
                setError(false);
                handleClose();
            }}
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
                <Card
                    sx={{
                        borderRadius: '16px',
                        backgroundColor: 'transparent',
                        boxShadow: '2px 2px 20px rgba(45, 52, 54, 0.5)'
                    }}
                >
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="inherit"
                        variant="fullWidth"
                        sx={{
                            '& .MuiTab-root': {
                                color: '#f4f4f5',
                                backgroundColor: '#18181b',
                                opacity: 1,
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#f4f4f5',
                            },
                            '& .Mui-selected': {
                                color: '#18181b',
                                backgroundColor: '#f4f4f5',
                            },
                        }}
                    >
                        <Tab label="Ajouter un record"
                             sx={{
                                 borderRadius: '16px 16px 0 0',
                                 fontWeight: 700,
                                 fontSize: '1.1rem',
                             }}
                        />
                        <Tab label="Ajouter une catégorie" sx={{
                            borderRadius: '16px 16px 0 0',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                        }}/>
                    </Tabs>
                    <CardContent sx={{
                        backgroundColor: '#f4f4f5',
                        py: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        {tabIndex === 0 ? (
                            <>
                                <Box sx={{display: 'flex', justifyContent: 'center', mb: 4}}>
                                    <Autocomplete
                                        value={category}
                                        onChange={(_, newValue) => {
                                            if (newValue) {
                                                setCategory(newValue);
                                            }
                                        }}
                                        disablePortal
                                        options={categories}
                                        renderInput={(params) => <TextField {...params} label="Catégorie"/>}
                                        sx={{width: `${isMobile ? '96%' : '50%'}`}}
                                    />
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'center', mb: 4}}>
                                    <Autocomplete
                                        value={user}
                                        onChange={(_, newValue) => {
                                            if (newValue) {
                                                setUser(newValue);
                                            }
                                        }}
                                        disablePortal
                                        options={users}
                                        renderInput={(params) => <TextField {...params} label="Utilisateur"/>}
                                        sx={{width: `${isMobile ? '96%' : '50%'}`}}
                                    />
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'center', mb: 4}}>
                                    <TextField
                                        value={record === 0 ? "" : record}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setRecord(value === "" ? 0 : parseFloat(value));
                                        }}
                                        label="Record"
                                        type="number"
                                        variant="outlined"
                                        sx={{width: `${isMobile ? '96%' : '50%'}`}}
                                        slotProps={{
                                            input: {
                                                endAdornment: <InputAdornment position="start">s</InputAdornment>,
                                            },
                                        }}

                                    />
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{display: 'flex', justifyContent: 'center', mb: 4}}>
                                    <TextField
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        label="Nom de la catégorie"
                                        type="text"
                                        variant="outlined"
                                        sx={{width: `${isMobile ? '96%' : '50%'}`}}
                                    />
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'center', mb: 4}}>
                                    <TextField
                                        value={arzonTime === 0 ? "" : arzonTime}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setArzonTime(value === "" ? 0 : parseFloat(value));
                                        }}
                                        label="Temps médaille Arzon"
                                        type="number"
                                        variant="outlined"
                                        sx={{width: `${isMobile ? '96%' : '50%'}`}}
                                        slotProps={{
                                            input: {
                                                endAdornment: <InputAdornment position="start">s</InputAdornment>,
                                            },
                                        }}
                                    />
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'center', mb: 4}}>
                                    <TextField
                                        value={goldTime === 0 ? "" : goldTime}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setGoldTime(value === "" ? 0 : parseFloat(value));
                                        }}
                                        label="Temps médaille Or"
                                        type="number"
                                        variant="outlined"
                                        sx={{width: `${isMobile ? '96%' : '50%'}`}}
                                        slotProps={{
                                            input: {
                                                endAdornment: <InputAdornment position="start">s</InputAdornment>,
                                            },
                                        }}
                                    />
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'center', mb: 4}}>
                                    <TextField
                                        value={silverTime === 0 ? "" : silverTime}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSilverTime(value === "" ? 0 : parseFloat(value));
                                        }}
                                        label="Temps médaille Argent"
                                        type="number"
                                        variant="outlined"
                                        sx={{width: `${isMobile ? '96%' : '50%'}`}}
                                        slotProps={{
                                            input: {
                                                endAdornment: <InputAdornment position="start">s</InputAdornment>,
                                            },
                                        }}
                                    />
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'center', mb: 4}}>
                                    <TextField
                                        value={bronzeTime === 0 ? "" : bronzeTime}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setBronzeTime(value === "" ? 0 : parseFloat(value));
                                        }}
                                        label="Temps médaille Bronze"
                                        type="number"
                                        variant="outlined"
                                        sx={{width: `${isMobile ? '96%' : '50%'}`}}
                                        slotProps={{
                                            input: {
                                                endAdornment: <InputAdornment position="start">s</InputAdornment>,
                                            },
                                        }}
                                    />
                                </Box>
                            </>
                        )}
                        <Button loading={loading} variant="contained" color="primary" size="large"
                                sx={{mx: 'auto', px: 5, width: `${isMobile ? '50%' : '20%'}`}}
                                onClick={handleClickAdd}>
                            Ajouter
                        </Button>
                        <Collapse in={error}>
                            <Alert
                                severity={"error"}
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setError(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit"/>
                                    </IconButton>
                                }
                                sx={{my: 2}}
                            >
                                Tous les champs ne sont pas remplis !
                            </Alert>
                        </Collapse>
                    </CardContent>
                </Card>
            </Container>
        </Modal>
    )
        ;
};

export default AddRecordForm;

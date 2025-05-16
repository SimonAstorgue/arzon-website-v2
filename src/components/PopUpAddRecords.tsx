import {Card, CardContent, Container, Modal, Tab, Tabs, useMediaQuery} from '@mui/material';

import {FC, useState} from "react";

interface AddRecordsFormProps {
    open: boolean;
    handleClose: () => void;
}

const AddRecordForm: FC<AddRecordsFormProps> = ({open, handleClose}) => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const isMd = useMediaQuery('(min-width: 768px)');
    const [loading, setLoading] = useState(false);

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
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
                    sx={{borderRadius: '16px', backgroundColor: 'transparent'}}
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
                             }}
                        />
                        <Tab label="Ajouter une catégorie" sx={{borderRadius: '16px 16px 0 0'}}/>
                    </Tabs>
                    <CardContent sx={{height: '100px', backgroundColor: '#f4f4f5'}}>
                        {}
                    </CardContent>
                </Card>
            </Container>
        </Modal>
    );
};

export default AddRecordForm;

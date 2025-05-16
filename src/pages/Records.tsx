import CategoryRecord from "../components/CategoryRecord.tsx";
import {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import AddButton from "../components/AddButton.tsx";
import AddRecordForm from "../components/PopUpAddRecords.tsx";

interface category {
    category_id: number;
    name: string;
}

const RecordsPage = () => {

    const [categories, setCategories] = useState<category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories().then();
    }, []);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const handleOpenPopUp = () => {
        setIsFormOpen(true);
        document.body.classList.add('login-open');
    }
    const handleClosePopUp = () => {
        setIsFormOpen(false);
        document.body.classList.remove('login-open');
    }

    return (
        <div className={`flex flex-col items-center bg-zinc-100 dark:bg-zinc-800`}>
            <div className="h-24 w-full bg-zinc-100 dark:bg-zinc-800"/>
            <Typography
                className={`font-bold text-[34px] sm:text-[52px] my-0 mx-auto text-zinc-900 dark:text-zinc-100`}>Records</Typography>
            <Typography
                className={`font-medium text-[14px] sm:text-xl text-zinc-900 dark:text-zinc-100 mt-2.5 mb-0 mx-auto`}>Bienvenue
                sur la page des records, ici la compétition fait rage pour savoir qui
                boit le plus vite !
            </Typography>
            <AddButton className={`self-start ml-5`} onClick={handleOpenPopUp}/>
            <div className="flex flex-row flex-wrap justify-evenly items-start p-6">
                {categories.map((category) => (
                    <CategoryRecord key={category.category_id} category={category}/>
                ))}
            </div>
            <AddRecordForm open={isFormOpen} handleClose={handleClosePopUp}/>
        </div>
    );
}

export default RecordsPage;
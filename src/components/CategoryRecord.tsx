import {Typography} from "@mui/material";

import Beer from "../assets/img/beer.avif";

interface category {
    id: number;
    name: string;
}

const CategoryRecord = ({category}: { category: category }) => {
    return (
        <div
            className={`flex flex-col items-center rounded-3xl w-[100vw] sm:w-[600px] mt-6 mb-6 ml-0 mr-0 sm:ml-4 sm:mr-4 h-96`}
            style={{
                filter: 'drop-shadow(2px 0 8px rgba(45, 52, 54, 0.3))',
                backgroundImage: `url(${Beer})`,
            }}>
            <Typography>{category.name}</Typography>
        </div>
    );
}

export default CategoryRecord;
import {useParams} from "react-router-dom";
import background from "../assets/img/background.jpg";
import Beer from "../assets/img/beer.avif";
import {useEffect, useState} from "react";
import {Divider, Typography} from "@mui/material";
import {timeToString, toPascalCase} from "../helpers/Utils.ts";

type UserData = {
    user_id: number;
    username: string;
    lastname: string;
    avatar: string;
    gender: string;
    date_of_birth: string;
    date_of_arrival: string;
    permission: string;
    password: string;
}

type BestTimeData = {
    best_time: string;
    category_id: number;
    category_name: string;
    medal_name: string;
    position: string;
}

const Trophy = ({top, nb}: { top: number, nb: number }) => {
    return (
        <div className={`flex flex-row items-center justify-center`}>
            <img src={`../assets/img/profil/top${top}.png`} alt={`top${top}`}
                 className={`w-[50px] h-[55px] sm:w-[100px] sm:h-[110px]`}/>
            <Typography
                className={`font-bold text-xl sm:text-4xl text-zinc-900 bg-zinc-200 text-center rounded-3xl sm:py-1 px-1.5 sm:px-2.5`}
                sx={{boxShadow: '0 12px 12px rgba(45, 52, 54, 0.5)'}}
            >{"x " + nb}</Typography>
        </div>
    );
}

const Medal = ({medal, nb}: { medal: string, nb: number }) => {
    return (
        <div className={`flex flex-row items-center justify-center`}>
            <img src={`../assets/img/profil/${medal}-medal.png`} alt={`${medal} medal`}
                 className={`w-[55px] h-[55px] sm:w-[110px] sm:h-[110px]`}/>
            <Typography
                className={`font-bold text-xl sm:text-4xl text-zinc-900 bg-zinc-200 text-center rounded-3xl sm:py-1 px-1.5 sm:px-2.5`}
                sx={{boxShadow: '0 12px 12px rgba(45, 52, 54, 0.5)'}}
            >{"x " + nb}</Typography>
        </div>
    );
}

type RecordData = {
    record_id: number;
    user_id: number;
    category_id: number;
    time: string;
    medal_id: number;
    date: string;
}

const StatisticsCategory = ({bestTime}: { bestTime: BestTimeData }) => {
    const {userId} = useParams<{ userId: string }>();
    const [records, setRecords] = useState<RecordData[]>([]);
    const [average, setAverage] = useState<number>(0);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/records/${userId}/category/${bestTime.category_id}`);
                const data = await response.json();
                setRecords(data);
            } catch (error) {
                console.error("Error fetching user records:", error);
            }
        }
        fetchRecords().then(() => {
                const total = records.reduce((acc, record) => acc + parseFloat(record.time), 0);
                const avg = total / records.length;
                setAverage(avg);
            }
        );
    }, [userId, bestTime, records]);

    return (
        <div className={`flex flex-col justify-start items-center w-[400px] rounded-3xl m-5 p-2.5`}
             style={{boxShadow: '0 12px 12px rgba(45, 52, 54, 0.5)'}}>
            <Typography
                className={`font-bold text-4xl text-zinc-900 text-center mb-2.5 py-0.5 px-1 underline rounded-3xl`}>
                {"Catégorie " + bestTime.category_name}
            </Typography>
            <Divider className={`w-[80%] bg-zinc-800 my-2.5 mx-auto`} sx={{borderBottomWidth: 2.5}}/>
            <div className={`flex flex-col justify-start items-start w-[90%] mt-2.5 mb-5`}>
                <Typography
                    className={`font-medium text-2xl text-zinc-900 text-center mb-2.5`}>{"Meilleur temps: " + timeToString(parseFloat(bestTime.best_time))}</Typography>
                <Typography
                    className={`font-medium text-2xl text-zinc-900 text-center mb-2.5`}>{"Médaille: " + toPascalCase(bestTime.medal_name)}</Typography>
                <Typography
                    className={`font-medium text-2xl text-zinc-900 text-center mb-2.5`}>{"Classement: " + bestTime.position + (bestTime.position === "1" ? "er" : "ème")}</Typography>
                <Typography
                    className={`font-medium text-2xl text-zinc-900 text-center mb-2.5`}>{"Moyenne: " + timeToString(average)}</Typography>
                <Typography
                    className={`font-medium text-2xl text-zinc-900 text-center mb-2.5`}>{"Nombre de tentatives: " + records.length}</Typography>
            </div>
        </div>
    );
}

const ProfilePage = () => {
    const {userId} = useParams<{ userId: string }>();

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users/id/${userId}`);
                const data = await response.json().then(json => json[0]);
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchUserData().then();
    }, [userId]);

    const age = () => {
        if (userData) {
            const birthDate = new Date(userData.date_of_birth);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
        return 20;
    }

    const stringDateOfArrival = () => {
        if (userData) {
            const date = new Date(userData.date_of_arrival);
            return date.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        }
        return "Date";
    }

    const [nbRecords, setNbRecords] = useState<number>(0);

    useEffect(() => {
        const fetchNbRecords = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/records/${userId}`);
                const data = await response.json();
                setNbRecords(data.rows[0].count);
            } catch (error) {
                console.error("Error fetching user records:", error);
            }
        }
        fetchNbRecords().then();
    }, [userId]);

    const [bestTimes, setBestTimes] = useState<BestTimeData[]>([]);
    const [nbTop1, setNbTop1] = useState(0);
    const [nbTop2, setNbTop2] = useState(0);
    const [nbTop3, setNbTop3] = useState(0);
    const [nbArzonMedal, setNbArzonMedal] = useState(0);
    const [nbGoldMedal, setNbGoldMedal] = useState(0);
    const [nbSilverMedal, setNbSilverMedal] = useState(0);
    const [nbBronzeMedal, setNbBronzeMedal] = useState(0);

    useEffect(() => {
        const fetchBestTime = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/records/${userId}/best`);
                const data = await response.json();
                setBestTimes(data.rows);
            } catch (error) {
                console.error("Error fetching user records:", error);
            }
        }
        fetchBestTime().then(() => {
                setNbTop1(bestTimes.filter((bestTime) => bestTime.position === "1").length);
                setNbTop2(bestTimes.filter((bestTime) => bestTime.position === "2").length);
                setNbTop3(bestTimes.filter((bestTime) => bestTime.position === "3").length);
                setNbArzonMedal(bestTimes.filter((bestTime) => bestTime.medal_name === "Arzon").length);
                setNbGoldMedal(bestTimes.filter((bestTime) => bestTime.medal_name === "Or").length);
                setNbSilverMedal(bestTimes.filter((bestTime) => bestTime.medal_name === "Argent").length);
                setNbBronzeMedal(bestTimes.filter((bestTime) => bestTime.medal_name === "Bronze").length);
            }
        );
    }, [userId, bestTimes]);

    return (
        <div className={`flex flex-col items-center bg-zinc-100 dark:bg-zinc-800`}>
            <img src={background} alt="background"
                 className={`w-full h-screen object-cover object-center contrast-75`}/>
            <div className={`absolute w-full min-h-[100vh] pt-[70px] sm:px-32 flex flex-col sm:flex-row`}>
                <div
                    className={`flex flex-col items-center self-center sm:self-start justify-center sm:justify-start w-[70%] sm:w-[456px]`}
                    style={{filter: `drop-shadow(0 12px 12px rgba(45, 52, 54, 0.3))`}}>
                    <div className={`flex flex-col items-center justify-start w-[90%] h-[400px] sm:h-[600px]`}
                         style={{
                             backgroundImage: `url(${Beer}`,
                             backgroundSize: "cover",
                             backgroundPosition: "center",
                             clipPath: `polygon(100% 0, 100% 80%, 50% 100%, 0 80%, 0 0)`,
                         }}
                    >
                        <img src={`../assets/img/avatars/${userData ? (userData.avatar) : ("default-user.jpg")}`}
                             alt="User PP"
                             className={`w-[96px] h-[96px] sm:w-[200px] sm:h-[200px] rounded-full mt-8 sm:mt-[50px] mb-6 sm:mb-[30px]`}
                             style={{boxShadow: '0 5px 12px rgba(45, 52, 54, 0.5)'}}
                        />
                        <Typography
                            className={`font-bold text-[18px] sm:text-[28px] text-zinc-900 text-center bg-zinc-200 rounded-3xl py-0.5 px-2 mb-[15px]`}
                            sx={{boxShadow: '2px 3px 8px rgba(45, 52, 54, 0.5)'}}>
                            {(userData ? toPascalCase(userData.username) : "Username") + " " + (userData ? toPascalCase(userData.lastname) : "Lastname")}
                        </Typography>
                        <Typography
                            className={`font-bold text-[18px] sm:text-[28px] text-zinc-900 text-center bg-zinc-200 rounded-3xl py-0.5 px-2 mb-[15px]`}
                            sx={{boxShadow: '2px 3px 8px rgba(45, 52, 54, 0.5)'}}>
                            {"Age: " + (age()) + " ans"}
                        </Typography>
                        <Typography
                            className={`font-bold text-[18px] sm:text-[28px] text-zinc-900 text-center bg-zinc-200 rounded-3xl py-0.5 px-2 mb-[15px]`}
                            sx={{boxShadow: '2px 3px 8px rgba(45, 52, 54, 0.5)'}}>
                            {"Date d'arrivée: " + (stringDateOfArrival())}
                        </Typography>
                        <Typography
                            className={`font-bold text-[18px] sm:text-[28px] text-zinc-900 text-center bg-zinc-200 rounded-3xl py-0.5 px-2 mb-[15px]`}
                            sx={{boxShadow: '2px 3px 8px rgba(45, 52, 54, 0.5)'}}>
                            {"Records: " + (nbRecords ? (nbRecords) : "0")}
                        </Typography>
                    </div>
                </div>
                <div
                    className={`flex flex-col justify-end items-start gap-5 w-full sm:w-[1015px] mt-6 sm:mt-0 sm:ml-5 mb-[50px]`}>
                    <div
                        className={`flex flex-row items-center justify-start flex-wrap gap-1 sm:gap-4 ml-1.5 sm:ml-2.5 h-[120px]`}>
                        <Typography
                            className={`font-bold text-2xl sm:text-[34px] text-zinc-900 bg-zinc-200 rounded-3xl sm:py-1 px-1.5 sm:px-2.5`}
                            sx={{boxShadow: '0 12px 12px rgba(45, 52, 54, 0.5)'}}>
                            Trophés: </Typography>
                        {nbTop1 > 0 && <Trophy top={1} nb={nbTop1}/>}
                        {nbTop2 > 0 && <Trophy top={2} nb={nbTop2}/>}
                        {nbTop3 > 0 && <Trophy top={3} nb={nbTop3}/>}
                    </div>
                    <div
                        className={`flex flex-row items-center justify-start flex-wrap gap-1 sm:gap-4 ml-1.5 sm:ml-2.5 h-[120px]`}>
                        <Typography
                            className={`font-bold text-2xl sm:text-[34px] text-zinc-900 bg-zinc-200 rounded-3xl sm:py-1 px-1.5 sm:px-2.5`}
                            sx={{boxShadow: '0 12px 12px rgba(45, 52, 54, 0.5)'}}>
                            Médailles: </Typography>
                        {nbArzonMedal > 0 && <Medal medal={'arzon'} nb={nbArzonMedal}/>}
                        {nbGoldMedal > 0 && <Medal medal={'gold'} nb={nbGoldMedal}/>}
                        {nbSilverMedal > 0 && <Medal medal={'silver'} nb={nbSilverMedal}/>}
                        {nbBronzeMedal > 0 && <Medal medal={'bronze'} nb={nbBronzeMedal}/>}
                    </div>
                </div>
            </div>
            <Typography
                className={`font-bold text-[46px] text-zinc-900  text-center underline py-[30px]`}>Statistiques</Typography>
            <div className={`flex flex-row flex-wrap justify-evenly items-center mb-[30px] mx-6`}>
                {bestTimes.map((bestTime) => (<StatisticsCategory bestTime={bestTime} key={bestTime.category_id}/>))}
            </div>
        </div>
    );
}

export default ProfilePage;
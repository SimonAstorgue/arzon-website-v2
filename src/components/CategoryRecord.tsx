import {Divider, Typography} from "@mui/material";

import Beer from "../assets/img/beer.avif";
import {timeToString, toPascalCase} from "../helpers/Utils.ts";
import {useEffect, useState} from "react";

interface category {
    category_id: number;
    name: string;
}

interface user {
    id: number;
    name: string;
    time: number;
    avatar: string;
}

const PodiumPlace = ({place, user}: { place: number, user: user | null }) => {

    const getPodiumColor = (place: number) => {
        switch (place) {
            case 1:
                return 'bg-amber-300';
            case 2:
                return 'bg-slate-400';
            case 3:
                return 'bg-amber-600';
            default:
                return 'bg-gray-400';
        }
    }

    const getPodiumHeight = (place: number) => {
        switch (place) {
            case 1:
                return 'pb-[70px]';
            case 2:
                return 'pb-[30px]';
            default:
                return '';
        }
    }

    const getPodiumShadowColor = (place: number) => {
        switch (place) {
            case 1:
                return '#F39C12';
            case 2:
                return '#677273';
            case 3:
                return '#D35400';
            default:
                return '';
        }
    }

    return (
        <div className={`flex flex-col items-center`}>
            <div>
                <div className={`flex flex-col items-center`}>
                    <img src={`assets/img/avatars/${user ? (user.avatar) : ("default-user.jpg")}`}
                         className={`w-[70px] h-[70px] rounded-full mt-2.5 mb-2.5 mr-0 ml-0 cursor-pointer ${user ? ('') : ('hidden')}`}
                         style={{
                             boxShadow: '2px 2px 2px rgba(45, 52, 54, 0.5)'
                         }}
                         alt=""/>
                    <Typography
                        className={`font-medium text-2xl text-zinc-900 bg-zinc-200 rounded-3xl pr-2.5 pl-2.5 text-center mt-0 mb-0 mr-auto ml-auto cursor-pointer`}
                        sx={{boxShadow: '2px 2px 2px rgba(45, 52, 54, 0.5)'}}>
                        {user ? (toPascalCase(user.name)) : ("")}
                    </Typography>
                    <Typography
                        className={`font-medium text-[22px] text-zinc-900 bg-zinc-200 rounded-3xl pr-2.5 pl-2.5 text-center mt-[1px] mb-[5px] mr-auto ml-auto cursor-pointer`}
                        sx={{boxShadow: '2px 2px 2px rgba(45, 52, 54, 0.5)'}}>
                        {user ? (timeToString(user.time)) : ("")}
                    </Typography>
                </div>
            </div>
            <div className={`flex flex-row justify-center items-center w-full`}>
                <div
                    className={`flex flex-col items-center rounded-t-2xl ${getPodiumColor(place)} ${getPodiumHeight(place)} max-w-[150px]`}
                    style={{
                        width: 'clamp(120px, 150px, 150px)',
                        boxShadow: `4px 2px 3px ${getPodiumShadowColor(place)}`,
                    }}>
                    <Typography className={`text-[50px] font-bold text-zinc-100`}
                                sx={{
                                    textShadow: '4px 2px 5px rgba(45, 52, 54, 0.5)',
                                }}>
                        {place}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

const UserRank = ({i, user}: { i: number, user: user | null }) => {
    return (
        <li className={`flex flex-row justify-between items-center mt-2.5 mb-0 mx-[15px]`}
            style={{
                alignSelf: 'normal'
            }}>
            <div className={`flex flex-row justify-start items-center gap-6`}>
                <Typography className={`font-medium text-[18px] text-zinc-900`}>{i}</Typography>
                <Typography className={`font-medium text-[18px] text-zinc-900 cursor-pointer`}>
                    {user ? (toPascalCase(user.name)) : ("")}
                </Typography>
            </div>
            <Typography className={`font-medium text-[18px] text-zinc-900`}>
                {user ? (timeToString(user.time)) : ("")}
            </Typography>
        </li>
    )
}

const CategoryRecord = ({category}: { category: category }) => {

    const [users, setUsers] = useState<user[]>([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/${category.category_id}/records`);
                const data = await response.json();
                const users = data.map((user: {
                    user_id: number,
                    username: string,
                    avatar: string,
                    best_time: number
                }) => ({
                    id: user.user_id,
                    name: user.username,
                    time: user.best_time,
                    avatar: user.avatar
                }));
                setUsers(users);
            } catch (error) {
                console.error("Erreur fetching records of this category:", error);
            }
        }
        fetchRecords().then(r => r);
    }, [category.category_id]);

    return (
        <div
            className={`flex flex-col items-center rounded-3xl w-[100vw] sm:w-[600px] mt-6 mb-6 ml-0 mr-0 sm:ml-4 sm:mr-4 h-auto`}
            style={{
                filter: 'drop-shadow(2px 0 8px rgba(45, 52, 54, 0.3))',
                backgroundImage: `url(${Beer})`,
            }}>
            <Typography
                className={`font-bold text-[28px] text-zinc-900 text-center mt-2.5 mr-auto ml-auto mb-0 bg-zinc-100 rounded-3xl pr-2.5 pl-2.5`}
                sx={{
                    boxShadow: '2px 2px 2px rgba(45, 52, 54, 0.5)'
                }}>
                Catégorie {category.name}
            </Typography>
            <Divider className={`border-zinc-900 opacity-75 w-3/4 mt-2.5 mb-2.5 mr-auto ml-auto`}
                     sx={{borderBottomWidth: 2.5}}/>
            <div className={`flex flex-row justify-evenly items-end w-full gap-5`}>
                <PodiumPlace place={2} user={users[1] ? (users[1]) : null}/>
                <PodiumPlace place={1} user={users[0] ? (users[0]) : null}/>
                <PodiumPlace place={3} user={users[2] ? (users[2]) : null}/>
            </div>
            <div
                className={`flex flex-col rounded-3xl items-center w-[103%] min-h-[50px] bg-zinc-200 pb-2.5 px-[5px]`}
                style={{
                    boxShadow: '0px 12px 12px rgba(45, 52, 54, 0.65)'
                }}>
                <div className={`flex flex-row justify-between items-center mt-2.5 mb-0 mx-[15px]`}
                     style={{
                         alignSelf: 'normal'
                     }}>
                    <div className={`flex flex-row justify-start items-center gap-6`}>
                        <Typography className={`font-medium text-[18px] text-zinc-900`}>N°</Typography>
                        <Typography className={`font-medium text-[18px] text-zinc-900`}>Nom</Typography>
                    </div>
                    <Typography className={`font-medium text-[18px] text-zinc-900`}>Temps</Typography>
                </div>
                <Divider className={`border-zinc-900 opacity-50 w-[90%] my-[5px] mx-0`}
                         sx={{borderBottomWidth: 2}}/>
                <ol className={`flex flex-col items-center w-full m-0`}>
                    {users.slice(3).map((user, i) => (
                        <UserRank key={user.id} user={user} i={i + 4}/>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default CategoryRecord;
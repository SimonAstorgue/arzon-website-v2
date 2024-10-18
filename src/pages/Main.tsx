import {Typography} from "@mui/material";
import GalleryCarousel from "../components/GalleryCarousel.tsx";

import background from "../assets/img/background.jpg"
import arzon from "../assets/img/arzon.jpg"

const VideoEmbed = () => {
    return (
        <div
            className="relative sm:top-0 w-full max-w-[80%] xl:max-w-5xl 2xl:max-w-[75%] aspect-video self-center mobile_ls:top-4 mobile_ls:h-[70%] mobile_ls:w-auto">
            <iframe
                className="w-full h-full rounded-lg shadow-2xl"
                src="https://player.vimeo.com/video/943308608?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                title="Best of ARZON2022"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            ></iframe>
        </div>
    );
};

const MainPage = () => {
    return (
        <div className="flex flex-col w-full bg-zinc-100 dark:bg-zinc-800">
            <img src={background} alt="background"
                 className="w-full h-screen object-cover object-center contrast-75"/>
            <div className="absolute inset-0 flex justify-center items-center">
                <VideoEmbed/>
            </div>
            <div className="w-full h-16 relative top-[-63px] bg-gradient-to-t from-zinc-100 dark:from-zinc-800"/>
            <div className="w-full min-h-screen flex flex-col xl:flex-row gap-12 px-5 lg:px-10">
                <img src="/assets/img/image-presentation.jpg" alt="presentation"
                     className="rounded-2xl mx-auto w-3/4 drop-shadow-xl sm:w-1/2 lg:w-2/5 xl:w-auto xl:h-[80vh]"/>
                <div className="flex flex-col gap-4 md:gap-6 xl:gap-12 xl:mx-4">
                    <Typography
                        className="mx-auto text-center text-zinc-900 dark:text-zinc-100 font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Arzon2.0
                        c’est quoi ?</Typography>
                    <Typography
                        className="mx-auto text-center text-zinc-900 dark:text-zinc-100 text-base md:text-lg lg:text-xl xl:text-2xl leading-7 lg:md:leading-8 xl:leading-9 mb-10">
                        Arzon2.0 est le site officiel des vacances à Arzon de la team.
                        Vous pouvez y retrouver la présentation générale des vacances ainsi que le classement et les
                        records
                        dans chaque catégorie de bières.
                        Un aperçu de chaque participant dans le ArzonDex ou bien dans leur page de profil respectif,
                        indiquant leurs temps, records et performances.
                        <br/>
                        Vous pouvez aussi découvrir quelques photos des vacances ou quelques vidéos.
                    </Typography>
                </div>
            </div>
            <div className="relative w-full flex flex-col justify-center">
                <img src={arzon} alt="arzon"
                     className="w-full h-[75vh] object-cover object-center absolute top-0"/>
                <GalleryCarousel/>
            </div>
        </div>
    );
}

export default MainPage;
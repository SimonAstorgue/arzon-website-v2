import {IconButton, Typography} from "@mui/material";
import {Instagram, YouTube} from "@mui/icons-material";

import Logo from "../assets/img/logo-arzon.png";

const Footer = () => {
    return (
        <div className="w-full min-h-36 bg-zinc-600 overflow-hidden flex flex-col items-center border border-zinc-500">
            <img src={Logo} alt="LOGO" className="h-24 mt-1"/>
            <Typography className="font-black text-zinc-900 text-2xl relative top-[-25px]">Arzon 2.0</Typography>
            <div className="flex flex-row gap-4 top-[-20px] relative">
                <IconButton href="https://www.youtube.com/playlist?list=PLwnKFvLHUe3IEkhVIWEnESkRiD-Ic0XnY">
                    <YouTube className="w-8 h-8 fill-zinc-400 duration-200 hover:scale-125"/>
                </IconButton>
                <IconButton href="https://www.instagram.com/arzon2.0/">
                    <Instagram className="w-8 h-8 fill-zinc-400 duration-200 hover:scale-125"/>
                </IconButton>
            </div>
        </div>
    );
}

export default Footer;
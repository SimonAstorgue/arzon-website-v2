import axios from "axios";

function timeToString(time: number) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = (time % 60).toFixed(2);
    if (hours > 0) {
        return `${hours}h ${minutes}min ${seconds}s`;
    }
    if (minutes > 0) {
        return `${minutes}min ${seconds}s`;
    }
    return `${seconds}s`
}

function toPascalCase(text: string) {
    return text.replace(/(\w)(\w*)/g, function (_, g1, g2) {
        return g1.toUpperCase() + g2.toLowerCase();
    });
}

async function checkToken(token: string) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/checkToken`, {token});
        return response.data;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export {timeToString, toPascalCase, checkToken};
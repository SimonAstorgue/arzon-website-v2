import ArzonCard from "../components/ArzonCard.jsx";
import {useEffect, useState} from "react";

const ArzondexPage = () => {

    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch('/arzon-website-v2/assets/data/arzondex.json')
            .then(response => response.json())
            .then(data => {
                const cardsWithKeys = data.map((card, index) => ({key: index + 1, ...card}));
                setCards(cardsWithKeys);
            })
            .catch(error => console.error('Error fetching the JSON data:', error));
    }, []);

    return (
        <>
            <div className="h-[100px] w-full bg-zinc-100 dark:bg-zinc-800"/>
            <div
                className="flex flex-row flex-wrap gap-10 sm:gap-16 justify-evenly items-center h-auto p-4 sm:p-16 bg-zinc-100 dark:bg-zinc-800">
                {
                    cards.map((card) => <ArzonCard key={card.key} id={card.id} types={card.types} subtype={card.subtype}
                                                   supertypes={card.supertypes}
                                                   rarity={card.rarity} img={card.img}/>)
                }
            </div>
        </>
    );
}

export default ArzondexPage;
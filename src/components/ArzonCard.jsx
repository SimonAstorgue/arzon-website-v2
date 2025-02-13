import {useRef} from 'react'
import {useSpring, animated} from '@react-spring/web'

import './ArzonCard.css'
import {adjust, clamp, round} from "../helpers/Math.js";

const ArzonCard = ({
                       id = "",
                       types = "",
                       subtype = "basic",
                       supertypes = "pokémon",
                       rarity = "base",
                       img = "",
                       mask = "",
                       foil = "",
                   }) => {

    const front_img = `/arzon-website-v2/assets/img/arzondex/${img}`;

    const randomSeed = {
        x: Math.random(),
        y: Math.random()
    }

    const cosmosPosition = {
        x: Math.floor(randomSeed.x * 734),
        y: Math.floor(randomSeed.y * 1280)
    };

    const cardRef = useRef(null)
    const config = {
        mass: 2,
        tension: 180,
        friction: 20,
        clamp: false,
        precision: 0.01,
        velocity: 0,
    }
    const leaveConfig = {
        mass: 15,
        tension: 350,
        friction: 40,
        clamp: false,
        precision: 0.01,
        velocity: 0,
    }

    const [{xys}, api] = useSpring(() => ({xys: [0, 0, 1], config}), [config])
    const [pointer, apiPointer] = useSpring(() => ({x: 50, y: 50, config}), [config])
    const [bg, apiBg] = useSpring(() => ({x: 50, y: 50, config}), [config])
    const [{opacity}, apiOpacity] = useSpring(() => ({opacity: 0}))

    const handleMouseLeave = () => {
        setTimeout(function () {
            api.start({
                xys: [0, 0, 1],
                config: leaveConfig
            })
            cardRef.current.style.setProperty('--card-scale', 1);

            apiPointer.start({x: 50, y: 50, config: leaveConfig})
            cardRef.current.style.setProperty('--pointer-x', 50 + '%');
            cardRef.current.style.setProperty('--pointer-y', 50 + '%');
            cardRef.current.style.setProperty('--pointer-from-center',
                clamp(Math.sqrt(
                    (50 - 50) * (50 - 50) +
                    (50 - 50) * (50 - 50)
                ) / 50, 0, 1));
            cardRef.current.style.setProperty('--pointer-from-top', 50 / 100);
            cardRef.current.style.setProperty('--pointer-from-left', 50 / 100);

            apiBg.start({x: 50, y: 50, config: leaveConfig})
            cardRef.current.style.setProperty('--background-x', 50 + '%');
            cardRef.current.style.setProperty('--background-y', 50 + '%');

            apiOpacity.start({opacity: 0, config: {duration: 500}})
            cardRef.current.style.setProperty('--card-opacity', 0);
        }, 500);
    }

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect()
        const w = e.currentTarget.clientWidth
        const h = e.currentTarget.clientHeight
        const b = e.currentTarget.getBoundingClientRect()
        const [X, Y, S] = calculate(e.clientX, e.clientY, rect)
        const absolute = {
            x: e.clientX - b.left, // get mouse position from left
            y: e.clientY - b.top, // get mouse position from right
        };
        const percent = {
            x: clamp(round((100 / b.width) * absolute.x)),
            y: clamp(round((100 / b.height) * absolute.y)),
        };
        const [pX, pY] = [round(percent.x), round(percent.y)];

        apiPointer.start({x: pX, y: pY, config: config})
        cardRef.current.style.setProperty('--pointer-x', pX + '%');
        cardRef.current.style.setProperty('--pointer-y', pY + '%');
        cardRef.current.style.setProperty('--pointer-from-center',
            clamp(Math.sqrt(
                (pY - 50) * (pY - 50) +
                (pX - 50) * (pX - 50)
            ) / 50, 0, 1));
        cardRef.current.style.setProperty('--pointer-from-top', pY / 100);
        cardRef.current.style.setProperty('--pointer-from-left', pX / 100);

        api.start({
            xys: [X, Y, S],
            config: config
        })
        cardRef.current.style.setProperty('--card-scale', xys.get()[2]);

        apiBg.start({
            x: adjust(percent.x, 0, 100, 37, 63),
            y: adjust(percent.y, 0, 100, 33, 67),
            config: config
        })
        cardRef.current.style.setProperty('--background-x', bg.x.get() + '%');
        cardRef.current.style.setProperty('--background-y', bg.y.get() + '%');

        apiOpacity.start({opacity: 1, config: {duration: 200}})
        cardRef.current.style.setProperty('--card-opacity', opacity.get());
    }

    return (
        <div className={`card ${types} interactive ${mask ? 'masked' : ''}`}
             id={id}
             ref={cardRef}
             data-supertype={supertypes}
             data-subtypes={subtype}
             data-rarity={rarity}
             data-trainer-gallery="false"
        >
            <animated.div
                className="h-[350px]"
                style={{
                    transform: xys.to(trans),
                    borderRadius: 'var(--card-radius)',
                    transition: 'box-shadow 0.5s',
                    willChange: 'transform',
                    '--seedx': `${randomSeed.x}`,
                    '--seedy': `${randomSeed.y}`,
                    '--cosmosbg': `${cosmosPosition.x}px ${cosmosPosition.y}px`,
                    '--mask': `url(${mask})`,
                    '--foil': `url(${foil})`,
                }}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            >
                <img
                    className={`overflow-auto h-full w-full`}
                    src={front_img}
                    alt="Front Image"
                    style={{
                        clipPath: 'inset(0 0 0 0 round var(--card-radius))',
                    }}
                />
                <animated.div
                    className={`card__glow`}
                    style={{opacity}}
                />
                <animated.div
                    className="card__shine"
                    style={{opacity, clipPath: 'inset(0 0 0 0 round var(--card-radius))'}}
                />
                <animated.div
                    className="card__glare"
                    style={{
                        opacity: opacity.to(o => o * 0.5),
                        clipPath: 'inset(0 0 0 0 round var(--card-radius))'
                    }}
                />
            </animated.div>
        </div>
    );
};

const calculate = (x, y, rect) => [
    (y - rect.top - rect.height / 2) / 12,
    -(x - rect.left - rect.width / 2) / 12,
    1.15,
]

const trans = (x, y, s) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export default ArzonCard;
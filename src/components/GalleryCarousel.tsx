import Carousel from "react-material-ui-carousel";
import {NavigateBefore, NavigateNext} from "@mui/icons-material";

const imageFolder = '/arzon-website-v2/assets/img/carousel/';
const TOTAL_IMAGES = 6;

const GalleryCarousel = () => {
    const images = Array.from({ length: TOTAL_IMAGES }, (_, index) =>
        ({id: index + 1, imageUrl:`${imageFolder}img${index + 1}.jpg`, alt:`image${index + 1}`})
    );

    return (
        <Carousel
            className="mt-[300px] sm:mt-[100px] lg:mt-[50px] pb-12"
            fullHeightHover={false}
            animation={"slide"}
            navButtonsAlwaysVisible={true}
            navButtonsProps={{className: 'h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12'}}

            NextIcon={<NavigateNext/>}
            PrevIcon={<NavigateBefore/>}

            indicators={false}
        >
            {
                images.map((item) => <ImageGallery key={item.id} item={item}/>)
            }
        </Carousel>
    );
}

interface ImageGalleryParams {
    item: {
        id: number;
        imageUrl: string;
        alt: string;
    };
}

function ImageGallery(props: ImageGalleryParams) {
    return (
        <img src={props.item.imageUrl} alt={props.item.alt}
             className="rounded-xl m-auto w-auto h-[35vh] sm:h-[65vh] lg:h-[77vh] object-contain object-center drop-shadow-[5px_5px_5px_rgba(0,0,0,0.45)]"/>
    )
}

export default GalleryCarousel;
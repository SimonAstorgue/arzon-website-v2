import {styled} from "@mui/material";

const AddButton = ({className = "", onClick}: { className: string, onClick: () => void }) => {
    return (
        <StyledWrapper className={`${className}`}>
            <button
                className={`add-button hover:bg-green-500`} onClick={onClick}>
                <svg className={`add-svgIcon`}
                     fill="none" height="1000" stroke="currentColor" strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2" viewBox="0 0 24 24" width="1000" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" x2="12" y1="5" y2="19"></line>
                    <line x1="5" x2="19" y1="12" y2="12"></line>
                </svg>
            </button>
        </StyledWrapper>
    )
}

const StyledWrapper = styled('div')`
    .add-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #2D3436;
        border: none;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
        cursor: pointer;
        transition-duration: 0.3s;
        overflow: hidden;
        position: relative;
    }

    .add-svgIcon {
        width: 25px;
        transition-duration: 0.3s;
        color: white;
    }

    .add-svgIcon path {
        color: white;
    }

    .add-button:hover {
        width: 90px;
        border-radius: 50px;
        transition-duration: 0.3s;
        align-items: center;
    }

    .add-button:hover .add-svgIcon {
        transition-duration: 0.3s;
        transform: translateY(60%);
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }

    .add-button::before {
        display: none;
        content: "Add";
        color: white;
        transition-duration: 0.3s;
        font-size: 2px;
    }

    .add-button:hover::before {
        display: block;
        padding-right: 10px;
        font-size: 13px;
        opacity: 1;
        transform: translateY(0px);
        transition-duration: 0.3s;
    }
`


export default AddButton;
import { keyframes, styled } from "@mui/material/styles";
import Typist from "react-typist-component";

const Cursor = styled("div")(({ theme }) => {
    const blink = keyframes`
        0% { opacity: 0; }
        50% { opacity: 0; }
        51% { opacity: 1; }
        100% { opacity: 1;}
    `;
    return ({
        animation: `${blink} 1s infinite`,
    });
});

export default function TypingAnimation() {
    return (
        <>
            <Typist loop typingDelay={50} cursor={<Cursor>|</Cursor>}>
                this is a typo.
                <br />
                <Typist.Delay ms={3000} />
                <Typist.Backspace count={6} />
                react component.
                <Typist.Delay ms={3000} />
                <Typist.Backspace count={27} />
            </Typist>
        </>
    );
}
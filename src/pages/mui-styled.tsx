import { Box, keyframes, styled } from "@mui/material";

const OrangeBox = styled(Box)(({ theme }) => {
    const rotateCircle = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;
    return ({
        position: "relative",
        height: 100,
        width: 100,
        borderRadius: "50%",
        // overflow:"hidden",
        border: "solid",
        // backgroundColor: "orange",
        "&:before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 1,
            height: "50%",
            transformOrigin: "top right",
            backgroundColor: "orange",
            animation: rotateCircle + " 2s linear infinite",
        }
    });
});
const CircleBox = styled(Box)(({ theme }) => ({
    height: 200,
    width: 200,
    borderRadius: "50%",
    border: "solid",
    borderColor: theme.palette.common.black,
    borderWidth: 0.5,
    transitionDuration: "1s",
}));

export default function MuiStyled() {
    return (
        <>
            <CircleBox />
            <OrangeBox />
        </>
    )
}

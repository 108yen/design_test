import { Box } from "@mui/material";
import MuiStyled from "./mui-styled";
import TypingAnimation from "./typing-animatino";
import SpringAnimation from "./react-spring-animation";

export default function Home() {
  return (
    <>
      <Box
        display="flex"
        width="100%"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        border="solid"
        sx={{ transitionDuration: "1s" }}
      >
        {/* <MuiStyled /> */}
        {/* <TypingAnimation /> */}
        <SpringAnimation/>
      </Box>
    </>
  )
}

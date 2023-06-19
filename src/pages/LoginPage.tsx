// import { Box, Flex } from "@chakra-ui/react";
// import NavBar from "../components/NavBar";
import { Box } from "@mui/material";
import { LoginForm } from "../components/LoginForm";
// import ColorModeSwitch from "../components/ColorModeSwitch";

const LoginPage = () => {
  return (
    <>
      {/* <NavBar /> */}
      {/* <Flex
        // minHeight="100vh"
        // marginY={100}
        width="full"
        height="100vh"
        align="center"
        justifyContent="center"
        position="relative"
      >
        <Box
          borderWidth={1}
          padding={4}
          width="full"
          maxWidth="500px"
          borderRadius={4}
          textAlign="center"
          boxShadow="lg"
        >
          <Box textAlign="right" py={2}>
            <ColorModeSwitch />
          </Box>
          <LoginForm />
        </Box>
      </Flex> */}
      <Box
        display="flex"
        height="98vh"
        width="full"
        alignItems="center"
        justifyContent="center"
      >
        <LoginForm />
      </Box>
    </>
  );
};

export default LoginPage;

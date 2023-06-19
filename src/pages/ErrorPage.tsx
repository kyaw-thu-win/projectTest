import { Box } from "@mui/material";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
// import NavBar from "../components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      {/* <NavBar /> */}
      <Box padding={5}>
        <h1>Oops</h1>
        <h4>
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "An unexpected Error occured."}
        </h4>
      </Box>
    </>
  );
};
export default ErrorPage;

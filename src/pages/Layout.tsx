import { Box } from "@mui/material";
import SideNav from "../components/Layout/Sidenav";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <SideNav />
        {/* <div className="bgcolor"> */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            minHeight: "100vh",
            background:
              "linear-gradient(158deg, rgb(224,224,224) 0%, rgb(233,237,254) 100%)",
          }}
        >
          <Box height={60} />
          <Outlet />
        </Box>
        {/* </div> */}
      </Box>
    </>
  );
}

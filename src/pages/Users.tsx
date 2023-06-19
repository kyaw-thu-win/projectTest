import { Grid } from "@mui/material";
import UserLists from "../components/UserLists";

const Users = () => {
  return (
    <div>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
      <Grid container>
        {/* <Grid item xs={12} sm={6}> */}
        <UserLists />
      </Grid>
      {/* <Grid item xs={12} sm={6}>
            <Box bgcolor="primary.light" p={2}>
              <Outlet />
            </Box>
          </Grid> */}
      {/* </Grid> */}
      {/* </Box> */}
    </div>
  );
};
export default Users;

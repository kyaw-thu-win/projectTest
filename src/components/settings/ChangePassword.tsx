import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const ChangePassword = () => {
  return (
    <Grid item xs={6} minWidth={350} alignSelf="center">
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "10px" }}
          >
            Change Your Password
          </Typography>
          <Divider />
          <Stack direction="column" spacing={4}>
            <TextField
              disabled
              id="outlined-disabled2"
              label="Email"
              defaultValue="admin@gmail.com"
              sx={{ minWidth: "48%" }} // fullWidth
              margin="dense"
            />
            <TextField
              //   disabled
              id="outlined-disabled2"
              label="Old Password"
              required
              defaultValue="Old Password"
              sx={{ minWidth: "48%" }} // fullWidth
              margin="dense"
              placeholder="Enter Your Old Password"
            />

            <Stack direction="row" spacing={2}>
              <TextField
                //   disabled
                id="outlined-disabled2"
                label="New Password"
                defaultValue="New Password"
                sx={{ minWidth: "49%" }} // fullWidth
                // margin="dense"
              />
              <TextField
                //   disabled
                id="outlined-disabled2"
                label="Confirm Password"
                required
                defaultValue="Confirm Password"
                sx={{ minWidth: "49%" }} // fullWidth
                // margin="dense"
                placeholder="Enter Your Old Password"
              />
            </Stack>

            <Grid item xs={6}>
              <Typography variant="h5" align="center">
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  // onClick={createUser}
                >
                  Submit
                </Button>
              </Typography>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

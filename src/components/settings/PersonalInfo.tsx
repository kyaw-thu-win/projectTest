import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const PersonalInfo = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} minWidth={350}>
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ padding: "10px" }}
            >
              Login User Name
            </Typography>
            <Divider />
            <Box height={20} />
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <Stack direction="row">
                <TextField
                  // disabled
                  id="outlined-disabled"
                  label="Name"
                  defaultValue="User Name"
                  sx={{ minWidth: "45%" }} // fullWidth
                  margin="dense"
                />
                <TextField
                  // disabled
                  id="outlined-disabled"
                  label="Location"
                  defaultValue="Nay pyi taw"
                  sx={{ minWidth: "45%" }} // fullWidth
                  margin="dense"
                />
              </Stack>
              <TextField
                // disabled
                id="outlined-disabled"
                //   label="Location"
                defaultValue="Bio"
                sx={{ minWidth: "100%" }} // fullWidth
                multiline
                rows={4}
                margin="dense"
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={userType}
                sx={{ width: 300 }}
                // getOptionLabel={(option) => option.label}
                defaultValue={userType[0]}
                renderInput={(params) => (
                  <TextField {...params} label="Super Admin" />
                )}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6} minWidth={350}>
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ padding: "10px" }}
            >
              Contact Information
            </Typography>
            <Divider />
            <Box height={20} />
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <Stack direction="row">
                <TextField
                  // disabled
                  id="outlined-disabled2"
                  label="Contact Phone"
                  defaultValue="919999999"
                  sx={{ minWidth: "48%" }} // fullWidth
                  margin="dense"
                />
                <TextField
                  // disabled
                  id="outlined-disabled"
                  label="Email"
                  defaultValue="admin@gmail.com"
                  sx={{ minWidth: "48%" }} // fullWidth
                  margin="dense"
                />
              </Stack>
              <TextField
                // disabled
                id="outlined-disabled"
                label="Profile URL"
                defaultValue="https://testing.com"
                sx={{ minWidth: "100%" }} // fullWidth
                margin="dense"
              />

              <TextField
                // disabled
                id="outlined-disabled"
                //   label="Location"
                defaultValue="Address"
                sx={{ minWidth: "100%" }} // fullWidth
                multiline
                rows={4}
                margin="dense"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const userType = [
  { label: "Super Admin", value: 1000 },
  { label: "Management", value: 900 },
];

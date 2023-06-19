import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

export const Profile = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4} minWidth={350}>
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
            <List>
              <ListItem>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary="admin@gmail.com" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <PhoneAndroidIcon />
                </ListItemIcon>
                <ListItemText primary="+(95) 9999 9999" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="address or something" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={8}>
        {/* <Card sx={{ maxWidth: 345 }}> */}
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              About me
            </Typography>
            <Divider />
            <Box height={20} />
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
            <Box height={50} />
            <Typography gutterBottom variant="h5" component="div">
              Details
            </Typography>
            <Box height={20} />
            <Divider />
            <Stack direction="row" alignItems="center" sx={{ marginY: "20px" }}>
              <Typography variant="body1" sx={{ width: "150px" }}>
                Full Name
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aung Aung
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" alignItems="center" sx={{ marginY: "20px" }}>
              <Typography variant="body1" sx={{ width: "150px" }}>
                Father's Name
              </Typography>
              <Typography variant="body2" color="text.secondary">
                U Mung Win
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" alignItems="center" sx={{ marginY: "20px" }}>
              <Typography variant="body1" sx={{ width: "150px" }}>
                Address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hlaing Tharyar, Yangon
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" alignItems="center" sx={{ marginY: "20px" }}>
              <Typography variant="body1" sx={{ width: "150px" }}>
                Zip Code
              </Typography>
              <Typography variant="body2" color="text.secondary">
                9859857
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

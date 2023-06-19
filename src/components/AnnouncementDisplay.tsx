import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const AnnouncementDisplay = ({ closeEvent, data }: any) => {
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Announcement Display
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid item xs={12} container>
        <Stack direction="column">
          <Stack direction="row" spacing={2}>
            <Typography variant="subtitle1" align="left" color="red">
              Subject Title
            </Typography>
            <Typography variant="subtitle1">-</Typography>
            <Typography variant="subtitle1">{data.title}</Typography>
          </Stack>
          <Divider />
          <Typography variant="subtitle1" align="center" color="red">
            Description
          </Typography>
          <Divider />
          <Typography variant="body2" align="justify">
            {data.description}
          </Typography>
        </Stack>
      </Grid>
    </>
  );
};

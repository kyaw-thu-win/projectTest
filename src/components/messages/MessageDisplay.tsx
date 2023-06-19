import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const MessageDisplay = ({ closeEvent, data, messageType }: any) => {
  let receiver = "";
  if (messageType === "sendbox")
    receiver = data.receiverId
      .map((receiver: any) => receiver.email)
      .join(", ");
  // .replace(/\n/g, "<br />");
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Message Display
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
          <Stack direction="row" spacing={2}>
            {messageType === "sendbox" ? (
              <>
                <Typography variant="subtitle1" align="left" color="red">
                  Receiver
                </Typography>
                <Typography variant="subtitle1">-</Typography>
                <Typography> {receiver}</Typography>
              </>
            ) : (
              <>
                <Typography variant="subtitle1" align="left" color="red">
                  Sender
                </Typography>
                <Typography variant="subtitle1">-</Typography>
                <Typography> {data.senderId[0].email}</Typography>
              </>
            )}
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

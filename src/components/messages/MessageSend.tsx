import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import useAppStore from "../../appStore";
import useQueryStore from "../../hooks/queryStore";
import { useMessageSend } from "../../hooks/useMessages";
import AutocompleteCombo from "./UserListCombo";

type FormValues = {
  title: string;
  description: string;
  senderId: string;
  receiverId: any;
};

export const MessageSend = ({ closeEvent }: any) => {
  const { mutate } = useMessageSend();

  const receiverList = useQueryStore((s) => s.receiverList);
  const senderId = useAppStore((s: any) => s.userId);

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    data.receiverId = receiverList;
    data.senderId = senderId;
    mutate(data, {
      onSuccess: () => {
        closeEvent();
      },
    });
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Sending Message
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AutocompleteCombo />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Subject Title"
              placeholder="Enter Subject Title"
              variant="outlined"
              size="small"
              type="name"
              sx={{ minWidth: "100%" }} // fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
              required
              margin="dense"
              {...register("title", {
                required: "Subject Title is required",
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="About Description"
              placeholder="Enter Description"
              variant="outlined"
              size="small"
              type="text"
              sx={{ minWidth: "100%" }} // fullWidth
              error={!!errors.description}
              helperText={errors.description?.message}
              required
              multiline
              rows={7}
              margin="dense"
              {...register("description", {
                required: "Description is required",
              })}
            />
          </Grid>
          <Grid item xs={12}>
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
        </Grid>
      </form>
      <Box sx={{ m: 4 }} />
    </>
  );
};

{
  /* <Grid item xs={6}>
<TextField
  id="asdf-basic"
  label="Price"
  variant="outlined"
  type="number"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <CurrencyBitcoin />
      </InputAdornment>
    ),
  }}
  size="small"
  sx={{ minWidth: "100%" }}
/>
</Grid>
<Grid item xs={6}>
<TextField
  id="outlined-ewf"
  select
  label="Select"
  variant="outlined"
  size="small"
  sx={{ minWidth: "100%" }}
>
  {currencies.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ))}
</TextField>
</Grid> */
}

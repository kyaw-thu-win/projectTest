import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";

import moment from "moment";
import { useForm } from "react-hook-form";
import { useAnimalHistorysEdit } from "../hooks/useAnimalHistory";

type FormValues = {
  record: string;
  recordDate: any;
  returnDate: string;
  reason: string;
  cost: any;
  animalId: string;
};

export const AnimalHistoryEdit = ({ closeEvent, data: editdata }: any) => {
  const { mutate } = useAnimalHistorysEdit();

  const form = useForm<FormValues>({
    defaultValues: {
      record: editdata.record,
      recordDate: moment(editdata.recordDate).format("YYYY-MM-DDTkk:mm"),
      returnDate: moment(editdata.returnDate).format("YYYY-MM-DDTkk:mm"),
      reason: editdata.reason,
      cost: editdata.cost,
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (dataImage: FormValues) => {
    let data = {
      _id: editdata._id,
      data: dataImage,
    };
    mutate(data, {
      onSuccess: () => {
        Swal.fire("Submitted!", "Your file has been submitted.", "success");
        closeEvent();
      },
    });
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Add New Animal
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
            <Stack direction="row">
              <Typography>Record Date - </Typography>
              <input
                {...register("recordDate")}
                placeholder="Select Date and Time"
                // size="md"
                type="datetime-local"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="History Record"
              placeholder="Enter the History Record"
              variant="outlined"
              size="small"
              type="text"
              multiline
              rows={3}
              sx={{ minWidth: "100%" }} // fullWidth
              error={!!errors.record}
              helperText={errors.record?.message}
              required
              margin="dense"
              {...register("record", {
                required: "History Record is required",
              })}
            />
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row">
              <Typography>Return Date - </Typography>
              <input
                {...register("returnDate")}
                placeholder="Select Date and Time"
                // size="md"
                type="datetime-local"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Return Reason"
              placeholder="Enter the Return Reason"
              variant="outlined"
              size="small"
              type="text"
              multiline
              rows={3}
              sx={{ minWidth: "100%" }} // fullWidth
              error={!!errors.reason}
              helperText={errors.reason?.message}
              required
              margin="dense"
              {...register("reason", {
                required: "Return Reason is required",
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Cost"
              placeholder="Enter Cost Amount"
              variant="outlined"
              size="small"
              type="number"
              sx={{ minWidth: "100%" }} // fullWidth
              error={!!errors.cost}
              // helperText={errors.cost?.message}
              required
              margin="dense"
              {...register("cost", {
                required: "Cost Amount is required",
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

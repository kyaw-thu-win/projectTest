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
import { useAnnouncementsAdd } from "../hooks/useAnnouncement";
import useAppStore from "../appStore";

type FormValues = {
  creatorId: string;
  title: string;
  description: string;
  endDate: any;
  roles: string[];
};

export const AnnouncementAdd = ({ closeEvent }: any) => {
  const { mutate } = useAnnouncementsAdd();

  const userId = useAppStore((s: any) => s.userId);
  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      endDate: moment(new Date()).format("YYYY-MM-DDTkk:mm"),
      roles: ["Admin", "", "", ""],
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (dataImage: FormValues) => {
    dataImage.roles = dataImage.roles.filter((str) => str !== "");
    dataImage.creatorId = userId;
    mutate(dataImage, {
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
        Create Announcement
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
            <TextField
              label="Subject Title"
              placeholder="Enter Subject Title"
              variant="outlined"
              size="small"
              type="text"
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
              label="Description"
              placeholder="Enter About Description"
              multiline
              rows={3}
              variant="outlined"
              size="small"
              type="text"
              sx={{ minWidth: "100%" }} // fullWidth
              error={!!errors.description}
              helperText={errors.description?.message}
              required
              margin="dense"
              {...register("description", {
                required: "Description is required",
              })}
            />
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row">
              <Typography>End Date - </Typography>
              <input
                {...register("endDate")}
                placeholder="Select Date and Time"
                type="datetime-local"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center">
              <input {...register("roles.0")} value={"Admin"} type="checkbox" />
              <Typography>Admin</Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <input
                {...register("roles.1")}
                value={"Management"}
                type="checkbox"
              />
              <Typography>Management</Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <input {...register("roles.2")} type="checkbox" value={"User"} />
              <Typography>User</Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <input
                {...register("roles.3")}
                type="checkbox"
                value={"Customer"}
              />
              <Typography>Customer</Typography>
            </Stack>
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

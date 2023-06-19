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
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import { imgEndPoint } from "../statusVariables";
import moment from "moment";
import { useUsersEdit } from "../hooks/useUser";

type FormValues = {
  _id: string;
  name: string;
  email: string;
  password: string;
  imageFile: any;
  creationDate: any;
  imgUrl: string;
  isActive: boolean;
  roles: string[];
};

export const UserEdit = ({ closeEvent, data: editdata }: any) => {
  const { mutate } = useUsersEdit();
  const [previewImgURL, setPreviewImgURL] = useState(
    `${imgEndPoint}No_Image_Available.jpg`
  );
  const form = useForm<FormValues>({
    defaultValues: {
      name: editdata.name,
      email: editdata.email,
      //   password: "",
      creationDate: moment(editdata.creationDate).format("YYYY-MM-DDTkk:mm"),
      isActive: editdata.isActive,
      roles: [
        editdata.roles && editdata.roles[0] === "Admin"
          ? editdata.roles[0]
          : editdata.roles && editdata.roles[1] === "Admin"
          ? editdata.roles[1]
          : editdata.roles && editdata.roles[2] === "Admin"
          ? editdata.roles[2]
          : "",
        editdata.roles && editdata.roles[0] === "Management"
          ? editdata.roles[0]
          : editdata.roles && editdata.roles[1] === "Management"
          ? editdata.roles[1]
          : editdata.roles && editdata.roles[2] === "Management"
          ? editdata.roles[2]
          : "",
        editdata.roles && editdata.roles[0] === "User"
          ? editdata.roles[0]
          : editdata.roles && editdata.roles[1] === "User"
          ? editdata.roles[1]
          : editdata.roles && editdata.roles[2] === "User"
          ? editdata.roles[2]
          : "",
      ],
    },
  });
  const { register, handleSubmit, formState, watch } = form;
  const ImgFile: any = watch("imageFile");
  const { errors } = formState;

  useEffect(() => {
    if (ImgFile && ImgFile.length !== 0) {
      setPreviewImgURL(URL.createObjectURL(ImgFile[0]));
    }
  }, [ImgFile]);

  const onSubmit = async (dataImage: FormValues) => {
    dataImage.imageFile = dataImage.imageFile[0];
    // const noEmptyStrings = arr.filter((str) => str !== '');
    dataImage.roles = dataImage.roles.filter(Boolean);

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
        Add New User
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
          <Grid item xs={12} container justifyContent="center">
            <input
              accept="image/*"
              // className={classes.input}
              style={{ display: "none" }}
              {...register("imageFile")}
              id="raised-button-file"
              multiple
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Box>
                <img
                  // src={"../src/assets/react.svg"}
                  src={previewImgURL}
                  alt="Profile Image"
                  width="100px"
                  height="100px"
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </label>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              placeholder="Enter Your name"
              variant="outlined"
              size="small"
              type="name"
              sx={{ minWidth: "100%" }} // fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              required
              margin="dense"
              {...register("name", {
                required: "Name is required",
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              placeholder="Enter Your Email Address"
              variant="outlined"
              size="small"
              type="text"
              sx={{ minWidth: "100%" }} // fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              required
              margin="dense"
              {...register("email", {
                required: "Email is required",
              })}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              label="Password"
              placeholder="Enter Your Password"
              variant="outlined"
              size="small"
              type="password"
              sx={{ minWidth: "100%" }} // fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              required
              margin="dense"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </Grid> */}
          <Grid item xs={12}>
            <input
              {...register("creationDate")}
              placeholder="Select Date and Time"
              // size="md"
              type="datetime-local"
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center">
              <input
                {...register("isActive")}
                type="checkbox"
                // colorScheme="purple"
              />
              <Typography> Activate User</Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <input
                {...register("roles.0")}
                value={"Admin"}
                type="checkbox"
                // colorScheme="purple"
              />
              <Typography>Admin</Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <input
                {...register("roles.1")}
                value={"Management"}
                type="checkbox"
                // colorScheme="purple"
              />
              <Typography>Management</Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <input
                {...register("roles.2")}
                type="checkbox"
                value={"User"}

                // colorScheme="purple"
              />
              <Typography>User</Typography>
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

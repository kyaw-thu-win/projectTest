import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import moment from "moment";
import { useForm } from "react-hook-form";
import { useAnimalsAdd } from "../hooks/useAnimals";
import { imgEndPoint } from "../statusVariables";

type FormValues = {
  name: string;
  age: number;
  color: string;
  imageFile: any;
  dob: any;
  imgUrl: string;
  ownerId: string;
};

export const AnimalAdd = ({ closeEvent, ownerId }: any) => {
  const { mutate } = useAnimalsAdd(ownerId);
  const [previewImgURL, setPreviewImgURL] = useState(
    `${imgEndPoint}No_Image_Available.jpg`
  );
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      age: 0,
      color: "",
      dob: moment(new Date()).format("YYYY-MM-DDTkk:mm"),
      // imgUrl: previewImgURL,
      // roles: {
      //   Admin: 0,
      //   User: 0,
      //   Management: 0,
      // },
      // roles2: ["", "", ""],
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
    dataImage.ownerId = ownerId;
    dataImage.imageFile = dataImage.imageFile[0];
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
              label="Animal Name"
              placeholder="Enter the Animal name"
              variant="outlined"
              size="small"
              type="name"
              sx={{ minWidth: "100%" }} // fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              required
              margin="dense"
              {...register("name", {
                required: "Animal name is required",
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Animal Age"
              placeholder="Enter the Animal Age"
              variant="outlined"
              size="small"
              type="number"
              sx={{ minWidth: "100%" }} // fullWidth
              error={!!errors.age}
              helperText={errors.age?.message}
              required
              margin="dense"
              {...register("age", {
                required: "Animal Age is required",
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Animal Color"
              placeholder="Enter Animal Color"
              variant="outlined"
              size="small"
              type="text"
              sx={{ minWidth: "100%" }} // fullWidth
              error={!!errors.color}
              helperText={errors.color?.message}
              required
              margin="dense"
              {...register("color", {
                required: "Animal Color is required",
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              {...register("dob")}
              placeholder="Select Date and Time"
              // size="md"
              type="datetime-local"
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

import {
  TextField,
  Button,
  Stack,
  Box,
  Grid,
  Paper,
  Avatar,
  FormControlLabel,
  Typography,
  Link,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CheckBox } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAppStore from "../appStore";

type FormValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const { mutate } = useAuth();

  const logIn = useAppStore((s: any) => s.logIn);

  // storage.removeItem('persist:root')

  const onSubmit = (data: FormValues) => {
    mutate(data, {
      onSuccess: (data) => {
        logIn(data);
        navigate("/");
      },
      onError: () => {},
    });
  };

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: 360,
    margin: "20px auto",
  };
  const avatarStyle = {
    backgroundColor: "#1bbd7e",
  };
  const btnStyle = {
    margin: "8px 0",
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        {/* {token} */}
        <Box display="flex" width="full" justifyContent="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
        </Box>
        <Box display="flex" width="full" justifyContent="center">
          <h2>Sing In</h2>
        </Box>
        <form
          noValidate
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
          })}
        >
          <Stack spacing={2}>
            <TextField
              label="Email"
              placeholder="Enter user name"
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Password"
              type="password"
              placeholder="Enter user password"
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              required
              margin="dense"
            />
            <FormControlLabel
              control={<CheckBox name="checkedB" color="primary" />}
              label="Remember me"
              sx={{ marginY: "10px" }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={btnStyle}
            >
              Login
            </Button>
          </Stack>
        </form>
        <Typography sx={{ marginY: "5px" }}>
          <Link href="#" onClick={() => {}}>
            Forgot password ?
          </Link>
        </Typography>
        <Typography>
          Do you have an account ?
          <Link href="#" onClick={() => {}}>
            Sign up ?
          </Link>
        </Typography>
        <Typography>AAA</Typography>
      </Paper>
      <DevTool control={control} />
    </Grid>
  );
};

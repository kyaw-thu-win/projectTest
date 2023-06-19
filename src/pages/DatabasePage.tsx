import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import APIClient from "../services/api-client";
import { useDatabasePost } from "../hooks/useDatabase";
import { imgEndPoint } from "../statusVariables";
import useAppStore from "../appStore";

type FormValues = {
  dbFile: any;
};

export const DatabasePage = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/dbBackUpRestore", token);
  const { mutate } = useDatabasePost();
  const form = useForm<FormValues>({ defaultValues: { dbFile: "" } });
  const { register, handleSubmit } = form;

  const handleBackUp = async () => {
    const data = await apiClient.getDB();
    const url = imgEndPoint + "/" + data;
    const link = document.createElement("a");
    link.href = url;
    link.click();
  };

  const onSubmit = async (dbFileSubmit: FormValues) => {
    mutate(dbFileSubmit, {
      onSuccess: () => {},
    });
  };

  return (
    <>
      <Paper>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid item xs={6} minWidth={350}>
            <Card>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ padding: "10px" }}
                >
                  Database Setting - BACKUP / RESTORE
                </Typography>
                <Box height="30px" />
                <Divider />
                <Box height="20px" />

                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ padding: "10px" }}
                >
                  Do you want to backup your database manually ?
                </Typography>
                <Button variant="contained" onClick={handleBackUp}>
                  Back UP
                </Button>
                <Box height="40px" />
                <Divider />
                <Box height="20px" />

                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ padding: "10px" }}
                >
                  Do you want to Restore your database manually?
                </Typography>

                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  sx={{ padding: "10px" }}
                >
                  Please choose Your Database File and Click Submit Button
                </Typography>
                <form
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    onSubmit(data);
                  })}
                >
                  <Stack direction="row" spacing={3}>
                    <Button variant="contained" component="label">
                      Choose Your Database
                      <input type="file" hidden {...register("dbFile")} />
                    </Button>

                    <Typography variant="h5" align="center">
                      <Button variant="contained" type="submit" fullWidth>
                        Submit
                      </Button>
                    </Typography>
                  </Stack>
                </form>
                <Box height="20px" />
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

// e.preventDefault();
// Axios({
//   url: "http://localhost:7000/api/dbBackUpRestore",
//   method: "GET",
//   responseType: "blob",
// })
//   .then((res: any) => {
//     FileDownload(res.data, "something.gzip");

//     // const url = window.URL.createObjectURL(new Blob([res.data]));
//     // const link = document.createElement("a");
//     // link.href = url;
//     // link.setAttribute("download", "fileName.gzip");
//     // document.body.appendChild(link);
//     // link.click();
//   })
//   .catch((error) => {
//   });

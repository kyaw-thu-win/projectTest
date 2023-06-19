import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import AnimalListsByOwner from "../components/AnimalListsByOwner";
import useUser from "../hooks/useUser";

export const CustomerDetailsPage = () => {
  const { id: customerId } = useParams();
  if (!customerId) return null;
  const { data } = useUser(customerId);
  if (!data) return;
  return (
    <Paper>
      <Grid container spacing={2} style={{ height: "90vh" }}>
        <Grid item xs={12} minWidth={350}>
          {/* <Card> */}
          {/* <CardContent> */}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "10px" }}
          >
            Customer Name - {data.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "10px" }}
          >
            Customer Email - {data.email}
          </Typography>
          {/* </CardContent> */}
          {/* </Card> */}
          <Divider />
          <div style={{ padding: "20px" }}>
            <AnimalListsByOwner ownerId={customerId} />
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import AnimalHistoryListByAnimal from "../components/AnimalHistoryListByAnimal";
import useAnimal from "../hooks/useAnimals";

export const AnimalDetailsPage = () => {
  const { id: animalId } = useParams();
  if (!animalId) return null;
  const { data } = useAnimal(animalId);
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
            Animal Name - {data.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "10px" }}
          >
            Animal age - {data.age}
          </Typography>
          {/* </CardContent> */}
          {/* </Card> */}
          <Divider />
          <div style={{ padding: "20px" }}>
            <AnimalHistoryListByAnimal animalId={animalId} />
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

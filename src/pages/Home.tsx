import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CountUp from "react-countup";
// import BarChart from "../charts/BarChart";
// import AccordionDash from "../components/AccordionDash";
import "./Dash.css";
import useTotal from "../hooks/useTotal";
import AccordionDash from "../components/AccordionDash";
import PersonIcon from "@mui/icons-material/Person";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PetsIcon from "@mui/icons-material/Pets";
import AnimalHistoryList from "../components/AnimalHistoryList";

export const Home = () => {
  const { data } = useTotal();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Stack spacing={2} direction="row" justifyContent="space-between">
            <Card
              sx={{
                minWidth: 32 + "%",
                height: 150,
              }}
              className="gradient"
            >
              <CardContent>
                <Stack direction="column" alignItems="center">
                  <div className="iconstyle">
                    <PersonIcon />
                  </div>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ color: "#ffffff" }}
                  >
                    <CountUp
                      delay={0.2}
                      end={data ? data.userCount : 0}
                      duration={0.3}
                    />
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    sx={{ color: "#ccd1d1" }}
                  >
                    Total User List
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            <Card
              sx={{ minWidth: 32 + "%", height: 150 }}
              className="gradientlight"
            >
              <CardContent>
                <Stack direction="column" alignItems="center">
                  <div className="iconstyle">
                    <PetsIcon />
                  </div>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ color: "#ffffff" }}
                  >
                    <CountUp
                      delay={0.2}
                      end={data ? data.animalCount : 0}
                      duration={0.3}
                    />
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    sx={{ color: "#ccd1d1" }}
                  >
                    Total Animals
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 32 + "%", height: 150 }} className="gradient">
              <CardContent>
                <Stack direction="column" alignItems="center">
                  <div className="iconstyle">
                    <SupportAgentIcon />
                  </div>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ color: "#ffffff" }}
                  >
                    <CountUp
                      delay={0.2}
                      end={data ? data.customerCount : 0}
                      duration={0.3}
                    />
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    sx={{ color: "#ccd1d1" }}
                  >
                    Total Customer List
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2} direction="column">
            <Card className="gradientlight">
              <Stack spacing={2} direction="row">
                <div className="iconstyleblack">
                  <AddShoppingCartIcon />
                </div>
                <div className="paddingAll">
                  <span className="pricetitle">$230K</span>
                  <br />
                  <span className="pricesubtitle">Total Income</span>
                </div>
              </Stack>
            </Card>
            <Card>
              <Stack spacing={2} direction="row">
                <div className="iconstyleblack">
                  <AddShoppingCartIcon />
                </div>
                <div className="paddingAll">
                  <span className="pricetitle">$230K</span>
                  <br />
                  <span className="pricesubtitle">Total Income</span>
                </div>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card sx={{ height: 70 + "vh" }}>
            {/* <CardContent><BarChart /></CardContent> */}
            <CardContent>
              <AnimalHistoryList />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ height: 70 + "vh" }}>
            <CardContent>
              <div className="paddingAll">
                <span className="pricetitle">Open - Close Time</span>
              </div>
              <AccordionDash />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

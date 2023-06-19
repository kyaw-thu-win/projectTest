import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

export const About = () => {
  return (
    <>
      <Paper>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "90vh" }}
        >
          <Box height="30px" />
          <Typography gutterBottom variant="h4" component="div">
            ABOUT US
          </Typography>
          <Box width="250px">
            <Divider />
          </Box>
          <Box height="30px" />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ paddingX: "200px" }}
          >
            “When I tell you that I love you, it’s because I truly do. When I
            tell you I can’t live without you it’s because my world is full of
            darkness without the galaxies of your love to supply beautiful light
            to it. If I told you I couldn’t eat nor drink without you at the
            table with me. I am lost without you, thank you for being my
            shepherd.”
          </Typography>
          <Box height="30px" />
          <Divider />
          <Box height="30px" />
          <Typography gutterBottom variant="h4" component="div">
            WHO WE ARE ?
          </Typography>
          <Box width="250px">
            <Divider />
          </Box>
          <Box height="30px" />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ paddingX: "200px" }}
          >
            “Your voice is the only echo in my heart. Nothing is as unpleasant
            as not seeing you for a day. I’ll rather be locked up with you than
            be free as a bird. If you saw me running, I’ll only be running to
            you, and if you saw me standing, I’ll only be waiting for you. I may
            not be able to give you the world, but I’ll serve you the type of
            love that can’t be dished in the finest restaurant. I love you
            better than riches and wealth, I’ll stay through better than a
            friend. You’re my only one.”
          </Typography>

          <Box height="30px" />
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ paddingX: "300px" }}
          >
            “At dinner, my favorite appetizer is you, looking into your eyes
            alone prepares me for the main course, and my favorite dessert is
            your kisses because they seal the wonderful dinner night. Having you
            in my heart rules my world and paints it red like wine. I love you
            too much to risk your heart. You’re my ruby, emerald, and fire opal,
            you simply represent all the rare gems in the world. I love you.”
          </Typography>
        </Grid>
      </Paper>

      {/* <Box
          width="100%"
          height="50px"
          bgcolor="red"
          alignContent="center"
          alignItems="center"
          justifyContent="center"
        >
          <Typography gutterBottom variant="h4" component="div">
            ABOUT US
          </Typography>
        </Box>
        <Card>
          <Stack direction="column" alignItems="center">
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                ABOUT US
              </Typography>
              <Box width="200px">
                <Divider />
              </Box>
              <Typography gutterBottom variant="h5" component="div">
                ABOUT US
              </Typography>
            </CardContent>
          </Stack>
        </Card> */}
    </>
  );
};

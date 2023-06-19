import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useQueryStore from "../hooks/queryStore";
import { useUsersSearch } from "../hooks/useUser";

export const NewRegisterByOwner = () => {
  const [searchText, setSearchText] = useState("");
  const [tempSearchText, setTempSearchText] = useState("");
  const [listSelect, setListSelect] = useState("");
  const setRoles = useQueryStore((s) => s.setRoles);
  // const { data, error, isLoading } = useCustomerSearch(searchText);
  const { data } = useUsersSearch(searchText);
  const navigate = useNavigate();
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter" || event.code == "NumpadEnter") {
      setRoles(["Customer"]);
      setSearchText(tempSearchText);
    }
    // if (e === "Enter") {
    // setSearchText(e.target.value);
    // }
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{ padding: "20px" }}
      >
        New Register by Owner
      </Typography>
      <Stack direction="row" spacing={3} padding={1}>
        <Typography
          gutterBottom
          noWrap
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", width: "250px" }}
        >
          Enter Owner Name
        </Typography>
        <TextField
          label="Owner Name"
          placeholder="Enter Owner Name"
          variant="outlined"
          size="small"
          type="name"
          fullWidth
          // sx={{ minWidth: "100%" }} // fullWidth
          margin="dense"
          onChange={(event) => setTempSearchText(event.target.value)}
          onKeyDown={handleSearch}
        />

        <Button
          variant="contained"
          type="submit"
          sx={{ width: "200px" }}
          // fullWidth
          // onClick={createUser}
        >
          Submit
        </Button>
      </Stack>
      <Divider />
      <Grid container spacing={2} style={{ height: "90vh" }}>
        <Grid item xs={3} minWidth={350}>
          <Stack>
            <List>
              <ListItem sx={{ display: "block" }}>
                {data?.result?.map((cus: any, index: any) => {
                  return (
                    <Box bgcolor={listSelect === cus.name ? "dodgerblue" : ""}>
                      <ListItemButton
                        key={index}
                        onClick={() => {
                          setListSelect(cus.name);
                          navigate(`/newRegisterbyowner/${cus._id}`);
                        }}
                      >
                        {cus.name}
                      </ListItemButton>
                    </Box>
                  );
                })}
              </ListItem>
            </List>
          </Stack>
        </Grid>
        <Grid item xs={9} minWidth={350}>
          <Box padding={3}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

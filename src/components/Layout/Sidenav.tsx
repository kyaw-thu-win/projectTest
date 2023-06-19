import FaceIcon from "@mui/icons-material/Face";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/Storage";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
// import { CSSObject, Theme, styled, useTheme } from "@mui/material/styles";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import useAppStore from "../../appStore";
import { SidebarListItem } from "./SidebarListItem";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideNav() {
  // const theme = useTheme();
  const open = useAppStore((state: any) => state.dopen);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <Box height={60} />
        <Divider />

        <List>
          <SidebarListItem title="Home" path="home" icon={<HomeIcon />} />
          <SidebarListItem
            title="Customer"
            path="customers"
            icon={<FaceIcon />}
          />
          <SidebarListItem title="User" path="users" icon={<PersonIcon />} />
          <SidebarListItem
            title="Messages"
            path="messages"
            icon={<MailIcon />}
          />
          <SidebarListItem
            title="Announcements"
            path="announcements"
            icon={<NotificationsActiveIcon />}
          />
          <SidebarListItem title="About" path="about" icon={<InboxIcon />} />
          <SidebarListItem
            title="Database"
            path="database"
            icon={<StorageIcon />}
          />
          <SidebarListItem
            title="Settings"
            path="settings"
            icon={<SettingsIcon />}
          />
        </List>
      </Drawer>
    </Box>
  );
}

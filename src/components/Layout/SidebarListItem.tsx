import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAppStore from "../../appStore";

export const SidebarListItem = ({ title, path, icon }: any) => {
  const navigate = useNavigate();
  const open = useAppStore((state: any) => state.dopen);
  const navSelect = useAppStore((state: any) => state.navSelect);
  const updateNavSelect = useAppStore((state: any) => state.updateNavSelect);
  return (
    <Tooltip title={title} placement="right-end">
      <ListItem
        disablePadding
        sx={{ display: "block" }}
        onClick={() => {
          updateNavSelect(path);
          navigate(path == "home" ? `/` : `/${path}`);
        }}
      >
        <Box>
          <Box bgcolor={navSelect === path ? "dodgerblue" : ""}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Box>
        </Box>
      </ListItem>
    </Tooltip>
  );
};

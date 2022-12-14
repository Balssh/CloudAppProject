import { useState } from "react";
import { useSignOut } from "react-auth-kit";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SidebarMenu = () => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Home");
  const signOut = useSignOut();

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Sidebar
        rootStyles={{
          "& inner": {
            backgroundColor: theme.palette.background,
          },
          height: "100%",
        }}
        backgroundColor={theme.palette.background}
      >
        <Menu
          menuItemStyles={{
            button: ({ active, disabled }) => {
              return {
                backgroundColor: active ? "#6870fa" : undefined,
                "&:hover": {
                  backgroundColor: "#868dfb",
                },
              };
            },
          }}
        >
          <Item
            title="Home"
            to="/"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Dashboard"
            to="/dashboard"
            icon={<DashboardOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Contact"
            to="/contact"
            icon={<ContactMailOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Divider />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
            }}
          >
            <Item
              title="Logout"
              to="/login"
              icon={<LogoutOutlinedIcon />}
              selected={selected}
              setSelected={signOut}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarMenu;

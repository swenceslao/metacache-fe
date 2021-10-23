import React, { useState, useEffect, useMemo, forwardRef } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import TrendingUpTwoToneIcon from "@mui/icons-material/TrendingUpTwoTone";
import SettingsApplicationsTwoToneIcon from "@mui/icons-material/SettingsApplicationsTwoTone";
import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import Collapse from "@mui/material/Collapse";

import "../../assets/App.css";
import { DrawerHeader, routeMapping } from "./utils";
import AxieLogo from "../../assets/icons/AxieInfinityFullLogo.webp";
import MetaCacheLogoForLight from "../../assets/brand/metacache_horizontal_color.png";
import MetaCacheLogoForDark from "../../assets/brand/metacache_horizontal_white.png";

const drawerWidth = 240;

const ListItemLink = (props) => {
  const { icon, primary, to } = props;

  const renderLink = useMemo(
    () =>
      forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink} {...props}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

const ResponsiveDrawer = withRouter((props) => {
  const { window, location } = props;
  const theme = useTheme();
  const { palette } = theme;
  const [mobileOpen, setMobileOpen] = useState(false);

  const [trackerSubHeaderOpen, setTrackerSubHeaderOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTrackerExpandToggle = () => {
    setTrackerSubHeaderOpen(!trackerSubHeaderOpen);
  };

  const navBarTitle = () => {
    const mapping = routeMapping.find((route) =>
      location.pathname.includes(Object.keys(route)[0])
    ) || { "/": "MetaCache" };
    return mapping[Object.keys(mapping)[0]];
  };

  useEffect(() => {
    if (location.pathname.includes("trackers")) {
      setTrackerSubHeaderOpen(true);
    }
  }, [location]);

  const drawer = (
    <div>
      <DrawerHeader>
        <Image
          src={
            palette.mode === "light"
              ? MetaCacheLogoForLight
              : MetaCacheLogoForDark
          }
          alt="MetaCache"
          width="180"
        />
      </DrawerHeader>
      <Divider />
      <List>
        <ListItemLink
          to="/dashboard"
          primary="Dashboard"
          icon={<DashboardTwoToneIcon />}
          selected={location.pathname.includes("dashboard")}
          onClick={handleDrawerToggle}
        />
        <ListItem button onClick={handleTrackerExpandToggle}>
          <ListItemIcon>
            <TrendingUpTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary={"Trackers"} />
          {trackerSubHeaderOpen ? (
            <ExpandLessTwoToneIcon />
          ) : (
            <ExpandMoreTwoToneIcon />
          )}
        </ListItem>
        <Collapse in={trackerSubHeaderOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemLink
              sx={{ pl: 4 }}
              to="/trackers/axieinfinity"
              primary="Axie Infinity"
              icon={<img src={AxieLogo} alt="Axie Infinity" width="40" />}
              selected={location.pathname.includes("axie")}
              onClick={handleDrawerToggle}
            />
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <SettingsApplicationsTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary={"Settings"} />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {navBarTitle()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
});

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;

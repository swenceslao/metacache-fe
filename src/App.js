import React, { lazy, Suspense, useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import MainContainer from "./components/Common/index";

// lazy load pages
const LandingPage = lazy(() => import("./components/Landing/index"));
const AxieTracker = lazy(() =>
  import("./components/Tracker/Games/AxieInfinity/index")
);

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#8367fc",
          },
          secondary: {
            main: "#00b7fa",
          },
        },
      }),
    [prefersDarkMode]
  );

  const renderLoading = () => {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <Box
          sx={{
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" mb={2} />
          <Typography variant="subtitle1">Loading</Typography>
        </Box>
      </Backdrop>
    );
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={renderLoading()}>
          <Router>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route
                exact
                path="/dashboard"
                render={() => (
                  <MainContainer>
                    <div>Homepage</div>
                  </MainContainer>
                )}
              />
              <Route
                exact
                path="/trackers/axieinfinity"
                render={() => (
                  <MainContainer>
                    <AxieTracker />
                  </MainContainer>
                )}
              />
              <Route path="*" render={() => <div>404 not found</div>} />
            </Switch>
          </Router>
        </Suspense>
      </ThemeProvider>
    </div>
  );
}

export default App;

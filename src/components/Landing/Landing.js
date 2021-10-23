import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Image from "mui-image";
import Button from '@mui/material/Button';

import MetaCacheLogoForLight from "../../assets/brand/metacache_horizontal_color.png";
import MetaCacheLogoForDark from "../../assets/brand/metacache_horizontal_white.png";

export const Landing = () => {
  const theme = useTheme();
  const { palette } = theme;

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          my: 10,
        }}
      >
        <Image
          shift="right"
          alt="MetaCache"
          duration={2500}
          src={
            palette.mode === "light"
              ? MetaCacheLogoForLight
              : MetaCacheLogoForDark
          }
        />
        <Box
          sx={{ my: 1, mx: "auto", width: "90%" }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexFlow: "column nowrap",
              alignItems: "flex-start",
              width: "100%",
            }}
            autoComplete="off"
          >
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              sx={{ my: 1, mx: "auto", width: "100%" }}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              sx={{ my: 1, mx: "auto", width: "100%" }}
            />
          </Box>
          <Box my={4} textAlign="center">
            <Button 
              variant="contained"
              component={RouterLink}
              to="/dashboard"
            >
              LOG IN
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

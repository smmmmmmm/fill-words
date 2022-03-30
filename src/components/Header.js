// import React from 'react';
import { Helmet } from 'react-helmet'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

function Header() {
  return (
    <>
    <Helmet>
        <title> fill-words </title>
    </Helmet>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            fill-wirds
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}

export default Header;

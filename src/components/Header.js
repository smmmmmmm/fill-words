// import React from 'react';
import { Helmet } from 'react-helmet'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
    <Helmet>
        <title> fill-words </title>
    </Helmet>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar style={{minHeight: 40}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            fill-words
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => (
  <Box
    sx={{ flexGrow: 1 }}
    id="navbar"
  >
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold',
            fontSize: 'x-large',
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          Language Knight
        </Typography>

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <Link
            to="/"
            className="navlink"
          >
            New Game
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navbar;

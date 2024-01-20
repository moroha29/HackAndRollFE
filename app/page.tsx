"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Navbar from "@/components/NavBar";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
      <Box sx={{ width: "100%" }}>
      <Navbar/>
      </Box>
  );
}
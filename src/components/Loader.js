import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex',m:6,height:400 }}>
      <CircularProgress color="inherit" />
    </Box>
  );
}

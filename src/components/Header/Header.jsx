import { Stack, Typography } from '@mui/material'
import React from 'react'
import classes from './header.module.css';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <Stack className={classes.container} direction={'row'}>
        <Typography sx={{fontWeight: 'bold', fontSize: 20, letterSpacing: 1.8, textTransform: 'uppercase'}}>Beautifuly ❤</Typography>
        <Stack direction={'row'} className={classes.links}>
            <Link to={'/'} className={classes.link}>Home</Link>
            <Link to={'/favorite'} className={classes.link}>Favorite</Link>
        </Stack>
    </Stack>
  )
}

export default Header
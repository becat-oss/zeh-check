import React, { useState } from 'react';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import NavigationList from './NavigationList';
import Footer from './Footer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      cursor: "pointer",
    },
    main: {
      flexGrow: 1,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  }),
);

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={openDrawer}>
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography variant="h6" className={classes.title}>
              BeCAT
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer anchor='left' open={open} onClose={closeDrawer}>
        <NavigationList onClose={closeDrawer} />
      </Drawer>
      <Container maxWidth="md" className={classes.main}>
        {children}
      </Container>
      <Footer />
    </div>
  );
}

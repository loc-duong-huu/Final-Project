import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const ProductDetail = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <MenuBookIcon className={classes.icon} />
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            Books List
          </Typography>
          <Button color="inherit" onClick={() => props.onLogout()}>Logout</Button>
          <Button color="inherit" onClick={() => props.onShowCart()}><ShoppingBasketIcon className={classes.icon} />My Cart</Button>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography align="center" color="primary" variant="h4">{props.book.Ten}</Typography>
            </Grid>
            <Grid item xs={6} align="center">
              <img src={props.book.HinhBia} />
            </Grid>
            <Grid item xs={6}>
              <Typography align="left">{props.book.MoTa}</Typography>
              <Typography align="left">Price: {props.book.GiaBan} VND</Typography>
              <Button variant="outlined" color="primary" onClick={() => props.onBackToBooks()}>Back To Books</Button>
              <Button variant="outlined" color="secondary" onClick={() => props.onAddToCart({Id: props.book.Id, Ten: props.book.Ten, HinhBia: props.book.HinhBia, GiaBan: props.book.GiaBan, SoLuong: 1})}>In Cart</Button>
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          {props.footerName}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          {props.footerDescription}
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
};

export default ProductDetail;
import React, { useState, useEffect } from 'react';
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
import CartItem from './CartItem.js';

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
    flexGrow: 1,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  resultPrice: {
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const MyCart = props => {
  const classes = useStyles();

  function calculateSubTotal(total, item) {
    return total + item.SoLuong * item.GiaBan;
  }

  function calculateTotal(total, item) {
    return Math.round(total + props.tax + item.SoLuong * item.GiaBan);
  }

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
          <Button color="inherit"><ShoppingBasketIcon className={classes.icon} />My Cart</Button>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid}>         
            <Grid item xs={12} align="center">
              <Typography variant="h3">Your Cart</Typography>
            </Grid>
            <Grid container xs={12}>
              <Grid item xs={2} align="center">
                <Typography variant="overline">Product</Typography>
              </Grid>
              <Grid item xs={2} align="center">
                <Typography variant="overline">Name of product</Typography>
              </Grid>
              <Grid item xs={2} align="center">
                <Typography variant="overline">Price</Typography>
              </Grid>
              <Grid item xs={2} align="center">
                <Typography variant="overline">Quantity</Typography>
              </Grid>
              <Grid item xs={2} align="center">
                <Typography variant="overline">Remove</Typography>
              </Grid>
              <Grid item xs={2} align="center">
                <Typography variant="overline">Total</Typography>
              </Grid>
            </Grid>

            {/* Add child component */}
            {props.carts.map((item) => (
              <CartItem item={item}
                        onDecreaseQuantity={(Id) => props.onDecreaseQuantity(Id)}
                        onIncreaseQuantity={(Id) => props.onIncreaseQuantity(Id)}
                        onRemoveItem={(Id) => props.onRemoveItem(Id)} />
            ))}
            <Grid container xs={12} justify="flex-end">
              <Button variant="outlined" color="primary" onClick={() => props.onBackToBooks()}>Back To Books</Button>
              <Button variant="outlined" color="secondary" onClick={() => props.onRemoveAll()}>Clear Cart</Button>
            </Grid>
            <Grid container xs={12} justify="flex-end">
              <Typography variant="h6" className={classes.resultPrice}>SubTotal: {props.carts.reduce(calculateSubTotal, 0)} VND</Typography>
            </Grid>
            <Grid container xs={12} justify="flex-end">
              <Typography variant="h6" className={classes.resultPrice}>Tax: {props.tax} VND</Typography>
            </Grid>
            <Grid container xs={12} justify="flex-end">
              <Typography variant="h6" className={classes.resultPrice}>Total: {props.carts.reduce(calculateTotal, 0)} VND</Typography>
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

export default MyCart;
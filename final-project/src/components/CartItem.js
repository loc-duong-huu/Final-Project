import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const CartItem = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <main>
        <Grid container xs={12}>
          <Grid item xs={2} className={classes.cell}>
            <img src={props.item.HinhBia} style={{width: "70%", height: "auto"}} />
          </Grid>
          <Grid item xs={2} className={classes.cell}>
            <Typography>{props.item.Ten}</Typography>
          </Grid>
          <Grid item xs={2} className={classes.cell}>
            <Typography>{props.item.GiaBan} VND</Typography>
          </Grid>
          <Grid item xs={2} className={classes.cell}>
            <button onClick={() => props.onDecreaseQuantity(props.item.Id)}>-</button>
            <input disabled style={{width: "50%", textAlign: "center"}} value={props.item.SoLuong}></input>
            <button onClick={() => props.onIncreaseQuantity(props.item.Id)}>+</button>
          </Grid>
          <Grid item xs={2} className={classes.cell}>
            <Button color="primary" onClick={() => props.onRemoveItem(props.item.Id)}><DeleteIcon /></Button>
          </Grid>
          <Grid item xs={2} className={classes.cell}>
            <Typography>Item Total: {props.item.SoLuong * props.item.GiaBan} VND</Typography>
          </Grid>
        </Grid>
        <br />
      </main>
    </React.Fragment>
  );
};

export default CartItem;
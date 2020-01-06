import React from 'react';
import Modal from '@material-ui/core/Modal';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    top: '50%',
    margin: 'auto',
    width: 400,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    '& > div': {
      outline: 'none',
    }
  },
}));

export default function(props) {
  const classes = useStyles();

  return (
    <Modal
      className={classes.root}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.onClose}
    >
      <div>
        <h2 id="simple-modal-title">Coming soon!</h2>
        <p id="simple-modal-description">

        </p>
      </div>
    </Modal>
  );
}

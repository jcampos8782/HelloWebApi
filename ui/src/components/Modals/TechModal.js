import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

// TODO: refactor
const useStyles = makeStyles(theme => ({
  root: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    top: '50%',
    margin: 'auto',
    width: 400,
    height: 'fit-content',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    '& > div': {
      outline: 'none',
      '& > a': {
        color: theme.palette.info.light,
        marginRight: 10
      },
      '& > p': {
        marginBottom: 5,
      }
    },
  },
  avatar: {
    display: 'inline-block',
    marginRight: 10,
    top: 8
  },
  text: {
    textAlign: 'justify',
  }
}));

export default function(props) {
  const classes = useStyles();
  console.log("rendering tech modal!");
  return (
    <Modal
      key="technology_modal"
      id="technology_modal"
      className={classes.root}
      open={props.open}
      onClose={props.onClose}
    >
      <Container>
        <Typography variant='h5'>
          Coming soon!
        </Typography>
        <Typography paragraph variant="overline">
        </Typography>
      </Container>
    </Modal>
  );
}

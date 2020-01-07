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
  console.log("rendering about modal");
  return (
    <Modal
      className={classes.root}
      open={props.open}
      onClose={props.onClose}
    >
      <Container>
        <Typography variant='h5'>
          {props.contact.name}
        </Typography>
        <Typography paragraph variant="overline">
          {props.title}
        </Typography>

        {
          props.description.map((paragraph,i) => (
            <Typography paragraph variant="caption"
              key={i}
              className={classes.text}
            >
              {paragraph}
            </Typography>
          ))
        }

        <Avatar
          alt={props.contact.name}
          src={props.avatar}
          className={classes.avatar}
        />

        <a href={props.contact.linkedin} target='_new'>
          <Icon className="fab fa-linkedin" />
        </a>
        <a href={props.contact.github} target='_new'>
          <Icon className="fab fa-github" />
        </a>
        <a href={`mailto:{props.contact.mail}`} target='_new'>
          <Icon className="far fa-envelope" />
        </a>
      </Container>
    </Modal>
  );
}

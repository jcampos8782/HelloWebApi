import React from 'react';

import Container from '@material-ui/core/Container';
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
    width: 600,
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
  console.log("rendering copyright modal");
  return (
    <Modal
      key="copyright_modal"
      id="copyright_modal"
      className={classes.root}
      open={props.open}
      onClose={props.onClose}
    >
      <Container>
        <Typography variant='h5'>
          MIT License
        </Typography>
        <Typography paragraph variant="overline">
          &copy; Copyright {(new Date().getFullYear())} {props.holder}
        </Typography>
        <Typography paragraph variant="caption">
          Permission is hereby granted, free of charge, to any person obtaining a copy of this
          software and associated documentation files (the "Software"), to deal in the Software
          without restriction, including without limitation the rights to use, copy, modify, merge,
          publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
          to whom the Software is furnished to do so, subject to the following conditions:
        </Typography>
        <Typography paragraph variant="caption">
          The above copyright notice and this permission notice shall be included in all copies
          or substantial portions of the Software.
        </Typography>
        <Typography paragraph variant="caption">
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
          INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
          OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
          WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
          CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </Typography>
      </Container>
    </Modal>
  );
}

import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
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
      '& > p': {
        marginBottom: 5,
      }
    },
  },
  sections: {
    marginBottom: 10,
  },
  gridRow: {
      marginTop: -24,
      marginBottom: 10,
      textDecoration: 'none',
      '& a': {
        color: theme.palette.info.light,
        marginRight: 10
      }
    }
}));

export default function(props) {
  const classes = useStyles();
  return (
    <Modal
      className={classes.root}
      open={props.open}
      onClose={props.onClose}
    >
      <Container>
        <Typography variant='h5'>
          {props.title}
        </Typography>

        {
          props.sections.map((section,i) => {
            let section_key = `section_${section.title.replace(' ', '_').toLowerCase()}`;
            return (
              <Container className={classes.section} key={section_key}>
                <Typography paragraph variant="overline">
                  {section.title}
                </Typography>
                <Grid container spacing={1} className={classes.gridRow} >
                {
                  section.items.map(item => {
                    let k = `${section_key}_${item.name.replace(' ', '_').toLowerCase()}`;

                    return (
                      <Grid item key={k} xs={4} sm={4} >
                        <Typography className={classes.technology} variant="body1">
                          <a href={item.url} target="_new">
                            {item.name}
                          </a>
                        </Typography>
                      </Grid>
                    )
                  })
                }
                </Grid>
              </Container>
            );
          }
          )
        }
      </Container>
    </Modal>
  );
}

import React from 'react';
import HomeCard from './HomeCard';

import Grid from '@material-ui/core/Grid';

export default class Home extends React.Component {
  render() {

    return (
      <Grid container spacing={3} direction="column" justify="center" alignItems="flex-start">
        {
          this.props.content.map((c,i) => (
            <Grid item xs key={i}>
              <HomeCard {...c} />
            </Grid>
          ))
        }
      </Grid>
    );
  }
}

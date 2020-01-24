import React from 'react';
import {About,AmazonCertification} from './Cards';

import Grid from '@material-ui/core/Grid';

export default class Home extends React.Component {
  render() {

    return (
      <Grid container spacing={3} direction="column" justify="center" alignItems="flex-start">
        <Grid item xs>
          <About {...this.props } />
        </Grid>
        <Grid item xs>
          <AmazonCertification {...this.props} />
        </Grid>
      </Grid>
    );
  }
}

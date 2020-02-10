import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

export default class HomeCard extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <Card className={classes.card} raised>
        <CardHeader
          avatar={
            <Avatar
              alt={this.props.title}
              src={this.props.avatar}
              aria-label={this.props.title}
              className={classes.avatar}>
            </Avatar>
          }
          title={this.props.title}
          titleTypographyProps={ { variant: 'h6' }}
          subheader={this.props.subtitle}
          subheaderTypographyProps={ { variant: 'overline' }}
        />

        <CardContent className={classes.content}>
        {
          this.props.content.map((c,i) => (
            <Typography key={i} paragraph>{c}</Typography>
          ))
        }
        </CardContent>

        <CardActions>
        {
          this.props.actions.map((a,i) => (
            <Button
              key={i}
              className={classes.actionLink}
              onClick={() => window.open(a.location)}>
              {a.text}
            </Button>
          ))
        }
        </CardActions>
      </Card>
    );
  }
}

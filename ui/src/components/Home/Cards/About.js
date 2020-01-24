import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

export default class About extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <Card className={classes.card} raised>
        <CardHeader
          avatar={
            <Avatar
              alt={this.props.about.title}
              src={this.props.avatar}
              aria-label={this.props.about.title}
              className={classes.avatar}>
            </Avatar>
          }
          title={this.props.about.title}
          titleTypographyProps={ { variant: 'h6' }}
          subheader={this.props.about.subtitle}
          subheaderTypographyProps={ { variant: 'overline' }}
        />

        <CardContent className={classes.content}>
        {
          this.props.about.content.map((c,i) => (
            <Typography key={i} paragraph>{c}</Typography>
          ))
        }
        </CardContent>

        <CardActions>
          <Button
            className={classes.actionLink}
            onClick={() => window.open(this.props.contact.github)}>
            Check Out My Github
          </Button>
          <Button
            className={classes.actionLink}
            onClick={() => window.open(this.props.contact.linkedin)}>
            Endorse Me on LinkedIn
          </Button>
        </CardActions>
      </Card>
    );
  }
}

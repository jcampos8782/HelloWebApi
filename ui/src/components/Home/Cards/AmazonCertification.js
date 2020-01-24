import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default class AmazonCertification extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <Card className={classes.card} raised>
        <CardHeader
          avatar={
            <Avatar
              alt={this.props.amazonCertification.title}
              src={this.props.amazonCertification.media}
              aria-label={this.props.amazonCertification.title}
              className={classes.avatar}>
            </Avatar>
          }
          title={this.props.amazonCertification.title}
          titleTypographyProps={ { variant: 'h6' }}
          subheader={this.props.amazonCertification.subtitle}
          subheaderTypographyProps={ { variant: 'overline' }}
        />
          <CardMedia
            className={classes.media}
            image={this.props.amazonCertification.media}
            title={this.props.amazonCertification.title}
          />
          <CardContent className={classes.content}>
          {
            this.props.amazonCertification.content.map((c,i) => (
              <Typography key={i} paragraph>{c}</Typography>
            ))
          }
          </CardContent>
          <CardActions>
            <Button
              className={classes.actionLink}
              onClick={() => window.open(this.props.amazonCertification.badgeUrl)}>
              View
            </Button>
            <Button
              className={classes.actionLink}
              onClick={() => window.open(this.props.amazonCertification.validationUrl)}>
              Validate
            </Button>
          </CardActions>
      </Card>
    );
  }
}

import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
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
          action={
            <Container>
              <a href={this.props.contact.github} style={{textDecoration: 'none'}} target='_new'>
                <IconButton aria-label="github">
                    <Icon className={ classes.actionLink + ' fab fa-github' } />
                </IconButton>
              </a>
              <a href={this.props.contact.linkedin} style={{textDecoration: 'none'}} target='_new'>
                <IconButton aria-label="linkedin">
                  <Icon className={ classes.actionLink + ' fab fa-linkedin' } />
                </IconButton>
              </a>
              <a href={`mailto:{this.props.contact.mail}`} style={{textDecoration: 'none'}} target='_new'>
                <IconButton aria-label="settings">
                  <Icon className={ classes.actionLink + ' far fa-envelope' } />
                </IconButton>
              </a>
            </Container>
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
      </Card>
    );
  }
}

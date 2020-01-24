import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

export default class Home extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              alt={this.props.contact.name}
              src={this.props.avatar}
              aria-label={this.props.contact.name}
              className={classes.avatar}>
            </Avatar>
          }
          action={
            <Container>
              <a href={this.props.contact.linkedin} style={{textDecoration: 'none'}} target='_new'>
                <IconButton aria-label="github">
                    <Icon className={ classes.headerActionLinks + ' fab fa-github' } />
                </IconButton>
              </a>
              <a href={this.props.contact.github} style={{textDecoration: 'none'}} target='_new'>
                <IconButton aria-label="linkedin">
                  <Icon className={ classes.headerActionLinks + ' fab fa-linkedin' } />
                </IconButton>
              </a>
              <a href={`mailto:{this.props.contact.mail}`} style={{textDecoration: 'none'}} target='_new'>
                <IconButton aria-label="settings">
                  <Icon className={ classes.headerActionLinks + ' far fa-envelope' } />
                </IconButton>
              </a>
            </Container>
          }
          title="Jason D. Campos"
          titleTypographyProps={ { variant: 'h6' }}
          subheader="Software Solutions Architect"
          subheaderTypographyProps={ { variant: 'overline' }}
        />
        <CardContent>
          <Typography paragraph>
            I have been writing code for over twenty years. I began by creating small websites for
            gaming clans as a teenager and eventually earned by Bachelor's degree in Computer Science
            from San Jose State University, earning a Cum Laude distinction with a 3.84 GPA.
          </Typography>
          <Typography paragraph>
            I have worked professionally as a full stack application developer for over ten years,
            primarily working with healthcare software. I have experience with dozens of different
            types of technologies from all levels of the application stack, from RDBMS to UI to
            configuration management to deployment and containerization.
          </Typography>
          <Typography paragraph>
          Please visit my LinkedIn profile, Github page, or send me an e-mail if you would like
            to get in contact for any reason.
          </Typography>
        </CardContent>

      </Card>
    );
  }
}

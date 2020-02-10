import React from 'react';
import {Link} from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

export default class AppDrawer extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <div
        role="presentation"
        onClick={this.props.close}
        onKeyDown={this.props.close}
      >
      <Drawer
        anchor={this.props.anchor}
        open={this.props.open}
      >
        <List>
          {
            this.props.groups.map(group => (
              <Container key={group.title}>
                <ListSubheader>{group.title}</ListSubheader>
                <Divider />
                {
                  group.items.map((item,i) => (
                  <Link
                    to={item.route}
                    key={i}
                    className={classes.link}
                    >
                    <ListItem
                      button={true}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={item.avatar}
                            alt={item.title}
                            className={classes.avatar}
                          />
                        </ListItemAvatar>
                        <ListItemText>
                          <Typography>{item.title}</Typography>
                        </ListItemText>
                    </ListItem>
                  </Link>
                  ))
                }
              </Container>
            ))
          }
        </List>
      </Drawer>
      </div>
    );
  }
}

import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
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
      <Drawer
        anchor={this.props.anchor}
        open={this.props.open}
        variant="persistent"
      >
        <Container className={classes.account}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Icon className="far fa-user-circle fa-3x" />}
            onClick={this.props.loginAction}
          >
            Login
          </Button>
        </Container>
        <List>
          {
            this.props.drawerItems.map(group => (
              <Container key={group.title}>
                <ListSubheader>{group.title}</ListSubheader>
                <Divider />
                {
                  group.items.map(item => (
                    <ListItem
                      key={item.id}
                      button={true}
                      disabled
                      onClick={() => window.open(item.location)}
                      >
                      <ListItemAvatar>
                        <Avatar src={item.avatar} alt={item.text} />
                      </ListItemAvatar>
                      <ListItemText>
                        <Typography>{item.text}</Typography>
                      </ListItemText>
                    </ListItem>
                  ))
                }
              </Container>
            ))
          }
        </List>
      </Drawer>
    );
  }
}

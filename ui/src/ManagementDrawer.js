import React from 'react';

import {withStyles} from '@material-ui/core/styles';

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

const styles = {}

class ManagementDrawer extends React.Component {
  render() {
    return (
      <Drawer
        anchor={this.props.anchor}
        open={this.props.open}
        variant="persistent"
      >
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

export default withStyles(styles)(ManagementDrawer);

import React from 'react';

import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemFormText: ''
    };
  }

  componentDidMount() {
    this.loadItems();
  }

  loadItems() {
    fetch(this.props.endpoint)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          items: result,
          itemFormText: ''
        });
    });
  }

  render() {
    const {classes} = this.props;
    const complete = this.state.items.filter(i => i.isComplete);
    const incomplete = this.state.items.filter(i => !i.isComplete);

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
          action={
            <IconButton aria-label="github" className={classes.actionLink} onClick={() => window.open(this.props.github)}>
                <Icon className='fab fa-github'  />
            </IconButton>
          }
          title={this.props.title}
          titleTypographyProps={ { variant: 'h6' }}
          subheader={this.props.subtitle}
          subheaderTypographyProps={ { variant: 'overline' }}
        />

        <CardContent className={classes.content}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          spacing={5}
          >
            <Grid item xs={12} className={classes.addItemContainer}>
              <TextField
                type="text"
                placeholder={this.props.hintText}
                className={classes.textField}
                value={this.state.itemFormText}
                onChange={ (e) => {
                  const items = this.state.items.slice();
                  this.setState({
                    items: items,
                    itemFormText: e.target.value
                  });
                }}
                />
              <Fab color="primary"
                aria-label="add"
                disabled={this.state.itemFormText.length === 0}
                className={classes.button}
                onClick={ () => {
                  if(this.state.itemFormText.length === 0) {
                    return;
                  }

                  fetch(this.props.endpoint, {
                    method: 'POST',
                    body: JSON.stringify({ name: this.state.itemFormText }),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                  .then(res => res.json())
                  .then((result) => {
                    const items = this.state.items.concat(result);
                    this.setState({
                      items: items,
                      itemFormText: ''
                    });
                  });
                }}>
                <AddIcon />
              </Fab>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <ListSubheader>Incomplete</ListSubheader>
                {
                  incomplete.length > 0 ?
                    incomplete.map((i) => this.renderItem(i, classes)) :
                    <Typography variant='overline'>No Items</Typography>
                }
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <ListSubheader>Complete</ListSubheader>
                {
                  complete.length > 0 ?
                    complete.map((i) => this.renderItem(i, classes)) :
                    <Typography variant='overline'>No Items</Typography>
                }
              </List>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
        </CardActions>
      </Card>
    );
  }

  renderItem(item, classes) {
    return (
      <ListItem key={item.id} divider={true}>
        <Checkbox
          edge="end"
          checked={item.isComplete}
          className={classes.checkbox}
          onChange={() => {
            fetch(this.props.endpoint + '/' + item.id , {
              method: 'PUT',
              body: JSON.stringify({
                id: item.id,
                name: item.name,
                isComplete: !item.isComplete
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(() => this.loadItems())
        }}
        />
        <ListItemText>
          <Typography>{item.name}</Typography>
        </ListItemText>
        <ListItemSecondaryAction>
          <Tooltip title="Delete">
            <IconButton
              edge="end"
              aria-label="delete"
              className={classes.trashIcon}
              onClick={ () => {
                fetch(this.props.endpoint + '/' + item.id , {
                  method: 'DELETE'
                })
                .then(() => this.loadItems())
              }}
            >
              <Icon className="fas fa-trash" />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

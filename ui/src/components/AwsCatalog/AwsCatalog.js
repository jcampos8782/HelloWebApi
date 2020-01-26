import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default class AwsCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      items: [],
      searchText: "",
      selectedGroup: ""
    };
  }

  componentDidMount() {
    this.loadGroups();
    this.loadItems();
  }

  loadItems() {
    fetch(this.props.endpoint)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          items: result
        });
    });
  }

  loadGroups() {
    fetch(`${this.props.endpoint}/groups`)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          groups: result
        });
    });
  }

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
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
          className={classes.filterContainer}
          >
            <Grid item xs={6} className={classes.searchTextContainer}>
              <InputLabel shrink htmlFor="search-text">
                {this.props.hintText}
              </InputLabel>
              <TextField
                type="text"
                placeholder="EC2, S3, RDS..."
                className={classes.textField}
                value={this.state.searchText}
                onChange={ (e) => {
                  this.setState({
                    searchText: e.target.value
                  })

                  fetch(`${this.props.endpoint}/search?q=${e.target.value}`)
                    .then(res => res.json())
                    .then((result) => {
                      //TODO: Move this to service
                      console.log(`Selected group: ${this.state.selectedGroup}`);
                      if (this.state.selectedGroup !== "") {
                        console.log(`Filtering group...`);
                        result = result.filter(i => i.group === this.state.selectedGroup)
                      }

                      this.setState({
                        items: result
                      });
                    })
                }}
                id="search-text"
                />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink htmlFor="group-select">
                Service Type
              </InputLabel>
              <NativeSelect
                value={this.state.selectedGroup}
                onChange={(e) => {
                  this.setState({
                    selectedGroup: e.target.value
                  });
                  if (e.target.value === "") {
                    fetch(`${this.props.endpoint}`)
                      .then(res => res.json())
                      .then((result) => {
                        //TODO: Move this to service
                        if (this.state.searchText !== "") {
                          result = result.filter(i => i.name.indexOf(this.state.searchText !== -1));
                        }

                        this.setState({
                          items: result
                        });
                    });
                    return;
                  }

                  fetch(`${this.props.endpoint}/groups/${e.target.value.toLowerCase()}`)
                    .then(res => res.json())
                    .then((result) => {
                      //TODO: Move this to service
                      if (this.state.searchText !== "") {
                        result = result.filter(i => i.name.indexOf(this.state.searchText !== -1));
                      }

                      this.setState({
                        items: result
                      });
                  });
                }}
                inputProps={{
                  name: 'group',
                    id: 'group-select',
                }}>
                <option value="">All</option>
                {
                  this.state.groups.map((group,id) => (
                    <option key={id} value={group}>{group}</option>
                  ))
                }
              </NativeSelect>
            </Grid>
            <Grid item xs={6} />
          </Grid>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={3}>
            {
              this.state.items.map((item,id) => (
                <Grid key={id} item xs={4}>
                  <Card className={classes.itemCard}>
                    <CardContent>
                      <Typography gutterBottom variant="h6">
                        {item.name} {item.acronym ? `(${item.acronym})` : ''}
                      </Typography>
                      <Typography variant="subtitle2">
                        {item.group}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small"  className={classes.actionLink} onClick={() => window.open(item.url) }>
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

import AwsCatalog from './AwsCatalog';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => (
  {
    root: {
      display: "inline-block",
      padding: 5,
      position: 'absolute',
    },
    avatar: {
      '& > img': {
        height: 'auto'
      }
    },
    actionLink: {
      color: theme.palette.action.main
    },
    filterContainer:{
      maxWidth:768
    },
    searchTextContainer: {
      minWidth: 300 // Same as textField.width
    },
    textField: {
      width: 300 // Same as searchTextContainer.minWidth
    },
    itemCard: {
      backgroundColor: theme.palette.cards.secondary.main
    }
  }
);

export default withStyles(styles)(AwsCatalog);

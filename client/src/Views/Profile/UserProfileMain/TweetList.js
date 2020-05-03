import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Tweet from '../../../Components/Tweets/Tweet';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
}));

const TweetList = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<List>
				<Tweet />
				<Divider />
				<Tweet />
				<Divider />
			</List>
		</div>
	);
};

export default TweetList;

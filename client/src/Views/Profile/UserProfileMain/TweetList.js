import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Tweet from '../../../Components/Tweets/Tweet';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
}));

const TweetList = (props) => {
	const classes = useStyles();
	const { tweetList } = props;

	const tweets = tweetList.map((tweet) => (
		<div>
			<Tweet tweet={tweet} />
			<Divider />
		</div>
	));

	return (
		<div className={classes.root}>
			<List>{tweets}</List>
		</div>
	);
};

export default TweetList;

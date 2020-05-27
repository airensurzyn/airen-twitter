import React, { useState } from 'react';

import NavbarTabs from '../../../Components/Tabs/NavbarTabs';
import NavbarTab from '../../../Components/Tabs/NavbarTab';

const TweetNavbarTabs = (props) => {
	const tweetNavbarTabs = props.tweetNavbarTabs;
	const [active, setActive] = useState(tweetNavbarTabs[0]);

	const onChange = (event, value) => {
		setActive(value);
	};

	const tabs = tweetNavbarTabs.map((tab, index) => (
		<NavbarTab label={tab} value={tab} key={index} />
	));

	return (
		<NavbarTabs value={active} onChange={onChange}>
			{tabs}
		</NavbarTabs>
	);
};

export default TweetNavbarTabs;

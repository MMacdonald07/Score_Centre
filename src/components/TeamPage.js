import React from 'react';
import Header from './Header';

const TeamPage = props => {
	const teamId = props.match.params.teamId;
	return (
		<div>
			<Header />
			Info for specific team with id {teamId} here
		</div>
	);
};

export default TeamPage;

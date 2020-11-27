import React from 'react';
import Header from './Header';

const PlayerPage = props => {
	const playerId = props.match.params.playerId;
	const teamId = props.match.params.teamId;
	return (
		<div>
			<Header />
			Info for specific player from team {teamId} with id {playerId} here
		</div>
	);
};

export default PlayerPage;

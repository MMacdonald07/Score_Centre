import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import ScoresPage from './components/ScoresPage';
import TablesPage from './components/TablesPage';
import ScorersPage from './components/ScorersPage';
import TeamListPage from './components/TeamListPage';
import TeamPage from './components/TeamPage';
import PlayerPage from './components/PlayerPage';

function App() {
	return (
		<div>
			<Switch>
				<Route path='/' exact render={props => <HomePage {...props} />} />
				<Route path='/scores' render={props => <ScoresPage {...props} />} />
				<Route path='/standings/:leagueCode' render={props => <TablesPage {...props} />} />
				<Route path='/scorers/:leagueCode' render={props => <ScorersPage {...props} />} />
				<Route path='/teams' exact render={props => <TeamListPage {...props} />} />
				<Route path='/teams/:teamId' exact render={props => <TeamPage {...props} />} />
				<Route path='/teams/:teamId/:playerId' render={props => <PlayerPage {...props} />} />
			</Switch>
		</div>
	);
}

export default App;

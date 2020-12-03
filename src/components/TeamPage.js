import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CircularProgress } from '@material-ui/core';
import Header from './Header';

const useStyles = makeStyles({
	teamName: {
		paddingLeft: '20vw',
		textDecoration: 'underline'
	},
	contentContainer: {
		display: 'inline-block',
		margin: '2vh 5vw'
	},
	imageContainer: {
		display: 'inline-block'
	},
	link: {
		color: 'green',
		textDecoration: 'none',
		'&:hover': {
			borderBottom: '2px solid green'
		},
		'&:focus': {
			borderBottom: '2px solid green'
		}
	},
	mainPaper: {
		background: '#A9A9A9',
		padding: '1vh 1vw 2vh',
		margin: '2vh 2vw'
	},
	matchPaper: {
		background: '#A9A9A9',
		padding: '1vh 2vw 2vh',
		margin: '2vh 2vw',
		display: 'inline-block',
		width: '30%'
	},
	list: {
		listStyle: 'none'
	},
	accordionPaper: {
		background: '#c8c8c8',
		padding: '2vh 1vw 4vh',
		margin: '2vh 4vw',
		width: '35%'
	},
	accordionHeading: {
		fontWeight: '700',
		textAlign: 'center',
		marginBottom: '1vh'
	},
	button: {
		margin: '2vh 4vw'
	}
});

const TeamPage = props => {
	const teamId = props.match.params.teamId;
	const { history } = props;
	const [teamData, setTeamData] = useState();
	const [coach, setCoach] = useState();
	const [goalkeepers, setGoalkeepers] = useState([]);
	const [defenders, setDefenders] = useState([]);
	const [midfielders, setMidfielders] = useState([]);
	const [attackers, setAttackers] = useState([]);
	const [pastMatchData, setPastMatchData] = useState();
	const [futureMatchData, setFutureMatchData] = useState();
	const classes = useStyles();

	useEffect(() => {
		if (teamId > 1106) return setTeamData(false);
		axios
			.get(`https://api.football-data.org/v2/teams/${teamId}`, {
				headers: {
					'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API_KEY
				}
			})
			.then(function (res) {
				const { data } = res;
				setTeamData(data);
				sortTeamMembers(data.squad);
			})
			.catch(function (err) {
				setTeamData(false);
			});
		axios
			.get(
				`https://api.football-data.org/v2/teams/${teamId}/matches?status=IN_PLAY,PAUSED,FINISHED&limit=3&dateTo=${moment().format(
					'yyyy-MM-DD'
				)}&dateFrom=${moment().subtract(1, 'month').format('yyyy-MM-DD')}`,
				{
					headers: {
						'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API_KEY
					}
				}
			)
			.then(function (res) {
				const { matches } = res.data;
				setPastMatchData(matches);
			})
			.catch(function (err) {
				setPastMatchData(false);
			});
		axios
			.get(
				`https://api.football-data.org/v2/teams/${teamId}/matches?status=SCHEDULED&dateTo=${moment()
					.add(1, 'month')
					.format('yyyy-MM-DD')}&dateFrom=${moment().format('yyyy-MM-DD')}`,
				{
					headers: {
						'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API_KEY
					}
				}
			)
			.then(function (res) {
				const { matches } = res.data;
				setFutureMatchData(matches.slice(0, 3));
			})
			.catch(function (err) {
				setFutureMatchData(false);
			});
	}, [teamId]);

	const sortTeamMembers = squad => {
		let goalkeepersList = [];
		let defendersList = [];
		let midfieldersList = [];
		let attackersList = [];
		squad.forEach(member => {
			if (member.role === 'COACH') return setCoach(member.name);

			switch (member.position) {
				case 'Goalkeeper':
					goalkeepersList.push(member);
					break;
				case 'Defender':
					defendersList.push(member);
					break;
				case 'Midfielder':
					midfieldersList.push(member);
					break;
				case 'Attacker':
					attackersList.push(member);
					break;
				default:
					break;
			}
		});
		setGoalkeepers(goalkeepersList);
		setDefenders(defendersList);
		setMidfielders(midfieldersList);
		setAttackers(attackersList);
	};

	const generateTeamJsx = () => (
		<div>
			<Typography className={classes.teamName} variant='h3' color='initial'>
				{teamData.name}
			</Typography>
			<div className={classes.contentContainer}>
				<Paper className={classes.mainPaper} elevation={10}>
					<Typography variant='h6' color='initial'>
						Founded: {teamData.founded}
					</Typography>
					<Typography variant='h6' color='initial'>
						Manager: {coach}
					</Typography>
					<Typography variant='h6' color='initial'>
						Stadium: {teamData.venue}
					</Typography>
					<Typography variant='h5' color='initial'>
						Active Competitions:
					</Typography>
					<ul className={classes.list}>
						{teamData.activeCompetitions.map(competition => {
							return (
								<li key={competition.name}>
									<Typography variant='h6' color='initial'>
										{competition.name}
									</Typography>
								</li>
							);
						})}
					</ul>

					<Typography variant='h6' color='initial' style={{ textAlign: 'center' }}>
						<a href={teamData.website} className={classes.link} target='_blank' rel='noreferrer'>
							Website
						</a>
					</Typography>
				</Paper>
			</div>

			<img className={classes.imageContainer} src={teamData.crestUrl} alt='Crest' />
			<br />

			<Paper className={classes.matchPaper} elevation={10}>
				<Typography variant='h6' color='initial'>
					Previous Results:
				</Typography>
				<ul className={classes.list}>
					{pastMatchData.map(match => (
						<li key={match.id}>
							<Typography variant='body1' color='initial' style={{ textAlign: 'center' }}>
								{match.homeTeam.name} {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}{' '}
								{match.awayTeam.name}
							</Typography>
						</li>
					))}
				</ul>
			</Paper>
			<Paper className={classes.matchPaper} elevation={10}>
				<Typography variant='h6' color='initial'>
					Upcoming Fixtures:
				</Typography>
				<ul className={classes.list}>
					{futureMatchData.map(match => (
						<li key={match.id}>
							<Typography variant='body1' color='initial' style={{ textAlign: 'center' }}>
								{moment(match.utcDate).format('DD/MM/yyyy HH:mm')} - {match.homeTeam.name} Vs {match.awayTeam.name}
							</Typography>
						</li>
					))}
				</ul>
			</Paper>

			<Paper className={classes.accordionPaper} elevation={10}>
				<Typography className={classes.accordionHeading} variant='h5'>
					Squad:
				</Typography>
				<Accordion defaultExpanded TransitionProps={{ unmountOnExit: true }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} id='panel1a-header'>
						<Typography variant='h6'>Goalkeepers</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul className={classes.list}>
							{goalkeepers.map(goalkeeper => (
								<li key={goalkeeper.name}>
									<Typography>
										{goalkeeper.name} - {goalkeeper.nationality} - {moment().diff(goalkeeper.dateOfBirth, 'years')}{' '}
										years old
									</Typography>
								</li>
							))}
						</ul>
					</AccordionDetails>
				</Accordion>
				<Accordion TransitionProps={{ unmountOnExit: true }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} id='panel2a-header'>
						<Typography variant='h6'>Defenders</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul className={classes.list}>
							{defenders.map(defender => (
								<li key={defender.name}>
									<Typography>
										{defender.name} - {defender.nationality} - {moment().diff(defender.dateOfBirth, 'years')} years old
									</Typography>
								</li>
							))}
						</ul>
					</AccordionDetails>
				</Accordion>
				<Accordion TransitionProps={{ unmountOnExit: true }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} id='panel3a-header'>
						<Typography variant='h6'>Midfielders</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul className={classes.list}>
							{midfielders.map(midfielder => (
								<li key={midfielder.name}>
									<Typography>
										{midfielder.name} - {midfielder.nationality} - {moment().diff(midfielder.dateOfBirth, 'years')}{' '}
										years old
									</Typography>
								</li>
							))}
						</ul>
					</AccordionDetails>
				</Accordion>
				<Accordion TransitionProps={{ unmountOnExit: true }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} id='panel4a-header'>
						<Typography variant='h6'>Attackers</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul className={classes.list}>
							{attackers.map(attacker => (
								<li key={attacker.name}>
									<Typography>
										{attacker.name} - {attacker.nationality} - {moment().diff(attacker.dateOfBirth, 'years')} years old
									</Typography>
								</li>
							))}
						</ul>
					</AccordionDetails>
				</Accordion>
			</Paper>
		</div>
	);

	return (
		<div>
			<Header />
			<Toolbar />
			{teamData === undefined && <CircularProgress />}
			{teamData !== undefined && pastMatchData && futureMatchData && generateTeamJsx()}
			{teamData === false && (
				<Typography variant='h6' color='initial'>
					Club Not Found
				</Typography>
			)}
			<Button className={classes.button} variant='contained' onClick={() => history.push('/teams')}>
				Back to Teams
			</Button>
		</div>
	);
};

export default TeamPage;

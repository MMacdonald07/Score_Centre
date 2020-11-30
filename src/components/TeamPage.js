import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from './Header';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
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
	}
}));

const TeamPage = props => {
	const teamId = props.match.params.teamId;
	const { history } = props;
	const [teamData, setTeamData] = useState();
	const classes = useStyles();

	// Run a sortPlayer function here - can setState of 4 arrays (goalkeepers, defenders, midfielders, attackers) and one object for the coach
	// These 5 pieces of state can then be used for mapping in the accordions below and the coach in their own fact

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
			})
			.catch(function (err) {
				setTeamData(false);
			});
	}, [teamId]);

	const generateTeamJsx = () => (
		<div>
			<Typography variant='h3' color='initial'>
				{teamData.name}
			</Typography>
			<img src={teamData.crestUrl} alt='Crest' />
			<Typography variant='h6' color='initial'>
				Founded: {teamData.founded}
			</Typography>
			<Typography variant='h5' color='initial'>
				Active Competitions:
				<ul>
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
			</Typography>
			<Typography variant='h6' color='initial'>
				Manager: Coach variable goes here
			</Typography>
			<Typography variant='h6' color='initial'>
				Stadium: {teamData.venue}
			</Typography>
			<Typography variant='h6' color='initial'>
				<a href={teamData.website} className={classes.link} target='_blank' rel='noreferrer'>
					Website
				</a>
			</Typography>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} id='panel1a-header'>
					<Typography className={classes.heading}>Goalkeepers</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
						lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} id='panel2a-header'>
					<Typography className={classes.heading}>Defenders</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
						lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} id='panel3a-header'>
					<Typography className={classes.heading}>Midfielders</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
						lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} id='panel4a-header'>
					<Typography className={classes.heading}>Attackers</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
						lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>
			{console.log(teamData)}
		</div>
	);

	return (
		<div>
			<Header />
			<Toolbar />
			{teamData === undefined && <CircularProgress />}
			{teamData !== undefined && teamData && generateTeamJsx()}
			{teamData === false && (
				<Typography variant='h6' color='initial'>
					Club Not Found
				</Typography>
			)}
			<Button variant='contained' onClick={() => history.push('/teams')}>
				Back to Teams
			</Button>
		</div>
	);
};

export default TeamPage;

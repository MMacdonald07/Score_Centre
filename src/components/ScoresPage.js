import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { CircularProgress } from '@material-ui/core';
import Header from './Header';

const useStyles = makeStyles({
	datePicker: {
		margin: '0 3vw 2vh'
	},
	matchContainer: {
		padding: '2vh 3vw 1vh'
	},
	card: {
		cursor: 'pointer',
		display: 'flex',
		boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)',
		'&:hover': {
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.6), 0 6px 20px 0 rgba(0, 0, 0, 0.6)'
		},
		'&:focus': {
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.6), 0 6px 20px 0 rgba(0, 0, 0, 0.6)'
		}
	},
	cardMedia: {
		alignSelf: 'center'
	},
	cardContent: {
		alignSelf: 'center'
	}
});

const ScoresPage = () => {
	const classes = useStyles();
	const [selectedDate, setSelectedDate] = useState(Date.now());
	const [matchData, setMatchData] = useState();

	const handleDateChange = date => {
		setSelectedDate(date);
	};

	useEffect(() => {
		const formattedDate = moment(selectedDate).format('yyyy-MM-DD');

		axios
			.get(
				`https://api.football-data.org/v2/matches?competitions=PL,BL1,FL1,PD,SA,CL&dateTo=${formattedDate}&dateFrom=${formattedDate}&status=IN_PLAY,FINISHED,PAUSED,SCHEDULED`,
				{
					headers: {
						'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API_KEY
					}
				}
			)
			.then(function (res) {
				const { matches } = res.data;
				setMatchData(matches);
			});
	}, [selectedDate]);

	const getMatchJsx = match => {
		if (match.status === 'SCHEDULED') {
			if (match.competition.name === 'UEFA Champions League') {
				return (
					<Grid item xs={12} sm={6} md={4} lg={3} key={match.id}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cardMedia}
								image='https://seeklogo.com/images/U/uefa-champions-league-logo-506FCBD867-seeklogo.com.png'
								style={{ width: '150px', height: '150px' }}
							/>
							<CardContent className={classes.cardContent}>
								<Typography variant='h6' color='initial'>
									{match.group} {'\u2022'} {moment(match.utcDate).format('HH:mm')}
								</Typography>
								<Typography variant='body1' color='initial'>
									{match.homeTeam.name} Vs {match.awayTeam.name}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				);
			} else {
				return (
					<Grid item xs={12} md={6} lg={3} key={match.id}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cardMedia}
								image={match.competition.area.ensignUrl}
								style={{ width: '150px', height: '150px' }}
							/>
							<CardContent className={classes.cardContent}>
								<Typography variant='h6' color='initial'>
									{moment(match.utcDate).format('HH:mm')}
								</Typography>
								<Typography variant='body1' color='initial'>
									{match.homeTeam.name} Vs {match.awayTeam.name}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				);
			}
		} else if (match.status === 'FINISHED') {
			if (match.competition.name === 'UEFA Champions League') {
				return (
					<Grid item xs={12} sm={6} md={4} lg={3} key={match.id}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cardMedia}
								image='https://seeklogo.com/images/U/uefa-champions-league-logo-506FCBD867-seeklogo.com.png'
								style={{ width: '150px', height: '150px' }}
							/>
							<CardContent className={classes.cardContent}>
								<Typography variant='h6' color='initial'>
									{match.group} {'\u2022'} {moment(match.utcDate).format('HH:mm')}
								</Typography>
								<Typography variant='h6' color='initial'>
									Full Time:
								</Typography>
								<Typography variant='body1' color='initial'>
									{match.homeTeam.name} {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}{' '}
									{match.awayTeam.name}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				);
			} else {
				return (
					<Grid item xs={12} md={6} lg={3} key={match.id}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cardMedia}
								image={match.competition.area.ensignUrl}
								style={{ width: '150px', height: '150px' }}
							/>
							<CardContent className={classes.cardContent}>
								<Typography variant='h6' color='initial'>
									{moment(match.utcDate).format('HH:mm')}
								</Typography>
								<Typography variant='h6' color='initial'>
									Full Time:
								</Typography>
								<Typography variant='body1' color='initial'>
									{match.homeTeam.name} {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}{' '}
									{match.awayTeam.name}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				);
			}
		} else if (match.status === 'IN_PLAY' || 'PAUSED') {
			if (match.competition.name === 'UEFA Champions League') {
				return (
					<Grid item xs={12} sm={6} md={4} lg={3} key={match.id}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cardMedia}
								image='https://seeklogo.com/images/U/uefa-champions-league-logo-506FCBD867-seeklogo.com.png'
								style={{ width: '150px', height: '150px' }}
							/>
							<CardContent className={classes.cardContent}>
								<Typography variant='h6' color='initial'>
									{match.group} {'\u2022'} <span style={{ color: 'red', fontWeight: 700 }}>Live</span>
								</Typography>
								<Typography variant='h6' color='initial'>
									Current Score:
								</Typography>
								<Typography variant='body1' color='initial'>
									{match.homeTeam.name} {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}{' '}
									{match.awayTeam.name}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				);
			} else {
				return (
					<Grid item xs={12} md={6} lg={3} key={match.id}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cardMedia}
								image={match.competition.area.ensignUrl}
								style={{ width: '150px', height: '150px' }}
							/>
							<CardContent className={classes.cardContent}>
								<Typography variant='h6' color='initial' style={{ color: 'red', fontWeight: 700 }}>
									Live
								</Typography>
								<Typography variant='h6' color='initial'>
									Current Score:
								</Typography>
								<Typography variant='body1' color='initial'>
									{match.homeTeam.name} {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}{' '}
									{match.awayTeam.name}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				);
			}
		}
	};

	return (
		<div>
			<Header />
			<Toolbar />
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<KeyboardDatePicker
					className={classes.datePicker}
					disableToolbar
					variant='inline'
					format='DD-MM-yyyy'
					margin='normal'
					label='Fixtures on...'
					value={selectedDate}
					onChange={handleDateChange}
				/>
			</MuiPickersUtilsProvider>
			{matchData ? (
				<div>
					<Box style={{ maxWidth: '85%', margin: '0 auto' }}>
						<Grid container spacing={6} justify='center' className={classes.matchContainer}>
							{matchData.map(match => getMatchJsx(match))}
						</Grid>
					</Box>
				</div>
			) : (
				<>
					<CircularProgress />
				</>
			)}
			{matchData
				? matchData.length === 0 && (
						<>
							<Typography variant='h4' style={{ margin: '2vh 3vw 1vh' }}>
								No matches in the top 5 leagues or UCL today
							</Typography>
						</>
				  )
				: null}
		</div>
	);
};

export default ScoresPage;

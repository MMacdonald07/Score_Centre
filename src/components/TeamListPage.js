import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { Box, Grid, Card, CardContent, CardMedia, Typography, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import clubData from '../fetchClubs.js';

const useStyles = makeStyles({
	clubContainer: {
		padding: '0 4vw 1vh'
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
	},
	searchContainer: {
		display: 'flex',
		padding: '0 3vw',
		margin: '4vh 0 2vh'
	},
	searchIcon: {
		alignSelf: 'flex-end',
		marginBottom: '0.5vh'
	},
	searchInput: {
		margin: '5px'
	}
});

const TeamListPage = ({ history }) => {
	const classes = useStyles();
	const [filter, setFilter] = useState('');

	const getClubCard = index => {
		const { id, name, country, crest } = clubData[index];

		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={id}>
				<Card className={classes.card} onClick={() => history.push(`/teams/${id}`)}>
					<CardMedia className={classes.cardMedia} image={crest} style={{ width: '150px', height: '150px' }} />
					<CardContent className={classes.cardContent}>
						<Typography variant='h6' color='initial'>
							{name}
						</Typography>
						<Typography variant='h6' color='initial'>
							{country}
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		);
	};

	return (
		<div>
			<Header />
			<div className={classes.searchContainer}>
				<Search className={classes.searchIcon} />
				<TextField className={classes.searchInput} label='Club' variant='standard' onChange={e => setFilter(e.target.value)} />
			</div>
			{clubData ? (
				<div>
					<Box style={{ maxWidth: '85%', margin: '0 auto' }}>
						<Grid container spacing={4} justify='center' className={classes.clubContainer}>
							{Object.keys(clubData).map(
								index => clubData[index].name.toLowerCase().includes(filter.toLowerCase()) && getClubCard(index)
							)}
						</Grid>
					</Box>
				</div>
			) : (
				<>
					<CircularProgress />
				</>
			)}
		</div>
	);
};

export default TeamListPage;

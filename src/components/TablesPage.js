import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontSize: 20
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

const useStyles = makeStyles({
	container: {
		minWidth: 530
	},
	title: {
		textAlign: 'center',
		margin: '2vh 0',
		fontWeight: '700'
	},
	tableContainer: {
		padding: '5vh 0',
		marginBottom: '8vh',
		minWidth: 530,
		maxWidth: '75vw',
		maxHeight: '75vh',
		margin: '0 auto',
		backgroundColor: '#c8c8c8'
	},
	table: {
		minWidth: 400,
		maxWidth: '90%',
		maxHeight: '65vh',
		margin: '0 auto'
	}
});

const TablesPage = () => {
	const [competitionData, setCompetitionData] = useState();
	const classes = useStyles();

	useEffect(() => {
		axios
			.get('https://api.football-data.org/v2/competitions/2021/standings', {
				headers: {
					'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API_KEY
				}
			})
			.then(function (res) {
				const { data } = res;
				setCompetitionData(data);
			});
	}, []);

	const getTableRow = team => (
		<TableRow hover tabIndex={-1} key={team.team.name}>
			<TableCell component='th' scope='row'>
				{team.position}
			</TableCell>
			<TableCell>{team.team.name}</TableCell>
			<TableCell align='center'>{team.playedGames}</TableCell>
			<TableCell align='center'>{team.won}</TableCell>
			<TableCell align='center'>{team.draw}</TableCell>
			<TableCell align='center'>{team.lost}</TableCell>
			<TableCell align='center'>{team.goalsFor}</TableCell>
			<TableCell align='center'>{team.goalsAgainst}</TableCell>
			<TableCell align='center'>{team.goalDifference}</TableCell>
			<TableCell align='center'>{team.points}</TableCell>
		</TableRow>
	);

	return (
		<div>
			<Header />
			{competitionData ? (
				<div>
					<Typography className={classes.title} variant='h4' color='initial'>
						{competitionData.competition.name}
					</Typography>
					<Paper color='black' className={classes.tableContainer}>
						<TableContainer component={Paper} className={classes.table}>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										<StyledTableCell />
										<StyledTableCell />
										<StyledTableCell align='center'>Played</StyledTableCell>
										<StyledTableCell align='center'>Won</StyledTableCell>
										<StyledTableCell align='center'>Drawn</StyledTableCell>
										<StyledTableCell align='center'>Lost</StyledTableCell>
										<StyledTableCell align='center'>GF</StyledTableCell>
										<StyledTableCell align='center'>GA</StyledTableCell>
										<StyledTableCell align='center'>GD</StyledTableCell>
										<StyledTableCell align='center'>Points</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>{competitionData.standings[0].table.map(team => getTableRow(team))}</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</div>
			) : (
				<>
					<CircularProgress />
				</>
			)}
		</div>
	);
};

export default TablesPage;

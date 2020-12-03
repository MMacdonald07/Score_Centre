import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
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
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Header from './Header';

const drawerWidth = '10%';

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
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerContainer: {
		overflow: 'auto'
	},
	drawerContent: {
		marginTop: '1vh'
	},
	drawerItem: {
		textAlign: 'center'
	},
	container: {
		minWidth: 530
	},
	title: {
		textAlign: 'center',
		margin: '3vh 0',
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
	},
	tableRow: {
		cursor: 'pointer'
	},
	position: {
		borderRadius: '100%',
		width: '50%',
		height: '50%',
		padding: '8% 0%',
		background: 'white',
		border: 'solid 2px black',
		textAlign: 'center'
	},
	crest: {
		maxHeight: 25,
		maxWidth: 25
	}
});

const TablesPage = props => {
	const [competitionData, setCompetitionData] = useState();
	const classes = useStyles();
	const { history } = props;
	const leagueCode = props.match.params.leagueCode;

	const itemList = [
		{
			text: 'Premier League',
			code: 'PL',
			onClick: () => history.push('/standings/PL')
		},
		{
			text: 'Serie A',
			code: 'SA',
			onClick: () => history.push('/standings/SA')
		},
		{
			text: 'Bundesliga',
			code: 'BL1',
			onClick: () => history.push('/standings/BL1')
		},
		{
			text: 'Ligue 1',
			code: 'FL1',
			onClick: () => history.push('/standings/FL1')
		},
		{
			text: 'La Liga',
			code: 'PD',
			onClick: () => history.push('/standings/PD')
		}
	];

	useEffect(() => {
		axios
			.get(`https://api.football-data.org/v2/competitions/${leagueCode}/standings`, {
				headers: {
					'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API_KEY
				}
			})
			.then(function (res) {
				const { data } = res;
				setCompetitionData(data);
			});
	}, [leagueCode]);

	const getTableRow = team => (
		<TableRow
			className={classes.tableRow}
			hover
			tabIndex={-1}
			key={team.team.name}
			onClick={() => history.push(`/teams/${team.team.id}`)}
		>
			<TableCell component='th' scope='row'>
				<div className={classes.position}>{team.position}</div>
			</TableCell>
			<TableCell width={30} align='right'>
				<img className={classes.crest} src={team.team.crestUrl} alt={`${team.team.name} crest`} />
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
			<Drawer
				className={classes.drawer}
				variant='permanent'
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<div className={classes.drawerContent}>
						<List>
							{itemList.map(item => {
								const { text, code, onClick } = item;
								if (leagueCode === code) {
									return (
										<ListItem button selected onClick={onClick} key={text}>
											<ListItemText className={classes.drawerItem} primary={text} />
										</ListItem>
									);
								} else {
									return (
										<ListItem button onClick={onClick} key={text}>
											<ListItemText className={classes.drawerItem} primary={text} />
										</ListItem>
									);
								}
							})}
						</List>
					</div>
					<Divider />
				</div>
			</Drawer>
			{competitionData ? (
				<div>
					<Typography className={classes.title} variant='h4' color='initial'>
						{competitionData.competition.name} Table
					</Typography>
					<Paper color='black' className={classes.tableContainer}>
						<TableContainer component={Paper} className={classes.table}>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										<StyledTableCell />
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

export default withRouter(TablesPage);

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CircularProgress } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Header from './Header';

const drawerWidth = 240;

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
	}
});

const ScorersPage = props => {
	const [scorersData, setScorersData] = useState();
	const classes = useStyles();
	const { history } = props;
	const leagueCode = props.match.params.leagueCode;

	const itemList = [
		{
			text: 'Premier League',
			code: 'PL',
			onClick: () => history.push('/scorers/PL')
		},
		{
			text: 'Serie A',
			code: 'SA',
			onClick: () => history.push('/scorers/SA')
		},
		{
			text: 'Bundesliga',
			code: 'BL1',
			onClick: () => history.push('/scorers/BL1')
		},
		{
			text: 'Ligue 1',
			code: 'FL1',
			onClick: () => history.push('/scorers/FL1')
		},
		{
			text: 'La Liga',
			code: 'PD',
			onClick: () => history.push('/scorers/PD')
		},
		{
			text: 'Champions League',
			code: 'CL',
			onClick: () => history.push('/scorers/CL')
		}
	];

	useEffect(() => {
		axios
			.get(`https://api.football-data.org/v2/competitions/${leagueCode}/scorers?limit=20`, {
				headers: {
					'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API_KEY
				}
			})
			.then(function (res) {
				const { data } = res;
				setScorersData(data);
			});
	}, [leagueCode]);

	const getTableRow = (scorer, index) => (
		<TableRow hover tabIndex={-1} key={scorer.player.name}>
			<TableCell component='th' scope='row' align='center'>
				{index + 1}
			</TableCell>
			<TableCell>{scorer.player.name}</TableCell>
			<TableCell align='center'>{scorer.team.name}</TableCell>
			<TableCell align='center'>{scorer.player.nationality}</TableCell>
			<TableCell align='center'>{scorer.player.position}</TableCell>
			<TableCell align='center'>{scorer.numberOfGoals}</TableCell>
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
			{scorersData ? (
				<div>
					<Typography className={classes.title} variant='h4' color='initial'>
						{scorersData.competition.name} Top Scorers
					</Typography>
					<Paper color='black' className={classes.tableContainer}>
						<TableContainer component={Paper} className={classes.table}>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										<StyledTableCell />
										<StyledTableCell>Name</StyledTableCell>
										<StyledTableCell align='center'>Club</StyledTableCell>
										<StyledTableCell align='center'>Nationality</StyledTableCell>
										<StyledTableCell align='center'>Position</StyledTableCell>
										<StyledTableCell align='center'>Goals Scored</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>{scorersData.scorers.map((scorer, index) => getTableRow(scorer, index))}</TableBody>
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

export default withRouter(ScorersPage);

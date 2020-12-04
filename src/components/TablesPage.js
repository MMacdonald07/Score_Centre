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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Header from './Header';

const drawerWidth = 240;

const headCells = [
	{ id: 'position', label: '' },
	{ id: 'crest', label: '' },
	{ id: 'name', label: '' },
	{ id: 'playedGames', label: 'Played' },
	{ id: 'won', label: 'Won' },
	{ id: 'draw', label: 'Drawn' },
	{ id: 'lost', label: 'Lost' },
	{ id: 'goalsFor', label: 'GF' },
	{ id: 'goalsAgainst', label: 'GA' },
	{ id: 'goalDifference', label: 'GD' },
	{ id: 'points', label: 'Points' }
];

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.grey['500'],
		color: theme.palette.common.black,
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
		maxWidth: '15vw',
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
		maxWidth: '60vw',
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
	crest: {
		maxHeight: 25,
		maxWidth: 25
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1
	}
});

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
	const { classes, order, orderBy, onRequestSort } = props;
	const createSortHandler = property => e => {
		onRequestSort(e, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map(headCell => {
					if (headCell.id !== 'crest' && headCell.id !== 'name') {
						return (
							<StyledTableCell key={headCell.id} align='center' sortDirection={orderBy === headCell.id ? order : false}>
								<TableSortLabel
									active={orderBy === headCell.id}
									direction={orderBy === headCell.id ? order : 'asc'}
									onClick={createSortHandler(headCell.id)}
								>
									{headCell.label}
									{orderBy === headCell.id ? (
										<span className={classes.visuallyHidden}>
											{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
										</span>
									) : null}
								</TableSortLabel>
							</StyledTableCell>
						);
					} else {
						return <StyledTableCell key={headCell.id} align='center' />;
					}
				})}
			</TableRow>
		</TableHead>
	);
}

const TablesPage = props => {
	const [competitionData, setCompetitionData] = useState();
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('position');
	const classes = useStyles();
	const { history } = props;
	const leagueCode = props.match.params.leagueCode;

	const handleRequestSort = (e, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

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
			<TableCell component='th' scope='row' align='center'>
				{team.position}
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
								<EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
								<TableBody>
									{stableSort(competitionData.standings[0].table, getComparator(order, orderBy)).map(team =>
										getTableRow(team)
									)}
								</TableBody>
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

import React from 'react';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
	root: {
		flexGrow: 1
	},
	appBar: {
		paddingBottom: '1.5vh',
		margin: '0 auto',
		minWidth: 530
	},
	toolBar: {
		margin: '0 auto',
		width: '100%'
	},
	title: {
		flexGrow: 1,
		paddingTop: '1vh',
		paddingLeft: '1.5vw'
	},
	navButtons: {
		paddingRight: '1vw',
		paddingTop: '1vh'
	},
	navButton: {
		marginLeft: '1vw'
	}
});

const Header = ({ history }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar position='sticky' color='inherit' className={classes.appBar}>
				<Toolbar className={classes.toolBar}>
					<Typography variant='h4' className={classes.title}>
						<strong>Football Centre</strong>
					</Typography>
					<div className={classes.navButtons}>
						<Button className={classes.navButton} variant='text' color='default' onClick={() => history.push('/')}>
							Home
						</Button>
						<Button className={classes.navButton} variant='text' color='default' onClick={() => history.push('/scores')}>
							Scores &amp; Fixtures
						</Button>
						<Button className={classes.navButton} variant='text' color='default' onClick={() => history.push('/standings')}>
							Standings
						</Button>
						<Button className={classes.navButton} variant='text' color='default' onClick={() => history.push('/contributions')}>
							Goal Contributions
						</Button>
						<Button className={classes.navButton} variant='text' color='default' onClick={() => history.push('/teams')}>
							Teams
						</Button>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default withRouter(Header);

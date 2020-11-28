import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from './Header';

const useStyles = makeStyles({
	container: {
		margin: '4vh',
		textAlign: 'center'
	},
	box: {
		marginTop: '2vh'
	},
	link: {
		cursor: 'pointer',
		color: 'green',
		'&:hover': {
			borderBottom: '2px solid green'
		},
		'&:focus': {
			borderBottom: '2px solid green'
		}
	}
});

const HomePage = ({ history }) => {
	const classes = useStyles();
	return (
		<div>
			<Header />
			<div className={classes.container}>
				<Typography variant='h4' color='initial'>
					Welcome to the best site for looking at the standings and stats of the top 5 leagues
				</Typography>
				<div className={classes.box}>
					<Typography variant='h5' color='initial'>
						Get started with League Standings{' '}
						<span className={classes.link} onClick={() => history.push('/standings/PL')}>
							here
						</span>
					</Typography>
					<Typography variant='h5' color='initial'>
						Take a look at the top goalscorers in each league{' '}
						<span className={classes.link} onClick={() => history.push('/scorers/PL')}>
							here
						</span>
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default HomePage;

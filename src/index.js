import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';

export const history = createBrowserHistory();

ReactDOM.render(
	<React.StrictMode>
		<Router history={history}>
			<CssBaseline>
				<App />
			</CssBaseline>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

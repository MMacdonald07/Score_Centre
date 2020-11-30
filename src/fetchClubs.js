import axios from 'axios';

let clubData = {};

axios
	.get('https://api.football-data.org/v2/competitions/PL/teams', {
		headers: {
			'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API_KEY
		}
	})
	.then(function (res) {
		const results = res.data.teams;
		results.forEach((result, index) => {
			clubData[index + 1] = {
				id: result.id,
				name: result.shortName,
				country: result.area.name,
				crest: result.crestUrl
			};
		});
	});
axios
	.get('https://api.football-data.org/v2/competitions/BL1/teams', {
		headers: {
			'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API_KEY
		}
	})
	.then(function (res) {
		const results = res.data.teams;
		results.forEach((result, index) => {
			clubData[index + 21] = {
				id: result.id,
				name: result.shortName,
				country: result.area.name,
				crest: result.crestUrl
			};
		});
	});
axios
	.get('https://api.football-data.org/v2/competitions/FL1/teams', {
		headers: {
			'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API_KEY
		}
	})
	.then(function (res) {
		const results = res.data.teams;
		results.forEach((result, index) => {
			clubData[index + 39] = {
				id: result.id,
				name: result.shortName,
				country: result.area.name,
				crest: result.crestUrl
			};
		});
	});
axios
	.get('https://api.football-data.org/v2/competitions/SA/teams', {
		headers: {
			'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API_KEY
		}
	})
	.then(function (res) {
		const results = res.data.teams;
		results.forEach((result, index) => {
			clubData[index + 59] = {
				id: result.id,
				name: result.shortName,
				country: result.area.name,
				crest: result.crestUrl
			};
		});
	});
axios
	.get('https://api.football-data.org/v2/competitions/PD/teams', {
		headers: {
			'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API_KEY
		}
	})
	.then(function (res) {
		const results = res.data.teams;
		results.forEach((result, index) => {
			clubData[index + 79] = {
				id: result.id,
				name: result.shortName,
				country: result.area.name,
				crest: result.crestUrl
			};
		});
	});

export default clubData;

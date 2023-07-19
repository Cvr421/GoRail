const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://irctc1.p.rapidapi.com/api/v1/searchStation',
  params: {query: 'BJU'},
  headers: {
    'X-RapidAPI-Key': '9c248aaca0mshc85e458d73181aep142993jsn7fb3773c1575',
    'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
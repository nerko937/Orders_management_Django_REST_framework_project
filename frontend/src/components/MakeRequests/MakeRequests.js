const axios = require('axios');

async function getOrders(searchData) {

	let url = 'http://127.0.0.1:8000/api/orders/' 
	url = searchData ? url + '?order_name=' + searchData : url;

	let ret = {}

	try {
		const response = await axios.get(url);
		console.log(response);
	} catch (error) {
		ret[error] = error
	}
	return ret;
	
  }

  export default getOrders;

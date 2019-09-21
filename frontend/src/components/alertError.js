function alertError(error) {
	let errors = JSON.parse(error.request.response);
	let msg = ''
	for (let [key, value] of Object.entries(errors)) {
		msg += key + ' - ' + value + '\n'
	}
	alert(msg);
};

export default alertError;
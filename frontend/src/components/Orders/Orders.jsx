import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Orders extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null,
			isLoading: false,
			error: null
		}
	};

	setColor = (realisationDate, status) => {
		const TODAY = new Date();
		if (status === true) {
			return 'table-success'
		} else if (TODAY >= new Date(realisationDate + ' 0:00:00')) {
			return 'table-danger';
		} else {
			return ''
		}
	}

	shouldComponentUpdate(nextProps) {
			console.log(this.props.dataToSearch);
			console.log(nextProps.dataToSearch);
			return true
	}

	componentWillMount() {
		this.setState({ isLoading: true });
		
		const searchData = this.props.searchData
		let url = 'http://127.0.0.1:8000/api/orders/' 
		url = searchData ? url + '?order_name=' + searchData : url;

		axios.get(url)
			.then(response => {
				this.setState({
					data: response.data,
					isLoading: false
				})
			})
			.catch(error => {
				this.setState({
					error: error,
					isLoading: false
				})
			});
	}

	render() {
		const { data, isLoading, error } = this.state;
	
		if (error) {
		  return <p>{error.message}</p>;
		}
	
		if (isLoading) {
		  return <p>Loading ...</p>;
		}
	
		return (
			<div className="m-5">
			<table className="table border">
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Status</th>
						<th>Realisation date</th>
					</tr>
				</thead>
				<tbody>
					{data.map(elem =>
					<tr 
						key={elem.id}
						className={
							this.setColor(
								elem.realisation_limit_date, elem.status
							)
						}
					>
						<td>{elem.name}</td>
						<td>{elem.order_type}</td>
						<td>{elem.status ? 'finished' : 'unfnished'}</td>
						<td>{elem.realisation_limit_date}</td>
					</tr>
					)}
				</tbody>
			</table>
		</div>
		
		);
	  }
}

export default Orders;

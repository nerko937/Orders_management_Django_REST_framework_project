import React from 'react';
import defaultInstance from '../axiosInstances';


class Orders extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null,
			isLoading: true,
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

	async getOrders() {

		this.setState({ isLoading: true });
		
		let dataToSearch = this.props.dataToSearch;
		let urlEnd = 'orders/';
		urlEnd = dataToSearch ? urlEnd + '?order_name=' + dataToSearch : urlEnd;

		try {
			const response = await defaultInstance.get(urlEnd);
			this.setState({
				data: response.data,
				isLoading: false
			})
		} catch (error) {
			this.setState({
				error: error,
				isLoading: false
			})
		}
	}

	componentDidMount() {
		this.getOrders();
	}

	componentDidUpdate(prevProps) {
		if (this.props.dataToSearch !== prevProps.dataToSearch) {
			this.getOrders();
		}
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
						key={elem.pk}
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

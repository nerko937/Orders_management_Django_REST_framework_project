import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class ShowResults extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }

  setColor = (realisationDate, status) => {
	const today = new Date();
	if (status === 'true') {
		return 'table-success'
	} else if (today >= realisationDate) {
		return 'table-danger';
	} else {
		return ''
	}
  }

  componentDidMount() {
	this.setState({ isLoading: true });
	
	let url = '';
	const showSpecified = this.state.showSpecified

	if (showSpecified) {
		url = "127.0.0.1:8000/api/orders/?order_name=" + showSpecified;
	} else {
		url = "127.0.0.1:8000/api/orders/"
	}

    axios.get(url)
      .then(result => this.setState({
        hits: result.data.hits,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  render() {
	const { hits, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
		<div class="m-5">
		<table class="table border">
			<thead>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Status</th>
					<th>Realisation date</th>
				</tr>
			</thead>
			<tbody>
				{hits.map(hit =>
				<tr 
					key={hit.id}
					class={this.setColor(hit.realisation_limit_date, hit.status)}
				>
					<td>{hit.name}</td>
					<td>{hit.order_type}</td>
					<td>{hit.status}</td>
					<td>{hit.realisation_limit_date}</td>
				</tr>
				)}
			</tbody>
		</table>
	</div>
    );
  }
}

export default ShowResults;
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar.jsx';
import Orders from './Orders.jsx';


class NavBar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			dataToSearch: null
		  };
	};

	searchCallback = (data) => {
		this.setState({dataToSearch: data})
	}

	render() {
		return (
			<div>
				<NavBar />
				<main>
					<Orders dataToSearch={this.state.dataToSearch} />
				</main>
			</div>
    	);
  	}
}

export default NavBar;

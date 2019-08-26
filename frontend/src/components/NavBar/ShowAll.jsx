import React from 'react';
import ReactDOM from 'react-dom';


class NavBar extends React.Component {

	constructor(props) {
		super(props);
	};

	clickHandler  = (event) => {
		event.preventDefault();
		this.props.searchCallback('');
	}

	render() {
		return (
			<a
					className="navbar-brand"
					href="#"
					onClick={this.clickHandler}
			>
				Show all orders
			</a>
		);
	}
}

export default NavBar;

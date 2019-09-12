import React from 'react';


class NavBar extends React.Component {

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

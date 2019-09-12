import React from 'react';
import ShowAll from './ShowAll';
import SearchForm from './SearchForm';


class NavBar extends React.Component {

	render() {
		return (
			<nav className="navbar navbar-dark bg-danger">
				<ShowAll searchCallback={this.props.searchCallback} />
				<SearchForm searchCallback={this.props.searchCallback} />
			</nav>
		);
	}
}

export default NavBar;
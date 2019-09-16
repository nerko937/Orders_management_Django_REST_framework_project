import React from 'react';
import SearchForm from './SearchForm';
import UserManagement from './UserManagement';


class NavBar extends React.Component {

	render() {
		return (
			<nav className="navbar navbar-dark bg-danger">

				<span className="navbar-brand my-1 h1">Orders Management</span>

				<SearchForm searchCallback={this.props.searchCallback} />

				<UserManagement />

			</nav>
		);
	}
}

export default NavBar;
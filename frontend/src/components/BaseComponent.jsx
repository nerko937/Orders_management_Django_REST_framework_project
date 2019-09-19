import React from 'react';
import NavBar from './NavBar/NavBar';
import Orders from './Orders/Orders';
import Modal from './Modals/Modal'


class BaseComponent extends React.Component {

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
				<header>
					<NavBar searchCallback={this.searchCallback}/>
				</header>
				
				<main>
					<Orders dataToSearch={this.state.dataToSearch} />
					<Modal title={'Register'} />
					<Modal title={'Update User'} />
				</main>
			</div>
    	);
  	}
}

export default BaseComponent;

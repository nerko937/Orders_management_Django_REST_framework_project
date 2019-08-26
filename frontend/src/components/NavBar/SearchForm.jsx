import React from 'react';
import ReactDOM from 'react-dom';


class NavBar extends React.Component {

	constructor(props) {
		super(props);
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.props.searchCallback(event.target.elements.search.value);
	}

	render() {
		return (
			<form
					className="form-inline my-2"
					onSubmit={this.submitHandler}	
				>
				<input
						className="form-control"
						type="text"
						name="search"
						placeholder="Search"
						aria-label="Search"
						style={{ width: "30vw" }}
				/>
				<button 
						className="btn btn-info my-2" 
						type="submit"
				>
					Search
				</button>
			</form>
		);
	}
}

export default NavBar;

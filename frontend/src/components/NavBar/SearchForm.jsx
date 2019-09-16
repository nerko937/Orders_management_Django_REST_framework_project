import React from 'react';


class NavBar extends React.Component {

	submitHandler = (event) => {
		event.preventDefault();
		this.props.searchCallback(event.target.elements.search.value);
	}

	showAllHandler = (event) => {
		event.preventDefault();
		this.props.searchCallback(null);
	}

	render() {
		return (
			<form
					className="form-inline"
					onSubmit={this.submitHandler}	
				>
				<input
						className="form-control"
						type="text"
						name="search"
						placeholder="Search"
						aria-label="Search"
				/>
				<button 
						className="btn btn-info mx-1" 
						type="submit"
				>
					Search
				</button>
				<button
						className="btn btn-primary"
						onClick={this.showAllHandler}
				>
					Show all
				</button>
			</form>
		);
	}
}

export default NavBar;

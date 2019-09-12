import React from 'react';


class NavBar extends React.Component {

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

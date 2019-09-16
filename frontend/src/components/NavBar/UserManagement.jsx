import React from 'react';
import axios from '../axiosInstance';


class UserManagement extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: null,
			isLoading: true
		}
	};

	loginHandler = async (event) => {
		event.preventDefault();
		this.setState({isLoading: true})
		let userData = {
			username: event.target.elements.username.value,
			password: event.target.elements.password.value
		}
		try {
			const response = await axios.post('auth/login/', userData);
			if (response.status === 200) {
				localStorage.setItem('token', response.data.key);
				this.setState({username: userData.username, isLoading: false});
			}
		} catch (error) {
			this.setState({isLoading: false})
			alert(error);
		}
	}
	
	logoutHandler = async () => {
		try {
			const response = await axios.post('auth/logout/');
			if (response.status === 200) {
				localStorage.removeItem('token');
				localStorage.removeItem('isStaff');
				this.setState({username: null});
			}
		} catch (error) {
			alert(error);
		}
	}

	async componentDidMount() {
		this.setState({isLoading: true})
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const response = await axios.get(
					'users/self/',
					{headers: {'Authorization': 'Token ' + token}}
				);
				this.setState({username: response.data.username, isLoading: false});
				localStorage.setItem('isStaff', response.data.is_staff);
			} catch (error) {
				alert(error);
			}
		}
	}

	componentDidUpdate(prevState) {
		if (this.state.username !== prevState.username) {
			return true
		}
	}

	render() {
		const {username, isLoading} = this.state;
		if (isLoading) {
			return <p>Loading...</p>
		} else if (username) {
			return (
				<ul className="nav">
                    <li className="navbar-text">
                        logged as: {username}
                    </li>
                    <li className="nav-item my-auto mx-2">
						<i className="fas fa-user user-ico fa-lg"></i>
                    </li>
                    <li className="nav-item my-auto">
                        <i className="fas fa-sign-out-alt user-ico fa-lg" onClick={this.logoutHandler}></i>
                    </li>
                </ul>
			)
		} else {
			return (
				<form className="form-inline" onSubmit={this.loginHandler}>
					<button className="btn btn-secondary mr-3">Sign up</button>

					<input
							name="username"
							className="form-control"
							type="text"
							placeholder="Username"
							aria-label="Username"
							style={{ width: "175px" }}
					/>
					<input
							name="password"
							className="form-control mx-1"
							type="password"
							placeholder="Password"
							aria-label="Password"
							style={{ width: "175px" }}
					/>
					<button className="btn btn-info" type="submit">Sign in</button>
				</form>
			)
		}
	}

}

export default UserManagement;
import React from 'react';
import $ from 'jquery';
import {defaultInstance, authInstance} from '../axiosInstances';
import alertError from '../alertError';


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
			const response = await defaultInstance.post('auth/login/', userData);
			if (response.status === 200) {
				localStorage.setItem('token', response.data.key);
				this.setState({username: userData.username, isLoading: false});
			}
		} catch (error) {
			this.setState({isLoading: false})
			alertError(error);
		}
	}
	
	logoutHandler = async () => {
		try {
			const response = await defaultInstance.post('auth/logout/');
			if (response.status === 200) {
				localStorage.removeItem('token');
				localStorage.removeItem('isStaff');
				this.setState({username: null});
			}
		} catch (error) {
			alertError(error);
		}
	}

	updateUserHandler() {
		$('#modalUpdateUser').modal('show')
	}

	registerButtonHandler() {
		$('#modalRegister').modal('show')
	}

	async componentDidMount() {
		if (localStorage.getItem('token')) {
			this.setState({isLoading: true})
			try {
				const response = await authInstance.get('users/self/');
				this.setState({
					username: response.data.username,
					isLoading: false
				});
				localStorage.setItem('isStaff', response.data.is_staff);
			} catch (error) {
				alertError(error);
			}
		} else {
			this.setState({isLoading: false})
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
						<i
								className="fas fa-user user-ico fa-lg"
								onClick={this.updateUserHandler}
						></i>
                    </li>
                    <li className="nav-item my-auto">
						<i
								className="fas fa-sign-out-alt user-ico fa-lg"
								onClick={this.logoutHandler}
						></i>
                    </li>
                </ul>
			)
		} else {
			return (
				<form className="form-inline" onSubmit={this.loginHandler}>
					<button
							type="button"
							className="btn btn-secondary mr-3"
							onClick={this.registerButtonHandler}
					>
						Sign up
					</button>

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
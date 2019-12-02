import React from 'react';
import ModalParent from './ModalParent';
import {defaultInstance, authInstance} from '../axiosInstances';
import alertError from '../alertError';


class Modal extends ModalParent {


	async registerHandler(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		try {
			const response = await defaultInstance.post(
				'auth/registration/', data
			);
			localStorage.setItem('token', response.data.key);
			window.location.reload();
		} catch (error) {
			alertError(error);
		}
	}

	async updateUserHandler(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		try {
			await authInstance.patch(
				'auth/user/', data
			);
			window.location.reload();
		} catch (error) {
			alertError(error);
		}
	}

	async changePasswordHandler(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		try {
			const response = await authInstance.post(
				'auth/password/change/', data
			);
			alert('Password changed successfuly');
		} catch (error) {
			alertError(error);
		}
	}

	buildModalBody() {
		const title = this.props.title;

		return (
			<div>
				<form
						onSubmit={
							title === 'Register' ?
							this.registerHandler 
							: this.updateUserHandler
						}
				>

					{this.inputField('Username')}
					{this.inputField('Email', 'email')}
					{this.inputField('First Name')}
					{this.inputField('Last Name')}
													
					{
						title === 'Register' ?
							<div>
								{this.inputField(
									'Password',
									'password',
									'password1'
								)}
								{this.inputField(
									'Repeat Password',
									'password',
									'password2'
								)}
							</div>

						: ''
					}

					{this.submitButton(title)}
					
				</form>

				{
					title === 'Update User' ?

						<form className="mt-5"
						onSubmit={this.changePasswordHandler}>

							{this.inputField(
								'New Password',
								'password',
								'new_password1'
							)}
							{this.inputField(
								'Repeat Password',
								'password',
								'new_password2'
							)}

							{this.submitButton('Change password')}

						</form>
					
					: ''
				}
			</div>
		)
	}

	render() {
		const title = this.props.title;

		return <div>{this.modal(title, this.buildModalBody())}</div>
	}

}

export default Modal;

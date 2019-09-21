import React from 'react';
import defaultInstance from '../axiosInstances';
import alertError from '../alertError';


class Modal extends React.Component {

	constructor(props) {
		super(props);
		this.registerHandler = this.registerHandler.bind(this);
	};

	inputField(inputName, attributeType='text', specialName=null) {
		const htmlAttr = inputName.toLowerCase().replace(' ', '_');
		const attrEnding = '_' + this.props.title.toLowerCase();
		return (
			<div className="form-group row">
				<label
						htmlFor={htmlAttr + attrEnding}
						className="col-sm-4 col-form-label"
				>
					{inputName}
				</label>
				<div className="col-sm-8">
					<input
							name={specialName ? specialName : htmlAttr}
							type={attributeType}
							className="form-control"
							id={htmlAttr + attrEnding}
							placeholder={inputName}
					/>
				</div>
			</div>
		)
	}

	submitButton(name) {
		return (
			<div className="form-group">
				<button type="submit"
						className="btn btn-primary btn-block"
				>
					{name}
				</button>
			</div>
		)
	}

	async registerHandler(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		// const fields = event.target.elements;
		// let data = {}
		// for (let index = 0; index < fields.length; index++) {
		// 	if (fields[index].name === '') {break}
		// 	data[fields[index].name] = fields[index].value;
		// }
		// data = JSON.stringify(data);
		// console.log(data);
		try {
			const response = await defaultInstance.post('auth/registration/', data);
			localStorage.setItem('token', response.data.key);
			window.location.reload();
		} catch (error) {
			alertError(error);
		}
		
	}

	render() {
		const title = this.props.title;

		return (
			<div
					className="modal"
					tabIndex="-1"
					role="dialog"
					id={"modal" + title.replace(' ', '')}
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{title}</h5>
							<button type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form
									onSubmit={
										title === 'Register' ?
										this.registerHandler 
										: null
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

									<form className="mt-5">

										{this.inputField(
											'New Password', 'password'
										)}
										{this.inputField(
											'Repeat Password', 'password'
										)}

										{this.submitButton('Change password')}

									</form>
								
								: ''
							}

						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default Modal;

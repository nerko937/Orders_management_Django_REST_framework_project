import React from 'react';


class Modal extends React.Component {

	inputField(inputName, formTitle, attributeType='text') {
		const htmlAttr = inputName.replace(' ', '');
		return (
			<div className="form-group row">
				<label
						htmlFor={htmlAttr + formTitle}
						className="col-sm-4 col-form-label"
				>
					{inputName}
				</label>
				<div className="col-sm-8">
					<input
							type={attributeType}
							className="form-control"
							id={htmlAttr + formTitle}
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
							<form>

								{this.inputField('Username', title)}
								{this.inputField('Email', title, 'email')}
								{this.inputField('First Name', title)}
								{this.inputField('Last Name', title)}
																
								{
									title.toLowerCase() === 'update user' ? '' :
									<div>
										{this.inputField(
											'Password', title, 'password'
										)}
										{this.inputField(
											'Repeat Password', title, 'password'
										)}
									</div>
								}

								{this.submitButton(title)}
								
							</form>

							{
								!(title.toLowerCase() === 'update user') ? '' :

								<form className="mt-5">

									{this.inputField(
										'Password', title, 'password'
									)}
									{this.inputField(
										'Password-repeat', title, 'password'
									)}

									{this.submitButton('Change password')}

								</form>
							}

						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default Modal;

import React from 'react';


class ModalParent extends React.Component {


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

	selectField(options, name) {
		return (
			<select className="form-control" name={name}>
				{options.map((value, index) => {
					const val = typeof(value) === Object ? value.value : value[0]
					const text = typeof(value) === Object ? value.text : value[1]
					return <option value={val} key={index}>
							   {text}
						   </option>
				})}
			</select>
		)	
	}

	radioField(name, value, text) {
		return (
			<div className="form-check">
				<input className="form-check-input"
						type="radio" name={name}
						value={value}
				/>
				<label className="form-check-label">
					{text}
				</label>
			</div>
		)
	}

	checkboxField(name, text) {
		return (
			<div className="form-check">
				<input className="form-check-input" type="checkbox" name={name}/>
				<label className="form-check-label">
					{text}
				</label>
			</div>
		)
	}

	submitButton(name) {
		return (
			<div className="form-group form-check-inline">
				<button type="submit"
						className="btn btn-primary btn-block"
				>
					{name}
				</button>
			</div>
		)
	}

	modal(title, body) {
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
							{body}
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default ModalParent;

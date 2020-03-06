import React from 'react';
import ModalParent from './ModalParent';
import {defaultInstance, authInstance} from '../axiosInstances';
import alertError from '../alertError';


class Modal extends ModalParent {


	createOrder() {
		return true
	}

	updateOrder() {
		return true
	}

	buildModalBody() {
		const title = this.props.title;
		const options = [
			{value: 'pieces', text: 'Raw pieces'},
			{value: 'chain', text: 'Chain'},
			{value: 'welded construction', text: 'Welded construction'}
		]
		const progressTypes = [
			{name: 'heat_treatment', text: 'Heat Treatment'},
			{name: 'assembly', text: 'Assembly'},
			{name: 'weld', text: 'Weld'}
		]

		return (
			<form
					onSubmit={
						title === 'New Order' ?
						this.createOrder
						: this.updateOrder
					}
			>

				{this.inputField('Name')}
				{this.selectField(options, 'order_type')}
				{this.inputField('barcode', 'number')}
				<label>Creation date:</label>
				<input type="date" name="creation_date" />
				<label>Deadline:</label>
				<input type="date" name="realisation_limit_date" />

				{this.checkboxField('pieces_made', 'Are pieces made?')}
				{progressTypes.map((value, index) => {
					return (
						<div key={index}>
							<span>{value.text}</span>
							{this.radioField(value.name, '', 'N/A')}
							{this.radioField(value.name, false, 'Unfinished')}
							{this.radioField(value.name, true, 'Finished')}
						</div>
					)
				})}
				{this.checkboxField('finish_status', 'Is order finished?')}
											
			</form>
		)
	}

	render() {
		const title = this.props.title;

		return <div>{this.modal(title, this.buildModalBody())}</div>
	}

}

export default Modal;

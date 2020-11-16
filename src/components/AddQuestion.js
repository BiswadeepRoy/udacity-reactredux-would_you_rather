import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
	state = {
		optionOneText: '',
		optionTwoText: '',
		dashboardRedirect: false
	};

	handleInputChange = (event, type) => {
		const value = event.target.value;

		this.setState((currentState) => {
			return type === 'option1' ? { ...currentState, optionOneText: value } : { ...currentState, optionTwoText: value }
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const { dispatch } = this.props
		const { optionOneText, optionTwoText } = this.state

		optionOneText !== '' || optionTwoText !== '' ? dispatch(handleAddQuestion(optionOneText, optionTwoText))  : alert('Please enter the texts')
		optionOneText !== '' || optionTwoText !== '' ? this.setState({ optionOneText: '', optionTwoText: '', dashboardRedirect: true }): this.setState( currentState => currentState)
	}

	render() {
		const { dashboardRedirect } = this.state;

		if (dashboardRedirect) {
			return <Redirect to='/dashboard' />
		}
		else {
			return (
				<div className="card-item new-question">
					<div className="card-header">Create New Question</div>
					<form onSubmit={this.handleSubmit}>
						<div className="caption">Would you rather...</div>
						<input
							name="optionOneText"
							type="text"
							placeholder="Enter Option One Text ..."
							value={this.state.optionOneText}
							onChange={(event) => this.handleInputChange(event, 'option1')} />
						<div className="caption">
							Or
						</div>
						<input
							name="optionTwoText"
							type="text"
							placeholder="Enter Option Two Text ..."
							value={this.state.optionTwoText}
							onChange={(event) => this.handleInputChange(event, 'option2')} />

						<button type="submit">Submit Poll</button>
					</form>
				</div>
			)
		}
	}
}

export default connect()(NewQuestion);
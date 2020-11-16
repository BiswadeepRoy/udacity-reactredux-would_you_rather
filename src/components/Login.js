import React, { Component } from 'react';
import { loginAuthedUser, logoutAuthedUser } from '../actions/authedUser';
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

class Login extends Component {
	state = {
		userId: null,
		dashboardRedirect: false,
	}

	componentDidMount() {
		this.props.dispatch(logoutAuthedUser())
	}

	handleUserChanged = function (event) {
		const userId = event.target.value;

		this.setState( (currentState) => {
			return {
				...currentState,
				userId,
			};
		});
	}

	handleLogin = function () {
		const { userId } = this.state;
		const { dispatch } = this.props;

		dispatch(loginAuthedUser(userId));

		this.setState((currentState) => {
			return {
				...currentState,
				dashboardRedirect: true,
			};
		});
	}

	render() {
		const { userId, dashboardRedirect } = this.state;
		const { users } = this.props;
		const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
		const selected = userId ? userId : 'default'

		if (dashboardRedirect) {
			return <Redirect to={from} />
		}
		else
		{
			return (
				<div className='card login'>
					<div className="card-header"><div>Welcome To Would You Rather App</div></div>
					<div className='user-select'>
						<div>Please sign in to continue .. </div>
						<select id="user-login" value={selected} onChange={(event) => this.handleUserChanged(event)}>
							<option value="default" disabled>Select user...</option>
							{Object.keys(users).map(function (key) {
								return (
									<option value={users[key].id} key={key}>
										{users[key].name}
									</option>
								);
							})}
						</select>
					</div>
	
					<button
						className='button'
						disabled={userId === null}
						onClick={(event) => this.handleLogin(event)}>
						Login
					</button>
				</div>
			)
		}
	}
}

function mapStateToProps({ users }) {

	return {users}

}

export default withRouter(connect(mapStateToProps)(Login));
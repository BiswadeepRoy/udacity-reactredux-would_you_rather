import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Login from './Login'
import Error from './Error'
import ViewPoll from './ViewPoll'
import AddQuestion from './AddQuestion'
import Leaderboard from './Leaderboard'
import Nav from './Nav'
import ProtectedRoute from './ProtectedRoute'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}

	render() {
		return (
			<Router>
				<Fragment>
					<div className='container'>
						<Nav />
						<div className="main-content">
							<Switch>
								<Route path="/" exact component={Login} />
								<ProtectedRoute path='/dashboard' exact component={Dashboard} />
								<ProtectedRoute path='/add' exact component={AddQuestion} />
								<ProtectedRoute path='/question/:id' component={ViewPoll} />
								<ProtectedRoute path='/leaderboard' component={Leaderboard} />
								<Route path="/not-found" component={Error} />
							</Switch>
						</div>
					</div>
				</Fragment>
			</Router>
		)
	}
}

export default connect()(App);

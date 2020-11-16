import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
    render() {
        const { authedUser } = this.props
        const avatar = authedUser ? authedUser.avatarURL : 'placeholder.png'
        const name = authedUser ? authedUser.name : ''
        return (


            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink exact to='/dashboard' activeClassName='active'>
                            Home
                    </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='active'>
                            New Question
                    </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            Leader Board
                    </NavLink>
                    </li>
                    {
                        authedUser
                        && <li className="user-info">
                            <NavLink to='/' activeClassName='active'>
                                <div className="user-nav">
                                    <span>Hello <img src={avatar} alt='avatar' className='avatar-nav' /> {name}   <span className='logout'>Logout</span></span>
                                </div>
                            </NavLink>
                        </li>
                    }
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({ authedUser, users }, props) {
    return {
        users,
        authedUser: users[authedUser]
    }

}
export default connect(mapStateToProps)(Nav)
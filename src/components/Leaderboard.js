import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
    render() {
        const usersScores = this.props.usersScores
        const sortedUsers = usersScores.sort((a, b) => b.totalScore - a.totalScore)

        return (
            <ul className="leaderboard">
                {sortedUsers.map((user) => (
                    <li key={user.id}>
                        <div className="card">
                            <div className="card-section section-1">
                                <img alt={user.name + 'avatar'} className="avatar" src={`/${user.avatarURL}`} />
                            </div>
                            <div className="card-section section-2">
                                <div className="user-name">
                                    {user.name}
                                </div>
                                <div>
                                    <span className="user-answered">
                                        <span>Answered questions </span>
                                        <span>{Object.keys(user.answers).length} , </span>
                                    </span>
                                    <span className="user-questions">
                                        <span>Created questions </span>
                                        <span>{user.questions.length}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="card-section section-3">
                                <div className="total-score-header">Total Score</div>
                                <div className="total-score-count">{user.totalScore}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }
}

function mapStateToProps({ users }) {

    const usersScores = Object.values(users).map((user) => {
        const totalScore = Object.keys(user.answers).length + user.questions.length
        return Object.assign(user, { totalScore: totalScore })
    })
    return {
        usersScores
    }
}

export default connect(mapStateToProps)(Leaderboard);
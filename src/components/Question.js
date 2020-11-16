import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
    render() {
        const { question, author } = this.props;
        // 
        return (
            <div className="card">
                <div className="card-header">{author.name} asks</div>
                <div className="card-body">
                    <div className="card-content">
                        <img alt={author.name + 'avatar'} className="avatar" src={`/${author.avatarURL}`} /> 
                    </div>

                    <div className="question-body">
                        <div className="tagline">Would you rather</div>
                        <div className="question-text">{question.optionOne.text} ..</div>
                        <button className="button-default">View Poll</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    const author = question ? users[question.author] : users[authedUser]

    return {
        question,
        author,
        authedUser
    }
}

export default connect(mapStateToProps)(Question);
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom';

class ViewPoll extends Component {
    
    state = {
        answerChosen: ''
    }

    chooseAnswer(answer) {

        this.setState(() => {
            return { answerChosen: answer }
        })
    }

    submitAnswer(e) {

        e.preventDefault()

        this.props.dispatch(handleAddAnswer({
            qid: this.props.id,
            authedUser: this.props.authedUser,
            answer: this.state.answerChosen,
        }))
    }

    render() {
        const { question, author, answered, answer, optionOneVotes, optionTwoVotes, totalVotes, optionOnePercentage, optionTwoPercentage } = this.props;
        const { answerChosen } = this.state;

        if (!question) {
            return <Redirect to="/not-found" />
        }

        return (
            <div className={answered ? 'card question-detail' : 'card'}>
                {answered ? (
                    <div className="card-header">Asked by {author.name}</div>
                ) : (
                        <div className="card-header">{author.name} asks</div>
                    )}
                <div className="card-body">
                    <div className="card-content">
                        <img alt={author.name + 'avatar'} className="avatar" src={`/${author.avatarURL}`} />
                    </div>

                    {!answered ? (
                        <div className="question-body">
                            <div className="tagline">Would you rather....</div>
                            <div className={answerChosen === 'optionOne' ? 'option option-selected' : 'option'} onClick={() => { this.chooseAnswer('optionOne') }}>
                                {question.optionOne.text}
                            </div>
                            <div className={answerChosen === 'optionTwo' ? 'option option-selected' : 'option'} onClick={() => { this.chooseAnswer('optionTwo') }}>
                                {question.optionTwo.text}
                            </div>
                            <button className={answerChosen ? 'button-default' : 'disabled'} onClick={(e) => { this.submitAnswer(e) }}>
                                Submit
                            </button>
                        </div>
                    ) : (
                            <div className="question-body">
                                <div className="tagline">Results: </div>
                                <div className={answer === 'optionOne' ? 'option-container selected' : 'option-container'}>
                                    <div>{question.optionOne.text}</div>

                                    <div className="poll-content">
                                        <div>{optionOneVotes} out of {totalVotes} votes</div>
                                        <div>{optionOnePercentage}% votes in favour</div>
                                    </div>
                                    {answer === 'optionOne' ? <div className="your-pick">Your pick</div> : null}
                                </div>

                                <div className={answer === 'optionTwo' ? 'option-container selected' : 'option-container'}>
                                    <div>{question.optionTwo.text}</div>

                                    <div className="poll-content">
                                        <div>{optionTwoVotes} out of {totalVotes} votes</div>
                                        <div>{optionTwoPercentage}% votes in favour</div>
                                    </div>
                                    {answer === 'optionTwo' ? <div className="your-pick">Your pick</div> : null}                                </div>
                            </div>
                        )}

                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { match }) {
    
    const id = match.params.id
    const question = questions[id]
    const author = question ? users[question.author] : null
    const answered = question ? (question.optionOne.votes.indexOf(authedUser) > -1 || question.optionTwo.votes.indexOf(authedUser) > -1) : false
    const answer = users[authedUser].answers[id]
    const optionOneVotes = question ? question.optionOne.votes ? question.optionOne.votes.length : 0 : 0
    const optionTwoVotes = question ? question.optionTwo.votes ? question.optionTwo.votes.length : 0 : 0
    const totalVotes = optionOneVotes + optionTwoVotes
    const optionOnePercentage = optionOneVotes !== 0 ? parseInt((optionOneVotes / totalVotes) * 100, 10) : 0
    const optionTwoPercentage = optionTwoVotes !== 0 ? parseInt((optionTwoVotes / totalVotes) * 100, 10) : 0

    return {
        id, authedUser, question, author, answered, answer, optionOneVotes, optionTwoVotes, totalVotes, optionOnePercentage, optionTwoPercentage
    }
}

export default connect(mapStateToProps)(ViewPoll);
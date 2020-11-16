import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Question from './Question'

class Dashboard extends Component {
    state = {
        toggleAnswered: false
    }
    filterQuestions = (toggleAnswered) => {
        this.setState(() => {
            return { toggleAnswered: toggleAnswered }
        })

    }
    render() {
        const { toggleAnswered } = this.state;
        const { questions, authedUser } = this.props
        const filteredQuestions = Object.values(questions).filter(function (question) {
            const unanswered = (
                question.optionOne.votes.indexOf(authedUser) > -1 ||
                question.optionTwo.votes.indexOf(authedUser) > -1
            );
            return toggleAnswered ? unanswered : !unanswered;
        });
        const sortedQuestions = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp);
        return (
            <div>
                <div className="button-group">
                    <button className={!toggleAnswered ? 'button-selected' : 'button-default'} onClick={() => this.filterQuestions(false)}>Unanswered Questions</button>
                    <button className={toggleAnswered ? 'button-selected' : 'button-default'} onClick={() => this.filterQuestions(true)}>Answered Questions</button>
                </div>

                <ul className="questions-container">
                    {sortedQuestions.map((question) => {
                        console.log(question)
                        return (<li key={question.id}>
                            <Link to={`question/${question['id']}`}>
                                <Question id={question.id} />
                            </Link>
                        </li>)
                    })}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ questions, authedUser }) {
    return {
        authedUser,
        questions,
    }
}

export default connect(mapStateToProps)(Dashboard);
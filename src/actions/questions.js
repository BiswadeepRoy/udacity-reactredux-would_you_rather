import { saveQuestion, saveQuestionAnswer } from '../utils/helper'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestionAction({ id, timestamp, author, optionOne, optionTwo }) {
    return {
        type: ADD_QUESTION,
        id,
        timestamp,
        author,
        optionOne,
        optionTwo
    }
}

function addAnswerAction({ authedUser, qid, answer }) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        qid,
        answer
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {

        const { authedUser } = getState()

        const questionInfo = {
            optionOneText,
            optionTwoText,
            author: authedUser
        }

        //  console.log(questionInfo)

        return saveQuestion(questionInfo)
            .then((question) => {
                dispatch(addQuestionAction(question))
            })
            .catch((error) => {

                alert('Error occured!! Try again')
                console.error(error)
            })
    }
}

export function handleAddAnswer(info) {
    return (dispatch) => {
        dispatch(addAnswerAction(info))
        return saveQuestionAnswer(info)
            .catch(() => {
                alert('Error occured!! Try again')
            })
    }
}


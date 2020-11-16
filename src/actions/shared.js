import { receiveQuestions } from './questions'
import { receiveUsers } from './users'
import { getUsersInfo, getQuestionsInfo } from '../utils/helper'

export function handleInitialData() {
    return (dispatch) => {
        getInitialData()
            .then(({ questions, users }) => {
                dispatch(receiveQuestions(questions))
                dispatch(receiveUsers(users))
            })
    }
}

function getInitialData() {
    return Promise.all([
        getUsersInfo(),
        getQuestionsInfo(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}
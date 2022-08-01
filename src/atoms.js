import {atom} from 'recoil'

export const score = atom({
    key: 'score',
    default: 0
})

export const clicks = atom({
    key: 'clicks',
    default: 0
})

export const quiztopics = atom({
    key: 'quizTopics',
    default: []
})

export const authUser = atom({
    key: 'authUser',
    default: ''
})
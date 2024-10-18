import axios from 'axios';
import { LeetCodeGraphQLRequestBody, SubmissionDetails } from '../common/models.ts';
import { getUser } from '../common/storage.ts';

const client = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})

export const fetchSubmissionDetails = async (reqBody: LeetCodeGraphQLRequestBody) => {
    try {
        const res = await axios.post('https://leetcode.com/graphql/', reqBody, {
            validateStatus: (status) => status >= 200
        })
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const sendSubmissionToServer = async (reqBody: SubmissionDetails) => {
    try {
        const user = await getUser()
        const res = await client.post('/startStateMachine', {
            email: user.email,
            reqBody,
        })
        console.log("res see send to server: ", res)
    } catch (error) {
        console.log(error)
        throw error
    }
}

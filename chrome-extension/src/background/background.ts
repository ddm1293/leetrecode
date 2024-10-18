import {
    LeetCodeGraphQLRequestBody,
    LeetCodeGraphQLRequestBodySchema, SubmissionDetails,
    SubmissionDetailsSchema,
} from '../common/models.ts';
import { fetchSubmissionDetails, sendSubmissionToServer } from './background.api.ts';

const trackedRequests = new Map<string, {
    body: LeetCodeGraphQLRequestBody,
    timeout: NodeJS.Timeout
}>

const REQUEST_TIMEOUT_MS = 10000;

function addTrackedRequest(requestId: string, body: LeetCodeGraphQLRequestBody) {
    if (trackedRequests.has(requestId)) return;

    const timeout = setTimeout(() => {
        console.warn(`Request ${requestId} timed out and was removed.`);
        trackedRequests.delete(requestId);
    }, REQUEST_TIMEOUT_MS);

    trackedRequests.set(requestId, { body, timeout });
}

function cleanupRequest(requestId: string) {
    const tracked = trackedRequests.get(requestId);
    if (tracked) {
        clearTimeout(tracked.timeout);
        trackedRequests.delete(requestId);
    }
}

chrome.webRequest.onBeforeRequest.addListener(
    (params) => {
        if (params.initiator?.startsWith('chrome-extension://')) return;

        if (params.method == 'POST' && params.requestBody && params.requestBody.raw) {
            const reqBody = new TextDecoder().decode(params.requestBody.raw[0].bytes)

            let parsedBody: LeetCodeGraphQLRequestBody | null = null

            try {
                const parsed = JSON.parse(reqBody)
                parsedBody = LeetCodeGraphQLRequestBodySchema.parse(parsed)
            } catch (error) {
                console.error("Failed to parse JSON:", error)
            }

            if (parsedBody && parsedBody.operationName === "submissionDetails") {
                // console.log("see params: ", params)
                // console.log("see reqBody: ", parsedBody)
                addTrackedRequest(params.requestId, parsedBody);
            }
        }
    },
    { urls: ["https://leetcode.com/graphql/"] },
    ["requestBody"]
)

chrome.webRequest.onCompleted.addListener(
    async (params) => {
        const tracked = trackedRequests.get(params.requestId);

        if (tracked && tracked.body) {

            let fetchRes: Record<string, unknown> | null = null
            let parsedDetails: SubmissionDetails | null = null

            try {
                fetchRes = await fetchSubmissionDetails(tracked.body)
            } catch (error) {
                console.error("Failed to fetch submissionDetails:", error)
            }

            if (fetchRes) {
                try {
                    // console.log("see submissionDetails here: ", fetchRes)
                    parsedDetails = SubmissionDetailsSchema.parse(fetchRes.data)
                    console.log("See submissionDetails: ", parsedDetails)
                } catch (error) {
                    console.error("Failed to parse submissionDetails:", error)
                }
            }

            if (parsedDetails) {
                try {
                    await sendSubmissionToServer(parsedDetails)
                } catch (error) {
                    console.error("Failed to send submission to the server:", error)
                }
            }

            cleanupRequest(params.requestId); // Clean up after processing
        }
    },
    { urls: ["https://leetcode.com/graphql/"] }
);

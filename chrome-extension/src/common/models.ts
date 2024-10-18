import { z } from 'zod';

export const LeetCodeGraphQLRequestBodySchema = z.object({
    operationName: z.string(),
    query: z.string(),
    variables: z.record(z.unknown()),
})

export type LeetCodeGraphQLRequestBody = z.infer<typeof LeetCodeGraphQLRequestBodySchema>

export const SubmissionDetailsSchema = z.object({
    submissionDetails: z.object({
        runtime: z.number(),
        runtimeDisplay: z.string(),
        runtimePercentile: z.number().nullable(),
        runtimeDistribution: z.string(),

        memory: z.number(),
        memoryDisplay: z.string(),
        memoryPercentile: z.number().nullable(),
        memoryDistribution: z.string(),

        code: z.string(),
        timestamp: z.number(),
        statusCode: z.number(),

        user: z.object({
            username: z.string(),
            profile: z.object({
                realName: z.string(),
                userAvatar: z.string().url(),
            }),
        }),

        lang: z.object({
            name: z.string(),
            verboseName: z.string(),
        }),

        question: z.object({
            questionId: z.string(),
            titleSlug: z.string(),
            hasFrontendPreview: z.boolean(),
        }),

        notes: z.string(),
        flagType: z.string(),
        topicTags: z.array(z.string()),

        runtimeError: z.string().nullable(),
        compileError: z.string().nullable(),
        lastTestcase: z.string(),
        codeOutput: z.string(),
        expectedOutput: z.string(),

        totalCorrect: z.number(),
        totalTestcases: z.number(),

        fullCodeOutput: z.string().nullable(),
        testDescriptions: z.string().nullable(),
        testBodies: z.string().nullable(),
        testInfo: z.string().nullable(),
        stdOutput: z.string(),
    })
})


export type SubmissionDetails = z.infer<typeof SubmissionDetailsSchema>;

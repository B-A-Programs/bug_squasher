import * as z from "zod"

export const reportBugFormSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters."),
    description: z.string().min(16, "Description must be at least 16 characters.").max(400, "Description must be at most 400 characters."),
    stepsToReproduce: z.string().min(16, "Steps to reproduce must be at least 16 characters.").max(400, "Steps to reproduce must be at most 400 characters."),
})
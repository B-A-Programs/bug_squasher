// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    email: string
    firstName: string
    lastName: string
}

export type UpdateUserParams = {
    firstName: string
    lastName: string
}

export type CreateBugParams = {
    reporterId: string
    title: string
    description: string
    stepsToReproduce: string
}
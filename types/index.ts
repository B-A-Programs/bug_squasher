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

export type GetUserReportedBugsParams = {
    userId: string
    limit?: number
    page?: number
}

export type GetFilteredParams = {
    query?: string
    status?: string
    limit?: number
    page?: number
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    keys: string[]
    values: string[]
}
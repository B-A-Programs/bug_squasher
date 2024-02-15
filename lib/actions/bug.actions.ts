'use server'

import { CreateBugParams, GetFilteredParams, GetUserReportedBugsParams } from "@/types"
import { connectToDatabase } from "../database"
import { handleError } from "../utils"
import Bug from "../database/models/bug.model"
import User from "../database/models/user.model"

export async function createBug({ reporterId, title, description, stepsToReproduce }: CreateBugParams) {
  try {
    await connectToDatabase()

    const reporter = User.findById(reporterId)
    if (!reporter) throw new Error("Reporter not found")

    const newBug = await Bug.create({ reporter: reporterId, title: title, description: description, stepsToReproduce: stepsToReproduce })

    return JSON.parse(JSON.stringify(newBug))
  } catch (error) {
    handleError(error)
  }
}

export async function getBugById(bugId: string) {
  try {
    await connectToDatabase()

    const bug = await Bug.findById(bugId)
    if (!bug) throw new Error("Bug not found")

    return JSON.parse(JSON.stringify(bug))
  } catch (error) {
    handleError(error)
  
  }
}

export async function getUserReportedBugs({ userId, limit = 3, page = 1 }: GetUserReportedBugsParams) {
  try {
    await connectToDatabase()

    const user = await User.findById(userId)
    if (!user) throw new Error("User not found")

    const skipAmount = (Number(page) - 1) * limit
    const bugs = await Bug.find({ reporter: userId }).sort({ status: 1, createdAt: -1 }).skip(skipAmount).limit(limit)
    const bugsCount = await Bug.countDocuments({ reporter: userId })

    return {
      data: JSON.parse(JSON.stringify(bugs)),
      totalPages: Math.ceil(bugsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

export async function getFilteredBugs({ query = "", status = "all", limit = 3, page = 1 }: GetFilteredParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    let bugs = []
    let bugsCount = 0
    if (status === "all") {
        bugs = await Bug.find({ title: { $regex: query, $options: 'i' } }).sort({ status: 1, createdAt: -1 }).skip(skipAmount).limit(limit)
        bugsCount = await Bug.countDocuments({ title: { $regex: query, $options: 'i' } })
    } else {
        bugs = await Bug.find({ title: { $regex: query, $options: 'i' }, status: status }).sort({ status: 1, createdAt: -1 }).skip(skipAmount).limit(limit)
        bugsCount = await Bug.countDocuments({ title: { $regex: query, $options: 'i' }, status: status })
    }

    return {
      data: JSON.parse(JSON.stringify(bugs)),
      totalPages: Math.ceil(bugsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}
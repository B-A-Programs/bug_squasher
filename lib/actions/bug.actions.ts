'use server'

import { CreateBugParams } from "@/types"
import { connectToDatabase } from "../database"
import { handleError } from "../utils"
import Bug from "../database/models/bug.model"
import User from "../database/models/user.model"

export async function createBug({reporterId, title, description, stepsToReproduce}: CreateBugParams) {
    try {
      await connectToDatabase()

      const reporter = User.findById(reporterId)
      if (!reporter) throw new Error("Reporter not found")
  
      const newBug = await Bug.create({reporter: reporterId, title: title, description: description, stepsToReproduce: stepsToReproduce})

      return JSON.parse(JSON.stringify(newBug))
    } catch (error) {
      handleError(error)
    }
  }
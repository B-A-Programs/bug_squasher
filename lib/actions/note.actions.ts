'use server'

import { connectToDatabase } from "../database"
import { handleError } from "../utils"
import User from "../database/models/user.model"
import Note from "../database/models/note.model"
import Bug from "../database/models/bug.model"
import { getNotesForBugParams } from "@/types"

export async function createNote({ text, authorId, bugId }: { text: string, authorId: string, bugId: string}) {
  try {
    await connectToDatabase()

    const author = User.findById(authorId)
    if (!author) throw new Error("Author not found")
    const bug = Bug.findById(bugId)
    if (!bug) throw new Error("bug not found")

    const newNote = await Note.create({ author: authorId, bug: bugId, text: text })

    return JSON.parse(JSON.stringify(newNote))
  } catch (error) {
    handleError(error)
  }
}

export async function getNotesForBug({ bugId }: getNotesForBugParams) {
  try {
    await connectToDatabase()

    const bug = Bug.findById(bugId)
    if (!bug) throw new Error("bug not found")

    const notes = await Note.find({ bug: bugId }).populate("author")

    return JSON.parse(JSON.stringify(notes))
  } catch (error) {
    handleError(error)
  }
}

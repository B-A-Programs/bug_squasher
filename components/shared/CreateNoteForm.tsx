'use client'

import { createNote } from "@/lib/actions/note.actions"
import { handleError } from "@/lib/utils"
import { createNoteFormSchema } from "@/lib/validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"

const CreateNoteForm = ({ userId, bugId }: { userId: string, bugId: string }) => {
    const router = useRouter()

    const form = useForm<z.infer<typeof createNoteFormSchema>>({
        resolver: zodResolver(createNoteFormSchema),
        defaultValues: {
            text: '',
        }
    })

    async function onSubmit(values: z.infer<typeof createNoteFormSchema>) {
        try {
            const { text } = values

            const newNote = await createNote({ text: text, authorId: userId, bugId: bugId })

            if (newNote) {
                form.reset()
                router.refresh()
            }
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex flex-col justify-center px-12">
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-md">Add note (visible only to staff): </FormLabel>
                            <FormControl className="h-36">
                                <Textarea placeholder="Egs: I can't reproduce this bug / I found only a temporary fix, if that helps" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="bg-indigo-500 font-bold px-10 py-4 max-w-48 mx-auto" type="submit">Create note</Button>
            </form>
        </Form>
    )
}

export default CreateNoteForm
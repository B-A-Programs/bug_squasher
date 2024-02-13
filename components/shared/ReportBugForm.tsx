'use client'

import { reportBugFormSchema } from "@/lib/validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { auth } from "@clerk/nextjs"
import { getUserById } from "@/lib/actions/user.actions"
import { handleError } from "@/lib/utils"
import { createBug } from "@/lib/actions/bug.actions"
import { useRouter } from "next/navigation"

type ReportBugParams = {
    userId: string
}

const ReportBugForm = ({ userId }: ReportBugParams ) => {
    const router = useRouter()
    
    const form = useForm<z.infer<typeof reportBugFormSchema>>({
        resolver: zodResolver(reportBugFormSchema),
        defaultValues: {
            title: '',
            description: '',
            stepsToReproduce: ''
        }
    })

    async function onSubmit(values: z.infer<typeof reportBugFormSchema>) {
        try {
            const { title, description, stepsToReproduce } = values
            console.log({ userId, title, description, stepsToReproduce })

            const newBug = await createBug({ reporterId: userId, title, description, stepsToReproduce })

            if (newBug) {
                form.reset()
                router.push('/my-reported-bugs')
            }
        } catch (error) {
            console.log(error)
            handleError(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex flex-col justify-center px-12">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-md">Title: </FormLabel>
                            <FormControl>
                                <Input placeholder="Descriptive title for the bug you encountered" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-md">Description: </FormLabel>
                            <FormControl className="h-36">
                                <Textarea placeholder="Egs: the bug I encountered caused the program to crash / caused me to lose all my items / etc..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="stepsToReproduce"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-md">Steps to Reproduce the Bug: </FormLabel>
                            <FormControl className="h-36">
                                <Textarea placeholder="Egs: 1. I clicked on the home page | 2. I scrolled to the footer | 3. ...." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="bg-indigo-500 font-bold px-10 py-4 max-w-48 mx-auto" type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default ReportBugForm
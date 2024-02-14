'use client'

import { FormEvent, SetStateAction, useState } from "react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { formUrlQuery } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

const ReportBugForm = () => {
    const [query, setQuery] = useState("")
    const [status, setStatus] = useState("all")
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleQueryChange = (event: { target: { value: SetStateAction<string> } }) => {
        setQuery(event.target.value)
    }

    const handleStatusChange = (status: string) => {
        setStatus(status)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            keys: ["query", "status"],
            values: [query, status],
        })
        router.push(newUrl, { scroll: false })
    }

    return (
        <form className="flex flex-row gap-24 justify-between" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-row max-w-[70vh] items-center gap-6">
                <label className="text-md text-gray-500 font-bold">Query: </label>
                <Input value={query} onChange={handleQueryChange} className="w-[70vh]" placeholder="Title" />
            </div>

            <div className="flex flex-row max-w-[70vh] items-center gap-6">
                <label className="text-md text-gray-500 font-bold">Category: </label>
                <Select onValueChange={(val) => handleStatusChange(val)} value={status}>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select a timezone" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit" className="w-40 h-12 bg-indigo-600 text-md font-semibold px-6 py-4 text-white rounded-full">Filter</Button>
        </form>
    )
}

export default ReportBugForm
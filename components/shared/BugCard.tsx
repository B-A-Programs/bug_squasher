import { IBug } from "@/lib/database/models/bug.model"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { formatDateTime } from "@/lib/utils"

const BugCard = ({ bug }: { bug: IBug }) => {
    return (
        <Card className="w-full md:w-[100vh] border border-indigo-400 hover:bg-indigo-100 hover:cursor-pointer">
            <CardHeader>
                <CardTitle className="flex flex-between gap-36">
                    <span>
                        {bug.title}
                    </span>

                    <span className={`text-lg flex flex-row items-center justify-center gap-0 ${bug.status === "Pending" && "text-red-600"} ${bug.status === "In Progress" && "text-yellow-500"} ${bug.status === "Resolved" && "text-green-600"}`}>
                        <svg className={`${bug.status === "Pending" && "fill-red-600"} ${bug.status === "In Progress" && "fill-yellow-500"} ${bug.status === "Resolved" && "fill-green-600"}`} viewBox="0 0 20 20" width={35} height={35} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z"></path></g></svg>
                        {bug.status}
                    </span>
                </CardTitle>
                <CardDescription className="text-md">{ formatDateTime(bug.createdAt).dateOnly }</CardDescription>
            </CardHeader>
            <CardContent className="line-clamp-2">
                <p className="line-clamp-2">{ bug.description }</p>
            </CardContent>
        </Card>
    )
}

export default BugCard
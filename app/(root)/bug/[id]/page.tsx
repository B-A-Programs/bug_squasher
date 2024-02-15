import Hero from "@/components/shared/Hero";
import StaffActions from "@/components/shared/StaffActions";
import { getBugById } from "@/lib/actions/bug.actions";
import { getAllStaffMembers, getUserById } from "@/lib/actions/user.actions";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";

export default async function Home({ params: { id } }: { params: { id: string } }) {
    const bug = await getBugById(id);
    const stepsArray = bug.stepsToReproduce.split("\n")

    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string
    const user = await getUserById(userId)
    const resolvers = await getAllStaffMembers()

    return (
        <div className="wrapper">
            <h1 className="text-4xl font-extrabold my-6">Complete bug details: </h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="flex flex-between items-center">
                    <h1 className="text-3xl font-bold mb-4">{bug.title}</h1>

                    <span className={`text-xl font-semibold flex flex-row items-center justify-center gap-0 ${bug.status === "Pending" && "text-red-600"} ${bug.status === "In Progress" && "text-yellow-500"} ${bug.status === "Resolved" && "text-green-600"}`}>
                        <svg className={`${bug.status === "Pending" && "fill-red-600"} ${bug.status === "In Progress" && "fill-yellow-500"} ${bug.status === "Resolved" && "fill-green-600"}`} viewBox="0 0 20 20" width={35} height={35} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z"></path></g></svg>
                        {bug.status}
                    </span>
                </div>
                <p className="text-gray-600 mb-4">Created by: {bug.reporter.firstName} {bug.reporter.lastName} - Date of Creation: {formatDateTime(bug.createdAt).dateOnly}</p>
                <p className="text-gray-700 mb-4 font-semibold text-lg">{bug.description}</p>

                <h2 className="text-2xl font-bold mb-2">Steps to Reproduce:</h2>
                <ul className="list-disc ml-6">
                    {stepsArray.map((step: string, index: number) => (
                        <li key={index} className="text-gray-700">{step}</li>
                    ))}
                </ul>
            </div>

            <StaffActions user={user} bug={bug} resolvers={resolvers} />
        </div>
    );
}

import ReportBugForm from "@/components/shared/ReportBugForm";
import { auth } from "@clerk/nextjs";

export default function Home() {
    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string

    return (
        <div className="wrapper flex flex-col gap-12">
            <h1 className="text-4xl font-extrabold text-center mt-12 purple_gradient">
                Report a bug that you've encountered
            </h1>
            <ReportBugForm userId={userId} />
        </div>
    )
}
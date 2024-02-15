import Collection from "@/components/shared/Collection";
import FilterBugsForm from "@/components/shared/FilterBugsForm";
import { getFilteredBugs, getResolverBugs } from "@/lib/actions/bug.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation'

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
    const page = Number(searchParams.page) || 1

    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string
    const user = await getUserById(userId)
    if (!user?.isStaff) {
        redirect("/")
    }

    const info = await getResolverBugs({ userId: userId, page: page })
    const bugs = info?.data
    const totalPages = info?.totalPages

    if (totalPages && (page > (totalPages))) {
        redirect("/bugs-to-resolve")
    }

    return (
        <div className="wrapper flex flex-col gap-12">
            <h1 className="text-5xl font-extrabold text-center mt-4 h-14 purple_gradient">
                Bugs to resolve
            </h1>

            <Collection totalPages={totalPages} bugs={bugs} page={page} />
        </div>
    );
}
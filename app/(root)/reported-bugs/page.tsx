import Collection from "@/components/shared/Collection";
import FilterBugsForm from "@/components/shared/FilterBugsForm";
import { getFilteredBugs } from "@/lib/actions/bug.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation'

export default async function Home({ searchParams }: { searchParams: { page: string, query: string, status: string } }) {
  const page = Number(searchParams.page) || 1
  const query = searchParams.query || ""
  const status = searchParams.status || "all"

  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string
  const user = await getUserById(userId)
  if (!user?.isStaff) {
    redirect("/")
  }

  const info = await getFilteredBugs({ query: query, status: status, page: page })
  const bugs = info?.data
  const totalPages = info?.totalPages

  if (totalPages && (page > (totalPages))) {
      redirect("/reported-bugs")
  }

  return (
    <div className="wrapper flex flex-col gap-12">
      <h1 className="text-5xl font-extrabold text-center mt-4 h-14 purple_gradient">
        Reported bugs
      </h1>
      <FilterBugsForm />

      <Collection totalPages={totalPages} bugs={bugs} page={page} />
    </div>
  );
}
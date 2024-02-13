import Pagination from "@/components/shared/Pagination";
import { getUserReportedBugs } from "@/lib/actions/bug.actions";
import { IBug } from "@/lib/database/models/bug.model";
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation'

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
  const page = Number(searchParams.page) || 1

  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string

  const bugs = await getUserReportedBugs({ userId, page: page })

  if ((page > (bugs?.totalPages ?? 0 ))) {
      redirect("/my-reported-bugs")
  }

  return (
    <div className="wrapper flex flex-col gap-12">
      <h1 className="text-4xl font-bold text-center mt-12">
        My reported bugs
      </h1>

      <div className="flex flex-col items-center justify-between min-h-[66vh]">
        <div className="flex flex-col gap-4">
          {bugs?.data.map((bug: IBug) => (
            <div key={bug._id} className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">{bug.title}</h2>
              <p>{bug.description}</p>
            </div>
          ))}
        </div>

        {bugs?.totalPages && bugs?.totalPages > 1 && (
          <Pagination page={page} totalPages={bugs?.totalPages} />
        )}
      </div>
    </div>
  );
}

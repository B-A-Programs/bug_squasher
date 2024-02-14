import { IBug } from "@/lib/database/models/bug.model"
import Pagination from "./Pagination"
import BugCard from "./BugCard"

const Collection = ({ totalPages, bugs, page } : { totalPages?: number, bugs: IBug[], page: number | string }) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-[66vh]">
        <div className="flex flex-col gap-6">
          {bugs?.map((bug: IBug) => (
            <BugCard key={bug._id} bug={bug} />
          ))}
        </div>

        {totalPages && totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} />
        )}
      </div>
  )
}

export default Collection
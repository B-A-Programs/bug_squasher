import { IBug } from "@/lib/database/models/bug.model"
import Pagination from "./Pagination"
import BugCard from "./BugCard"

const Collection = ({ totalPages, bugs, page } : { totalPages?: number, bugs: IBug[], page: number | string }) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-[66vh] gap-6">
        {bugs.length === 0 && (
          <div className="text-center font-bold text-2xl text-gray-700 mt-12">No reported bugs found</div>
        )}
        <div className="flex flex-col gap-6">
          {bugs?.map((bug: IBug) => (
            <BugCard key={bug._id} bug={bug} />
          ))}
        </div>

        {typeof(totalPages) == "number" && totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} />
        )}
      </div>
  )
}

export default Collection
'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { getUserById } from "@/lib/actions/user.actions"

const PageNavigator = ({ userId }: { userId: string }) => {
  const [isStaff, setIsStaff] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkIfStaff() {
      const user = await getUserById(userId)
      setIsStaff(user?.isStaff)
      setLoading(false)
    }
    checkIfStaff()
  }, [])

  return (
    <>
      {loading ? (
        <p className="text-grey-500 text-lg text-center">Loading...</p>
      ) : (
        <>
          {isStaff ? (
            <div>
              <div className="flex justify-between items-center px-8">
                <Link href="/reported-bugs">
                  <Button className="rounded-full bg-indigo-600 font-semibold text-md w-48 py-6">View reported bugs</Button>
                </Link>
                <Link href="/bugs-to-resolve">
                  <Button className="rounded-full bg-indigo-600 font-semibold text-md w-48 py-6">Bugs To Resolve</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center px-8">
              <Link href="/report-bug">
                <Button className="rounded-full bg-indigo-600 font-semibold text-md w-48 py-6">Report a bug</Button>
              </Link>
              <Link href="/my-reported-bugs">
                <Button className="rounded-full bg-indigo-600 font-semibold text-md w-48 py-6">My reported bugs</Button>
              </Link>
            </div>
          )}
        </>
        )
      }
    </>
  )
}

export default PageNavigator
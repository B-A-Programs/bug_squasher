import { getUserById } from "@/lib/actions/user.actions"
import { SignedIn, SignedOut, auth } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

const Hero = async () => {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string
  let isStaff = false
  
  if (userId) {
    const user = await getUserById(userId)
    const isStaff = user.isStaff
  }

  return (
    <div className="flex-center flex-col md:flex-row flex-wrap mt-24 gap-32">
      <div>
        <h1 className="text-5xl font-extrabold text-center mb-12"><span className="purple_gradient">Bug Squasher:</span> <br /> Your Go-To Solution <br /> for Software Snags!</h1>

        <SignedOut>
          <p className="text-center mt-4 font-bold text-xl text-gray-700">Ready to squash some bugs? <br /> Sign up now to get started!</p>
        </SignedOut>
        
        <SignedIn>
          {isStaff ? (
            <div>
            </div>
          ) : (
            <div className="flex justify-between items-center px-8">
              <Link href="/report-bug">
                <Button className="rounded-full bg-indigo-600 text-md w-48 py-6">Report a bug</Button>
              </Link>
              <Link href="/my-reported-bugs">
                <Button className="rounded-full bg-indigo-600 text-md w-48 py-6">My reported bugs</Button>
              </Link>
            </div>
          )}
        </SignedIn>
      </div>
      <Image src="/assets/hero.png" alt="Hero" width={500} height={500} className="rounded-full bg-cover overflow-hidden" />
    </div>
  )
}

export default Hero
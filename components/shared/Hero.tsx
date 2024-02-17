import { getUserById } from "@/lib/actions/user.actions"
import { SignedIn, SignedOut, auth } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import PageNavigator from "./PageNavigator"

const Hero = async () => {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string

  return (
    <div className="flex-center flex-col md:flex-row flex-wrap mt-24 gap-32">
      <div>
        <h1 className="text-5xl font-extrabold text-center mb-12"><span className="purple_gradient">Bug Squasher:</span> <br /> Your Go-To Solution <br /> for Software Snags!</h1>

        <SignedOut>
          <p className="text-center mt-4 font-bold text-xl text-gray-700">Ready to squash some bugs? <br /> Sign up now to get started!</p>
        </SignedOut>

        <SignedIn>
          <PageNavigator userId={userId} />
        </SignedIn>
      </div>
      <Image src="/assets/Hero.png" alt="Hero" width={500} height={500} className="rounded-full bg-cover overflow-hidden" />
    </div>
  )
}

export default Hero
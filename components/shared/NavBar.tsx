import Image from "next/image"
import { Button } from "../ui/button"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import NavItems from "./NavItems"
import Link from "next/link"

const NavBar = () => {
  return (
    <nav className="wrapper flex items-center justify-between">
      <h1 className="flex justify-center items-center flex-row text-xl font-extrabold">
        <Image src="/assets/bug_icon.jpg" alt="bug icon" width={40} height={40} />
        <span className="text-indigo-600">Bug</span><span className="text-purple-600">Squasher</span>
      </h1>
      <SignedIn>
        <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems />
        </nav>
      </SignedIn>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in"><Button className="rounded-full bg-indigo-600 text-md px-7 py-5">Login</Button></Link>
      </SignedOut>
    </nav>
  )
}

export default NavBar
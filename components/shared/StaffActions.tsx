'use client'

import { getAllStaffMembers, getUserById } from '@/lib/actions/user.actions'
import { IBug } from '@/lib/database/models/bug.model'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IUser } from '@/lib/database/models/user.model'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { updateBug } from '@/lib/actions/bug.actions'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

const StaffActions = ({ user, bug, resolvers }: { user: IUser, bug: IBug, resolvers: IUser[] }) => {
  const router = useRouter()

  const assignToStaff = async (resolverId: string) => {
    updateBug(bug._id, { resolver: resolverId, status: "In Progress" })
    router.push('/reported-bugs')
  }

  const markAsResolved = async () => {
    updateBug(bug._id, { status: "Resolved" })
    router.push('/reported-bugs')
  }

  return (
    <>
      {user.isStaff && (
        <>
          <hr className='h-[2px] bg-gray-400 mt-10' />
          <div className='text-center font-bold text-3xl my-12'>Staff actions</div>

          <div className='flex flex-row justify-between items-center px-24'>
            {(bug.status === "Pending" || (bug.status === "In Progress" && bug.resolver._id == user._id)) && (
              <div className='flex flex-row items-center gap-3'>
                <span className='font-bold text-lg'>Assign to staff member: </span>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border border-gray-600 bg-white px-3 py-1 text-black text-md font-semibold min-w-48 flex flex-row justify-between items-center">Staff members<svg fill="#000000" height={16} width={16} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.787 511.787" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M508.667,125.707c-4.16-4.16-10.88-4.16-15.04,0L255.76,363.573L18,125.707c-4.267-4.053-10.987-3.947-15.04,0.213 c-3.947,4.16-3.947,10.667,0,14.827L248.293,386.08c4.16,4.16,10.88,4.16,15.04,0l245.333-245.333 C512.827,136.693,512.827,129.867,508.667,125.707z"></path> </g> </g> </g></svg></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {resolvers.map((resolver: IUser) => (
                      <DropdownMenuLabel key={resolver._id}>
                        <AlertDialog>
                          <AlertDialogTrigger>{resolver.firstName} {resolver.lastName}</AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure you want to assign this bug to {resolver.firstName} {resolver.lastName}?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action will assign this task to {resolver.firstName} {resolver.lastName}. Only the assigned staff member can change the status of this bug after this action.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => assignToStaff(resolver._id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuLabel>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {(bug.status === "In Progress" && bug.resolver._id == user._id) && (
              <div className='min-w-56 mr-16'>
                <AlertDialog>
                  <AlertDialogTrigger><Button className='bg-green-600 rounded-xl hover:bg-green-700'>Mark as resolved</Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to mark this bug as resolved?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will mark this bug as resolved permanently.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => markAsResolved()}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            
            )}
          </div>
        </>
      )}
    </>
  )
}

export default StaffActions
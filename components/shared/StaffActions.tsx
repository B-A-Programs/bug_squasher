import { getUserById } from '@/lib/actions/user.actions'
import React from 'react'

const StaffActions = async ({ userId }: { userId: string}) => {
  const user = await getUserById(userId)

  return (
    <>
        {user.isStaff && (
            <div>
                StaffActions
            </div>
        )}  
    </>
  )
}

export default StaffActions
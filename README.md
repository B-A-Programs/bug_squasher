# BugSquasher

BugSquasher is a bug tracking application designed to streamline the process of reporting and resolving bugs within a software development team. With BugSquasher, users can report bugs, track their status, assign them to staff members, add notes, and update their progress, all within a user-friendly interface.

## Website

https://bug-squasher-coral.vercel.app/

(Only user functionality. For staff member functionality contact me.)

Presentation video: https://youtu.be/wz1kcGbTdfo

## Features

- **Bug Reporting**: Users can easily report bugs by providing essential details such as description and steps to reproduce.
- **Bug Assignment**: Staff members can pick up bugs to resolve and assign them to themselves or other staff members.
- **Status Updates**: Staff members can update the status of bugs assigned to them to reflect their progress. Users who reported these bugs can see these status updates.
- **Notes**: Staff members can add notes to bugs to provide additional context, updates, or instructions for resolution.

## Tech Stack

- **Framework**: Next.js
- **User Management**: Clerk
- **Database**: MongoDB
- **ORM**: Mongoose
- **UI Design**: Shadcn
- **Form Validation**: Zod

## Installation

1. Clone the repository:

   ```git clone https://github.com/B-A-Programs/bug_squasher```
   
3. Navigate to the project directory:

   ```cd bug_squasher```
   
5. Install dependencies:
   
   ```npm install```
   
7. Create a `.env.local` file in the root directory and add the following variables:
   
   ~~~
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-key
   CLERK_SECRET_KEY=your-key
  
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
  
   MONGODB_URI=your-uri
  
   WEBHOOK_SECRET=your-wh-secret (for clerk and mongodb integration)
   ~~~
   
10. Run the development server:

    ```npm run dev```
    
12. Open your browser and navigate to `http://localhost:3000` to access BugSquasher.

## Contributing

Contributions are welcome! If you'd like to contribute to BugSquasher, please fork the repository and submit a pull request with your changes.

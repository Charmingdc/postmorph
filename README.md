# Postmorph: AI-Powered Content Repurposing Platform ✍️

## Overview
Postmorph is a modern web application built with Next.js that leverages AI to transform and repurpose content across various social media platforms. It offers robust user authentication, content management, and a seamless user experience, powered by Supabase and the Google Gemini AI model.

## Features
- **AI-Powered Content Transformation**: Repurpose content (blogs, videos, social posts) into various formats like tweets, X threads, LinkedIn posts, and Reddit posts using Google Gemini.
- **Dynamic Content Refinement**: Modify generated drafts with custom prompts (e.g., rephrase, condense, expand, fix grammar) up to three times per draft.
- **User Authentication**: Secure sign-up and sign-in with email/password and Google OAuth, powered by Supabase Auth.
- **Draft Management**: Save, view, edit, and delete generated content drafts.
- **Custom Brand Voice**: Add and manage custom brand voices with specific instructions for AI generation, allowing for consistent brand messaging.
- **Credit System**: Manage content generation credits with a clear overview of usage, supporting both limited and unlimited plans.
- **Responsive UI**: A sleek, modern user interface built with Tailwind CSS and Shadcn UI components, ensuring a consistent experience across devices.
- **Server Actions & API Routes**: Efficient and secure backend interactions leveraging Next.js Server Actions and API routes for data handling and AI integration.
- **Persistent Data Storage**: Utilizes Supabase for database (PostgreSQL) and storage (for avatars).

## Getting Started

### Environment Variables
To run this project locally, you will need to set up the following environment variables in a `.env.local` file in the root directory of the project:

-   `NEXT_PUBLIC_APP_URL`: The public URL of your application (e.g., `http://localhost:3000`).
-   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
-   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase public anonymous key.
-   `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for server-side operations requiring elevated privileges).
-   `GOOGLE_GENERATIVE_AI_API_KEY`: Your API key for Google's Generative AI services (e.g., Gemini).

**Example `.env.local`:**
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
GOOGLE_GENERATIVE_AI_API_KEY=YOUR_GEMINI_API_KEY
```

## Usage

Postmorph provides an intuitive interface for transforming content. Here's a brief guide:

1.  **Sign In/Sign Up**: Start by creating an account or logging in. You can use email/password or Google authentication.
2.  **Repurpose Content**:
    *   Navigate to the "Repurpose New" section.
    *   Select your **Input Format** (e.g., Blog, YouTube Video, X Thread).
    *   Choose your desired **Output Format** (e.g., Tweet, LinkedIn Post, Reddit Post).
    *   Select a **Tone** for the output (e.g., Professional, Casual, Funny).
    *   Paste your content or link into the input area.
    *   Click "Repurpose Now" to generate your new content.
3.  **Manage Drafts**:
    *   All generated content is saved as drafts in the "Drafts" section.
    *   You can view, copy, edit, or delete your drafts.
    *   To edit, click the "Pencil" icon. This opens the editor where you can manually adjust content.
    *   To refine content with AI, use the "Sparkles" icon in the editor. You can apply pre-defined actions like "Add Hook" or "Rephrase", or input custom prompts. Note the refinement limit per draft.
4.  **Brand Voice**:
    *   In the "Brand Voice" section, you can define custom writing styles for the AI.
    *   Click "Add new custom voice", provide a name, description, and specific instructions. This helps the AI tailor output to your brand's unique style.
5.  **Account Settings**:
    *   Manage your profile information (full name, avatar), update your email, or change your password in the "Account Settings".
    *   The "Danger Zone" allows for account deletion.

## API Documentation
### Base URL
`[Your-App-URL]` (e.g., `https://yourdomain.com`)

### Endpoints
#### `GET /api/getDrafts`
**Overview**: Fetches paginated content drafts for a specific user.
**Request**:
- **Query Parameters**:
    - `userId` (string, required): The ID of the user whose drafts are to be fetched.
    - `from` (number, optional, default: `0`): The starting index for the range of drafts to retrieve.
    - `to` (number, optional, default: `9`): The ending index for the range of drafts to retrieve (inclusive).
**Response**:
```json
{
  "drafts": [
    {
      "id": "string",
      "type": "thread" | "tweet" | "linkedin post" | "reddit post",
      "modify_count": 0,
      "content": "string",
      "createdAt": "ISO 8601 Date String"
    }
  ]
}
```
**Errors**:
- `400 Bad Request`: Missing `userId` parameter.
- `500 Internal Server Error`: An error occurred while fetching drafts from the database.

#### `POST /api/modifyDraft`
**Overview**: Refines existing content in a draft using an AI model based on a given prompt.
**Request**:
```json
{
  "prompt": "string",
  "draftId": "string"
}
```
**Response**:
```json
{
  "text": "string",
  "modifyCount": "number"
}
```
**Errors**:
- `400 Bad Request`: Missing `prompt` or `draftId` in the request body.
- `401 Unauthorized`: User authentication failed or user is not logged in.
- `403 Forbidden`: Maximum refinement limit (3) reached for the specified draft.
- `404 Not Found`: Draft not found or user is not authorized to modify it.
- `500 Internal Server Error`: AI text generation failed or an error occurred while updating the draft's modify count.

#### `POST /api/repurposeContent`
**Overview**: Repurposes content from a source platform to a target platform with a specified tone using an AI model, consumes user credits, and saves the result as a new draft.
**Request**:
```json
{
  "sourcePlatform": "string",
  "targetPlatform": "string",
  "content": "string",
  "preferredTone": "string"
}
```
**Response**:
```json
{
  "draft": {
    "id": "string",
    "type": "thread" | "tweet" | "linkedin post" | "reddit post",
    "modify_count": 0,
    "content": "string",
    "createdAt": "ISO 8601 Date String"
  }
}
```
**Errors**:
- `400 Bad Request`: Incomplete request body (missing `sourcePlatform`, `targetPlatform`, `content`, or `preferredTone`).
- `401 Unauthorized`: User authentication failed or user is not logged in.
- `403 Forbidden`: Insufficient credits to perform the content repurposing.
- `500 Internal Server Error`: AI content generation failed, failed to update user credits, or failed to save the generated content as a draft.

### Server Actions (Backend Operations)
These are Next.js Server Actions, which are server-side functions callable directly from client components.

#### `POST /auth/actions/signin (Server Action)`
**Overview**: Authenticates a user with email and password.
**Request**:
- **Form Data**:
    - `email` (string, required): User's email address.
    - `password` (string, required): User's password.
**Response**:
- Success: Redirects to `/dashboard`.
- Error: Returns an object `{ message: string }` containing an error message.
**Errors**:
- Invalid input format (e.g., invalid email, password less than 6 characters).
- Supabase authentication error (e.g., invalid credentials).

#### `POST /auth/actions/signup (Server Action)`
**Overview**: Registers a new user with email, username, and password, and initializes their profile.
**Request**:
- **Form Data**:
    - `username` (string, required): Desired username.
    - `email` (string, required): User's email address.
    - `password` (string, required): User's password.
**Response**:
- Success: Redirects to `/auth/email-verification` after successful signup.
- Error: Returns an object `{ message: string }` containing an error message.
**Errors**:
- Invalid input format (e.g., invalid email, username less than 4 characters, password less than 6 characters).
- Supabase signup error (e.g., email already registered).

#### `POST /auth/actions/signout (Server Action)`
**Overview**: Signs out the current user.
**Request**:
- No specific payload.
**Response**:
- Success: No explicit return value, handles redirection client-side.
- Error: Throws an error if sign-out fails.
**Errors**:
- Supabase sign-out error.

#### `POST /auth/actions/updatePassword (Server Action)`
**Overview**: Allows an authenticated user to change their password.
**Request**:
- **Form Data**:
    - `currentPassword` (string, required): The user's current password for re-authentication.
    - `newPassword` (string, required): The desired new password.
**Response**:
```json
{
  "type": "success" | "error",
  "message": "string"
}
```
**Errors**:
- `type: "error"` with `message`:
    - "Both fields are required."
    - "New password can't be the same thing as current password."
    - "Not authenticated."
    - "Current password is incorrect."
    - "Failed to update password."

#### `POST /app/(userpages)/brand-voice/actions/addNewVoice (Server Action)`
**Overview**: Adds a new custom brand voice for the user.
**Request**:
- **Form Data**:
    - `user_id` (string, required): The ID of the user adding the voice.
    - `voice_name` (string, required): The name of the custom voice.
    - `voice_description` (string, required): A description for the voice.
    - `voice_instruction` (string, required): Specific instructions for the AI model to use this voice.
**Response**:
```json
{
  "type": "success" | "error",
  "message": "string"
}
```
**Errors**:
- `type: "error"` with `message`:
    - "Unauthorized operation, you must be signed in to add a new custom voice."
    - "Incomplete form data, required fields are missing."
    - "Custom voices creation limit exceeded" (maximum 3 voices).
    - Supabase database error.

#### `POST /app/(userpages)/brand-voice/actions/deleteVoice (Server Action)`
**Overview**: Deletes an existing custom brand voice.
**Request**:
- **Form Data**:
    - `voice_id` (string, required): The ID of the voice to delete.
**Response**:
```json
{
  "type": "success" | "error",
  "message": "string"
}
```
**Errors**:
- `type: "error"` with `message`:
    - "Voice Id is undefined" (if `voice_id` is missing).
    - Supabase database error.

#### `POST /app/(userpages)/brand-voice/actions/updateVoice (Server Action)`
**Overview**: Updates the details of an existing custom brand voice.
**Request**:
- **Form Data**:
    - `voice_id` (string, required): The ID of the voice to update.
    - `voice_name` (string, required): The new name for the voice.
    - `voice_description` (string, required): The new description for the voice.
    - `voice_instruction` (string, required): The new instructions for the voice.
**Response**:
```json
{
  "type": "success" | "error",
  "message": "string"
}
```
**Errors**:
- `type: "error"` with `message`:
    - "Voice Id is undefined" (if `voice_id` is missing).
    - Supabase database error.

#### `POST /app/(userpages)/drafts/actions/deleteDraft (Server Action)`
**Overview**: Deletes a content draft.
**Request**:
- **Form Data**:
    - `draftId` (string, required): The ID of the draft to delete.
**Response**:
- Success: No explicit return value, handles redirection/revalidation.
- Error: Throws an error.
**Errors**:
- Supabase database error.

#### `POST /app/(userpages)/editor/actions/deleteDraft (Server Action)`
**Overview**: Deletes a content draft from the editor view.
**Request**:
- **Form Data**:
    - `draft_id` (string, required): The ID of the draft to delete.
**Response**:
- Success: No explicit return value, redirects to `/editor`.
- Error: Throws an error.
**Errors**:
- Supabase database error.

#### `POST /app/(userpages)/editor/actions/updateDraft (Server Action)`
**Overview**: Updates the content of a specific draft.
**Request**:
- **Form Data**:
    - `user_id` (string, required): The ID of the user owning the draft.
    - `draft_id` (string, required): The ID of the draft to update.
    - `new_content` (string, required): The new content for the draft.
**Response**:
```json
{
  "type": "success" | "error",
  "message": "string"
}
```
**Errors**:
- `type: "error"` with `message`:
    - "Incomplete function params" (if `user_id` or `draft_id` are missing).
    - Supabase database error.

#### `POST /app/(userpages)/settings/actions/ChangeEmail (Server Action)`
**Overview**: Initiates an email change for the authenticated user, requiring email verification.
**Request**:
- **Form Data**:
    - `email` (string, required): The new email address.
**Response**:
```json
{
  "type": "success" | "error",
  "message": "string"
}
```
**Errors**:
- `type: "error"` with `message`:
    - "Invalid email provided."
    - "You must be logged in."
    - Supabase update email error.

#### `POST /app/(userpages)/settings/actions/changeFullname (Server Action)`
**Overview**: Updates the full name of the authenticated user.
**Request**:
- **Form Data**:
    - `fullname` (string, required): The new full name.
**Response**:
```json
{
  "type": "success" | "error",
  "message": "string"
}
```
**Errors**:
- `type: "error"` with `message`:
    - "Name input cannot be blank."
    - "You must be logged in."
    - Supabase update user metadata error.

#### `POST /app/(userpages)/settings/actions/changeDp (Server Action)`
**Overview**: Updates the profile picture (avatar) of the authenticated user.
**Request**:
- **Form Data**:
    - `filePath` (string, required): The storage path of the newly uploaded avatar.
**Response**:
```json
{
  "type": "success" | "error",
  "message": "string"
}
```
**Errors**:
- `type: "error"` with `message`:
    - "No file path provided."
    - "You must be logged in."
    - "Failed to get public URL."
    - "Failed to fetch profile."
    - "Failed to update avatar."

#### `POST /app/(userpages)/settings/actions/deleteAccount (Server Action)`
**Overview**: Deletes the authenticated user's account, including associated data (e.g., avatar folder).
**Request**:
- No specific payload.
**Response**:
- Success: No explicit return value, redirects to `/auth/signin`.
- Error: Throws an error.
**Errors**:
- "User not found or unauthorized."
- "Failed to delete user: [error message]" (from Supabase admin client).

## Technologies Used

| Category         | Technology        | Description                                                               | Link                                                                     |
| :--------------- | :---------------- | :------------------------------------------------------------------------ | :----------------------------------------------------------------------- |
| **Frontend**     | Next.js           | React framework for building full-stack web applications                  | [https://nextjs.org/](https://nextjs.org/)                               |
|                  | React             | JavaScript library for building user interfaces                           | [https://react.dev/](https://react.dev/)                                 |
|                  | Tailwind CSS      | A utility-first CSS framework for rapid UI development                    | [https://tailwindcss.com/](https://tailwindcss.com/)                     |
|                  | Shadcn UI         | Reusable components built with Radix UI and Tailwind CSS                  | [https://ui.shadcn.com/](https://ui.shadcn.com/)                         |
|                  | Radix UI          | Low-level UI primitives for building accessible design systems            | [https://www.radix-ui.com/](https://www.radix-ui.com/)                   |
|                  | Sonner            | An opinionated toast component for React                                  | [https://sonner.emilkowal.ski/](https://sonner.emilkowal.ski/)           |
| **Backend/DB**   | Supabase          | Open-source Firebase alternative (Auth, PostgreSQL DB, Storage)           | [https://supabase.com/](https://supabase.com/)                           |
|                  | Next.js API Routes| Backend endpoints for data fetching and mutations                         | [https://nextjs.org/docs/app/building-your-application/routing/api-routes](https://nextjs.org/docs/app/building-your-application/routing/api-routes)|
|                  | Next.js Server Actions| Direct server-side functions for data mutations and logic              | [https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)|
| **AI**           | Google Gemini API | Powerful AI models for content generation and transformation              | [https://ai.google.dev/models/gemini](https://ai.google.dev/models/gemini) |
|                  | AI SDK            | SDK for building AI applications with JavaScript and TypeScript           | [https://sdk.vercel.ai/](https://sdk.vercel.ai/)                         |
| **Utilities**    | Zod               | TypeScript-first schema declaration and validation library                | [https://zod.dev/](https://zod.dev/)                                     |
|                  | TanStack Query    | Asynchronous state management for React (data fetching, caching, sync)    | [https://tanstack.com/query/latest](https://tanstack.com/query/latest) |
|                  | Lucide React      | Beautifully crafted open-source icons                                     | [https://lucide.dev/](https://lucide.dev/)                               |

## Contributing
We welcome contributions to Postmorph! If you're interested in improving the project, please follow these guidelines:

*   ✨ **Fork the repository**: Start by forking the Postmorph repository to your GitHub account.
*   🌿 **Create a new branch**: For each new feature or bug fix, create a dedicated branch (e.g., `feature/add-dark-mode` or `fix/login-bug`).
*   💡 **Implement your changes**: Write clean, maintainable code. Ensure your changes align with the existing code style.
*   🧪 **Test thoroughly**: Before submitting, test your changes to ensure they work as expected and don't introduce new issues.
*   📝 **Commit messages**: Write clear and descriptive commit messages.
*   ⬆️ **Open a Pull Request**: Submit a pull request to the `main` branch of the original repository. Provide a detailed description of your changes.

## Author Info

-   **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourusername)
-   **Twitter**: [Your Twitter Handle](https://twitter.com/yourusername)
-   **Portfolio**: [Your Personal Website](https://yourportfolio.com)

---
[![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=green)](https://supabase.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-FF0000?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/models/gemini)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
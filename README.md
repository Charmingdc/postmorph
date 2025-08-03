# Postmorph: AI-Powered Content Repurposing Platform

Postmorph is a robust Next.js application engineered to revolutionize content strategy through intelligent AI-powered repurposing. It provides a seamless platform for users to efficiently transform long-form content into optimized formats for various social media platforms, supported by a secure authentication system and scalable data management.

## Project Overview

This project is a full-stack Next.js application leveraging server actions and API routes for dynamic content generation and user management. It features comprehensive user authentication, content storage, and integration with generative AI models to provide a powerful content repurposing experience.

## Features

-   **Content Repurposing**: Transforms various input formats (blogs, YouTube videos, Instagram reels, X threads, LinkedIn posts) into diverse output formats (tweets, X threads, LinkedIn posts, Reddit posts) with customizable tones.
-   **Draft Management**: Stores generated content as drafts, allowing users to review, modify, copy, or delete them.
-   **AI-Powered Refinement**: Provides an in-editor modification tool to refine drafts using custom prompts, with a set limit on refinements per draft.
-   **Brand Voice Customization**: Enables users to define and manage custom brand voices, influencing the AI's content generation style.
-   **User Authentication**: Secure user registration, login, and session management powered by Supabase, including email/password and Google OAuth.
-   **User Profile Management**: Users can update their full name, email, and avatar, and manage account security settings.
-   **Credit System**: Tracks user credit usage for content generation (or indicates unlimited access for "Power Users").
-   **Responsive Design**: Optimized for both desktop and mobile user experiences.

## Technologies Used

| Category        | Technology             | Description                                          | Link                                                                  |
| :-------------- | :--------------------- | :--------------------------------------------------- | :-------------------------------------------------------------------- |
| **Frontend**    | Next.js                | React framework for building full-stack web apps     | [Next.js](https://nextjs.org/)                                        |
|                 | React Query            | Powerful asynchronous state management for React     | [React Query](https://tanstack.com/query/latest)                      |
|                 | Tailwind CSS           | Utility-first CSS framework for rapid UI development | [Tailwind CSS](https://tailwindcss.com/)                              |
|                 | Shadcn UI              | Reusable UI components built with Radix UI and Tailwind CSS | [Shadcn UI](https://ui.shadcn.com/)                                   |
|                 | Sonner                 | A modern toast library for React                     | [Sonner](https://sonner.emilkowalski.pl/)                             |
| **Backend/DB**  | Supabase               | Open-source Firebase alternative (BaaS) for Auth, DB, Storage | [Supabase](https://supabase.com/)                                     |
|                 | AI SDK (`@ai-sdk/google`) | Universal AI SDK for JavaScript/TypeScript          | [AI SDK](https://sdk.vercel.ai/)                                      |
|                 | Google Gemini API      | Generative AI model for content processing           | [Google Gemini](https://ai.google.dev/models/gemini)                  |
| **Validation**  | Zod                    | TypeScript-first schema declaration and validation   | [Zod](https://zod.dev/)                                               |
|                 | `zod-validation-error` | Utility to format Zod errors for user display        | [zod-validation-error](https://github.com/caioaguiarh/zod-validation-error) |

## Getting Started

### Installation
**Note**: This section is intentionally skipped based on specific user requirements.

### Environment Variables
To run this project locally, you will need to configure the following environment variables in a `.env.local` file at the root of the project:

| Variable Name                  | Example Value                                       | Description                                           |
| :----------------------------- | :-------------------------------------------------- | :---------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`          | `http://localhost:3000`                             | The public URL where the application is hosted.       |
| `NEXT_PUBLIC_SUPABASE_URL`     | `https://your-project.supabase.co`                  | Your Supabase project URL.                            |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`| `eyJhbGciOi...`                                     | Your Supabase Public Anon Key.                        |
| `SUPABASE_SERVICE_ROLE_KEY`    | `eyJhbGciOi...`                                     | Your Supabase Service Role Key (secret).              |
| `GOOGLE_GENERATIVE_AI_API_KEY` | `AIzaSyCXSbHCaPoNRbJbVyR1bcPOL7hoKNqAlg4`            | API key for Google's Generative AI services.          |

**Note**: The Supabase keys and Google API key provided in the `.env.local` example are placeholders. You **must** replace them with your actual keys from your Supabase project and Google Cloud console.

## Usage

Postmorph provides a streamlined workflow for content repurposing:

1.  **Authentication**: Begin by signing up or signing in to your account. Google OAuth is supported for quick access, alongside traditional email and password.
2.  **Repurpose Content**:
    *   Navigate to the "Repurpose New" section.
    *   Select your `Input Format` (e.g., "blog", "youtube video").
    *   Choose your desired `Output Format` (e.g., "tweet", "linkedin post").
    *   Set the `Tone` for the generated content (e.g., "professional", "casual").
    *   Paste your content or link into the input area.
    *   Click "Repurpose Now" to generate your new content.
3.  **Manage Drafts**: All generated content is saved as drafts.
    *   Access your drafts from the "Drafts" section.
    *   Each draft can be copied, edited, or deleted.
    *   In the editor, you can apply further modifications using custom prompts or pre-defined actions like "Add Hook", "Fix Grammar", "Condense", "Expand", "Rephrase", and "Improve Structure". Each draft has a limited number of refinements.
4.  **Brand Voice**:
    *   In the "Brand Voice" section, define and manage custom writing styles that reflect your brand.
    *   You can manually input voice details (name, description, instruction) or generate them from an existing post link.
5.  **Account Settings**:
    *   Manage your profile in the "Account Settings" section.
    *   Update your full name, change your avatar, or adjust security settings like your password. For Google-linked accounts, some settings are managed directly through Google.

## API Documentation

### Base URL
The API endpoints are served from the root of the application, typically `http://localhost:3000` in a development environment or your deployed domain in production.

### Endpoints

#### `GET /api/getDrafts`
Retrieves a paginated list of drafts for a specific user.

**Request**:
Query Parameters:
- `userId` (string, required): The ID of the user whose drafts are to be fetched.
- `from` (integer, optional, default: `0`): The starting index for pagination.
- `to` (integer, optional, default: `9`): The ending index for pagination.

**Response**:
`200 OK`
```json
{
  "drafts": [
    {
      "id": "string",
      "type": "thread" | "tweet" | "linkedln post" | "reddit post",
      "modify_count": 0,
      "content": "string",
      "createdAt": "ISO 8601 Date String"
    }
  ]
}
```

**Errors**:
- `400 Bad Request`: User ID is missing.
- `500 Internal Server Error`: Supabase query error.

#### `POST /api/modifyDraft`
Refines an existing draft's content using a generative AI model based on a user-provided prompt. Each draft has a maximum of 3 refinements.

**Request**:
Payload Structure:
```json
{
  "prompt": "string",  // The instruction for AI to refine the content
  "draftId": "string"  // The ID of the draft to be modified
}
```

**Response**:
`200 OK`
```json
{
  "text": "string",     // The new, refined content
  "modifyCount": 1      // The updated modification count for the draft
}
```

**Errors**:
- `400 Bad Request`: Missing `prompt` or `draftId` in the request body.
- `401 Unauthorized`: User authentication failed.
- `403 Forbidden`: Maximum refinement limit (3) reached for the specified draft.
- `404 Not Found`: Draft not found or unauthorized access to the draft.
- `500 Internal Server Error`: AI generation failed, or an error occurred while updating the draft's modification count.

#### `POST /api/repurposeContent`
*This endpoint is currently a placeholder and does not contain implementation logic.*

**Request**:
(Not applicable yet, as the route is empty)

**Response**:
(Not applicable yet, as the route is empty)

**Errors**:
(Not applicable yet, as the route is empty)

## Contributing

We welcome contributions to Postmorph! If you're looking to enhance the platform or fix issues, please follow these guidelines:

*   ✨ **Fork the repository**: Start by forking the Postmorph repository to your GitHub account.
*   🌿 **Create a new branch**: For each new feature or bug fix, create a dedicated branch (e.g., `feature/add-dark-mode`, `bugfix/fix-auth-flow`).
*   💻 **Make your changes**: Implement your changes and ensure they align with the project's coding standards.
*   🧪 **Test thoroughly**: Before submitting, ensure all existing tests pass and add new tests for your changes if applicable.
*   💬 **Write clear commit messages**: Use descriptive commit messages that explain the purpose of your changes.
*   ⬆️ **Submit a pull request**: Once your changes are ready, submit a pull request to the `main` branch. Provide a detailed description of your changes.

## License

No specific license file was found in the project directory.

## Author Info

-   **Your Name**: [Your Social Media Link (e.g., LinkedIn, Twitter)]
-   **Your Portfolio/Website**: [Your Portfolio/Website Link]

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
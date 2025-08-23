# Postmorph: Intelligent Content Repurposing ✨

## Overview
Postmorph is a cutting-edge Next.js application designed to streamline content repurposing and generation. It leverages the power of AI to transform content across various platforms and tones, while providing robust user authentication, draft management, and a personalized experience. Built with a modern tech stack including Next.js, Supabase, and Google Gemini AI, Postmorph empowers creators to efficiently adapt their content strategy.

## Usage
Postmorph offers a seamless workflow for content creators:

1.  **Select Formats & Tone**: Choose your original content's source format (e.g., blog, X thread) and your desired output format (e.g., tweet, LinkedIn post). Then, select a writing tone from pre-defined options or your custom brand voices.
2.  **Input Content**: Paste your content or a relevant link directly into the editor.
3.  **AI Transformation**: Click "Repurpose Now" to let the AI instantly transform your content based on your selections.
4.  **Review & Refine**: The AI-generated content appears in a flexible editor where you can make further edits, or use quick AI prompts (like "rephrase" or "add hook") to refine the output up to 3 times.
5.  **Save & Manage Drafts**: All generated content is automatically saved as drafts. You can access, edit, copy, or delete your drafts from a centralized dashboard.
6.  **Custom Brand Voices**: Define and store unique brand voices with specific instructions to ensure AI-generated content consistently aligns with your brand's identity.

## Features
-   **AI-Powered Repurposing**: Transform content from various input formats (blog, X thread, LinkedIn post) into different output formats (tweet, X thread, LinkedIn post, Reddit post) with adjustable tones using Google Gemini AI.
-   **User Authentication**: Secure user login and registration powered by Supabase, supporting email/password and Google OAuth.
-   **Dynamic Content Editor**: An intuitive editor for AI-generated drafts, allowing in-place modifications and further AI-driven refinements.
-   **Draft Management**: Centralized dashboard to view, manage, and interact with all saved content drafts.
-   **Custom Brand Voices**: Create and store personalized writing styles and instructions for consistent AI output tailored to specific brand guidelines.
-   **Credit System**: Track and manage content generation credits, with options for unlimited plans and credit top-ups.
-   **Responsive Design**: Optimized for a seamless experience across desktop and mobile devices using Tailwind CSS and Shadcn UI.
-   **Account Settings**: Comprehensive user settings for managing profile details, email, password, and avatar.

## Technologies Used
| Category           | Technology        | Description                                       |
| :----------------- | :---------------- | :------------------------------------------------ |
| **Frontend**       | [Next.js](https://nextjs.org/)          | React framework for production, client & server components. |
|                    | [React](https://react.dev/)             | JavaScript library for building user interfaces.          |
|                    | [TypeScript](https://www.typescriptlang.org/)     | Typed superset of JavaScript for enhanced code quality.   |
|                    | [Tailwind CSS](https://tailwindcss.com/)      | Utility-first CSS framework for rapid UI development.     |
|                    | [Shadcn UI](https://ui.shadcn.com/)       | Reusable UI components for a consistent design system.    |
|                    | [Tanstack Query](https://tanstack.com/query)  | Powerful asynchronous state management (data fetching).   |
| **Backend/DB**     | [Supabase](https://supabase.com/)         | Open-source Firebase alternative (Auth, Database, Storage). |
| **AI Integration** | [Google Gemini](https://ai.google.dev/models/gemini) | Advanced generative AI model for content transformation.  |

## Getting Started
### Environment Variables
To run this project, you will need to add the following environment variables to your `.env.local` file:

`NEXT_PUBLIC_APP_URL`=http://localhost:3000
`NEXT_PUBLIC_SUPABASE_URL`=https://your-supabase-project-id.supabase.co
`NEXT_PUBLIC_SUPABASE_ANON_KEY`=your-supabase-anon-key
`SUPABASE_SERVICE_ROLE_KEY`=your-supabase-service-role-key
`GOOGLE_GENERATIVE_AI_API_KEY`=your-google-ai-api-key

## Contributing
We welcome contributions to Postmorph! To get started:

*   💡 Fork this repository and clone it to your local machine.
*   🌿 Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`
*   💻 Make your changes and test them thoroughly.
*   ⬆️ Commit your changes with clear and descriptive messages.
*   🚀 Push your branch to your forked repository.
*   📥 Open a pull request to the `main` branch of this repository.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License
All Rights Reserved.

## Author Info
**[Your Name Here]**

*   **LinkedIn**: [Your LinkedIn Profile]
*   **Portfolio**: [Your Portfolio Website]
*   **Email**: [Your Email Address]

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
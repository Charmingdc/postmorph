# Postmorph: Intelligent Content Repurposing Platform ✍️

## Overview
Postmorph is a cutting-edge web application built with **Next.js**, **React**, and **Tailwind CSS** that empowers content creators to effortlessly transform and refine their content for various platforms. Leveraging **Supabase** for robust authentication and data management, and **Google Gemini AI** for advanced natural language processing, Postmorph streamlines the content repurposing workflow, ensuring consistency and brand voice across all your channels.

## Features
*   **AI-Powered Content Repurposing**: Seamlessly transform long-form content (blogs, YouTube videos, Instagram reels) into concise, platform-optimized formats (tweets, X threads, LinkedIn posts, Reddit posts).
*   **Dynamic Content Refinement**: Utilize AI to modify existing drafts by adding hooks, fixing grammar, condensing, expanding, rephrasing, or improving structure with a simple prompt.
*   **Custom Brand Voice Management**: Define and save unique brand voices with specific descriptions and instructions, ensuring AI-generated content always aligns with your brand identity.
*   **Comprehensive Draft Management**: Save, view, edit, and delete all your repurposed content drafts in one centralized location.
*   **Flexible Credit System**: Track credit usage and manage content generation based on an intuitive credit system, with options for unlimited access.
*   **Secure User Authentication**: Robust user authentication via email/password and Google OAuth, powered by Supabase Auth.
*   **Personalized User Settings**: Manage profile details including avatar, full name, and email, along with security settings.
*   **Responsive User Interface**: Enjoy a smooth and adaptive experience across all devices, from desktop to mobile.

## Usage
Postmorph is designed to make content repurposing intuitive and efficient. Here's a brief guide to getting started:

1.  **Sign Up or Sign In**: Create an account using your email and password or instantly sign in with your Google account.
2.  **Navigate to Repurpose New**: On the sidebar (desktop) or via the central button in the mobile footer, access the "Repurpose New" page.
3.  **Select Formats**: Choose your "Input" format (e.g., Blog, YouTube Video) and your desired "Output" format (e.g., Tweet, LinkedIn Post).
4.  **Define Tone**: Select a default tone (professional, casual, funny, motivational) or add a custom brand voice under the "Brand Voice" section to ensure the AI generates content that perfectly matches your style.
5.  **Input Content**: Paste the link or the full content you wish to repurpose into the input area.
6.  **Repurpose Now**: Click the "Repurpose Now" button. The AI will process your request and generate the transformed content instantly.
7.  **Manage Drafts**: The generated content is automatically saved as a draft. You can access all your drafts from the "Drafts" section to view, copy, or further modify them.
8.  **Refine Content**: On the draft editor page, you can apply further refinements using the AI by entering specific prompts (e.g., "Add Hook", "Condense") to perfect your content.
9.  **Manage Brand Voices**: Under "Brand Voice," you can add new custom voices by providing a name, description, and specific instructions, or update/delete existing ones.

## Technologies Used

| Category        | Technology                                                                                                  | Description                                                                                             |
| :-------------- | :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| **Frontend**    | [Next.js](https://nextjs.org/)                                                                              | React framework for building fast web applications with server-side rendering and static site generation. |
|                 | [React](https://react.dev/)                                                                                 | A JavaScript library for building user interfaces.                                                      |
|                 | [Tailwind CSS](https://tailwindcss.com/)                                                                  | A utility-first CSS framework for rapidly building custom designs.                                      |
|                 | [Shadcn UI](https://ui.shadcn.com/)                                                                         | Reusable components built with Radix UI and Tailwind CSS.                                               |
|                 | [TypeScript](https://www.typescriptlang.org/)                                                               | Strongly typed JavaScript for enhanced developer experience and code quality.                           |
|                 | [Zod](https://zod.dev/)                                                                                     | Schema declaration and validation library for robust data handling.                                     |
| **Backend/DB**  | [Supabase](https://supabase.com/)                                                                           | Open-source Firebase alternative providing database, authentication, and storage services.              |
|                 | [Google Gemini AI (via AI SDK)](https://ai.google.dev/models/gemini)                                        | AI model for generating and refining text content.                                                      |
| **State Mgt.**  | [React Query (TanStack Query)](https://tanstack.com/query/latest)                                           | Powerful asynchronous state management for React applications.                                          |
| **Other**       | [Sonner](https://sonner.emilkowal.ski/)                                                                     | A modern toast library for displaying notifications.                                                    |
|                 | [Lucide React](https://lucide.dev/)                                                                         | Open-source icon library for React applications.                                                        |
|                 | [JSDOM & Mozilla Readability](https://www.npmjs.com/package/jsdom) ([@mozilla/readability](https://www.npmjs.com/package/@mozilla/readability)) | Used for parsing and extracting readable content from web pages for blogs/articles.                     |


## Contributing
We welcome contributions to Postmorph! If you're interested in improving the platform, please follow these guidelines:

*   ✨ **Fork the repository**: Start by forking the project to your GitHub account.
*   🌳 **Create a new branch**: For any new feature or bug fix, create a dedicated branch (e.g., `feature/add-dark-mode` or `fix/auth-bug`).
*   💡 **Submit a pull request**: Once your changes are ready, submit a pull request detailing the changes you've made and the problem they solve.
*   💬 **Engage in discussions**: Be open to feedback and participate in discussions on your pull request.

## License
This project is currently unlicensed. Please contact the author for licensing information if you intend to use or distribute this software.

## Author Info
**[Your Name]**

*   LinkedIn: [@YourLinkedInUsername](https://linkedin.com/in/YourLinkedInUsername)
*   Twitter: [@YourTwitterHandle](https://twitter.com/YourTwitterHandle)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
# Postmorph: Intelligent Content Repurposing ✨

Postmorph is a cutting-edge web application built with **Next.js** and **React** that empowers creators to effortlessly transform and repurpose their content across various formats and tones. Leveraging the power of **Google's Generative AI** and **Supabase** for robust backend services, Postmorph streamlines your content workflow, making it faster and more efficient to adapt your message for any platform.

## Features

*   **AI-Powered Content Repurposing**: Transform long-form articles, videos, or social threads into new, engaging content optimized for different platforms.
*   **Flexible Input/Output Formats**: Repurpose content from blogs, YouTube videos, Instagram reels, X threads, or LinkedIn posts into tweets, X threads, LinkedIn posts, or Reddit posts.
*   **Customizable Tones**: Adjust the generated content's tone to professional, casual, funny, or motivational.
*   **Intuitive Content Editor**: Edit, refine, copy, and save your repurposed drafts with a seamless in-app editor.
*   **Draft Management**: Keep track of all your generated content drafts, with options to view, edit, and delete them.
*   **User Authentication**: Secure user management with email/password and Google OAuth authentication, powered by Supabase Auth.
*   **Credit System**: Monitor your content generation usage with an integrated credit tracking system.
*   **Personalized Brand Voice**: Define and save custom brand voices to ensure consistent AI-generated content that aligns with your unique style.
*   **Responsive User Interface**: A modern and adaptive design, ensuring a smooth experience across desktop and mobile devices.

## Usage

1.  **Account Creation & Login**:
    *   Navigate to the `/auth/signup` page to create a new account using your email and password, or sign up instantly with your Google account.
    *   If you already have an account, head to `/auth/signin` to log in.
2.  **Repurpose Content**:
    *   Once logged in, navigate to the "Repurpose New" section from the sidebar or mobile footer.
    *   Select your **Input Format** (e.g., "blog", "youtube video").
    *   Choose your desired **Output Format** (e.g., "tweet", "x thread").
    *   Select a **Tone** for the generated content (e.g., "professional", "casual").
    *   Paste your content or link into the input area.
    *   Click the "Repurpose Now" button to generate new content.
3.  **Edit and Manage Drafts**:
    *   Generated content will be saved as drafts, accessible from the "Drafts" section.
    *   Click the "Pencil Line" icon next to any draft to open it in the editor.
    *   Within the editor, you can modify the content, use AI prompts to refine it further (e.g., "Add Hook", "Fix Grammar"), copy the content, or delete the draft.
    *   Don't forget to "Save" any changes you make in the editor!
4.  **Manage Brand Voices**:
    *   Visit the "Brand Voice" section to add or manage your custom writing styles. These help the AI understand and mimic your preferred tone and style.
5.  **Settings and Profile**:
    *   In "Account Settings", you can update your full name, change your avatar, and manage your password (if using email/password authentication).

## Technologies Used

| Category         | Technology                 | Description                                    |
| :--------------- | :------------------------- | :--------------------------------------------- |
| **Framework**    | [Next.js](https://nextjs.org/)             | React framework for production.                |
| **UI Library**   | [React](https://react.dev/)                | JavaScript library for building user interfaces. |
| **Styling**      | [Tailwind CSS](https://tailwindcss.com/)   | Utility-first CSS framework.                   |
| **Database/Auth**| [Supabase](https://supabase.com/)          | Open-source Firebase alternative (PostgreSQL DB, Auth). |
| **AI Integration**| [Google Gemini](https://ai.google.dev/models/gemini) | Generative AI model for content transformation. |
| **Data Fetching**| [Tanstack Query](https://tanstack.com/query/latest) | Powerful asynchronous state management.        |
| **UI Components**| [shadcn/ui](https://ui.shadcn.com/)        | Reusable UI components built with Radix UI and Tailwind CSS. |
| **Form Validation**| [Zod](https://zod.dev/)                  | TypeScript-first schema declaration and validation. |
| **Notifications**| [Sonner](https://sonner.emilkowalski.to/) | Opinionated toast component for React.         |
| **Icons**        | [Lucide React](https://lucide.dev/)        | Beautifully simple and human-friendly open-source icons. |

## Contributing

We welcome contributions to Postmorph! If you have suggestions for improvements or new features, please follow these guidelines:

*   💡 **Fork the Repository**: Start by forking the project repository.
*   🌿 **Create a Branch**: Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`.
*   💻 **Implement Changes**: Write your code, ensuring it adheres to the existing coding style.
*   🧪 **Test Your Changes**: Make sure your changes are fully tested and do not introduce new bugs.
*   ➕ **Commit Your Changes**: Write clear and concise commit messages.
*   ⬆️ **Push to Your Fork**: Push your branch to your forked repository.
*   📝 **Open a Pull Request**: Submit a pull request to the `main` branch of the original repository, describing your changes in detail.

## License

This project is not currently licensed. Please contact the author for licensing information.

## Author

**[Your Name]**

*   LinkedIn: [Your LinkedIn Profile URL]
*   Twitter: [Your Twitter Profile URL]
*   Portfolio: [Your Portfolio URL]

---

[![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Google AI](https://img.shields.io/badge/Google_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)](https://example.com/build-status)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
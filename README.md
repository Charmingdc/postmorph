# Postmorph: Effortless Content Repurposing with AI

## Overview

Postmorph is an innovative, AI-powered content transformation platform built with Next.js, React, and TypeScript. It allows creators to seamlessly convert various forms of content, such as blog posts and videos, into diverse, platform-optimized formats, drastically reducing manual effort and expanding their online reach.

## Features

- **AI-Powered Repurposing**: Transform long-form content (blog posts, YouTube videos, TikToks) into short-form formats like X threads, tweets, LinkedIn posts, and Reddit posts.
- **Custom Brand Voices**: Define and apply unique tone and style instructions to ensure all repurposed content maintains a consistent brand voice.
- **Interactive Content Editor**: Fine-tune generated drafts with an intuitive editor, allowing for modifications, additions, and deletions of content segments.
- **Credit-Based System**: Manage content generation efficiently with a transparent pay-as-you-go credit system, including a free tier and various purchase options.
- **Real-time Updates**: Experience instant feedback with real-time updates for generated drafts and credit usage across the application.
- **Secure Authentication**: User authentication powered by Supabase, supporting email/password and Google OAuth sign-in.
- **Dynamic SEO**: Automatically generated sitemaps and robots.txt for optimal search engine visibility.
- **Responsive Design**: A fluid and adaptive user interface, providing an optimal experience across desktop and mobile devices.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:Charmingdc/postmorph
   cd postmorph-nextjs
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   # or yarn install
   # or pnpm install
   ```
3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory and populate it with the following:

### Environment Variables

```ini
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-api-key
SUPADATA_API_KEY=your-supadata-api-key
DODO_PAYMENTS_API_KEY=your-dodopayments-api-key
DODO_PAYMENTS_WEBHOOK_KEY=your-dodo-payment-webhook-secret
DODO_PAYMENTS_ENVIRONMENT=current-payment-environment
```

4. **Run the Development Server**:
   ```bash
   npm run dev
   # or yarn dev
   # or pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

Postmorph simplifies your content workflow in a few straightforward steps:

### Transforming Content

1. **Select Input and Output Formats**: On the "Repurpose New" page, choose the original format of your content (e.g., "blog", "youtube video") and the desired output format (e.g., "tweet", "x thread").
2. **Choose a Tone**: Select from predefined "Default Tones" like "professional", "casual", or "funny", or use one of your custom brand voices to guide the AI's writing style.
3. **Provide Content**: Paste your content or a link (for videos and external blogs) into the input area.
4. **Repurpose**: Click the "Repurpose Now" button. The AI will generate a draft based on your selections.

### Editing Drafts

1. **Access Your Drafts**: All generated content is saved as drafts, accessible from the "Drafts" or "Editor" section of your dashboard.
2. **Modify Content**: Within the editor, you can directly adjust the text. For X threads, you can edit individual tweets, add new tweets, or remove existing ones.
3. **Refine with AI Prompts**: Use the "Sparkles" icon to open the prompt popover. Enter custom instructions or select a predefined action (e.g., "Fix Grammar", "Expand") to further refine your draft using AI.
4. **Save Changes**: Click "Save" to update your draft, or "Delete" to remove it.
5. **Copy and Share**: Easily copy the entire content of a draft to your clipboard for sharing on your preferred platform.

### Managing Brand Voice

1. **Navigate to Brand Voice**: Go to the "Brand Voice" section to manage your custom writing styles.
2. **Add New Voice**: Click "Add new custom voice" and fill in the name, description, and specific instructions for your AI to follow when generating content in this voice.
3. **Edit or Delete**: Modify existing custom voices or remove them as needed.

## Technologies Used

| Category         | Technology            | Description                                                  | Link                                                           |
| :--------------- | :-------------------- | :----------------------------------------------------------- | :------------------------------------------------------------- |
| **Frontend**     | Next.js               | React framework for building full-stack web applications     | [nextjs.org](https://nextjs.org/)                              |
|                  | React                 | JavaScript library for building user interfaces              | [react.dev](https://react.dev/)                                |
|                  | TypeScript            | Statically typed superset of JavaScript                      | [typescriptlang.org](https://www.typescriptlang.org/)          |
|                  | Tailwind CSS          | Utility-first CSS framework for rapid UI development         | [tailwindcss.com](https://tailwindcss.com/)                    |
|                  | Framer Motion         | Production-ready motion library for React                    | [framer.com/motion](https://www.framer.com/motion/)            |
|                  | Shadcn UI             | Reusable UI components                                       | [ui.shadcn.com](https://ui.shadcn.com/)                        |
|                  | Sonner                | Opinionated toast component                                  | [sonner.emilkowal.ski](https://sonner.emilkowal.ski/)          |
|                  | Lucide React          | Beautifully simple and consistent icon toolkit               | [lucide.dev](https://lucide.dev/)                              |
| **Backend/DB**   | Supabase              | Open-source Firebase alternative (Auth, DB)                  | [supabase.com](https://supabase.com/)                          |
|                  | Google Gemini API     | AI model for text generation and content transformation      | [ai.google.dev](https://ai.google.dev/)                        |
| **Integrations** | DodoPayments          | Payment gateway for handling transactions and subscriptions  | [dodopayments.com](https://dodopayments.com/)                  |
|                  | Supadata              | API for fetching video transcripts and other data services   | [supadata.co](https://supadata.co/)                            |
|                  | JSDOM & Readability   | Tools for parsing and extracting content from HTML documents | [github.com/jsdom/jsdom](https://github.com/jsdom/jsdom)       |
| **Utilities**    | Zod                   | TypeScript-first schema declaration and validation library   | [zod.dev](https://zod.dev/)                                    |
|                  | Tanstack Query        | Powerful asynchronous state management for React             | [tanstack.com/query](https://tanstack.com/query)               |
|                  | Vercel Analytics      | Frontend performance and usage monitoring                    | [vercel.com/analytics](https://vercel.com/analytics)           |
|                  | Vercel Speed Insights | Real User Monitoring (RUM) for web performance insights      | [vercel.com/speed-insights](https://vercel.com/speed-insights) |

## Contributing

We welcome contributions to Postmorph! To contribute, please follow these steps:

✨ **Fork the Repository**: Start by forking the project repository to your GitHub account.

🌿 **Clone the Fork**: Clone your forked repository to your local machine:
`git clone git@github.com:your-username/postmorph-nextjs.git`

➕ **Create a New Branch**: Create a feature or bugfix branch for your changes:
`git checkout -b feature/your-feature-name`

💻 **Implement Your Changes**: Make your changes and ensure they adhere to the project's coding standards.

✅ **Run Tests**: Before committing, make sure all existing tests pass and add new tests if necessary.

💬 **Commit Your Changes**: Write clear and concise commit messages.

🚀 **Push to Your Branch**: Push your changes to your forked repository:
`git push origin feature/your-feature-name`

📄 **Open a Pull Request**: Submit a pull request to the `main` branch of the original repository. Describe your changes thoroughly and link to any relevant issues.

Thank you for helping to improve Postmorph!

## License

This project is licensed under the MIT License.

## Author Info

Connect with the creators of Postmorph:

**Adebayo Muis**

- LinkedIn: [Adebayo Muis](https://linkedin.com/in/adebayo-muis)
- X (formerly Twitter): [@Charmingdc01](https://x.com/@Charmingdc01)

---

[![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)

# Postmorph: Effortless AI-Powered Content Repurposing

## Overview

Postmorph is a cutting-edge web application built with Next.js, React, and TypeScript, designed to revolutionize content creation workflows. It leverages advanced AI to transform existing content from various sources (YouTube videos, TikTok videos, blog posts, social media posts) into multiple tailored formats for different platforms, significantly saving time and ensuring brand consistency. The platform features robust user authentication, a dynamic content editor, personalized brand voice management, and a flexible credit-based payment system.

## Features

- **AI-Powered Repurposing**: Converts long-form or short-form content (blogs, YouTube, TikTok, X threads, LinkedIn, Reddit posts) into various social media formats with a single click.
- **Custom Brand Voice**: Users can define and apply unique writing styles and tones to ensure all generated content aligns with their brand identity.
- **Interactive Content Editor**: A comprehensive editor allows users to refine, expand, condense, or rephrase AI-generated drafts, with real-time character counts and modification limits.
- **Draft Management**: All repurposed content is saved as drafts, providing a centralized hub for editing, copying, and deleting content. Supports paginated viewing and real-time updates.
- **Flexible Credit System**: Operates on a pay-as-you-go model, allowing users to purchase credits which do not expire, ensuring they only pay for what they use.
- **Secure Authentication**: Implements user sign-up and sign-in via email/password and Google OAuth, powered by Supabase.
- **Learning Center**: Provides in-depth tutorials and examples to guide users through effective content repurposing strategies and platform features.
- **Responsive Design**: Built with Tailwind CSS and Shadcn UI components for a seamless user experience across all devices.
- **Payment Processing**: Integrated with Polar for secure and efficient handling of credit purchases and checkout sessions.

## Getting Started

### Installation

To get Postmorph up and running on your local machine, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:Charmingdc/postmorph
   cd postmorph-nextjs
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   # or yarn install
   ```
3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and populate it with the following required variables:

### Environment Variables

```ini
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-api-key
SUPADATA_API_KEY=your-supadata-api-key
POLAR_ACCESS_TOKEN=your-polar-access-token # generated from sandbox environment, need to generate from real dashboard when going live
POLAR_MODE=your-polar-environment-mode
POLAR_WEBHOOK_SECRET=your-polar-webhook-secret
```

4. **Run the Development Server**:
   ```bash
   npm run dev
   # or yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

Postmorph simplifies content repurposing into an intuitive workflow:

1. **Sign Up or Sign In**: Navigate to `/auth/signup` or `/auth/signin` to create an account or log in. Google OAuth is also available for quick access.
2. **Repurpose Content**:
   - Go to the `/repurpose` page.
   - Select your **Input Format** (e.g., "blog", "youtube video", "x thread").
   - Choose your desired **Output Format** (e.g., "tweet", "x thread", "linkedin post").
   - Select a **Tone** (either a default option like "professional" or a custom voice you've created).
   - Paste your content (a link for videos/blogs, or raw text for social posts) into the input area.
   - Click the "Repurpose Now" button. The AI will generate a draft tailored to your specifications.
3. **Edit and Refine Drafts**:
   - Once content is generated, it appears in a draft box. You can also view all your drafts on the `/drafts` page.
   - Click the "Pencil" icon to open the editor.
   - In the editor, you can directly modify the content. For X threads, individual tweets can be edited, added, or removed.
   - Use the "Sparkles" icon to open the AI refinement popover. Here, you can apply predefined actions (e.g., "Add Hook", "Fix Grammar", "Condense") or enter custom prompts to further refine your content.
   - Track your remaining refinements using the badge.
   - Click "Save" to commit your changes or "Trash" to delete the draft.
4. **Manage Brand Voices**:
   - Visit the `/brand-voice` page.
   - Click "Add new custom voice" to define new tones and instructions for the AI to follow, ensuring consistent branding.
   - You can edit or delete existing custom voices.
5. **Monitor Credits**:
   - Your current credit balance is displayed on the `/dashboard` page.
   - Click "Buy Credits" or navigate to `/pricing` to purchase more credits. The pricing page provides different plans to suit your needs.
6. **Learn More**:
   - Explore the `/learning-center` for comprehensive tutorials on content repurposing strategies and how to best utilize Postmorph.

## Technologies Used

| Category               | Technology                                       | Description                                                            |
| :--------------------- | :----------------------------------------------- | :--------------------------------------------------------------------- |
| **Framework**          | [Next.js](https://nextjs.org/)                   | React framework for production                                         |
| **Language**           | [TypeScript](https://www.typescriptlang.org/)    | Strongly typed JavaScript                                              |
| **UI Library**         | [React](https://react.dev/)                      | Frontend JavaScript library                                            |
| **Styling**            | [Tailwind CSS](https://tailwindcss.com/)         | Utility-first CSS framework                                            |
| **Components**         | [Shadcn UI](https://ui.shadcn.com/)              | Beautifully designed reusable components                               |
| **AI/LLM**             | [@ai-sdk/google](https://sdk.vercel.ai/)         | Vercel AI SDK with Google Gemini API                                   |
| **Database**           | [Supabase](https://supabase.com/)                | Open Source Firebase alternative (PostgreSQL, Auth, Storage, Realtime) |
| **Payments**           | [Polar](https://polar.sh/)                       | API for managing developer subscriptions and payments                  |
| **Video/Blog Scraper** | [Supadata](https://supadata.dev/)                | API for fetching video transcripts and blog content                    |
| **Animations**         | [Framer Motion](https://www.framer.com/motion/)  | Production-ready motion library for React                              |
| **Data Fetching**      | [React Query](https://tanstack.com/query/latest) | Powerful asynchronous state management                                 |
| **Validation**         | [Zod](https://zod.dev/)                          | TypeScript-first schema declaration and validation                     |
| **Toasts**             | [Sonner](https://sonner.emilkowalski.dk/)        | An opinionated toast component for React                               |
| **Deployment**         | [Vercel](https://vercel.com/)                    | Cloud platform for frontend developers                                 |

## Contributing

We welcome contributions to Postmorph! If you have ideas for new features, bug fixes, or improvements, please follow these guidelines:

- ✨ **Fork the repository** and clone it locally.
- 🌿 Create a new branch for your feature or fix.
- 💻 Make your changes and commit them with clear, concise messages.
- 🧪 Write tests for new features or bug fixes.
- 🚀 Push your branch and open a pull request.
- 🤝 Ensure your code adheres to the project's coding standards.

## Author Info

**Adebayo Muis (Charmingdc)**

- LinkedIn: [Adebayo Muis](https://linkedin.com/in/adebayo-muis)
- X (formerly Twitter): [Muis](https://x.com/@Charmingdc01)

## Badges

[![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=green)](https://supabase.com/)
[![Polar](https://img.shields.io/badge/Polar-0070F3?style=for-the-badge&logo=polar&logoColor=white)](https://polar.sh/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/models/gemini)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)

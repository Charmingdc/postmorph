# Postmorph: Elevate Your Content Workflow 🚀

Postmorph is a cutting-edge Next.js application designed to streamline and supercharge your content repurposing efforts. 🚀 Transform your existing long-form content like blogs and videos into engaging social media posts, threads, and more, all with an intuitive user experience and powerful AI-driven insights. It's built for creators who value speed, consistency, and impact across all their platforms. ✨

## 🛠️ Installation

Follow these steps to get Postmorph up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: v18.x or higher
*   **npm** or **Yarn**: Latest stable version

### Step-by-Step Guide

1.  **Clone the Repository**:
    First, clone the project repository to your local machine:

    ```bash
    git clone git@github.com:Charmingdc/postmorph
    cd postmorph
    ```

2.  **Install Dependencies**:
    Navigate into the project directory and install the necessary dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root of your project and add the following environment variables. You'll need to obtain these from your Supabase project.

    ```local
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

    _Note: The `NEXT_PUBLIC_APP_URL` should be `http://localhost:3000` for local development._

4.  **Run the Development Server**:
    Start the Next.js development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application will now be accessible at `http://localhost:3000`.

## 🚀 Usage

Postmorph offers a seamless experience for content creators. Here's how to make the most of it:

### Authentication

Upon launching the application, you'll be greeted by the authentication pages. You can easily create a new account or sign in using your email and password, or leverage the convenience of Google OAuth for quick access. The robust authentication system, powered by Supabase, ensures your data remains secure.

_Here's a glimpse of the simplified workflow we offer:_

![Postmorph Workflow](https://github.com/Charmingdc/postmorph/blob/main/src/app/auth/assets/postmorph-workflow.png?raw=true)

### Dashboard Overview

Once logged in, the dashboard provides a quick summary of your content activity:

*   **Credit Metrics**: Keep track of your remaining content generation credits and monitor your usage. This section clearly shows how many credits you have left and your consumption rate.
*   **Recent Drafts**: Access your most recently created repurposed content. This allows for quick review and iteration on your latest work.

### Content Repurposing

Navigate to the "Repurpose New" section to begin transforming your content:

1.  **Select Input Format**: Choose the original format of your content (e.g., Blog, YouTube Video, Instagram Reel).
2.  **Select Output Format**: Pick the desired format for your repurposed content (e.g., Tweet, X Thread, LinkedIn Post).
3.  **Define Tone**: Set the desired tone for your output (e.g., Professional, Casual, Funny, Motivational) to match your brand's voice.
4.  **Paste Content/Link**: Provide the source content by pasting text directly or providing a link if the input format is a video or reel.
5.  **Generate**: Click "Repurpose Now" to let our AI work its magic, transforming your content into new, engaging formats.

### Draft Management

All your generated content is automatically saved as drafts. In the "Drafts" section, you can:

*   **View Drafts**: Browse through all your past repurposed content.
*   **Copy to Clipboard**: Easily copy any draft content with a single click for immediate use.
*   **Delete Drafts**: Remove drafts you no longer need.

### Brand Voice

The "Brand Voice" feature allows you to refine the AI's output to perfectly match your brand's unique style:

*   **Add Custom Voices**: Define specific writing styles and tones. You can provide descriptions or even link to existing posts for the AI to learn from.
*   **Manage Voices**: Organize and refine your custom brand voices to ensure consistency across all your repurposed content.

### Account Settings

In the "Settings" section, you have full control over your profile:

*   **General Settings**: Update your full name and change your avatar.
*   **Security Settings**: Modify your email address and password, or view your connection details if using social authentication like Google.
*   **Danger Zone**: Options for account management (e.g., account deletion), handled with a confirmation prompt for safety.

## ✨ Features

*   **Intelligent Content Repurposing**: Seamlessly convert content from various sources (blog posts, YouTube videos, Instagram reels, X threads, LinkedIn posts) into diverse social media formats.
*   **Customizable Output**: Choose from a range of output formats including Tweets, X Threads, LinkedIn Posts, and Reddit Posts.
*   **AI-Driven Tone Control**: Adjust the output's tone to professional, casual, funny, or motivational to align with your content strategy.
*   **Personalized Brand Voice**: Create and manage custom brand voices, allowing the AI to generate content that truly reflects your unique style.
*   **Draft Management**: Save, review, edit, copy, and delete all your repurposed content drafts with ease.
*   **Robust User Authentication**: Secure sign-up and sign-in capabilities, supporting both email/password and Google OAuth, powered by Supabase Auth.
*   **Credit-Based System**: A clear system to track and manage content generation credits.
*   **Fully Responsive UI**: A fluid and intuitive user interface that adapts seamlessly across all devices, from desktop to mobile.
*   **Modern Tech Stack**: Built with Next.js, React 19, Tailwind CSS, and Shadcn/ui for a high-performance and visually appealing experience.
*   **Efficient State Management**: Utilizes React Query for effective data fetching and caching, ensuring a smooth user experience.

## 💻 Technologies Used

| Technology       | Description                                                                 | Link                                                 |
| :--------------- | :-------------------------------------------------------------------------- | :--------------------------------------------------- |
| **Next.js 15**   | React framework for building full-stack web applications.                   | [nextjs.org](https://nextjs.org/)                    |
| **React 19**     | JavaScript library for building user interfaces.                            | [react.dev](https://react.dev/)                      |
| **TypeScript**   | Typed superset of JavaScript that compiles to plain JavaScript.             | [typescriptlang.org](https://www.typescriptlang.org/) |
| **Tailwind CSS** | A utility-first CSS framework for rapidly building custom designs.           | [tailwindcss.com](https://tailwindcss.com/)          |
| **Shadcn/ui**    | Reusable components built with Radix UI and Tailwind CSS.                   | [ui.shadcn.com](https://ui.shadcn.com/)              |
| **Supabase**     | Open-source Firebase alternative providing auth, database, and storage.     | [supabase.com](https://supabase.com/)                |
| **React Query**  | A powerful data-fetching library for React applications.                    | [tanstack.com/query](https://tanstack.com/query)   |
| **Zod**          | TypeScript-first schema declaration and validation library.                 | [zod.dev](https://zod.dev/)                          |
| **Sonner**       | An opinionated toast component for React.                                   | [sonner.emilkowal.ski](https://sonner.emilkowal.ski/) |
| **Lucide React** | A collection of beautiful, customizable, and open-source icons.             | [lucide.dev](https://lucide.dev/)                    |

## 🤝 Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these guidelines:

*   ✨ **Fork the repository**: Start by forking the Postmorph repository to your GitHub account.
*   🌿 **Create a new branch**: Create a branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `bugfix/your-bug-name`.
*   🚀 **Implement your changes**: Write clear, concise code that adheres to the project's coding style.
*   🧪 **Write tests**: Ensure your changes are well-tested (if applicable).
*   📚 **Update documentation**: If your changes affect functionality, update the relevant documentation.
*   ✅ **Commit your changes**: Write descriptive commit messages.
*   ⬆️ **Push your branch**: `git push origin your-branch-name`.
*   ➡️ **Open a Pull Request**: Submit a pull request to the `main` branch, explaining your changes and their benefits.

## 📝 License

Currently, no specific license file is included. Please contact the author for licensing details.

## ✍️ Author

*   **Your Name**
    *   LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
    *   X (Twitter): [@YourTwitterHandle](https://x.com/YourTwitterHandle)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
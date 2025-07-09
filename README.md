# Postmorph: Your AI-Powered Content Repurposing Platform ✨

Postmorph is a modern web application designed to help content creators effortlessly repurpose their existing content into various formats. Whether you have a blog post you want to turn into an X (Twitter) thread or a YouTube video needing a LinkedIn post summary, Postmorph streamlines the process with an intuitive interface and powerful AI capabilities. Built with Next.js, Supabase, and a suite of cutting-edge web technologies, it offers a seamless and efficient experience for managing and transforming your digital content.

## 🚀 Installation

Follow these steps to get Postmorph up and running on your local machine.

1.  **Clone the Repository**:
First, clone the project repository from GitHub:
```bash
git clone git@github.com:Charmingdc/postmorph
```

2.  **Navigate to Project Directory**:
Change into the newly created project directory:
```bash
cd postmorph
```

3.  **Install Dependencies**:
Install the necessary Node.js packages using npm or Yarn:
```bash
npm install
# or
yarn install
```

4.  **Set Up Environment Variables**:
Create a `.env.local` file in the root of the project. Copy the contents from `.env.local.example` (or directly use the provided values for Supabase) and fill in your Supabase project URL and anon key. These are essential for connecting to your backend services.
```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5.  **Run the Development Server**:
Start the Next.js development server:
```bash
npm run dev
# or
yarn dev
```
The application should now be accessible at `http://localhost:3000`.

## 💡 Usage

Once the application is running, here’s how you can use Postmorph to repurpose your content:

1.  **Account Creation and Sign-in**:
Upon visiting the application, you'll be directed to the authentication pages. You can sign up for a new account using your email and password, or quickly sign in with your Google account for a seamless experience.

2.  **Dashboard Overview**:
After successful authentication, you'll land on the dashboard. Here, you can get a quick overview of your remaining content credits and view your most recent repurposed drafts. This gives you a clear picture of your usage and content activity.

3.  **Repurpose Content**:
Navigate to the "Repurpose New" section.
*   **Select Input Format**: Choose the original format of your content (e.g., "blog", "youtube video", "instagram reel").
*   **Select Output Format**: Specify the desired target format for your repurposed content (e.g., "tweet", "x thread", "linkedin post").
*   **Choose Tone**: Select a writing tone (e.g., "professional", "casual", "funny") to match your brand's voice.
*   **Input Content**: Paste the raw content or the link (for video/reel inputs) into the provided input area.
*   **Generate**: Click the "Repurpose Now" button to let the AI transform your content. The results will appear shortly.

4.  **Manage Drafts**:
All your generated content drafts are saved and accessible under the "Drafts" section.
*   You can view a paginated list of all your drafts.
*   Each draft allows you to copy its content to your clipboard, edit it further, or delete it if no longer needed.

5.  **Define Brand Voice**:
In the "Brand Voice" section, you can add custom writing styles that align with your brand.
*   Give your custom voice a name and a description.
*   Optionally, you can provide a link to an existing post, and the system can automatically generate a description of that post's tone, which you can then save as a custom brand voice. This helps the AI understand your unique style.

6.  **Account Settings**:
Manage your profile information and account preferences via the "Account Settings" page.

## ✨ Features

Postmorph comes packed with features to enhance your content workflow:

*   **Diverse Content Repurposing**: Transform content from various input sources (blog, YouTube, Instagram, X threads, LinkedIn posts) into multiple output formats (tweets, X threads, LinkedIn posts, Reddit posts).
*   **Customizable Tones**: Generate content in professional, casual, funny, or motivational tones to suit different audiences and platforms.
*   **AI-Powered Transformations**: Leverages intelligent AI to understand content context and generate high-quality, relevant repurposed text.
*   **Draft Management System**: Save, organize, edit, and delete all your generated content drafts with ease.
*   **Custom Brand Voice Management**: Define and save unique writing styles and tones that reflect your brand identity, allowing for consistent content creation.
*   **User Authentication**: Secure sign-up and sign-in processes, including email/password and Google OAuth, powered by Supabase.
*   **Credit System**: Track your content generation usage with an integrated credit system displayed prominently on the dashboard.
*   **Responsive User Interface**: Enjoy a seamless experience across desktop and mobile devices, thanks to a thoughtfully designed, adaptive layout.
*   **Modern UI Components**: Utilizes `shadcn/ui` components for a clean, accessible, and aesthetically pleasing interface.
*   **Efficient Data Fetching**: Implements `@tanstack/react-query` for robust data management, caching, and state synchronization.
*   **Server Actions & Middleware**: Leverages Next.js 14+ features for secure and efficient data mutations and session management.
*   **Real-time Notifications**: Provides user feedback via `sonner` toasts for actions like copying content or authentication status.

## 🛠️ Technologies Used

Postmorph is built on a robust and modern tech stack:

| Technology         | Description                                     | Link                                       |
| :----------------- | :---------------------------------------------- | :----------------------------------------- |
| **Next.js**        | React framework for production                  | [Next.js](https://nextjs.org/)             |
| **React**          | JavaScript library for building user interfaces | [React](https://react.dev/)                |
| **TypeScript**     | Strongly typed JavaScript                       | [TypeScript](https://www.typescriptlang.org/) |
| **Tailwind CSS**   | Utility-first CSS framework                     | [Tailwind CSS](https://tailwindcss.com/)   |
| **Supabase**       | Open-source Firebase alternative (Auth, DB)     | [Supabase](https://supabase.com/)          |
| **Shadcn/ui**      | Reusable UI components built with Radix UI      | [shadcn/ui](https://ui.shadcn.com/)        |
| **React Query**    | Powerful data-fetching library                  | [TanStack Query](https://tanstack.com/query/latest) |
| **Zod**            | Schema validation library                       | [Zod](https://zod.dev/)                    |
| **Sonner**         | Accessible toasts for React                     | [Sonner](https://sonner.emilkowalski.pl/)  |
| **Lucide React**   | Beautiful and consistent icons                  | [Lucide](https://lucide.dev/)              |

## 🤝 Contributing

We welcome contributions to Postmorph! If you're interested in making improvements or adding new features, please follow these guidelines:

1.  🍴 **Fork the Repository**: Start by forking the Postmorph repository to your GitHub account.
2.  🌳 **Clone Your Fork**: Clone your forked repository to your local machine.
3.  🌿 **Create a New Branch**: Create a new branch for your feature or bug fix:
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/fix-description
```
4.  💻 **Make Your Changes**: Implement your changes, ensuring they adhere to the project's coding style and best practices.
5.  🧪 **Test Your Changes**: If applicable, add or run tests to ensure your changes work as expected and don't introduce regressions.
6.  💾 **Commit Your Changes**: Commit your changes with a clear and concise message.
```bash
git commit -m "feat: Add new content format repurposing"
# or
git commit -m "fix: Resolve issue with draft deletion"
```
7.  ⬆️ **Push to Your Fork**: Push your new branch to your forked repository on GitHub.
```bash
git push origin feature/your-feature-name
```
8.   pull request **Create a Pull Request**: Open a pull request from your branch to the `main` branch of the original Postmorph repository. Describe your changes thoroughly and link to any relevant issues.

We appreciate your contributions and look forward to reviewing them!

## 🧑‍💻 Author

**Your Name**

*   GitHub: [Charmingdc](https://github.com/Charmingdc)
*   LinkedIn: [Adebayo Muis](https://www.linkedin.com/in/adebayo-muis/)
*   Portfolio: [adebayomuis.vercel.app](https://adebayomuis.vercel.app)

---

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-171E27?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
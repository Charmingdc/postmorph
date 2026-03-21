# Postmorph: Effortless AI-Powered Content Repurposing

Postmorph is a cutting-edge platform designed to revolutionize content creation by enabling users to effortlessly transform a single piece of content into multiple formats optimized for various platforms. Leveraging advanced AI and robust backend services, Postmorph helps content creators, marketers, and founders maximize their reach and maintain a consistent brand voice across all digital channels, saving significant time and resources.

## Installation

To get Postmorph up and running on your local machine, follow these steps:

### Clone the Repository
Start by cloning the project repository from GitHub:
```bash
git clone git@github.com:Charmingdc/postmorph
```

### Install Dependencies
Navigate into the project directory and install the necessary dependencies using npm or yarn:
```bash
cd postmorph-nextjs
npm install
# or
yarn install
```

### Environment Variables
Postmorph relies on several environment variables for its operation. Create a `.env.local` file in the root of your project and populate it with the following required variables. You can refer to the `.env.template` file for guidance.

```dotenv
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-api-key
SUPADATA_API_KEY=your-supadata-api-key
POLAR_ACCESS_TOKEN=your-polar-access-token
POLAR_MODE=sandbox # or production
POLAR_WEBHOOK_SECRET=your-polar-webhook-secret
```

**Description of Environment Variables:**
- `NEXT_PUBLIC_APP_URL`: The public URL of your application. Used for redirects and API calls.
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase public anonymous key.
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (secret).
- `GOOGLE_GENERATIVE_AI_API_KEY`: API key for Google's Generative AI services (Gemini).
- `SUPADATA_API_KEY`: API key for Supadata services, used for video transcription.
- `POLAR_ACCESS_TOKEN`: Your Polar access token for payment processing.
- `POLAR_MODE`: Specifies the Polar environment, either `sandbox` for testing or `production` for live transactions.
- `POLAR_WEBHOOK_SECRET`: Secret key for validating Polar webhooks.

### Run the Development Server
Once environment variables are set, start the development server:
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

Postmorph simplifies your content workflow into a few intuitive steps:

1.  **Select Input and Output Formats**: Choose the original format of your content (e.g., Blog Post, YouTube Video) and the desired output format (e.g., Tweet, X Thread, LinkedIn Post).
2.  **Define Your Tone**: Select a predefined tone (Professional, Casual, Funny, Motivational) or use a custom brand voice you have set up.
3.  **Provide Content**: Paste a link (for videos or blog posts) or the raw text content into the input area.
4.  **Repurpose**: Click "Repurpose Now" to let AI transform your content.
5.  **Review and Edit**: Your newly generated draft will appear in the editor. You can refine it further using AI prompts or manually adjust the text to perfectly match your needs.
6.  **Save or Share**: Save the draft to your collection or copy it directly for immediate sharing on your platforms.

This streamlined process helps you generate diverse content quickly and efficiently, ensuring every idea reaches its full potential across all your channels.

## Features

-   **Intelligent Content Repurposing**: Transform YouTube videos, TikToks, blog posts, and social media content into various formats with AI.
-   **Multiple Output Formats**: Generate content suitable for Twitter threads, single tweets, LinkedIn posts, and Reddit posts.
-   **Customizable Brand Voices**: Define and apply custom tone instructions to ensure AI-generated content consistently matches your unique brand identity.
-   **Interactive Content Editor**: A powerful built-in editor allows for real-time adjustments, AI-powered refinements (e.g., "Add Hook", "Fix Grammar", "Expand"), and seamless management of multi-part content like X threads.
-   **Credit-Based System**: A transparent pay-as-you-go model where you purchase credits and only spend them for repurposing and modification actions. Unlimited access is available for power users.
-   **User Dashboard & Draft Management**: A personalized dashboard to monitor credit usage, view recent drafts, and manage all saved content.
-   **Secure Authentication**: Leverages Supabase for robust user authentication, including Google OAuth for easy sign-up and sign-in.
-   **Integrated Payment Gateway**: Seamless payment processing via Polar for purchasing credit packs.
-   **Learning Center**: Comprehensive guides and resources to help users master content repurposing strategies and get the most out of Postmorph.
-   **Responsive Design**: Optimized for a seamless experience across desktop and mobile devices, featuring dedicated mobile navigation.

## API Documentation

### Overview
The Postmorph API is built with Next.js API Routes, providing server-side functionalities for content repurposing, draft management, user authentication, and payment processing. It leverages Supabase for database and authentication, Google Generative AI for content transformation, Supadata for video transcription, and Polar for payment gateway interactions.

### Base URL
`/api`

### Endpoints

#### POST /api/createCheckout
**Overview**: Initiates a checkout session via Polar for users to purchase credit packs.
**Request**:
```json
{
  "planId": "string",         // Unique ID of the Polar product plan
  "customerName": "string",   // Full name of the customer
  "customerEmail": "string",  // Email of the customer
  "userId": "string",         // Supabase user ID associated with the customer
  "credits": 0,               // Number of credits being purchased
  "planName": "string"        // Name of the plan (e.g., "starter", "creator")
}
```
**Response**:
```json
{
  "url": "string" // URL to the Polar hosted checkout page
}
```
**Errors**:
- `400 Bad Request`: `{"error": "Missing fields"}`
- `500 Internal Server Error`: `{"error": "Error message details"}` (e.g., "Error creating checkout session")

#### GET /api/getDrafts
**Overview**: Retrieves a paginated list of content drafts for a specific user.
**Request**:
- Query Parameters:
  - `userId`: `string` (Required) - The Supabase user ID.
  - `from`: `number` (Optional, default: `0`) - Starting index for pagination.
  - `to`: `number` (Optional, default: `9`) - Ending index for pagination.
**Response**:
```json
{
  "drafts": [
    {
      "id": "string",
      "type": "x thread" | "tweet" | "linkedln post" | "reddit post",
      "modify_count": 0,
      "content": "string",
      "createdAt": "string"
    }
  ]
}
```
**Errors**:
- `400 Bad Request`: `{"error": "Missing userId", "drafts": []}`
- `500 Internal Server Error`: `{"error": "Supabase error message", "drafts": []}`

#### POST /api/modifyDraft
**Overview**: Refines or modifies an existing content draft based on AI instructions. This action consumes user credits.
**Request**:
```json
{
  "prompt": "string", // AI instruction for modifying the draft content
  "draftId": "string" // ID of the draft to be modified
}
```
**Response**:
```json
{
  "text": "string",       // The AI-generated modified content
  "modifyCount": 0        // The updated modification count for the draft
}
```
**Errors**:
- `400 Bad Request`: `{"type": "error", "message": "Missing prompt or draft Id"}`
- `401 Unauthorized`: `{"type": "error", "message": "User authentication failed"}`
- `403 Forbidden`: `{"type": "error", "message": "Not enough credits to refine this draft"}`
- `404 Not Found`: `{"type": "error", "message": "Unable to fetch user profile"}` or `{"type": "error", "message": "Draft not found or unauthorized"}`
- `500 Internal Server Error`: `{"type": "error", "message": "No text was generated"}` or `{"type": "error", "message": "Failed to update draft modify count"}` or `{"type": "error", "message": "Failed to update credits usage"}` or `{"type": "error", "message": "Internal server error"}`

#### POST /api/repurposeContent
**Overview**: Transforms content from a specified source platform to a target platform using Google Generative AI. This action consumes user credits.
**Request**:
```json
{
  "sourcePlatform": "string",   // Original content platform (e.g., "blog", "youtube video", "tiktok video")
  "targetPlatform": "string",   // Desired output platform (e.g., "tweet", "x thread", "linkedln post", "reddit post")
  "content": "string",          // The content to repurpose (can be a URL for blogs/videos or raw text)
  "toneInstruction": "string"   // AI instruction for the desired tone and style
}
```
**Response**:
```json
{
  "id": "string",
  "user_id": "string",
  "type": "x thread" | "tweet" | "linkedln post" | "reddit post",
  "modify_count": 0,
  "content": "string",
  "createdAt": "string"
}
```
**Errors**:
- `400 Bad Request`: `{"type": "error", "message": "Incomplete request body"}`
- `401 Unauthorized`: `{"type": "error", "message": "User authentication failed"}`
- `403 Forbidden`: `{"type": "error", "message": "You don't have enough credits to repurpose this content"}`
- `404 Not Found`: `{"type": "error", "message": "Unable to fetch user profile"}`
- `429 Too Many Requests`: `{"type": "error", "message": "We're currently experiencing high traffic. Please try again later."}`
- `500 Internal Server Error`: `{"type": "error", "message": "Failed to prepare content"}` or `{"type": "error", "message": "Couldn’t extract transcript for this video."}` or `{"type": "error", "message": "No text was generated"}` or `{"type": "error", "message": "Failed to update credits usage"}` or `{"type": "error", "message": "Failed to save generated content as draft"}` or `{"type": "error", "message": "Internal server error"}`

#### POST /api/webhooks/polar
**Overview**: Receives and processes webhook events from Polar, primarily to update user credit balances upon successful payment. This endpoint is configured to handle `order.paid` events.
**Request**:
- Polar webhook payload (JSON object with event details).
**Response**:
- `200 OK` (typically an empty body or a simple success message, as per webhook best practices to acknowledge receipt).
**Errors**:
- Errors are logged internally to the console and handled by the Polar SDK's webhook processing; the endpoint aims to return 200 to prevent repeated deliveries, even if internal processing fails.

## Technologies Used

| Category         | Technology                                                                                                    | Description                                                 |
| :--------------- | :------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------- |
| **Frontend**     | [Next.js](https://nextjs.org/)                                                                                | React framework for building server-rendered and static web applications. |
|                  | [React](https://react.dev/)                                                                                   | JavaScript library for building user interfaces.            |
|                  | [TypeScript](https://www.typescriptlang.org/)                                                                 | Typed superset of JavaScript that compiles to plain JavaScript. |
|                  | [Tailwind CSS](https://tailwindcss.com/)                                                                      | Utility-first CSS framework for rapidly styling.          |
|                  | [Framer Motion](https://www.framer.com/motion/)                                                               | Production-ready motion library for React.                  |
|                  | [Shadcn UI](https://ui.shadcn.com/)                                                                           | Reusable UI components built with Radix UI and Tailwind CSS. |
| **Backend/AI**   | [Supabase](https://supabase.com/)                                                                             | Open-source Firebase alternative providing a PostgreSQL database, authentication, and storage. |
|                  | [Polar](https://polar.sh/)                                                                                    | Payment processing platform for creators.                   |
|                  | [Supadata](https://supadata.dev/)                                                                             | API for media data extraction, including video transcription. |
|                  | [AI SDK (Google Gemini)](https://ai.google.dev/models/gemini)                                                 | SDK for integrating Google's Generative AI models.        |
| **Deployment**   | [Vercel](https://vercel.com/)                                                                                 | Platform for frontend developers, providing analytics and speed insights. |
|                  | [Sonner](https://sonner.emilkowalski.studio/)                                                                 | An opinionated toast component for React.                   |
| **Validation**   | [Zod](https://zod.dev/)                                                                                       | TypeScript-first schema declaration and validation library. |

## Contributing

We welcome contributions to Postmorph! If you're interested in helping improve the project, please follow these guidelines:

*   ✨ **Fork the repository**: Create your own copy of the project.
*   🌿 **Create a new branch**: Branch off from `main` for your feature or bug fix.
*   🚀 **Implement your changes**: Write clear, concise code following existing patterns.
*   🧪 **Test thoroughly**: Ensure your changes work as expected and don't introduce regressions.
*   📝 **Commit messages**: Use descriptive commit messages that explain your changes.
*   📬 **Open a pull request**: Submit your changes for review against the `main` branch.

## License

This project is licensed under the ISC License.

## Author Info

**Adebayo Muis**
- X (formerly Twitter): [@Charmingdc01](https://x.com/Charmingdc01)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourusername)

**Charming Dc**
- X (formerly Twitter): [@Charmingdc01](https://x.com/Charmingdc01)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourusername)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
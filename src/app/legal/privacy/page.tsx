import { Metadata } from "next";

export const metadata: Metadata = {
 title: "Privacy Policy | Postmorph",
 description: "How we handle and protect your data at Postmorph."
};

export default function PrivacyPage() {
 return (
  <>
   <header className="mb-16">
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
     Privacy Policy
    </h1>
    <p className="text-muted-foreground font-medium">
     Last updated March 18, 2026
    </p>
   </header>

   <article
    className="prose prose-slate max-w-none 
        prose-headings:text-foreground 
        prose-p:text-foreground/90 
        prose-strong:text-foreground 
        prose-li:text-foreground/90
        prose-a:text-primary hover:prose-a:text-primary/80"
   >
    <p>
     This Privacy Policy describes how <strong>Postmorph</strong> ("we," "us,"
     or "our") collects, uses, and shares your information when you use our
     services at
     <a href="https://postmorph.vercel.app">postmorph.vercel.app</a>.
    </p>

    <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
    <p>
     <strong>Personal information you disclose:</strong> We collect your name
     and email address when you register via Google OAuth.
    </p>
    <p>
     <strong>Automatically collected information:</strong> We automatically
     collect your IP address, browser type, and device characteristics to
     maintain the security and operation of our services.
    </p>

    <h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
    <p>We process your information to:</p>
    <ul>
     <li>Facilitate account creation and authentication.</li>
     <li>Provide and deliver the services you request.</li>
     <li>Respond to your inquiries and offer support.</li>
     <li>Improve the performance and security of our platform.</li>
    </ul>

    <h2>3. THIRD-PARTY SHARING</h2>
    <p>We only share information with providers necessary to run the app:</p>
    <ul>
     <li>
      <strong>Supabase:</strong> For authentication and database management.
     </li>
     <li>
      <strong>Polar Inc:</strong> For payment security and management.
     </li>
     <li>
      <strong>Vercel:</strong> For hosting and performance analytics.
     </li>
    </ul>

    <h2>4. SOCIAL LOGINS (GOOGLE)</h2>
    <p>
     Postmorph uses Google OAuth for registration. We receive your name and
     email address from Google. We do not have access to your Google password or
     any other private data in your Google account.
    </p>

    <h2>5. HOW LONG DO WE KEEP YOUR DATA?</h2>
    <p>
     We keep your information as long as your account is active. You may request
     account deletion at any time, which will remove your data from our active
     databases.
    </p>

    <h2>6. YOUR PRIVACY RIGHTS</h2>
    <p>
     Depending on your location, you have the right to access, update, or delete
     your data. The easiest way to exercise these rights is to contact us
     directly via email.
    </p>

    <h2>7. CONTACT US</h2>
    <div className="not-prose bg-card p-6 rounded-[var(--radius)] border border-border mt-8">
     <ul className="space-y-2 text-sm text-card-foreground">
      <li>
       <span className="font-bold">Email:</span> adebayomuis32@gmail.com
      </li>
      <li>
       <span className="font-bold">Location:</span> Ede, Osun State, Nigeria
      </li>
     </ul>
    </div>
   </article>
  </>
 );
}

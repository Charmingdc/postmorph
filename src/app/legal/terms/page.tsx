import { Metadata } from "next";

export const metadata: Metadata = {
 title: "Terms of Service | Postmorph",
 description: "Legal terms for using the Postmorph platform."
};

export default function TermsPage() {
 return (
  <>
   <header className="mb-16">
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
     Terms of Service
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
    <section>
     <p>
      Welcome to <strong>Postmorph</strong>. These Legal Terms constitute a
      legally binding agreement made between you and Postmorph concerning your
      access to and use of our website and services.
     </p>
    </section>

    <h2>1. OUR SERVICES</h2>
    <p>
     Postmorph provides content transformation utilities. Our services are
     provided for internal business purposes or personal use. You are
     responsible for complying with local laws applicable to your jurisdiction.
    </p>

    <h2>2. INTELLECTUAL PROPERTY</h2>
    <p>
     We own all source code, databases, and website designs. We grant you a
     non-exclusive, revocable license to use Postmorph for your own needs. You
     may not reproduce or exploit our code without express permission.
    </p>

    <h2>3. USER REGISTRATION & CREDITS</h2>
    <p>
     Registration is handled via Google OAuth. You are responsible for your
     account's security. Postmorph operates on a <strong>pay-as-you-go</strong>{" "}
     model using credits. Credits are non-refundable once used for processing
     tasks.
    </p>

    <h2>4. PROHIBITED ACTIVITIES</h2>
    <ul>
     <li>Scraping data to build a competing database.</li>
     <li>Interfering with security-related features.</li>
     <li>Using the service for illegal or unauthorized purposes.</li>
    </ul>

    <h2>5. DISPUTE RESOLUTION</h2>
    <p>
     You agree to attempt <strong>informal negotiations</strong> for at least{" "}
     <strong>30 days</strong>
     before initiating arbitration. Any dispute will be settled by a{" "}
     <strong>single arbitrator</strong>
     in Nigeria, governed by the laws of Nigeria.
    </p>

    <h2>6. LIMITATION OF LIABILITY</h2>
    <p>
     Our total liability for any claim will be limited to the{" "}
     <strong>lesser of</strong> the amount paid by you to us during the six
     months prior to the claim, or <strong>$100.00 USD</strong>.
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

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background px-4 pb-20 pt-24">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="mt-4 text-foreground/70">By using ShobujBangla, you agree to share accurate information, respect other users, and keep your submissions appropriate.</p>
        <div className="mt-8 space-y-4 text-sm leading-7 text-foreground/80">
          <p><strong>Use of the platform:</strong> you may browse, save, and add nature destinations as long as content is relevant and lawful.</p>
          <p><strong>Account responsibility:</strong> keep your login credentials secure and use the site responsibly.</p>
          <p><strong>Content moderation:</strong> misleading or harmful content may be removed at any time.</p>
        </div>
        <div className="mt-8">
          <Link href="/" className="text-primary font-semibold hover:underline">Back to home</Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background px-4 pb-20 pt-24">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-foreground/70">We respect your privacy and only use your information to provide account access, improve your experience, and protect the platform.</p>
        <div className="mt-8 space-y-4 text-sm leading-7 text-foreground/80">
          <p><strong>Information we collect:</strong> basic account details such as your name, email, and profile image when you sign up.</p>
          <p><strong>How we use it:</strong> to authenticate your account, personalize your experience, and help you manage your listings.</p>
          <p><strong>Sharing:</strong> we do not sell your personal data to third parties.</p>
        </div>
        <div className="mt-8">
          <Link href="/" className="text-primary font-semibold hover:underline">Back to home</Link>
        </div>
      </div>
    </div>
  );
}

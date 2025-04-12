import { MultiStepForm } from '@/components/ui/multi-step-form';

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-nyanza-50 to-nyanza-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pakistan_green-800 mb-4">
            Sign Up for Easter Football Camp
          </h1>
          <p className="text-lg text-pakistan_green-600 max-w-2xl mx-auto">
            Join us for an exciting football experience! Fill out the form below to secure your child&apos;s spot in our Easter camp program.
          </p>
        </div>
        
        <MultiStepForm />
      </div>
    </main>
  );
}

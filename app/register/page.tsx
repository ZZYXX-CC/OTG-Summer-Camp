'use client';

import { SignupForm } from '@/components/ui/signup-form';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden py-12 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-green-100 to-green-50 dark:from-green-950 dark:via-green-900 dark:to-green-950 opacity-40" />
        <div className="relative text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-900 dark:text-green-100 mb-4 tracking-tight">
            OTG Football Academy Easter Camp
          </h1>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-4">
            Registration Form
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-green-700 dark:text-green-300 leading-relaxed">
            Welcome to the OTG Football Academy Easter Camp! We're excited to offer
            a fun and engaging football experience for young players of all skill
            levels. This camp is designed to improve skills, build teamwork, and
            most importantly, have fun.
          </p>
        </div>
      </div>
      <SignupForm />
    </div>
  );
}

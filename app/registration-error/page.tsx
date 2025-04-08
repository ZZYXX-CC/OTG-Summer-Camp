export default function RegistrationError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-950">
      <div className="max-w-md w-full mx-4 p-8 bg-white dark:bg-black rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Registration Failed
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            We're sorry, but something went wrong during registration. Please try
            again or contact support if the problem persists.
          </p>
          <div className="space-x-4">
            <a
              href="/register"
              className="inline-block bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg px-6 py-3 hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Try Again
            </a>
            <a
              href="/"
              className="inline-block bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-lg px-6 py-3 hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

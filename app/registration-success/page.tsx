export default function RegistrationSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-950">
      <div className="max-w-md w-full mx-4 p-8 bg-white dark:bg-black rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Registration Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for registering for the OTG Football Academy Camp. We've sent you
            a confirmation email with all the details.
          </p>
          <a
            href="/"
            className="inline-block bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg px-6 py-3 hover:from-green-600 hover:to-green-700 transition-all duration-300"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}

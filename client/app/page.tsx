import Navbar from "./components/layout/Navbar";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              FiBank Synergy
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Secure Banking Platform
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Access your accounts securely and manage your finances with ease.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Secure Authentication
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Advanced security features with JWT authentication and
                    password hashing to protect your data.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                    />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User-Friendly Interface
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Modern, responsive design with Next.js and Tailwind CSS for
                    a seamless user experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2023 FiBank Synergy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

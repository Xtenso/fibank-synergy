import Navbar from "@/app/components/layout/Navbar";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-[var(--secondary-background)] py-8 px-4 sm:rounded-lg sm:px-10">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

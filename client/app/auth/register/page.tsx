import RegisterForm from "../../components/auth/RegisterForm";
import Navbar from "../../components/layout/Navbar";

export default function RegisterPage() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
        <div className="w-full sm:max-w-3xl">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Регистрация на нов потребител
          </h2>
          <p>
            Тази регистрационна форма се попълва, само ако нямате потребител и
            парола за Виртуален банков клон (e-fibank) на ПИБ. Ако вече имате
            потребител и парола, добавянето на достъп до ново физическо или
            юридическо лице става в банката. Ако сте забравили своя потребител
            и/или парола, заповядайте в банката, за да ги получите.
          </p>
        </div>

        <div className="mt-8 w-full sm:max-w-3xl">
          <div className="py-8 px-4 bg-[var(--secondary-background)] sm:rounded-lg sm:px-10">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

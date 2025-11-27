import RegisterForm from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 bg-white shadow-lg rounded-2xl w-[400px]">
        <h1 className="text-2xl font-semibold text-center mb-4">Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
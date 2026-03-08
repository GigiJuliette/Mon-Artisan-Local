import { LoginForm } from "@/components/custom/Forms/LoginForm";

export const Login = () => {
  return (
    <div className="w-full md:w-[70%] lg:w-[40%] absolute h-full z-2 bg-background grid place-items-center">
      <LoginForm />
    </div>
  );
};

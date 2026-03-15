import { Background } from "@/components/custom/Background";
import { RegisterForm } from "@/components/custom/RegisterForm/RegisterForm";

export const Register = () => {
  return (
    <>
      <div className="w-full md:w-[70%] lg:w-[40%] absolute h-full z-2 bg-background grid place-items-center">
        <RegisterForm />
      </div>
      <Background />
    </>
  );
};

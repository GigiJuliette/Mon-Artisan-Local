import { RegisterForm } from "@/components/custom/Forms/RegisterForm";
import gradiant from "../assets/gradiant.png";

export const Register = () => {
  return (
    <div className="relative overflow-hidden h-screen">
      <div className="w-full md:w-[70%] lg:w-[40%] absolute h-full z-2 bg-background grid place-items-center">
        <RegisterForm />
      </div>
      <img src={gradiant} className="absolute h-full w-full top-0 h-0" />
    </div>
  );
};

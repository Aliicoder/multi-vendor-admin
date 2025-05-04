import { lazy, Suspense } from "react";
const SignUpForm = lazy(()=>import("@/components/forms/SignUpForm"))

const RegisterPage = () => {
  return ( 
   <div className="relative flex">
      <Suspense fallback={null}>
        <SignUpForm />
      </Suspense>
   </div>
   );
}
 
export default RegisterPage;
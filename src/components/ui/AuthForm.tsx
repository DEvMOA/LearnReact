import { Button } from "./button";
import { Input } from "./input";

const AuthForm = () => {
  return (
    <>
      <div>
        <Input placeholder="Email" className="w-[250px]" />
        <Input placeholder="Password" type="password" className="w-[250px]" />
        <Button>Login</Button>
        <Button>Sign up</Button>
      </div>
    </>
  );
};

export default AuthForm;

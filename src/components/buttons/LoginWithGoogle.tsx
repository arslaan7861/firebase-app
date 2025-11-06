import { useUser } from "@/providers/user";
import { Button } from "../ui/button";

function LoginWithGoogle() {
  const { signInWithGoogle } = useUser();
  return (
    <Button
      variant="outline"
      onClick={signInWithGoogle}
      type="button"
      className="w-full"
    >
      Login with Google
    </Button>
  );
}

export default LoginWithGoogle;

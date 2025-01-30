import { signUp } from "@/app/lib/actions";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { redirect } from "next/navigation";
// import Link from "next/link";
import { auth } from "@/app/lib/auth";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-sm mx-auto space-y-6 border-gray-300 rounded-lg p-6 shadow-md bg-white max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>

        {/* Email/Password Sign Up */}
        <form
          className="space-y-4"
          action={async (formData) => {
            "use server";
            const res = await signUp(formData);
            if (res.success) {
              redirect("/dashboard");
            }
          }}
        >
          <Input
            name="email"
            placeholder="Email"
            type="email"
            required
            autoComplete="email"
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            required
            autoComplete="new-password"
          />
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
        </form>

        {/* <div className="text-center">
          <Button asChild variant="link">
            <Link href="/sign-in">Already have an account? Sign in</Link>
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default Page;

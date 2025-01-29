import { auth } from "@/app/lib/auth";

import { signIn } from "@/app/lib/auth";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { executeAction } from "@/app/lib/executeAction";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-sm mx-auto space-y-6 border border-gray-300 rounded-lg p-6 shadow-md bg-white max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>

        {/* Email/Password Sign In */}
        <form
          className="space-y-4"
          action={async (formData) => {
            "use server";
            await executeAction({
              actionFn: async () => {
                await signIn("credentials", formData);
              },
            });
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
            autoComplete="current-password"
          />
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;

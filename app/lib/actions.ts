import { schema } from "@/app/lib/schema";
import db from "@/app/lib/db/db";
import { executeAction } from "@/app/lib/executeAction";
import bcrypt from "bcrypt";

const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const email = formData.get("email");
      const password = formData.get("password");
      const validatedData = schema.parse({ email, password });

      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      await db.user.create({
        data: {
          email: validatedData.email.toLocaleLowerCase(),
          password: hashedPassword,
        },
      });
    },
    successMessage: "Signed up successfully",
  });
};

export { signUp };

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, type Variants } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginFormData } from "@/schemas/user";
import { useUser } from "@/providers/user";
import LoginWithGoogle from "../components/buttons/LoginWithGoogle";
import { useEffect } from "react";

export function LoginForm() {
  const { signIn, user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const router = useNavigate();

  useEffect(() => {
    if (user) router("/");
  }, [user]);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <motion.div
      className="flex flex-col justify-center h-full gap-6 shrink-0 mx-auto w-[95%] max-w-2xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Firebase auth tutorial
      </h2>
      <Card className="shadow-lg">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(signIn)}>
            <FieldGroup>
              {["email", "password", "buttons"].map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {i === 0 && (
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </Field>
                  )}

                  {i === 1 && (
                    <Field>
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        {...register("password")}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </Field>
                  )}

                  {i === 2 && (
                    <Field className="space-y-3 mt-2">
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Logging in..." : "Login"}
                      </Button>
                      <LoginWithGoogle />

                      <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}
                        <Link
                          to="/signup"
                          className="text-blue-600 hover:underline"
                        >
                          Sign up
                        </Link>
                      </FieldDescription>
                    </Field>
                  )}
                </motion.div>
              ))}
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

import React, { useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "@/schemas/user";
import { useUser } from "@/providers/user";
import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";

const MotionButton = motion(ShadcnButton);

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { signUp, user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const router = useNavigate();
  useEffect(() => {
    if (user) router("/");
  }, [user]);

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
      className="w-[95%] max-w-3xl mx-auto justify-center h-full flex flex-col"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
        Firebase auth tutorial
      </h2>
      <Card {...props} className="shadow-lg">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(signUp)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "email", "password", "confirm-password", "buttons"].map(
                (_, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="visible"
                    className={cn(i === 4 && "col-span-1 md:col-span-2")}
                  >
                    {i === 0 && (
                      <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </Field>
                    )}

                    {i === 1 && (
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
                        <FieldDescription>
                          We&apos;ll use this to contact you. We will not share
                          your email with anyone else.
                        </FieldDescription>
                      </Field>
                    )}

                    {i === 2 && (
                      <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
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
                        <FieldDescription>
                          Must be at least 8 characters long.
                        </FieldDescription>
                      </Field>
                    )}

                    {i === 3 && (
                      <Field>
                        <FieldLabel htmlFor="confirm-password">
                          Confirm Password
                        </FieldLabel>
                        <Input
                          id="confirm-password"
                          type="password"
                          {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </Field>
                    )}

                    {i === 4 && (
                      <FieldGroup>
                        <Field className="space-y-3">
                          <MotionButton
                            type="submit"
                            className="w-full"
                            whileTap={{ scale: 0.97 }}
                          >
                            Create Account
                          </MotionButton>
                          <MotionButton
                            variant="outline"
                            type="button"
                            className="w-full"
                            whileTap={{ scale: 0.97 }}
                            asChild
                          >
                            <LoginWithGoogle />
                          </MotionButton>
                          <FieldDescription className="px-6 text-center">
                            Already have an account?{" "}
                            <Link
                              to="/login"
                              className="text-blue-600 hover:underline"
                            >
                              Sign in
                            </Link>
                          </FieldDescription>
                        </Field>
                      </FieldGroup>
                    )}
                  </motion.div>
                )
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

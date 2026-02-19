"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/axios";
import Button from "@/components/core/button";
import Input from "@/components/core/input";
import { baseUrl } from "@/data/constants";
import { handleSignin } from "@/helper/auth";
import { IUser } from "@/types/system/slice";

// Constants
const LOADIN_STATE = {
  LOGIN: "login",
} as const;

const API_ROUTES = {
  LOGIN: "auth/login",
} as const;

type LoadingState = (typeof LOADIN_STATE)[keyof typeof LOADIN_STATE] | false;

// Type for API success data
interface LoginData {
  data: {
    token: string;
    user: IUser;
  };
  success: boolean;
}

// API response wrapper

function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState<LoadingState>(false);

  const handleLogin = async () => {
    setLoading(LOADIN_STATE.LOGIN);

    const result = await Post<LoginData>(`${baseUrl(API_ROUTES.LOGIN)}`, {
      email,
      password,
    });

    if (result.success) {
      handleSignin(result.data?.data, router, "/");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 bg-[var(--main-color)] py-12">
      <div className="max-w-md mx-auto w-[100%] bg-[var(--white-color)] py-8 px-4 sm:rounded-lg sm:px-10 shadow] ">
        <h1 className="text-2xl font-semibold">Login</h1>

        <div className="divide-y divide-gray-200">
          <div className="py-8 space-y-4 text-gray-700 sm:text-lg">
            <Input
              label="Email"
              value={email}
              setter={setEmail}
              placeholder="Email"
            />
            <Input
              label="Password"
              value={password}
              setter={setPassword}
              type="password"
              placeholder="Password"
            />

            <div className="w-full flex justify-end">
              <p className="hyperlink cursor-pointer">Forget password?</p>
            </div>

            <Button
              onClick={handleLogin}
              loading={loading === LOADIN_STATE.LOGIN}
              className="w-full"
            >
              Login
            </Button>
          </div>
        </div>

        <div className="w-full flex justify-center mt-6">
          <p
            className="hover:underline cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Don’t have an account?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

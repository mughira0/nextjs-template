"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Post } from "@/axios";
import Button from "@/components/core/button";
import Input from "@/components/core/input";
import { baseUrl } from "@/data/constants";
import { handleSignin } from "@/helper/auth";
import { IUser } from "@/types/system/slice";
import PhoneInput from "@/components/core/phone-input";

// ── Constants ──────────────────────────────────────────────
const LOADING_STATE = {
  REGISTER: "register",
} as const;

const API_ROUTES = {
  REGISTER: "auth/register",
} as const;

type LoadingState = (typeof LOADING_STATE)[keyof typeof LOADING_STATE] | false;

// ── Types ──────────────────────────────────────────────────
interface RegisterData {
  data: {
    accessToken: string;
    user: IUser;
  };
  success: boolean;
}

function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState<LoadingState>(false);

  const handleRegister = async () => {
    const params = {
      name,
      email,
      phone,
      password,
      confirmPassword,
    };

    setLoading(LOADING_STATE.REGISTER);

    const result = await Post<RegisterData>(
      baseUrl(API_ROUTES.REGISTER),
      params,
    );

    if (result.data) {
      handleSignin(result.data?.data, router, "/");
    }
    setLoading(false);
  };

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col justify-center px-4 bg-[var(--main-color)] py-12">
      <div className="max-w-[600px] mx-auto w-full bg-[var(--white-color)] py-8 px-4 sm:rounded-lg sm:px-10 shadow">
        <h1 className="text-2xl font-semibold">Create Account</h1>

        <div className="divide-y divide-gray-200">
          <div className="py-8  grid grid-cols-2 gap-4 text-gray-700 sm:text-lg">
            {/* ── Fields ── */}
            <Input
              label="Full Name"
              value={name}
              setter={setName}
              placeholder="John Doe"
            />

            <Input
              label="Email"
              value={email}
              setter={setEmail}
              placeholder="you@example.com"
            />

            <PhoneInput
              label="Phone Number"
              value={phone}
              setter={setPhone}
              defaultCountry="us"
              preferredCountries={["us", "gb", "ae", "pk"]}
              enableSearch
            />

            <Input
              label="Password"
              value={password}
              setter={setPassword}
              type="password"
              placeholder="Min. 8 characters"
            />

            <Input
              label="Confirm Password"
              value={confirmPassword}
              setter={setConfirmPassword}
              type="password"
              placeholder="Repeat password"
            />

            <div className="col-span-2">
              <Button
                onClick={handleRegister}
                loading={loading === LOADING_STATE.REGISTER}
                className="w-full"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <p
            className="hover:underline cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Already have an account?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

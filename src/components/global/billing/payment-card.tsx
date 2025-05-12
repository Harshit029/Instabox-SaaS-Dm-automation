import { Button } from "@/components/ui/button";
import { PLANS } from "@/constants/pages";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";

type Props = {
  label: string;
  current: "PRO" | "FREE";
  landing?: boolean;
};

const PaymentCard = ({ current, label, landing }: Props) => {
  return (
    <div
      className={cn(
        label !== current
          ? "bg-gray-200"
          : "bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400",
        "p-[2px] rounded-xl overflow-hidden"
      )}
    >
      <div
        className={cn(
          landing && "bg-gray-100",
          "flex flex-col rounded-xl pl-5 py-5 pr-10 bg-gray-100 h-full"
        )}
      >
        {landing ? (
          <h2 className="text-2xl text-gray-800 font-semibold">
            {label === "PRO" && "Premium Plan"}
            {label === "FREE" && "Standard"}
          </h2>
        ) : (
          <h2 className="text-2xl text-gray-800 font-semibold">
            {label === current
              ? "Your Current Plan"
              : current === "PRO"
              ? "Downgrade"
              : "Upgrade"}
          </h2>
        )}
        <p className="text-gray-500 text-sm mb-2">
          This is what your plan covers for automations and AI features
        </p>

        {label === "PRO" ? (
          <span className="text-3xl font-bold text-gray-800">Smart AI</span>
        ) : (
          <p className="font-bold mt-2 text-gray-500">Standard</p>
        )}

        {label === "PRO" ? (
          <p className="mb-2 text-gray-700">
            <b className="text-xl">Rs.499</b>/month
          </p>
        ) : (
          <p className="text-xl mb-2 text-gray-700">Free</p>
        )}

        {PLANS[label === "PRO" ? 1 : 0].features.map((i) => (
          <p key={i} className="mt-2 text-gray-600 flex gap-2 items-center">
            <CircleCheck className="text-gray-700" size={18} />
            {i}
          </p>
        ))}

        {landing ? (
          <Button
            className={cn(
              "rounded-full mt-5",
              label === "PRO"
                ? "bg-gray-700 text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            )}
          >
            {label === current
              ? "Get Started"
              : current === "PRO"
              ? "Free"
              : "Get Started"}
          </Button>
        ) : (
          <Button
            className="rounded-full mt-5 bg-gray-300 text-gray-800 hover:bg-gray-400"
            disabled={label === current}
          >
            {label === current
              ? "Active"
              : current === "PRO"
              ? "Downgrade"
              : "Upgrade"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaymentCard;

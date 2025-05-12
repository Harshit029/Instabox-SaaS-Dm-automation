"use client";
import { usePaths } from "@/hooks/user-nav";
import Logo from "@/svgs/logo";
import React from "react";
import Items from "./items";
import { Separator } from "@/components/ui/separator";
import ClerkAuthState from "../clerk-auth-state";
import { HelpDuoToneWhite } from "@/icons";
import { SubscriptionPlan } from "../subscription-plan";
import UpgradeCard from "./upgrade";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  className?: string;
};

const Sidebar = ({ slug, className }: Props) => {
  const { page } = usePaths();

  return (
    <aside className={cn(
      "hidden lg:flex flex-col",
      "fixed left-0 bottom-0 top-0 m-3",
      "w-[250px] rounded-3xl overflow-hidden",
      "bg-gradient-to-b from-primary/20 via-background to-primary/20",
      "border border-border",
      className
    )}>
      <div className={cn(
        "flex flex-col h-full p-4",
        "bg-background/90 backdrop-blur-3xl",
        "gap-6"
      )}>
        {/* Logo Section */}
        <div className="flex justify-center p-4">
          <Logo className="h-8 w-auto" />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1">
          <Items page={page} slug={slug} />
        </nav>

        {/* Separator */}
        <Separator className="bg-border/50" />

        {/* User & Help Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <ClerkAuthState />
            <span className="text-muted-foreground">Profile</span>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <HelpDuoToneWhite className="text-muted-foreground" />
            <span className="text-muted-foreground">Help</span>
          </div>
        </div>

        {/* Upgrade Section */}
        <SubscriptionPlan type="FREE" className="mt-auto">
          <UpgradeCard className="mt-4" />
        </SubscriptionPlan>
      </div>
    </aside>
  );
};

export default Sidebar;

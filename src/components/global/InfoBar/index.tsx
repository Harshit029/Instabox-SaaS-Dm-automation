"use client";

import { PAGE_BREAD_CRUMBS } from "@/constants/pages";
import { usePaths } from "@/hooks/user-nav";
import { Menu } from "lucide-react";
import React from "react";
import Sheet from "../sheet";
import Items from "../sidebar/items";
import { Separator } from "@/components/ui/separator";
import ClerkAuthState from "../clerk-auth-state";
import { HelpDuoToneWhite } from "@/icons";
import { SubscriptionPlan } from "../subscription-plan";
import UpgradeCard from "../sidebar/upgrade";
import Logo from "@/svgs/logo";
import CreateAutomation from "../create-automation";
import Search from "./search";
import { Notifications } from "./notifications";
import MainBreadCrumb from "../bread-crumbs/main-bread-crumb";

type Props = {
  slug: string;
};

const InfoBar = ({ slug }: Props) => {
  const { page } = usePaths();
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug;

  return (
    currentPage && (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-end gap-4">
          <span className="lg:hidden flex items-center">
            <Sheet 
              trigger={
                <Menu className="text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700" size={24} />
              } 
              className="lg:hidden" 
              side="left"
            >
              <div className="flex flex-col h-full p-6 bg-gray-900 text-gray-200">
                <div className="flex items-center justify-center gap-2 p-4 mb-6">
                  <Logo />
                </div>
                
                <div className="flex flex-col gap-2 mb-6">
                  <Items page={page} slug={slug} />
                </div>
                
                <Separator className="bg-gray-700 my-4" />
                
                <div className="flex flex-col gap-4 mt-auto">
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800">
                    <ClerkAuthState />
                    <span className="text-gray-300">Profile</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800">
                    <HelpDuoToneWhite />
                    <span className="text-gray-300">Help</span>
                  </div>
                </div>
                
                <SubscriptionPlan type="FREE" className="mt-8">
                  <UpgradeCard className="mt-4" />
                </SubscriptionPlan>
              </div>
            </Sheet>
          </span>
          
          <div className="flex items-center gap-4">
            <Search />
            <CreateAutomation />
            <Notifications />
          </div>
        </div>
        
        <MainBreadCrumb page={page === slug ? "Home" : page} slug={slug} />
      </div>
    )
  );
};

export default InfoBar;
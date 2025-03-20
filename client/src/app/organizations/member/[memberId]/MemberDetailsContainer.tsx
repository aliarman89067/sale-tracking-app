"use client";
import React from "react";
import { BackButton } from "@/components/BackButton";
import { useGetMemberQuery } from "@/state/api";
import { CircleAlert, Loader2 } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import SalesPercentageChart from "@/components/SalesPercentageChart";

const MemberDetailsContainer = ({ memberId }: MemberDetailsContainerProps) => {
  const {
    data: memberData,
    isLoading: isMemberLoading,
    error: memberError,
  } = useGetMemberQuery({
    memberId,
  });

  if (isMemberLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <div className="flex justify-center items-center gap-2">
          <Loader2 className="size-5 text-primaryGray animate-spin" />
          <span className="text-base text-primaryGray">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col gap-5 max-w-screen-xl mx-auto mb-4">
      <div className="w-full mt-10">
        <BackButton title="Back" href="/organizations" />
      </div>
      {memberError && !memberData && (
        <div className="flex items-center justify-center w-full h-[60vh]">
          <div className="flex flex-col items-center gap-2  pointer-events-none select-none">
            <Image
              src="/notFound.png"
              alt="Not Found Image"
              width={1000}
              height={1000}
              className="w-[300px] object-contain pointer-events-none select-none"
            />
            <span className="flex items-center gap-2 text-2xl text-rose-500 font-bold">
              Something Went Wrong <CircleAlert />
            </span>
            <p>Please try again later</p>
          </div>
        </div>
      )}
      {!memberError && memberData && (
        <div className="flex flex-col w-full h-auto mt-1">
          <div className="flex flex-col items-center gap-1 mt-3">
            <div className="w-32 h-32 overflow-hidden rounded-full flex items-center justify-center">
              <Image
                src={memberData.imageUrl}
                alt={`${memberData.name} Profile Image`}
                width={600}
                height={600}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="text-xl font-bold text-primaryGray text-center">
              {memberData.name}
            </h3>
            <span className="text-sm text-secondaryGray text-center">
              {memberData.keyword} Sale Agent
            </span>
            <span className="text-sm text-secondaryGray text-center">
              Join at {format(memberData.createdAt, "dd-MMM-yyy")}
            </span>
          </div>
          <div className="max-w-screen-md w-full hidden md:grid grid-cols-3 gap-5 lg:gap-10 mx-auto mt-8">
            <StatusBox
              title="Target"
              curreny={memberData.targetCurrency}
              amount={memberData.monthlyTarget}
            />
            <StatusBox
              title="Current Sales"
              curreny={memberData.targetCurrency}
              amount={memberData.currentSale}
              isDark
            />
            <StatusBox
              title="Overall Sales"
              curreny={memberData.targetCurrency}
              amount={memberData.overallSale}
            />
          </div>
          <div className="md:hidden flex flex-col items-center gap-4 mt-8 w-full px-4">
            <StatusBox
              title="Current Sales"
              curreny={memberData.targetCurrency}
              amount={memberData.currentSale}
              isDark
            />
            <div className="flex items-center justify-center gap-5 w-full">
              <StatusBox
                title="Target"
                curreny={memberData.targetCurrency}
                amount={memberData.monthlyTarget}
              />
              <StatusBox
                title="Overall Sales"
                curreny={memberData.targetCurrency}
                amount={memberData.overallSale}
              />
            </div>
          </div>
          <SalesPercentageChart />
        </div>
      )}
    </section>
  );
};

export default MemberDetailsContainer;

const StatusBox = ({
  title,
  curreny,
  amount,
  isDark = false,
}: {
  title: string;
  amount: number;
  curreny: string;
  isDark?: boolean;
}) => {
  return (
    <div
      className={cn(
        "transform max-w-[300px] w-full border border-gray-400 hover:border-gray-500 py-7 rounded-xl transition-all duration-200 ease-in-out",
        isDark ? "bg-primaryGray -translate-y-3" : "bg-white translate-y-0"
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <span
          className={cn(
            "font-medium text-base text-center",
            isDark ? "text-white" : "text-secondaryGray"
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "text-xl font-bold text-center flex items-center",
            isDark ? "text-white" : "text-secondaryGray"
          )}
        >
          {amount}
          {curreny}
        </span>
      </div>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { cn, getRemainingDays } from "@/lib/utils";
import { BriefcaseBusiness, Calendar, Check, X } from "lucide-react";
import React from "react";

const AgentSheet = ({ memberData }: AgentSheetProps) => {
  const calendarBoxStyle = (status: string) => {
    if (status === "SALE") {
      return "bg-successGreen";
    }
    if (status === "NOT_SALE") {
      return "bg-errorRed";
    }
    if (status === "LEAVE") {
      return "bg-secondaryGray";
    }
    if (status === "HOLIDAY") {
      return "bg-white border border-gray-500";
    }
    return "bg-brand-500";
  };

  const calendarBoxContent = ({
    status,
    day,
  }: {
    status: string;
    day: number;
  }) => {
    if (status === "SALE") {
      return (
        <>
          <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <Check className="size-3 text-primaryGray" />
          </span>
          <span className="text-white font-medium text-2xl">{day}</span>
        </>
      );
    }
    if (status === "NOT_SALE") {
      return (
        <>
          <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <X className="size-3 text-primaryGray" />
          </span>
          <span className="text-white font-medium text-2xl">{day}</span>
        </>
      );
    }
    if (status === "LEAVE") {
      return (
        <>
          <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs text-primaryGray">
            L
          </span>
          <span className="text-white font-medium text-2xl">{day}</span>
        </>
      );
    }
    if (status === "HOLIDAY") {
      return <span className="font-medium text-2xl text-primaryGray">H</span>;
    }
    return (
      <>
        <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center">
          <Calendar className="size-3 text-primaryGray" />
        </span>
        <span className="text-white font-medium text-2xl">{day}</span>
      </>
    );
  };

  return (
    <section className="flex flex-col mt-6 gap-2 w-full mx-auto h-auto">
      <h2 className="font-medium text-xl text-secondaryGray">
        Current Month History
      </h2>
      <div className="flex rounded-xl border border-secondaryGray">
        <div className="flex-1 flex flex-col w-full border-r border-secondaryGray">
          {/* Left Tab bar */}
          <div className="flex items-center justify-center w-full h-20 border-b border-secondaryGray">
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-base text-gray-500">Today Sales</span>
                <h2 className="font-semibold text-primaryGray text-lg">200$</h2>
              </div>
            </div>
            <div className="w-[1px] h-20 bg-secondaryGray" />
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-base text-gray-500">No of accounts</span>
                <h2 className="font-semibold text-primaryGray text-lg">11</h2>
              </div>
            </div>
          </div>
          {/* Calendar Container */}
          <div className="flex flex-col items-center w-full px-3 pt-6">
            {/* Current Sales Details */}
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="font-medium text-secondaryGray text-2xl">
                Monthly Sales
              </span>
              <h1 className="font-bold text-primaryGray text-3xl">
                {memberData.currentSale}
                {memberData.targetCurrency}
              </h1>
            </div>
            {/* Calendar */}
            <div className="border border-gray-500 rounded-lg p-3 my-3 w-[70%]">
              <div className="grid grid-cols-6 gap-2 w-full">
                {memberData.calendarDays.map((calendarDay) => (
                  <div
                    key={calendarDay.id}
                    className={cn(
                      "relative aspect-square flex items-center justify-center rounded-lg",
                      calendarBoxStyle(calendarDay.status)
                    )}
                  >
                    {calendarBoxContent({
                      status: calendarDay.status,
                      day: calendarDay.day,
                    })}
                  </div>
                ))}
              </div>
            </div>
            <OverviewOfCalendar calendar={memberData.calendarDays} />
          </div>
          {/* Separator */}
          <div className="w-full h-[1px] bg-secondaryGray mt-6" />
          {/* Target Status */}
          <div className="flex flex-col items-center justify-center pt-8 px-3 gap-1">
            <span className="text-xl text-secondaryGray text-center">
              Target Status
            </span>
            <h1 className="font-bold text-primaryGray text-4xl text-center">
              Not Achieved
            </h1>
          </div>
          {/* Separator */}
          <div className="w-full h-[1px] bg-secondaryGray mt-8" />
          {/* Target Status */}
          <div className="flex flex-col items-center justify-center py-8 px-3 gap-1">
            <span className="text-xl text-secondaryGray text-center">
              No of Days Remaining
            </span>
            <h1 className="font-bold text-primaryGray text-4xl text-center">
              {getRemainingDays()} {getRemainingDays() < 1 ? "Day" : "Days"}
            </h1>
          </div>
        </div>
        <div className="flex-1 flex flex-col w-full">
          {/* Right Tab bar */}
          <div className="flex items-center justify-center w-full h-20 border-b border-secondaryGray">
            <div className="flex-1 flex items-center justify-between px-6 w-full">
              <Button variant="custom" size="lg" className="rounded-lg">
                Client Details
              </Button>
              <span className="text-base text-primaryGray">
                20 Client Details
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentSheet;

const OverviewOfCalendar = ({
  calendar,
}: {
  calendar: CalendarDaysProps[];
}) => {
  const getCounting = (
    type: "SALE" | "NOT_SALE" | "LEAVE" | "HOLIDAY" | "REMAINING"
  ) => {
    if (type === "SALE") {
      return calendar.reduce(
        (acc, day) => acc + (day.status === "SALE" ? 1 : 0),
        0
      );
    }
    if (type === "NOT_SALE") {
      return calendar.reduce(
        (acc, day) => acc + (day.status === "NOT_SALE" ? 1 : 0),
        0
      );
    }
    if (type === "LEAVE") {
      return calendar.reduce(
        (acc, day) => acc + (day.status === "LEAVE" ? 1 : 0),
        0
      );
    }
    if (type === "HOLIDAY") {
      return calendar.reduce(
        (acc, day) => acc + (day.status === "HOLIDAY" ? 1 : 0),
        0
      );
    }
    return calendar.reduce(
      (acc, day) => acc + (day.status === "REMAINING_DAY" ? 1 : 0),
      0
    );
  };
  return (
    <div className="grid grid-cols-2 gap-3 mt-3 w-[70%]">
      {/* Box 1 */}
      <div className="w-full bg-primaryGray flex flex-col items-center justify-center rounded-lg py-2">
        <span className="flex items-center gap-2 text-center">
          <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="size-4 text-white" />
          </span>
          <span className="text-white font-light text-lg">Days With Sales</span>
        </span>
        <span className="font-semibold text-white text-xl">
          {getCounting("SALE")}
        </span>
      </div>
      {/* Box 2 */}
      <div className="w-full bg-primaryGray flex flex-col items-center justify-center rounded-lg py-2">
        <span className="flex items-center gap-2 text-center">
          <span className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center">
            <X className="size-4 text-white" />
          </span>
          <span className="text-white font-light text-lg">
            Days Without Sales
          </span>
        </span>
        <span className="font-semibold text-white text-xl">
          {getCounting("NOT_SALE")}
        </span>
      </div>
      {/* Box 3 */}
      <div className="w-full bg-primaryGray flex flex-col items-center justify-center rounded-lg py-2">
        <span className="flex items-center gap-2 text-center">
          <span className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-xs text-white">
            L
          </span>
          <span className="text-white font-light text-lg">Days Of Leave</span>
        </span>
        <span className="font-semibold text-white text-xl">
          {getCounting("LEAVE")}
        </span>
      </div>
      {/* Box 4 */}
      <div className="w-full bg-primaryGray flex flex-col items-center justify-center rounded-lg py-2">
        <span className="flex items-center gap-2 text-center">
          <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <BriefcaseBusiness className="size-4 text-primaryGray" />
          </span>
          <span className="text-white font-light text-lg">Days Of Weekend</span>
        </span>
        <span className="font-semibold text-white text-xl">
          {getCounting("HOLIDAY")}
        </span>
      </div>
      {/* Box 5 */}
      <div className="w-full bg-primaryGray flex flex-col items-center justify-center rounded-lg py-2">
        <span className="flex items-center gap-2 text-center">
          <span className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center">
            <Calendar className="size-4 text-white" />
          </span>
          <span className="text-white font-light text-lg">Days Remaining</span>
        </span>
        <span className="font-semibold text-white text-xl">
          {getCounting("REMAINING")}
        </span>
      </div>
    </div>
  );
};

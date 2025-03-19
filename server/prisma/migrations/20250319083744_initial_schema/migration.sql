-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('admin', 'agent');

-- CreateEnum
CREATE TYPE "CALENDAR_DAYS_STATUS" AS ENUM ('SALE', 'NOT_SALE', 'LEAVE', 'HOLIDAY', 'REMAINING_DAY');

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "cognitoId" TEXT NOT NULL,
    "adminName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "imageUrl" TEXT NOT NULL DEFAULT '/defaultPersonImage.png',
    "role" "USER_ROLE" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agent" (
    "id" SERIAL NOT NULL,
    "cognitoId" TEXT NOT NULL,
    "agentName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "imageUrl" TEXT NOT NULL DEFAULT '/defaultPersonImage.png',
    "role" "USER_ROLE" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '/defaultOrganization.png',
    "adminCognitoId" TEXT NOT NULL,
    "organizationName" TEXT NOT NULL,
    "organizationKeyword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '/defaultPersonImage.png',
    "phoneNumber" TEXT,
    "monthlyTarget" INTEGER NOT NULL,
    "todaySale" INTEGER NOT NULL,
    "currentSale" INTEGER NOT NULL,
    "overallSale" INTEGER NOT NULL,
    "numberOfAccount" INTEGER,
    "salary" INTEGER NOT NULL,
    "targetCurrency" TEXT NOT NULL,
    "salaryCurrency" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarDays" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "day" INTEGER NOT NULL,
    "status" "CALENDAR_DAYS_STATUS" NOT NULL,
    "sale" TEXT,
    "leaveReason" TEXT,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "CalendarDays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarDetails" (
    "id" SERIAL NOT NULL,
    "saleDays" TEXT NOT NULL,
    "notSaleDays" TEXT NOT NULL,
    "leaveDays" TEXT NOT NULL,
    "weekendDays" TEXT NOT NULL,
    "remainingDays" TEXT NOT NULL,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "CalendarDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "year" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "clientImageUrl" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientPhoneNumber" TEXT,
    "totalPayment" TEXT NOT NULL,
    "paidAmount" TEXT NOT NULL,
    "remainingAmount" TEXT NOT NULL,
    "description" TEXT,
    "organizationId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "previousMonthId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreviousMonth" (
    "id" SERIAL NOT NULL,
    "year" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "target" TEXT NOT NULL,
    "totalSales" TEXT NOT NULL,
    "totalClient" INTEGER NOT NULL,

    CONSTRAINT "PreviousMonth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_cognitoId_key" ON "Admin"("cognitoId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_cognitoId_key" ON "Agent"("cognitoId");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_email_key" ON "Agent"("email");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_adminCognitoId_fkey" FOREIGN KEY ("adminCognitoId") REFERENCES "Admin"("cognitoId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarDays" ADD CONSTRAINT "CalendarDays_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarDetails" ADD CONSTRAINT "CalendarDetails_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_previousMonthId_fkey" FOREIGN KEY ("previousMonthId") REFERENCES "PreviousMonth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

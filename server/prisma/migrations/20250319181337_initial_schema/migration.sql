/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Agent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CalendarDays` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CalendarDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PreviousMonth` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Sale` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CalendarDays" DROP CONSTRAINT "CalendarDays_memberId_fkey";

-- DropForeignKey
ALTER TABLE "CalendarDetails" DROP CONSTRAINT "CalendarDetails_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_previousMonthId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Admin_id_seq";

-- AlterTable
ALTER TABLE "Agent" DROP CONSTRAINT "Agent_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Agent_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Agent_id_seq";

-- AlterTable
ALTER TABLE "CalendarDays" DROP CONSTRAINT "CalendarDays_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "memberId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CalendarDays_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CalendarDays_id_seq";

-- AlterTable
ALTER TABLE "CalendarDetails" DROP CONSTRAINT "CalendarDetails_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "memberId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CalendarDetails_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CalendarDetails_id_seq";

-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "organizationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Member_id_seq";

-- AlterTable
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Organization_id_seq";

-- AlterTable
ALTER TABLE "PreviousMonth" DROP CONSTRAINT "PreviousMonth_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PreviousMonth_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PreviousMonth_id_seq";

-- AlterTable
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "organizationId" SET DATA TYPE TEXT,
ALTER COLUMN "memberId" SET DATA TYPE TEXT,
ALTER COLUMN "previousMonthId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sale_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sale_id_seq";

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

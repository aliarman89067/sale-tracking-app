import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface CreateMembersRequest extends Request {
  body: {
    organizationId: string;
    adminCognitoId: string;
    members: {
      imageUrl: string;
      id: number;
      name: string;
      email: string;
      phoneNumber?: string;
      monthlyTarget: number;
      salary: number;
      targetCurrency: string;
      salaryCurrency: string;
    }[];
  };
}

export const createMembers = async (
  req: CreateMembersRequest,
  res: Response
) => {
  try {
    const { organizationId, adminCognitoId, members } = req.body;

    // Create members and add organizationId to them

    const checkOrganization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
        adminCognitoId,
      },
    });

    if (!checkOrganization) {
      res.status(404).json({ message: "Organization not found!" });
      return;
    }

    for (let i = 0; i < members.length; i++) {
      if (
        !members[i].name ||
        !members[i].email ||
        !members[i].salary ||
        isNaN(members[i].salary) ||
        !members[i].monthlyTarget ||
        isNaN(members[i].monthlyTarget) ||
        !members[i].imageUrl ||
        !members[i].targetCurrency ||
        !members[i].salaryCurrency
      ) {
        res.status(500).json({ message: "Members data is not correct!" });
        return;
      }
    }

    const newMembers = members.map(async (memberData) => {
      const {
        name,
        email,
        salary,
        monthlyTarget,
        phoneNumber,
        imageUrl,
        targetCurrency,
        salaryCurrency,
      } = memberData;

      return await prisma.member.create({
        data: {
          imageUrl,
          name,
          email,
          salary: Number(salary),
          monthlyTarget: Number(monthlyTarget),
          phoneNumber,
          todaySale: 0,
          currentSale: 0,
          overallSale: 0,
          organizationId: organizationId,
          targetCurrency,
          salaryCurrency,
        },
      });
    });
    const newMembersData = await Promise.all(newMembers);
    res.status(201).json(newMembersData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create members" });
  }
};

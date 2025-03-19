import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface GetOrganizationRequest extends Request {
  params: {
    adminCognitoId: string;
  };
}

export const getOrganizations = async (
  req: GetOrganizationRequest,
  res: Response
) => {
  const { adminCognitoId } = req.params;
  try {
    const organizations = await prisma.organization.findMany({
      where: {
        adminCognitoId,
      },
      include: {
        members: true,
      },
    });
    res.status(200).json(organizations);
  } catch (error) {
    console.log("Failed to fetch organizations ", error);
    res.status(400).json({ message: "Failed to fetch oraganizations" });
  }
};

interface CreateOrganizationRequest extends Request {
  body: {
    adminCognitoId: string;
    imageUrl: string;
    organizationName: string;
    organizationKeyword: string;
    isMember: boolean;
    members?: {
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

export const createOrganization = async (
  req: CreateOrganizationRequest,
  res: Response
) => {
  const {
    imageUrl,
    adminCognitoId,
    organizationName,
    organizationKeyword,
    isMember,
    members,
  } = req.body;

  try {
    if (
      !imageUrl ||
      !adminCognitoId ||
      !organizationName ||
      !organizationKeyword ||
      isMember === undefined ||
      isMember === null
    ) {
      res.status(500).json({ message: "Request Body is not correct!" });
      return;
    }

    if (isMember) {
      if (!members) {
        res.status(500).json({ message: "Members data is not exist!" });
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
    }

    const organization = await prisma.organization.create({
      data: {
        imageUrl,
        adminCognitoId,
        organizationName,
        organizationKeyword,
      },
    });

    if (isMember && members) {
      const createMembers = members.map(async (memberData) => {
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

        const member = await prisma.member.create({
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
            organizationId: organization.id,
            targetCurrency,
            salaryCurrency,
          },
        });
      });
      await Promise.all(createMembers);
    }
    res.status(201).json(organization);
  } catch (error) {
    console.log("Failed to create organizations ", error);
    res.status(400).json({ message: "Failed to create oraganizations" });
  }
};

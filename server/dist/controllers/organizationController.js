"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrganization = exports.getOrganizationName = exports.getOrganizations = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminCognitoId } = req.params;
    try {
        const organizations = yield prisma.organization.findMany({
            where: {
                adminCognitoId,
            },
            include: {
                members: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json(organizations);
    }
    catch (error) {
        console.log("Failed to fetch organizations ", error);
        res.status(400).json({ message: "Failed to fetch oraganizations" });
    }
});
exports.getOrganizations = getOrganizations;
const getOrganizationName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { organizationId, adminCognitoId } = req.params;
        if (!organizationId || !adminCognitoId) {
            res.status(400).json({ message: "Payload is not correct!" });
            return;
        }
        const organization = yield prisma.organization.findUnique({
            where: {
                id: organizationId,
                adminCognitoId,
            },
        });
        if (!organization) {
            res.status(404).json({ message: "Organization not found!" });
            return;
        }
        res.json(organization);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get organization name" });
    }
});
exports.getOrganizationName = getOrganizationName;
const createOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { imageUrl, adminCognitoId, organizationName, organizationKeyword, isMember, members, } = req.body;
    try {
        if (!imageUrl ||
            !adminCognitoId ||
            !organizationName ||
            !organizationKeyword ||
            isMember === undefined ||
            isMember === null) {
            res.status(500).json({ message: "Request Body is not correct!" });
            return;
        }
        if (isMember) {
            if (!members) {
                res.status(500).json({ message: "Members data is not exist!" });
                return;
            }
            for (let i = 0; i < members.length; i++) {
                if (!members[i].name ||
                    !members[i].email ||
                    !members[i].salary ||
                    isNaN(members[i].salary) ||
                    !members[i].monthlyTarget ||
                    isNaN(members[i].monthlyTarget) ||
                    !members[i].imageUrl ||
                    !members[i].targetCurrency ||
                    !members[i].salaryCurrency) {
                    res.status(500).json({ message: "Members data is not correct!" });
                    return;
                }
            }
        }
        const organization = yield prisma.organization.create({
            data: {
                imageUrl,
                adminCognitoId,
                organizationName,
                organizationKeyword,
            },
        });
        if (isMember && members) {
            const createMembers = members.map((memberData) => __awaiter(void 0, void 0, void 0, function* () {
                const { name, email, salary, monthlyTarget, phoneNumber, imageUrl, targetCurrency, salaryCurrency, } = memberData;
                yield prisma.member.create({
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
            }));
            yield Promise.all(createMembers);
        }
        res.status(201).json(organization);
    }
    catch (error) {
        console.log("Failed to create organizations ", error);
        res.status(400).json({ message: "Failed to create oraganizations" });
    }
});
exports.createOrganization = createOrganization;

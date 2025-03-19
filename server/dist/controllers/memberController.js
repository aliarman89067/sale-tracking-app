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
exports.createMembers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { organizationId, adminCognitoId, members } = req.body;
        // Create members and add organizationId to them
        const checkOrganization = yield prisma.organization.findUnique({
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
        const newMembers = members.map((memberData) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, email, salary, monthlyTarget, phoneNumber, imageUrl, targetCurrency, salaryCurrency, } = memberData;
            return yield prisma.member.create({
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
        }));
        const newMembersData = yield Promise.all(newMembers);
        res.status(201).json(newMembersData);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create members" });
    }
});
exports.createMembers = createMembers;

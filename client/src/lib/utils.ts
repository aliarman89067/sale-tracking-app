import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CreateNewUserProps {
  userData: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
  };
  fetchWithBQ: any;
}

export const createNewUser = async ({
  userData,
  fetchWithBQ,
}: CreateNewUserProps) => {
  const endpoint =
    userData.role.toLowerCase() === "admin" ? "/admin" : "/agent";
  const createUserResponse = await fetchWithBQ({
    url: endpoint,
    method: "POST",
    body: userData,
  });
  if (createUserResponse.error) {
    throw new Error("Failed to create new user");
  }
  return createUserResponse;
};

export const getNameByRole = ({
  idToken,
  userRole,
}: {
  idToken: any;
  userRole: string;
}) => {
  return userRole.toLowerCase() === "admin"
    ? typeof idToken?.payload?.["custom:adminname"] === "string"
      ? idToken?.payload?.["custom:adminname"]
      : ""
    : typeof idToken?.payload?.["custom:adminname"] === "string"
    ? idToken?.payload?.["custom:agentname"]
    : "";
};

import { CreateOrganizationFormType, MembersType } from "@/lib/types";
import { createNewUser, getNameByRole } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
    prepareHeaders: async (header) => {
      const session = await fetchAuthSession();
      const { idToken } = session.tokens ?? {};
      header.set("Authorization", `Bearer ${idToken}`);
    },
  }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (build) => ({
    getAuthUser: build.query<UserType | null, void>({
      queryFn: async (_, _api, _extraOptions, fetchWithBQ) => {
        const session = await fetchAuthSession();
        if (!session.tokens) {
          return {
            data: null,
          };
        }
        const { idToken } = session.tokens ?? {};
        const userRole = idToken?.payload["custom:role"] as string;
        const user = await getCurrentUser();
        const endpoint =
          userRole.toLocaleLowerCase() === "admin"
            ? `/admin/${user.userId}`
            : `/agent/${user.userId}`;
        let userApiResponse = await fetchWithBQ(endpoint);
        if (userApiResponse.error && userApiResponse.error.status === 404) {
          const name = getNameByRole({ userRole, idToken });

          const userData = {
            id: user.userId,
            name,
            email: user?.signInDetails?.loginId || "",
            phoneNumber: "",
            role: userRole,
          };
          userApiResponse = await createNewUser({
            userData,
            fetchWithBQ,
          });
        }
        return {
          data: {
            ...(userApiResponse.data as UserType),
          },
        };
      },
    }),
    createOrganization: build.mutation<
      boolean,
      Partial<CreateOrganizationFormType & { adminCognitoId: string }>
    >({
      query: (body) => ({
        url: "/organizations",
        method: "POST",
        body,
      }),
    }),
    getMemberOrganization: build.query<
      OrganizationsProps[],
      { adminCognitoId?: string }
    >({
      query: ({ adminCognitoId }) => ({
        url: `/organizations/${adminCognitoId}`,
      }),
    }),
    getOrganizationName: build.query<
      Partial<OrganizationsProps>,
      { organizationId: string; adminCognitoId?: string }
    >({
      query: ({ organizationId, adminCognitoId }) => ({
        url: `/organizations/${organizationId}/${adminCognitoId}`,
      }),
    }),
    addMembersInOrganization: build.mutation<
      MembersType,
      MembersType & { organizationId: string; adminCognitoId: string }
    >({
      query: ({ organizationId, adminCognitoId, members }) => ({
        url: `/members`,
        method: "POST",
        body: { organizationId, adminCognitoId, members },
      }),
    }),
  }),
});

export const {
  useGetAuthUserQuery,
  useCreateOrganizationMutation,
  useGetMemberOrganizationQuery,
  useGetOrganizationNameQuery,
  useAddMembersInOrganizationMutation,
} = api;

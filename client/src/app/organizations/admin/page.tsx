"use client";
import { EmptyPaperPlaneCTA } from "@/components/EmptyPaperPlaneCTA";
import { useRouter } from "next/navigation";
import React from "react";

const AdminOrganizations = () => {
  const router = useRouter();

  const isOrganizationData = false;
  return (
    <section className="max-w-screen-xl w-full mx-auto">
      {isOrganizationData ? (
        <div></div>
      ) : (
        <EmptyPaperPlaneCTA
          onClick={() => router.push("/organizations/create")}
          title="Create Your First Organization"
        />
      )}
    </section>
  );
};

export default AdminOrganizations;

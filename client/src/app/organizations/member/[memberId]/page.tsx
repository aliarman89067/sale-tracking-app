import React from "react";
import MemberDetailsContainer from "./MemberDetailsContainer";

const MemberDetails = async ({ params }: MemberDetails) => {
  const { memberId } = await params;
  return (
    <>
      <MemberDetailsContainer memberId={memberId} />
    </>
  );
};

export default MemberDetails;

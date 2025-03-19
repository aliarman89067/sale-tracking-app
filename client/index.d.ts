interface CTASecondaryButtonProps {
  title: string;
  onClick: () => void;
}

interface CTAPrimaryButtonProps {
  title: string;
  onClick: () => void;
  classNames?: string;
}

interface EmptyPaperPlaneCTAProps {
  title: string;
  onClick: () => void;
}

interface BackButtonProps {
  title: string;
  href: string;
}
interface AuthTogglerProps {
  role: "admin" | "agent";
  setRole: (value: "admin" | "agent") => void;
}
interface UserType {
  cognitoId: string;
  imageUrl: string;
  adminName: string;
  agentName: string;
  email: string;
  role: string;
}
interface ImageInputProps {
  form: any;
  title?: string;
  size: "lg" | "sm";
  isTitle: boolean;
  fieldName: string;
  isMembersState?: boolean;
  setMembers?: React.Dispatch<React.SetStateAction<MembersProps[] | null>>;
  index?: number;
  isOptional?: boolean;
  memberId?: number;
}
interface TextInputProps {
  form: any;
  title?: string;
  isTitle: boolean;
  fieldName: string;
  placeHolder: string;
  isMembersState?: boolean;
  setMembers?: React.Dispatch<React.SetStateAction<MembersProps[] | null>>;
  index?: number;
  size?: "lg" | "sm";
  isOptional?: boolean;
  memberId?: number;
}
interface MembersProps {
  id: number;
  imageUrl?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  monthlyTarget: string;
  salary: string;
  targetCurrency: string;
  salaryCurrency: string;
}
interface MemberAddingFormProps {
  member: MembersProps;
  setMembers: React.Dispatch<React.SetStateAction<MembersProps[] | null>>;
  form: any;
  index: number;
  removeMember: (id: number) => void;
}
interface OrganizationsProps {
  id: string;
  imageUrl: string;
  organizationName: string;
  organizationKeyword: string;
  members?: {
    id: string;
    imageUrl: string;
    name: string;
    email: string;
  }[];
}
interface AddMemberProps {
  params: Promise<{
    organizationId: string;
  }>;
}

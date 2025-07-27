import { useQueryUser } from "@/hooks/user-queries";

type Props = {
  type: "FREE" | "PRO";
  children: React.ReactNode;
  className?: string; // ✅ Add this
};

export const SubscriptionPlan = ({ children, type, className }: Props) => {
  const { data } = useQueryUser();

  if (data?.data?.subscription?.plan !== type) return null;

  return <div className={className}>{children}</div>; // ✅ Apply className
};

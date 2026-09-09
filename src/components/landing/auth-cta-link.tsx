import { ButtonLink } from "@/components/ui/button-link";
import { getSessionUser } from "@/lib/server/auth";

type AuthCtaLinkProps = {
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  "data-magnetic"?: boolean;
  guestLabel?: string;
  guestHref?: string;
  memberLabel?: string;
  memberHref?: string;
};

export async function AuthCtaLink({
  variant = "primary",
  className,
  guestLabel = "Start free",
  guestHref = "/signup",
  memberLabel = "Dashboard",
  memberHref = "/dashboard",
  ...rest
}: AuthCtaLinkProps) {
  const user = await getSessionUser();
  const signedIn = Boolean(user);

  return (
    <ButtonLink
      href={signedIn ? memberHref : guestHref}
      variant={variant}
      className={className}
      {...rest}
    >
      {signedIn ? memberLabel : guestLabel}
    </ButtonLink>
  );
}

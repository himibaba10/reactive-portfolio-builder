import { BannerContact } from "./banner";
import { CenterContact } from "./center";
import { ClassicContact } from "./classic";
import { ColumnsContact } from "./columns";
import { PanelContact } from "./panel";
import { readContact, type SectionProps } from "./shared";
import { SplitContact } from "./split";

export function ContactSection({ section }: SectionProps) {
  const contact = readContact(section.data);
  const variant = section.variant;

  if (variant === 1) return <ClassicContact contact={contact} />;
  if (variant === 2) return <SplitContact contact={contact} />;
  if (variant === 3) return <CenterContact contact={contact} />;
  if (variant === 4) return <PanelContact contact={contact} />;
  if (variant === 5) return <BannerContact contact={contact} />;
  return <ColumnsContact contact={contact} />;
}

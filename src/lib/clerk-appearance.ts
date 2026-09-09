/** Dark shell matching Reactive marketing surfaces. */
export const clerkAppearance = {
  variables: {
    colorPrimary: "#d6ff3f",
    colorBackground: "#12141a",
    colorInputBackground: "#1a1d26",
    colorInputText: "#f4f5f7",
    colorText: "#f4f5f7",
    colorTextSecondary: "#9aa3b5",
    colorDanger: "#f87171",
    borderRadius: "0.75rem",
    fontFamily: "var(--font-body), system-ui, sans-serif",
  },
  elements: {
    rootBox: "mx-auto w-full",
    cardBox: "w-full shadow-none",
    card: "border border-[color:var(--color-line,#2a2f3a)] bg-[color:var(--color-panel,#1a1d26)] shadow-none",
    headerTitle: "font-[family-name:var(--font-display)] tracking-tight",
    headerSubtitle: "text-[color:var(--color-muted,#9aa3b5)]",
    socialButtonsBlockButton:
      "border border-[color:var(--color-line,#2a2f3a)] bg-transparent hover:bg-white/5",
    formButtonPrimary:
      "bg-[#d6ff3f] text-[#0b0c0f] hover:bg-[#e4ff7a] shadow-none",
    footerActionLink: "text-[#d6ff3f] hover:text-[#e4ff7a]",
  },
};

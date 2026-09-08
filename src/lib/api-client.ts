export type User = {
  id: string;
  email: string;
  isEmailVerified: boolean;
  createdAt?: string | Date;
};

export type SectionType =
  | "Hero"
  | "About"
  | "Skills"
  | "Projects"
  | "Experience"
  | "Education"
  | "Contact";

export type PortfolioSection = {
  id: string;
  type: SectionType;
  order: number;
  visible: boolean;
  data: Record<string, unknown>;
};

export type Portfolio = {
  id: string;
  userId: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  paletteId: string;
  sections: PortfolioSection[];
  publishedAt: string | Date | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function api<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body:
      options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(
      typeof data.error === "string" ? data.error : "Request failed",
      res.status,
    );
  }
  return data as T;
}

import Image from "next/image";

type PortfolioImageProps = {
  src?: string | null;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function PortfolioImage({
  src,
  alt = "",
  className = "",
  sizes = "(max-width: 768px) 100vw, 560px",
  priority = false,
}: PortfolioImageProps) {
  if (!src) return null;

  const isCloudinary = src.includes("res.cloudinary.com");

  if (isCloudinary) {
    return (
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={900}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}

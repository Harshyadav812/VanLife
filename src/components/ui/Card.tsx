import type { JSX, ReactNode } from "react";
import clsx from "clsx";

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div
      className={clsx(
        "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}

function Image({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      className={clsx("w-full h-48 sm:h-56 md:h-64 object-cover", className)}
      src={src}
      alt={alt}
    />
  );
}

function Content({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx("p-4", className)}>{children}</div>;
}

function Header({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("flex justify-between items-center mb-2", className)}>
      {children}
    </div>
  );
}

function Title({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={clsx(
        "text-lg font-semibold text-gray-900 truncate",
        className
      )}
    >
      {children}
    </h3>
  );
}

function Description({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={clsx("text-gray-600 text-sm mb-3 line-clamp-2", className)}>
      {children}
    </p>
  );
}

Card.Image = Image;
Card.Content = Content;
Card.Header = Header;
Card.Title = Title;
Card.Description = Description;

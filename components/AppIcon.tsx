import Image from "next/image";

/** The real Super Sudoku Android app launcher icon, used as the site logo. */
export default function AppIcon({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/images/ic_launcher-playstore.png"
      alt="Super Sudoku app icon"
      width={size}
      height={size}
      priority
      className={`rounded-xl ${className}`}
    />
  );
}

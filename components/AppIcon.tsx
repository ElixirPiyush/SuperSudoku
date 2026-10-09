/** The Super Sudoku app icon (from the Play listing), used as the site logo. */
export default function AppIcon({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <img
      src="/images/app-icon-192.png"
      alt="Super Sudoku app icon"
      width={size}
      height={size}
      className={`rounded-xl ${className}`}
    />
  );
}

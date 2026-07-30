type MaterialIconProps = {
  name: string;
  className?: string;
};

export function MaterialIcon({ name, className = "" }: MaterialIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-rounded${className ? ` ${className}` : ""}`}
    >
      {name}
    </span>
  );
}

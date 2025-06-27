import clsx from "clsx";

export default function Avatar({
  size,
  src,
  className
}: {
  size: number;
  src?: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt="avatar"
      className={clsx("relative rounded-[6px]", className)}
      style={{
        width: size,
        height: size
      }}
    />
  );
}

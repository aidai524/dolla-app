import clsx from "clsx";
// @ts-ignore
import crypto from "crypto-browserify";

export default function Avatar({
  size,
  src,
  email = "amy100936@gmail.com",
  className,
  address
}: {
  size: number;
  src?: string;
  email?: string;
  active?: boolean;
  className?: string;
  address?: string;
}) {
  const hashedEmail = address
    ? crypto
        .createHash("sha256")
        .update(address.trim().toLowerCase())
        .digest("hex")
    : "";

  return (
    <img
      src={`https://www.gravatar.com/avatar/${hashedEmail}?d=wavatar`}
      alt="avatar"
      className={clsx("relative rounded-[6px]", className)}
      style={{
        width: size,
        height: size
      }}
    />
  );
}

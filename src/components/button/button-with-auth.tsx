import { useAuth } from "@/contexts/auth";
import Button from ".";
import useChainId from "@/hooks/use-chain-id";
import useToast from "@/hooks/use-toast";

export default function ButtonWithAuth({
  children,
  className,
  disabled,
  onClick,
  ...rest
}: any) {
  const { userInfo, login, logining } = useAuth();
  const { chainId, switchToBerachain } = useChainId();

  if (!userInfo) {
    return (
      <Button onClick={login} className={className} loading={logining}>
        Connect Wallet
      </Button>
    );
  }

  if (chainId !== 80094) {
    return (
      <Button className={className} onClick={switchToBerachain} {...rest}>
        Switch Network
      </Button>
    );
  }

  return (
    <Button
      onClick={onClick}
      className={className}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Button>
  );
}

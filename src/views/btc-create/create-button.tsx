import ButtonWithAuth from "@/components/button/button-with-auth";

export default function CreateButton({
  account,
  loading,
  onCreate
}: {
  account: string;
  loading: boolean;

  onCreate: (account: string) => void;
}) {
  return (
    <ButtonWithAuth
      className="mt-[20px] w-full h-[40px]"
      loading={loading}
      onClick={() => {
        if (!account) {
          return;
        }

        onCreate(account);
      }}
    >
      Create Market
    </ButtonWithAuth>
  );
}

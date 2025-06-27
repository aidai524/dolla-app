import Modal from "@/components/modal";
import ShareCard from "./share-card";
import { useState } from "react";

export default function ShareBtn({ data }: { data: any }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="button" onClick={() => setOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <rect
            x="0.5"
            y="0.5"
            width="29"
            height="29"
            rx="5.5"
            fill="#1A1E24"
            stroke="#383F47"
          />
          <path
            d="M9 16.2333V21H21V16.2333M14.8065 17.1V8M14.8065 8L11.3226 11.0333M14.8065 8L18.2903 11.0333"
            stroke="#ADBCCF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ShareCard data={data} />
      </Modal>
    </>
  );
}

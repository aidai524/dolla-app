import Item from "./item";
import { motion, AnimatePresence } from "framer-motion";

export default function BidsInfo() {
  return (
    <div className="flex flex-col gap-[10px] absolute right-[20px] bottom-[24%] text-white h-[280px] overflow-hidden [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_10%,rgba(0,0,0,0))]">
      <AnimatePresence>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </AnimatePresence>
    </div>
  );
}

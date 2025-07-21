import useBroadcatChannel from "@/hooks/use-broadcat-channel";
import { useEffect, useState } from "react";

export default function Callback() {
    useBroadcatChannel();

    return null;
}
import "./index.css";

export default function Provider() {
  return (
    <div className="flex items-center gap-[10px] absolute">
      <img src="" className="provider-avatar" />
      <div>
        <div className="provider-label">Provider</div>
        <div className="provider-name">0x1234567890</div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#020204]">
      <div className="w-[min(28rem,80vw)]">
        <div className="technical-label mb-6 text-center text-neon">Preparing Vaulkyrie</div>
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div className="h-full w-2/3 animate-pulse bg-neon" />
        </div>
      </div>
    </div>
  );
}

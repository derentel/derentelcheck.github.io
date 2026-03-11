import { motion } from 'framer-motion';

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="font-mono text-xs text-muted-foreground">ACTIVE SESSION</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
          <span className="text-gradient-cyan">derentel</span>
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed">
          Senior Software Engineer. Engineering the future through clean, high-performance code.
        </p>
      </motion.div>

      {/* Bento grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        {/* Philosophy card */}
        <div className="md:col-span-2 glass rounded-xl p-6 glow-border scanline">
          <span className="font-mono text-[10px] text-primary block mb-3">// PHILOSOPHY</span>
          <p className="text-foreground/80 text-sm leading-relaxed">
            &ldquo;Code that works like Swiss watches. Focused on extreme performance and low-level optimization. 
            Every allocation matters, every cycle counts.&rdquo;
          </p>
          <div className="mt-4 flex gap-6">
            <Stat label="YEARS_ACTIVE" value="11+" />
            <Stat label="CORE_LANGS" value="4" />
            <Stat label="OPEN_SOURCE" value="9" />
          </div>
        </div>

        {/* Quick metrics */}
        <div className="glass rounded-xl p-6 glow-border flex flex-col justify-between">
          <span className="font-mono text-[10px] text-primary block mb-3">// SPECIALIZATION</span>
          <div className="space-y-3">
            <MetricRow label="Systems Programming" pct={95} />
            <MetricRow label="Distributed Systems" pct={88} />
            <MetricRow label="Performance Tuning" pct={92} />
            <MetricRow label="Security Engineering" pct={85} />
          </div>
        </div>
      </motion.div>

      {/* Status grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <StatusCard icon="◆" label="VortexStream" status="STABLE" />
        <StatusCard icon="◇" label="NovaSync" status="STABLE" />
        <StatusCard icon="▣" label="SentinelGuard" status="ACTIVE" />
        <StatusCard icon="▧" label="Archive" status="6 REPOS" />
      </motion.div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] text-muted-foreground">{label}</div>
      <div className="font-mono text-lg font-semibold text-foreground">{value}</div>
    </div>
  );
}

function MetricRow({ label, pct }: { label: string; pct: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-mono text-[10px] text-muted-foreground">{label}</span>
        <span className="font-mono text-[10px] text-primary">{pct}%</span>
      </div>
      <div className="h-1 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

function StatusCard({ icon, label, status }: { icon: string; label: string; status: string }) {
  return (
    <div className="glass rounded-xl p-4 glow-border group hover:glow-primary transition-shadow duration-500">
      <div className="text-primary text-lg mb-2">{icon}</div>
      <div className="font-mono text-xs text-foreground">{label}</div>
      <div className="font-mono text-[10px] text-primary mt-1">{status}</div>
    </div>
  );
}

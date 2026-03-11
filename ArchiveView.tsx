import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const repos = [
  { name: 'AetherDB', lang: 'Rust', description: 'LSM-Tree storage engine, WAL, RwLock sync.', complexity: 'Extreme', performance: 'Optimized' },
  { name: 'Aegis-Cluster', lang: 'Java', description: 'Distributed message broker, NIO, Custom binary protocol.', complexity: 'High', performance: 'Optimized' },
  { name: 'Hydra-Injector', lang: 'C++', description: 'Manual mapping injector, PE-header parsing.', complexity: 'High', performance: 'Optimized' },
  { name: 'Iris-Sniffer', lang: 'C++', description: 'Real-time packet inspection, Raw sockets.', complexity: 'Medium', performance: 'Optimized' },
  { name: 'PhantomVault', lang: 'Python', description: 'AES-256-GCM secret management.', complexity: 'Medium', performance: 'Optimized' },
  { name: 'Limbus-Optimizer', lang: 'Python', description: 'Kernel-level memory trimming (Win32).', complexity: 'High', performance: 'Optimized' },
];

const languages = ['All', 'Rust', 'Java', 'C++', 'Python'];

export default function ArchiveView() {
  const [filter, setFilter] = useState('All');
  const [copied, setCopied] = useState<string | null>(null);
  const filtered = filter === 'All' ? repos : repos.filter((r) => r.lang === filter);

  const copyUrl = (name: string) => {
    navigator.clipboard.writeText(`https://github.com/derentel/${name}`);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-mono text-[10px] text-primary block mb-2">// 03_ARCHIVE</span>
        <h2 className="text-3xl font-bold tracking-tight">All Repositories</h2>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="flex flex-wrap gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {languages.map((l) => (
          <button
            key={l}
            onClick={() => setFilter(l)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
              filter === l
                ? 'bg-primary text-primary-foreground glow-primary'
                : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
            }`}
          >
            {l}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((repo) => (
            <motion.div
              key={repo.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-xl p-5 group glow-border hover:glow-primary transition-all duration-500 relative"
            >
              {/* Hover trace line */}
              <div className="absolute -left-4 top-1/2 w-4 h-px bg-gradient-to-l from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center justify-between mb-3">
                <h3 className="font-mono font-semibold text-sm">{repo.name}</h3>
                <span className="text-[10px] font-mono text-primary">{repo.lang}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{repo.description}</p>

              <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-3">
                  <span className="text-[9px] font-mono text-muted-foreground">
                    CMPLX: <span className="text-primary">{repo.complexity}</span>
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground">
                    PERF: <span className="text-primary">{repo.performance}</span>
                  </span>
                </div>
                <button
                  onClick={() => copyUrl(repo.name)}
                  className="p-1 rounded hover:bg-secondary transition-colors"
                  title="Copy GitHub URL"
                >
                  {copied === repo.name ? (
                    <Check className="w-3.5 h-3.5 text-primary" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

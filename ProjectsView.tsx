import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ExternalLink, Copy, Check } from 'lucide-react';

const featured = [
  {
    name: 'VortexStream SDK',
    icon: '⟐',
    description: 'High-performance async binary-stream framework.',
    highlights: ['SHA-384 HMAC', 'Middleware Pipeline', '__slots__ Optimization'],
    complexity: 'Extreme',
    performance: 'Optimized',
    lang: 'Python',
    details: {
      architecture: 'Event-driven async I/O with zero-copy buffer management',
      throughput: '~2.4GB/s sustained throughput on commodity hardware',
      codePreview: `class VortexStream:
    __slots__ = ('_buffer', '_pipeline', '_hmac')
    
    async def process(self, chunk: bytes) -> bytes:
        validated = self._hmac.verify(chunk)
        return await self._pipeline.execute(validated)`,
    },
  },
  {
    name: 'NovaSync Engine',
    icon: '◈',
    description: 'Distributed key-value store with quorum consensus.',
    highlights: ['Quorum Consensus', 'Nanosecond Versioning', 'Automated Replication'],
    complexity: 'High',
    performance: 'Optimized',
    lang: 'Python',
    details: {
      architecture: 'Multi-raft consensus with adaptive quorum sizing',
      throughput: '~180K ops/sec with 3-node quorum',
      codePreview: `class QuorumManager:
    def propose(self, key: str, value: bytes, 
                ts: int = time.time_ns()) -> Consensus:
        ballot = self._prepare(key, value, ts)
        return self._collect_votes(ballot)`,
    },
  },
  {
    name: 'SentinelGuard',
    icon: '◧',
    description: 'High-performance L7 reverse proxy.',
    highlights: ['Least Connections LB', 'Sliding-window Rate Limiting', 'L7 Inspection'],
    complexity: 'High',
    performance: 'Optimized',
    lang: 'Python',
    details: {
      architecture: 'Non-blocking proxy with pluggable load-balancing strategies',
      throughput: '~45K req/sec with full L7 inspection enabled',
      codePreview: `class SentinelProxy:
    async def route(self, request: Request) -> Response:
        if not self.rate_limiter.allow(request.client):
            return Response(status=429)
        backend = self.lb.select(self.pool)
        return await backend.forward(request)`,
    },
  },
];

export default function ProjectsView() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const copyUrl = (name: string) => {
    const slug = name.replace(/\s+/g, '-');
    navigator.clipboard.writeText(`https://github.com/derentel/${slug}`);
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
        <span className="font-mono text-[10px] text-primary block mb-2">// 02_PROJECTS</span>
        <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
        <p className="text-sm text-muted-foreground mt-1">The Big Three — core systems engineering</p>
      </motion.div>

      <div className="space-y-4">
        {featured.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div
              className={`glass rounded-xl overflow-hidden transition-all duration-500 ${
                expanded === project.name ? 'glow-primary-strong' : 'glow-border hover:glow-primary'
              }`}
            >
              {/* Main row */}
              <button
                onClick={() => setExpanded(expanded === project.name ? null : project.name)}
                className="w-full text-left p-6 flex items-start gap-4"
              >
                <div className="text-2xl text-primary mt-0.5 animate-float">{project.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary text-muted-foreground">
                      {project.lang}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.highlights.map((h) => (
                      <span key={h} className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-primary/10 text-primary border border-primary/20">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1 shrink-0 opacity-60 group-hover:opacity-100">
                  <div className="font-mono text-[10px] text-muted-foreground">CMPLX</div>
                  <div className="font-mono text-xs text-primary">{project.complexity}</div>
                </div>
              </button>

              {/* Expandable detail panel */}
              <AnimatePresence>
                {expanded === project.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border/40 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Tech specs */}
                      <div className="space-y-4">
                        <h4 className="font-mono text-xs text-primary">TECHNICAL SPECS</h4>
                        <div className="space-y-3">
                          <DetailRow label="Architecture" value={project.details.architecture} />
                          <DetailRow label="Throughput" value={project.details.throughput} />
                          <DetailRow label="Complexity" value={project.complexity} />
                          <DetailRow label="Performance" value={project.performance} />
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={(e) => { e.stopPropagation(); copyUrl(project.name); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {copied === project.name ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
                            {copied === project.name ? 'Copied' : 'Copy URL'}
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
                            <ExternalLink className="w-3 h-3" />
                            View Source
                          </button>
                        </div>
                      </div>

                      {/* Code preview */}
                      <div className="space-y-3">
                        <h4 className="font-mono text-xs text-primary">CODE PREVIEW</h4>
                        <pre className="bg-background/80 border border-border/40 rounded-lg p-4 text-[11px] font-mono text-muted-foreground overflow-x-auto leading-relaxed">
                          {project.details.codePreview}
                        </pre>
                      </div>
                    </div>

                    {/* Close */}
                    <div className="flex justify-center pb-3">
                      <button
                        onClick={() => setExpanded(null)}
                        className="p-1 rounded-full hover:bg-secondary transition-colors"
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] text-muted-foreground uppercase">{label}</div>
      <div className="text-sm text-foreground/80">{value}</div>
    </div>
  );
}

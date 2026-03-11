import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const skills = [
  { name: 'Python', years: 11, level: 95, projects: ['VortexStream SDK', 'NovaSync Engine', 'SentinelGuard', 'PhantomVault', 'Limbus-Optimizer'] },
  { name: 'Java', years: 7, level: 78, projects: ['Aegis-Cluster'] },
  { name: 'C++', years: 5, level: 68, projects: ['Hydra-Injector', 'Iris-Sniffer'] },
  { name: 'Rust', years: 3, level: 55, projects: ['AetherDB'] },
];

export default function TechMatrixView() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-mono text-[10px] text-primary block mb-2">// 04_TECH_MATRIX</span>
        <h2 className="text-3xl font-bold tracking-tight">Technology Matrix</h2>
        <p className="text-sm text-muted-foreground mt-1">Click a language to explore linked projects</p>
      </motion.div>

      {/* Honeycomb-style grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((skill, i) => {
          const isSelected = selected === skill.name;
          return (
            <motion.button
              key={skill.name}
              onClick={() => setSelected(isSelected ? null : skill.name)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative glass rounded-xl p-6 text-center transition-all duration-500 ${
                isSelected ? 'glow-primary-strong ring-1 ring-primary/40' : 'glow-border hover:glow-primary'
              }`}
            >
              {/* Circular progress */}
              <div className="relative w-20 h-20 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="35" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                  <motion.circle
                    cx="40" cy="40" r="35"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 35}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 35 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 35 * (1 - skill.level / 100) }}
                    transition={{ duration: 1.5, delay: i * 0.15 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-lg font-bold text-foreground">{skill.level}</span>
                </div>
              </div>

              <h3 className="font-mono text-sm font-semibold mb-1">{skill.name}</h3>
              <div className="font-mono text-[10px] text-muted-foreground">{skill.years} years</div>
            </motion.button>
          );
        })}
      </div>

      {/* Linked projects panel */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-xl p-6 glow-border overflow-hidden"
          >
            <h3 className="font-mono text-xs text-primary mb-4">
              PROJECTS USING {selected?.toUpperCase()}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.find((s) => s.name === selected)?.projects.map((p) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 font-mono text-xs text-foreground"
                >
                  {p}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix visualization */}
      <motion.div
        className="glass rounded-xl p-6 glow-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-mono text-xs text-primary mb-4">CAPABILITY MATRIX</h3>
        <div className="space-y-3">
          {[
            { area: 'Systems Programming', langs: { Python: 90, Java: 60, 'C++': 95, Rust: 85 } },
            { area: 'Distributed Systems', langs: { Python: 95, Java: 80, 'C++': 40, Rust: 70 } },
            { area: 'Network Engineering', langs: { Python: 85, Java: 70, 'C++': 75, Rust: 50 } },
            { area: 'Security Research', langs: { Python: 80, Java: 30, 'C++': 90, Rust: 60 } },
          ].map((row) => (
            <div key={row.area} className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-muted-foreground w-36 shrink-0">{row.area}</span>
              <div className="flex-1 flex gap-1">
                {Object.entries(row.langs).map(([lang, val]) => (
                  <div
                    key={lang}
                    className={`h-3 rounded-sm transition-all duration-300 ${
                      selected === lang ? 'bg-primary' : 'bg-primary/20'
                    }`}
                    style={{ width: `${val}%`, maxWidth: '25%' }}
                    title={`${lang}: ${val}%`}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="flex gap-4 mt-2">
            {skills.map((s) => (
              <span key={s.name} className="font-mono text-[9px] text-muted-foreground flex items-center gap-1">
                <span className={`w-2 h-2 rounded-sm ${selected === s.name ? 'bg-primary' : 'bg-primary/20'}`} />
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

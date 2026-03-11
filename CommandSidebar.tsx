import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, FolderGit2, Archive, Cpu, 
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { useState } from 'react';

export type Section = 'dashboard' | 'projects' | 'archive' | 'tech_matrix';

interface SidebarProps {
  active: Section;
  onNavigate: (section: Section) => void;
}

const navItems: { id: Section; label: string; code: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'DASHBOARD', code: '01', icon: LayoutDashboard },
  { id: 'projects', label: 'PROJECTS', code: '02', icon: FolderGit2 },
  { id: 'archive', label: 'ARCHIVE', code: '03', icon: Archive },
  { id: 'tech_matrix', label: 'TECH_MATRIX', code: '04', icon: Cpu },
];

export default function CommandSidebar({ active, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      className="h-screen flex flex-col glass-strong z-30 relative shrink-0"
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/40">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="font-mono text-xs text-muted-foreground mb-1">SYSTEM</div>
              <div className="font-mono text-sm font-semibold text-gradient-cyan">derentel</div>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="font-mono text-sm font-bold text-primary text-center">d.</div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group relative ${
                isActive
                  ? 'bg-primary/10 glow-border-active'
                  : 'hover:bg-secondary/60'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2 overflow-hidden"
                  >
                    <span className={`font-mono text-[10px] ${isActive ? 'text-primary' : 'text-muted-foreground/50'}`}>
                      {item.code}
                    </span>
                    <span className={`font-mono text-xs whitespace-nowrap ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {item.label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Status */}
      <div className="p-3 border-t border-border/40" id="system-status">
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              <span className="font-mono text-[10px] text-muted-foreground">SYS_STATUS:</span>
              <span className="font-mono text-[10px] text-primary">OPERATIONAL</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors z-40"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}

import { useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CommandSidebar, { type Section } from '@/components/CommandSidebar';
import DashboardHome from '@/components/DashboardHome';
import ProjectsView from '@/components/ProjectsView';
import ArchiveView from '@/components/ArchiveView';
import TechMatrixView from '@/components/TechMatrixView';

const InteractiveBackground = lazy(() => import('@/components/InteractiveBackground'));

const views: Record<Section, React.ComponentType> = {
  dashboard: DashboardHome,
  projects: ProjectsView,
  archive: ArchiveView,
  tech_matrix: TechMatrixView,
};

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');

  const ActiveView = views[activeSection];

  return (
    <div className="h-screen w-screen flex bg-background grain overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <InteractiveBackground />
      </Suspense>

      {/* Sidebar */}
      <CommandSidebar active={activeSection} onNavigate={setActiveSection} />

      {/* Main content area */}
      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative z-10 scrollbar-hide">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <span className="font-mono text-[10px] text-muted-foreground/50">root</span>
            <span className="font-mono text-[10px] text-muted-foreground/30">/</span>
            <span className="font-mono text-[10px] text-primary">{activeSection}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <ActiveView />
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-20 pb-8 border-t border-border/30 pt-6 flex items-center justify-between">
            <span className="font-mono text-[10px] text-muted-foreground/40">© 2025 derentel</span>
            <span className="font-mono text-[10px] text-muted-foreground/30">v2.0.0 // COMMAND CENTER</span>
          </div>
        </div>
      </main>
    </div>
  );
}

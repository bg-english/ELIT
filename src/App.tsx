import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Language, 
  LANGUAGES, 
  AthleticProfile, 
  INITIAL_ATHLETIC_PROFILE, 
  MetricLog, 
  DailyRoutine, 
  GENERAL_ROUTINES 
} from './types';

// Importing sub-components
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import AboutUs from './components/AboutUs';
import RegistrationModal from './components/RegistrationModal';
import StatsDashboard from './components/StatsDashboard';
import ProfileSettings from './components/ProfileSettings';
import NutritionPlanner from './components/NutritionPlanner';
import CalendarRoutines from './components/CalendarRoutines';
import RoutineSuccess from './components/RoutineSuccess';
import ScoutingIA from './components/ScoutingIA';
import Suscripcion from './components/Suscripcion';

export default function App() {
  // Global State Managers
  const [currentLang, setCurrentLang] = React.useState<Language>(() => {
    const saved = localStorage.getItem('elit_lang');
    return (saved as Language) || 'ES';
  });

  const [activeTab, setActiveTab] = React.useState<string>(() => {
    const saved = localStorage.getItem('elit_tab');
    return saved || 'inicio';
  });

  // User credentials
  const [userEmail, setUserEmail] = React.useState<string | null>(() => {
    return localStorage.getItem('elit_user_email');
  });

  const [userName, setUserName] = React.useState<string | null>(() => {
    return localStorage.getItem('elit_user_name');
  });

  // Athletic Bio profile
  const [profile, setProfile] = React.useState<AthleticProfile>(() => {
    const saved = localStorage.getItem('elit_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use default
      }
    }
    return INITIAL_ATHLETIC_PROFILE;
  });

  // Custom athletic marks registered
  const [recentLogs, setRecentLogs] = React.useState<MetricLog[]>(() => {
    const saved = localStorage.getItem('elit_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  // Routines state tracking
  const [routines, setRoutines] = React.useState<DailyRoutine[]>(() => {
    const saved = localStorage.getItem('elit_routines');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return GENERAL_ROUTINES;
  });

  // Synchronizers
  React.useEffect(() => {
    localStorage.setItem('elit_lang', currentLang);
  }, [currentLang]);

  React.useEffect(() => {
    localStorage.setItem('elit_tab', activeTab);
  }, [activeTab]);

  React.useEffect(() => {
    localStorage.setItem('elit_profile', JSON.stringify(profile));
  }, [profile]);

  React.useEffect(() => {
    localStorage.setItem('elit_logs', JSON.stringify(recentLogs));
  }, [recentLogs]);

  React.useEffect(() => {
    localStorage.setItem('elit_routines', JSON.stringify(routines));
  }, [routines]);

  // Auth helper callbacks
  const handleLoginSuccess = (email: string, name: string) => {
    setUserEmail(email);
    setUserName(name);
    localStorage.setItem('elit_user_email', email);
    localStorage.setItem('elit_user_name', name);
    setActiveTab('dashboard'); // Redirect to dashboard
  };

  const handleLogout = () => {
    setUserEmail(null);
    setUserName(null);
    localStorage.removeItem('elit_user_email');
    localStorage.removeItem('elit_user_name');
    setActiveTab('inicio');
  };

  // Athletic update callbacks
  const handleLogNewMark = (category: string, value: number) => {
    const nowStr = new Date().toLocaleDateString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const newLog: MetricLog = {
      categoria: category,
      valor: value,
      fecha: nowStr
    };

    setRecentLogs(prev => [...prev, newLog]);

    // Update real profile values based on the registered metric
    if (category.toLowerCase().includes('30m')) {
      setProfile(prev => ({ ...prev, sprints30m: value }));
    } else if (category.toLowerCase().includes('resistencia')) {
      const valueStr = value.toString();
      setProfile(prev => ({ ...prev, resistencia: valueStr }));
    }
  };

  // Toggle routine items
  const handleToggleExercise = (dayNum: number, exerciseId: string) => {
    setRoutines(prev => prev.map(r => {
      if (r.dayNum === dayNum) {
        const updatedExercises = r.exercises.map(ex => {
          if (ex.id === exerciseId) {
            return { ...ex, completed: !ex.completed };
          }
          return ex;
        });
        return {
          ...r,
          exercises: updatedExercises
        };
      }
      return r;
    }));
  };

  // Trigger achievement upon confirmation
  const handleConfirmDayRoutine = (dayNum: number) => {
    // Flag this day as completed
    setRoutines(prev => prev.map(r => {
      if (r.dayNum === dayNum) {
        return { ...r, completed: true };
      }
      return r;
    }));
    // Redirect to celebration screen
    setActiveTab('success-achievement');
  };

  // Active state for pricing
  const [activePlan, setActivePlan] = React.useState<string>(() => {
    return localStorage.getItem('elit_plan') || 'Formativo';
  });

  const handleSelectPlan = (plan: string) => {
    setActivePlan(plan);
    localStorage.setItem('elit_plan', plan);
  };

  // Dispacher
  const renderTabContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <Inicio 
            currentLang={currentLang} 
            onNavigateToTab={setActiveTab} 
            onOpenLogin={() => setActiveTab('acceder')}
          />
        );
      case 'quienes-somos':
        return <AboutUs currentLang={currentLang} />;
      case 'suscripcion':
        return (
          <Suscripcion 
            currentLang={currentLang}
            activePlan={activePlan}
            onSelectPlan={handleSelectPlan}
          />
        );
      case 'mi-perfil':
        return (
          <ProfileSettings 
            currentLang={currentLang}
            profile={profile}
            onChangeProfile={setProfile}
          />
        );
      case 'dashboard':
        return (
          <StatsDashboard 
            currentLang={currentLang}
            profile={profile}
            onLogNewMark={handleLogNewMark}
            recentLogs={recentLogs}
          />
        );
      case 'calendario':
        return (
          <CalendarRoutines 
            currentLang={currentLang}
            routines={routines}
            onToggleExercise={handleToggleExercise}
            onConfirmDayRoutine={handleConfirmDayRoutine}
          />
        );
      case 'nutricion':
        return <NutritionPlanner currentLang={currentLang} profile={profile} />;
      case 'scouting-ia':
        return <ScoutingIA currentLang={currentLang} />;
      case 'acceder':
        return (
          <RegistrationModal 
            currentLang={currentLang}
            onSuccess={handleLoginSuccess}
            onClose={() => setActiveTab('inicio')}
          />
        );
      case 'success-achievement':
        return (
          <RoutineSuccess 
            currentLang={currentLang}
            onGoBack={() => setActiveTab('calendario')}
          />
        );
      default:
        return <Inicio currentLang={currentLang} onNavigateToTab={setActiveTab} onOpenLogin={() => setActiveTab('acceder')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020a05] text-[#d8e6da] selection:bg-[#2ecc71] selection:text-[#020a05] relative flex flex-col font-sans">
      
      {/* Decorative Matrix Background Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#1a3a2a_1px,transparent_1px)] bg-[size:16px_16px] z-0" />

      {/* Header bar */}
      <Navbar 
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userEmail={userEmail}
        userName={userName}
        onLogout={handleLogout}
        onOpenLogin={() => setActiveTab('acceder')}
      />

      {/* Dynamic Content stage with transition animation */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  FileEdit, 
  Image as ImageIcon, 
  ShieldCheck, 
  LogOut, 
  ExternalLink,
  Menu,
  X,
  Lock,
  KeyRound
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Si estamos en la página de login, no mostrar el layout administrativo con sidebar
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setUserEmail(session.user.email || 'Admin');
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && !isLoginPage) {
        router.push('/admin/login');
      } else if (session) {
        setUserEmail(session.user.email || 'Admin');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-slate-400">Verificando sesión segura...</p>
      </div>
    );
  }

  const NAV_ITEMS = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Inscripciones (Leads)', href: '/admin/inscripciones', icon: Users },
    { label: 'Programas Técnicos', href: '/admin/programas', icon: GraduationCap },
    { label: 'Contenidos Web', href: '/admin/contenido', icon: FileEdit },
    { label: 'Galería de Fotos', href: '/admin/galeria', icon: ImageIcon },
    { label: 'APIs & Integraciones', href: '/admin/apis', icon: KeyRound },
    { label: 'Seguridad 2FA', href: '/admin/seguridad', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex md:w-64 flex-col bg-slate-950 text-white border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
          <img src="/logo.png" alt="Logo Frederick Floret" className="h-10 w-auto bg-white p-1 rounded-xl" />
          <div>
            <span className="font-black text-sm tracking-tight text-white block">FREDERICK FLORET</span>
            <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Panel Admin</span>
          </div>
        </div>

        {/* Menú de Navegación */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D51C28] to-[#FF8C01] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar con Usuario y Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-red-400 border border-slate-700 shrink-0">
              {userEmail ? userEmail.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="overflow-hidden">
              <span className="block font-semibold truncate text-[11px] text-white">{userEmail}</span>
              <span className="text-[10px] text-emerald-400 font-medium">Sesión Segura</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              href="/"
              target="_blank"
              className="flex-1 py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
              title="Ver portal público"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Web</span>
            </Link>

            <button
              onClick={handleLogout}
              className="py-2 px-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Header Móvil */}
      <div className="md:hidden bg-slate-950 text-white border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto bg-white p-0.5 rounded-lg" />
          <span className="font-bold text-sm">Panel Administrativo</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-200"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Menú Desplegable Móvil */}
      {sidebarOpen && (
        <div className="md:hidden bg-slate-950 text-white border-b border-slate-800 p-4 space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                  isActive ? 'bg-[#D51C28] text-white' : 'text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
            <Link href="/" target="_blank" className="text-xs text-blue-400 flex items-center gap-1">
              <ExternalLink className="w-3.5 h-3.5" /> Ver Sitio Web
            </Link>
            <button onClick={handleLogout} className="text-xs text-red-400 font-bold flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5" /> Cerrar Sesión
            </button>
          </div>
        </div>
      )}

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

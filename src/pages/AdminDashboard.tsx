import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  Sparkles,
  Layers,
  Image as ImageIcon,
  HelpCircle,
  FolderDown,
  RotateCcw,
  Plus,
  Trash2,
  Edit3,
  Check,
  Save,
  Eye,
  EyeOff,
  Search,
  Copy,
  Lock,
  LogOut,
  Phone,
  Mail,
  MapPin,
  Globe,
  Share2,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileJson,
  Upload
} from 'lucide-react';
import { Language, ServiceItem, PortfolioItem } from '../types';
import { useCms, FaqItem } from '../context/CmsContext';

interface AdminDashboardProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, onNavigate }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // CMS state
  const {
    content,
    updateBranding,
    updateHero,
    addService,
    updateService,
    deleteService,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    addFaq,
    deleteFaq,
    addMediaAsset,
    exportJsonBackup,
    importJsonBackup,
    resetToDefaults,
  } = useCms();

  // Active tab state
  const [activeTab, setActiveTab] = useState<
    'overview' | 'branding' | 'hero' | 'services' | 'portfolio' | 'faqs' | 'media' | 'backup'
  >('overview');

  // Live preview toggle
  const [showLivePreview, setShowLivePreview] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for adding items
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);

  // New Service Form
  const [newService, setNewService] = useState<Partial<ServiceItem>>({
    id: 'printing',
    title: '',
    badge: 'High Quality',
    image: '/images/optimized/service-printing.webp',
    description: '',
    features: ['High Resolution Print', 'Fast Turnaround'],
    materials: ['Artboard', 'Vinyl'],
    turnaround: '24-48 Hours',
    popularItems: ['Item 1', 'Item 2'],
  });

  // New Portfolio Item Form
  const [newPortfolio, setNewPortfolio] = useState<Partial<PortfolioItem>>({
    id: `port-${Date.now()}`,
    title: '',
    category: 'printing',
    image: '/images/optimized/port-printing.webp',
    description: '',
    specs: {
      material: 'Standard Substrate',
      finish: 'Matte Lamination',
      turnaround: '2-3 Days',
      minOrder: '100 Units',
    },
    tags: ['Custom Print', 'Dubai'],
  });

  // New FAQ Form
  const [newFaq, setNewFaq] = useState<{
    questionEn: string;
    answerEn: string;
    questionAr: string;
    answerAr: string;
  }>({
    questionEn: '',
    answerEn: '',
    questionAr: '',
    answerAr: '',
  });

  // New Media URL Input
  const [customMediaUrl, setCustomMediaUrl] = useState<string>('');

  // JSON Import Input
  const [jsonInput, setJsonInput] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim().toLowerCase() === 'admin' && passwordInput === 'aladeel2026') {
      setIsAuthenticated(true);
      setLoginError('');
      showToast('Welcome back, Administrator!');
    } else {
      setLoginError(
        lang === 'ar'
          ? 'اسم المستخدم أو كلمة المرور غير صحيحة (التجربة: admin / aladeel2026)'
          : 'Invalid credentials. Username: admin, Password: aladeel2026'
      );
    }
  };

  // Login Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#081C15] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-amber-500/20 text-left rtl:text-right">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#0d2b1f] text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-amber-500/30">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold font-serif text-gray-900">
              Al Adeel Advanced CMS
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Secure Control Center • Content & Media Management System
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Admin Username
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="e.g. admin"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Security Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#b87e2a] hover:bg-[#a36e22] text-white font-bold text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Advanced CMS</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-amber-800 hover:text-amber-900 font-semibold cursor-pointer"
            >
              ← Return to Main Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#081C15] text-amber-300 px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/40 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top CMS Header */}
      <header className="bg-[#081C15] text-white border-b border-amber-500/20 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0d2b1f] border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-serif text-lg">
            A
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold font-serif leading-tight">
              Al Adeel Advanced CMS
            </h1>
            <p className="text-[11px] text-amber-400/80 font-medium hidden sm:block">
              Full Site Dynamic Content & Media Control Panel
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Preview Toggle */}
          <button
            onClick={() => setShowLivePreview(!showLivePreview)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              showLivePreview
                ? 'bg-amber-500 text-gray-900 shadow-lg'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {showLivePreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {showLivePreview ? 'Close Live Preview' : 'Split Live Preview'}
            </span>
          </button>

          {/* Return to Site */}
          <button
            onClick={() => onNavigate('home')}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">View Live Site</span>
          </button>

          {/* Logout */}
          <button
            onClick={() => setIsAuthenticated(false)}
            className="p-2 rounded-xl bg-red-900/40 hover:bg-red-800/60 text-red-200 transition-colors cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main CMS Layout (Sidebar + Work Area) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-[#081C15] text-gray-300 border-r border-amber-900/20 p-3 sm:p-4 space-y-1.5 flex-shrink-0">
          <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest px-3 py-2 hidden md:block">
            CMS Navigation
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#b87e2a] text-white shadow-md'
                : 'hover:bg-white/5 text-gray-300'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-amber-400" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('branding')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'branding'
                ? 'bg-[#b87e2a] text-white shadow-md'
                : 'hover:bg-white/5 text-gray-300'
            }`}
          >
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Branding & Contacts</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'hero'
                ? 'bg-[#b87e2a] text-white shadow-md'
                : 'hover:bg-white/5 text-gray-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Hero Banner CMS</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-[#b87e2a] text-white shadow-md'
                : 'hover:bg-white/5 text-gray-300'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Services Catalog</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'portfolio'
                ? 'bg-[#b87e2a] text-white shadow-md'
                : 'hover:bg-white/5 text-gray-300'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>Portfolio Showcase</span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'faqs'
                ? 'bg-[#b87e2a] text-white shadow-md'
                : 'hover:bg-white/5 text-gray-300'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>FAQs & Why Choose</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'media'
                ? 'bg-[#b87e2a] text-white shadow-md'
                : 'hover:bg-white/5 text-gray-300'
            }`}
          >
            <FolderDown className="w-4 h-4 text-amber-400" />
            <span>Media Asset Library</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'backup'
                ? 'bg-[#b87e2a] text-white shadow-md'
                : 'hover:bg-white/5 text-gray-300'
            }`}
          >
            <FileJson className="w-4 h-4 text-amber-400" />
            <span>Backup & Export</span>
          </button>
        </aside>

        {/* Content Work Area */}
        <main
          className={`flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-50 transition-all ${
            showLivePreview ? 'w-full md:w-1/2' : 'w-full'
          }`}
        >
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-serif text-gray-900">
                  CMS Control Overview
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Real-time status of Al Adeel Advertising dynamic website content
                </p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
                  <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">
                    Active Services
                  </span>
                  <span className="text-2xl font-bold text-gray-900 font-mono">
                    {content.services.length}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
                  <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">
                    Portfolio Projects
                  </span>
                  <span className="text-2xl font-bold text-gray-900 font-mono">
                    {content.portfolio.length}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
                  <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">
                    Media Library Assets
                  </span>
                  <span className="text-2xl font-bold text-gray-900 font-mono">
                    {content.mediaAssets.length}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
                  <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">
                    Active FAQs
                  </span>
                  <span className="text-2xl font-bold text-gray-900 font-mono">
                    {content.faqs.length}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#081C15] text-white p-6 rounded-3xl border border-amber-500/20 shadow-xl space-y-4">
                <h3 className="text-lg font-bold font-serif text-amber-400">
                  Quick Management Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setActiveTab('services')}
                    className="p-4 rounded-xl bg-white/10 hover:bg-white/20 text-left text-xs font-semibold transition-all border border-amber-500/20 cursor-pointer"
                  >
                    🛠️ Edit Services & Pricing Specs →
                  </button>
                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className="p-4 rounded-xl bg-white/10 hover:bg-white/20 text-left text-xs font-semibold transition-all border border-amber-500/20 cursor-pointer"
                  >
                    🖼️ Add/Update Portfolio Projects →
                  </button>
                  <button
                    onClick={() => setActiveTab('branding')}
                    className="p-4 rounded-xl bg-white/10 hover:bg-white/20 text-left text-xs font-semibold transition-all border border-amber-500/20 cursor-pointer"
                  >
                    📞 Update Phone, WhatsApp & Address →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* BRANDING & CONTACTS TAB */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-serif text-gray-900">
                  Site Identity & Contact Information
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Updates instantly across Navbar, Footer, Contact Page, and Modals
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Brand Name (English)
                    </label>
                    <input
                      type="text"
                      value={content.branding.brandNameEn}
                      onChange={(e) => updateBranding({ brandNameEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Brand Name (Arabic)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={content.branding.brandNameAr}
                      onChange={(e) => updateBranding({ brandNameAr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Tagline (English)
                    </label>
                    <input
                      type="text"
                      value={content.branding.taglineEn}
                      onChange={(e) => updateBranding({ taglineEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Tagline (Arabic)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={content.branding.taglineAr}
                      onChange={(e) => updateBranding({ taglineAr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Primary Phone
                    </label>
                    <input
                      type="text"
                      value={content.branding.phonePrimary}
                      onChange={(e) => updateBranding({ phonePrimary: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Secondary Phone
                    </label>
                    <input
                      type="text"
                      value={content.branding.phoneSecondary}
                      onChange={(e) => updateBranding({ phoneSecondary: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={content.branding.whatsappNumber}
                      onChange={(e) => updateBranding({ whatsappNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      value={content.branding.email}
                      onChange={(e) => updateBranding({ email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Google Maps URL
                    </label>
                    <input
                      type="text"
                      value={content.branding.googleMapsUrl}
                      onChange={(e) => updateBranding({ googleMapsUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Office Address (English)
                    </label>
                    <textarea
                      rows={2}
                      value={content.branding.addressEn}
                      onChange={(e) => updateBranding({ addressEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Office Address (Arabic)
                    </label>
                    <textarea
                      rows={2}
                      dir="rtl"
                      value={content.branding.addressAr}
                      onChange={(e) => updateBranding({ addressAr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => showToast('Branding and Contact settings saved successfully!')}
                    className="px-6 py-2.5 rounded-xl bg-[#b87e2a] hover:bg-[#a36e22] text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Branding Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* HERO BANNER CMS TAB */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-serif text-gray-900">
                  Hero Banner Content Manager
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Customize the main landing headline, badges, and background media
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Eyebrow Kicker (English)
                    </label>
                    <input
                      type="text"
                      value={content.hero.eyebrowEn}
                      onChange={(e) => updateHero({ eyebrowEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Eyebrow Kicker (Arabic)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={content.hero.eyebrowAr}
                      onChange={(e) => updateHero({ eyebrowAr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Headline Part 1 (English)
                    </label>
                    <input
                      type="text"
                      value={content.hero.title1En}
                      onChange={(e) => updateHero({ title1En: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Headline Part 1 (Arabic)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={content.hero.title1Ar}
                      onChange={(e) => updateHero({ title1Ar: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Headline Subtitle (English)
                    </label>
                    <textarea
                      rows={3}
                      value={content.hero.subtitleEn}
                      onChange={(e) => updateHero({ subtitleEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Headline Subtitle (Arabic)
                    </label>
                    <textarea
                      rows={3}
                      dir="rtl"
                      value={content.hero.subtitleAr}
                      onChange={(e) => updateHero({ subtitleAr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Hero Background Image URL
                  </label>
                  <input
                    type="text"
                    value={content.hero.heroBgImage}
                    onChange={(e) => updateHero({ heroBgImage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => showToast('Hero Banner content updated!')}
                    className="px-6 py-2.5 rounded-xl bg-[#b87e2a] hover:bg-[#a36e22] text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Hero Content</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SERVICES CATALOG CMS TAB */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-serif text-gray-900">
                    Services Catalog Manager
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Add, edit, or customize core business capabilities
                  </p>
                </div>
              </div>

              {/* Service Cards List */}
              <div className="space-y-4">
                {content.services.map((srv) => (
                  <div
                    key={srv.id}
                    className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={srv.image}
                          alt={srv.title}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                        />
                        <div>
                          <h3 className="text-base font-bold text-gray-900">{srv.title}</h3>
                          <span className="text-xs text-amber-700 font-semibold">{srv.badge}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingServiceId(editingServiceId === srv.id ? null : srv.id)}
                          className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 hover:bg-amber-100 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>{editingServiceId === srv.id ? 'Close' : 'Edit'}</span>
                        </button>
                        <button
                          onClick={() => {
                            deleteService(srv.id);
                            showToast(`Service "${srv.title}" deleted.`);
                          }}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Inline Editor for Service */}
                    {editingServiceId === srv.id && (
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4 text-xs animate-in fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-bold text-gray-700 mb-1">Title</label>
                            <input
                              type="text"
                              value={srv.title}
                              onChange={(e) => updateService(srv.id, { title: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-gray-700 mb-1">Badge</label>
                            <input
                              type="text"
                              value={srv.badge}
                              onChange={(e) => updateService(srv.id, { badge: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-gray-700 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={srv.description}
                            onChange={(e) => updateService(srv.id, { description: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-bold text-gray-700 mb-1">Turnaround Time</label>
                            <input
                              type="text"
                              value={srv.turnaround}
                              onChange={(e) => updateService(srv.id, { turnaround: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-gray-700 mb-1">Image URL</label>
                            <input
                              type="text"
                              value={srv.image}
                              onChange={(e) => updateService(srv.id, { image: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              setEditingServiceId(null);
                              showToast(`Service "${srv.title}" saved!`);
                            }}
                            className="px-4 py-2 rounded-lg bg-[#b87e2a] text-white font-bold cursor-pointer"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PORTFOLIO SHOWCASE CMS TAB */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-serif text-gray-900">
                  Portfolio Showcase Manager
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Manage showcased projects, materials, finishes, and specs
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/3] bg-gray-100 relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-between border-t border-gray-100">
                      <span className="text-[11px] font-semibold text-gray-500">
                        {item.specs.material}
                      </span>
                      <button
                        onClick={() => {
                          deletePortfolioItem(item.id);
                          showToast(`Portfolio item "${item.title}" removed.`);
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Portfolio Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQS & WHY CHOOSE TAB */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-serif text-gray-900">
                  FAQs & Client Trust Features
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Manage collapsible FAQ pairs for English and Arabic readers
                </p>
              </div>

              <div className="space-y-4">
                {content.faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">{faq.questionEn}</h3>
                        <p className="text-xs text-gray-600 mt-1">{faq.answerEn}</p>
                      </div>
                      <button
                        onClick={() => {
                          deleteFaq(faq.id);
                          showToast('FAQ deleted.');
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MEDIA ASSET LIBRARY TAB */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-serif text-gray-900">
                  Media Asset Library
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Browse and copy image URLs for use across services and portfolio items
                </p>
              </div>

              {/* Add Custom Media URL */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 flex gap-2">
                <input
                  type="text"
                  placeholder="Paste external image URL to add to library..."
                  value={customMediaUrl}
                  onChange={(e) => setCustomMediaUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                />
                <button
                  onClick={() => {
                    if (customMediaUrl) {
                      addMediaAsset(customMediaUrl);
                      setCustomMediaUrl('');
                      showToast('Media asset added to library!');
                    }
                  }}
                  className="px-4 py-2 bg-[#b87e2a] hover:bg-[#a36e22] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Add Media
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {content.mediaAssets.map((asset, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs group relative"
                  >
                    <div className="aspect-[4/3] bg-gray-100">
                      <img src={asset} alt={`Asset ${idx}`} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2.5 flex items-center justify-between bg-white border-t border-gray-100">
                      <span className="text-[10px] text-gray-500 truncate max-w-[120px]">
                        {asset.split('/').pop()}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(asset);
                          showToast('Image URL copied to clipboard!');
                        }}
                        className="p-1.5 text-amber-700 hover:bg-amber-50 rounded-lg cursor-pointer"
                        title="Copy Image URL"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BACKUP & EXPORT TAB */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-serif text-gray-900">
                  Backup, Export & Factory Reset
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Download full JSON backups or restore previous CMS content states
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Export JSON */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <FileJson className="w-5 h-5 text-amber-600" />
                    <span>Export Content Backup</span>
                  </h3>
                  <p className="text-xs text-gray-600">
                    Download a complete JSON snapshot of all your site branding, services, and portfolio data.
                  </p>
                  <button
                    onClick={() => {
                      const json = exportJsonBackup();
                      const blob = new Blob([json], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `aladeel-cms-backup-${Date.now()}.json`;
                      a.click();
                      showToast('JSON Backup downloaded!');
                    }}
                    className="w-full py-3 rounded-xl bg-[#081C15] hover:bg-[#0d2b1f] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FolderDown className="w-4 h-4 text-amber-400" />
                    <span>Download JSON File</span>
                  </button>
                </div>

                {/* Reset to Factory Defaults */}
                <div className="bg-white p-6 rounded-2xl border border-red-200 space-y-4">
                  <h3 className="text-base font-bold text-red-900 flex items-center gap-2">
                    <RotateCcw className="w-5 h-5 text-red-600" />
                    <span>Factory Reset All Content</span>
                  </h3>
                  <p className="text-xs text-gray-600">
                    Revert all changes back to pristine Al Adeel production default content.
                  </p>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to reset all CMS content to factory defaults? This action cannot be undone.'
                        )
                      ) {
                        resetToDefaults();
                        showToast('Reset all CMS content to factory defaults.');
                      }
                    }}
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All to Factory Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Live Split-Screen Preview Frame */}
        {showLivePreview && (
          <aside className="w-full md:w-1/2 border-l border-gray-300 bg-gray-900 flex flex-col h-[600px] md:h-auto">
            <div className="bg-[#081C15] text-white p-3 px-4 text-xs font-bold flex items-center justify-between border-b border-amber-500/20">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Interactive Website Preview</span>
              </span>
              <button
                onClick={() => setShowLivePreview(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <iframe
              src={window.location.origin}
              className="w-full flex-1 bg-white border-0"
              title="Live Site Preview"
            />
          </aside>
        )}
      </div>
    </div>
  );
};

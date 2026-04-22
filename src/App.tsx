/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  FileText, 
  Clock as ClockIcon, 
  MessageCircle, 
  Image as ImageIcon, 
  ShoppingBag, 
  Music2, 
  Folder, 
  Settings, 
  Phone, 
  Camera, 
  Tv, 
  MessageSquare, 
  BookOpen, 
  ShieldAlert, 
  Globe, 
  Calendar,
  Search,
  ChevronRight,
  ArrowLeft,
  Share,
  Plus,
  Edit2,
  RefreshCw,
  Heart,
  Chrome
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  folder: string;
  count?: number;
}

// --- Icons Components for Authenticity ---

const iOSIcon = ({ children, className = "", bgColor }: { children: React.ReactNode, className?: string, bgColor: string }) => (
  <div className={`w-[60px] h-[60px] rounded-[18px] flex items-center justify-center shadow-sm overflow-hidden relative ${className}`} style={{ background: bgColor }}>
    {children}
  </div>
);

const SafariIcon = () => (
  <iOSIcon bgColor="#fff">
    <div className="w-[48px] h-[48px] rounded-full bg-[#0A84FF] relative flex items-center justify-center">
      <div className="absolute inset-0 border-[2px] border-white/40 rounded-full scale-[0.85] border-dashed" />
      <div className="w-1.5 h-9 bg-gradient-to-b from-[#FF3B30] 50% to-white 50% rotate-45 shadow-sm" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
    </div>
  </iOSIcon>
);

const NotesIcon = () => (
  <iOSIcon bgColor="#fff">
    <div className="absolute top-0 w-full h-[16px] bg-[#FFCC00]" />
    <div className="mt-5 w-9 h-[2px] bg-slate-200 shadow-[0_8px_0_#e2e8f0,0_16px_0_#e2e8f0]" />
  </iOSIcon>
);

const PhotosIcon = () => (
  <iOSIcon bgColor="#fff">
    <div className="relative w-10 h-10">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <div 
          key={i} 
          className="absolute top-1/2 left-1/2 w-4 h-6 -translate-x-1/2 -translate-y-1/2 origin-bottom rounded-full opacity-80"
          style={{ 
            transform: `translate(-50%, -100%) rotate(${deg}deg)`,
            backgroundColor: ['#FFCC00', '#FF9500', '#FF3B30', '#AF52DE', '#5856D6', '#007AFF', '#5AC8FA', '#4CD964'][i]
          }}
        />
      ))}
    </div>
  </iOSIcon>
);

const ClockLogo = () => (
  <iOSIcon bgColor="#fff" className="border border-slate-100">
    <div className="w-11 h-11 border-[1.5px] border-slate-800 rounded-full relative">
      <div className="absolute top-1/2 left-1/2 w-0.5 h-3 bg-slate-900 origin-bottom -translate-x-1/2 -translate-y-full rotate-[45deg]" />
      <div className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-slate-900 origin-bottom -translate-x-1/2 -translate-y-full rotate-[180deg]" />
      <div className="absolute top-1/2 left-1/2 w-[0.5px] h-5 bg-red-500 origin-bottom -translate-x-1/2 -translate-y-full rotate-[270deg]" />
      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white border border-slate-900 rounded-full -translate-x-1/2 -translate-y-1/2" />
    </div>
  </iOSIcon>
);

// --- Main App Component ---

export default function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('zh-CN', options);
  };

  const notes: Note[] = [
    { id: '1', title: '个人随笔', content: '关于 Liquid Glass 的实现，它不应该显得 clunky。维持15%-30%的透明度，配以极其精细的亮白色高光边框，才能呈现出真正 delicate 和 luxury 的质感。\n\n底色采用 #f8f0f3 这样的低饱和莫兰迪色，能最大化体现高级感。', date: '2026年1月14日 19:37', folder: '我的 iPhone', count: 5 },
    { id: '2', title: '代码片段', content: '这里存放了一些原生实现的 JS 片段，无任何外部库依赖。', date: '2026年1月14日 19:30', folder: '我的 iPhone', count: 2 },
    { id: '3', title: '待办清单', content: '1. 完成查手机界面的锁屏动画。\n2. 增加原生手势阻尼逻辑。\n3. 打通应用内部导航。', date: '2026年1月14日 19:00', folder: '我的 iPhone', count: 3 },
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-[#1a1a1a] overflow-hidden font-sans select-none">
      {/* Device Frame */}
      <div className="relative w-[390px] h-[844px] bg-gradient-to-br from-[#71b1ff] via-[#d49eff] to-[#ff9e9e] rounded-[55px] shadow-[0_0_0_12px_#000,0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden scale-[0.85] md:scale-100">
        
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-[20px] z-[1000]" />

        {/* Status Bar */}
        <div className={`absolute top-4 w-full px-7 flex justify-between items-center text-sm font-semibold z-[1001] tracking-tight transition-colors duration-300 ${activeApp || (!isLocked && (currentPage === 0 || activeApp)) ? 'text-black' : 'text-white'}`}>
          <div className="flex-1 drop-shadow-sm">{formatTime(currentTime)}</div>
          <div className="flex items-center gap-1.5 flex-1 justify-end drop-shadow-sm">
            <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
              <path d="M1 10h2V7H1v3zm4 0h2V5H5v5zm4 0h2V2H9v8zm4 0h2V0h-2v10z" />
            </svg>
            <div className={`w-6 h-3 border rounded-[4px] relative p-[1px] ${activeApp || (!isLocked) ? 'border-black/40' : 'border-white/40'}`}>
              <div className="absolute -right-[4px] top-1 w-1 h-1 bg-current opacity-60 rounded-r-sm" />
              <div className="w-[30%] h-full bg-current rounded-[2px]" />
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div 
          className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 rounded-full z-[1002] cursor-pointer transition-colors ${activeApp || (!isLocked) ? 'bg-black' : 'bg-white'}`}
          onClick={() => {
            if (activeApp) setActiveApp(null);
            else if (isLocked) setIsLocked(false);
          }}
        />

        {/* Lock Screen */}
        <AnimatePresence>
          {isLocked && (
            <motion.div 
              initial={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 z-50 flex flex-col items-center pt-24 bg-gradient-to-b from-[#0A244A] via-[#1A4275] to-[#2B5C9D]"
            >
              <div className="text-white/90 text-lg font-medium mb-1 drop-shadow-md">{formatDate(currentTime)}</div>
              <div className="text-white text-[96px] font-semibold tracking-tighter leading-none mb-10 drop-shadow-lg">{formatTime(currentTime)}</div>
              
              <div className="flex gap-4">
                <div className="bg-white/20 backdrop-blur-3xl border border-white/30 rounded-full px-4 py-2 flex items-center gap-2 text-white text-xs font-bold">
                  <div className="w-5 h-2.5 border border-white/50 rounded-[3px] relative p-[0.5px]">
                    <div className="w-1/4 h-full bg-white rounded-[1.5px]" />
                  </div>
                  26%
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-3xl border border-white/30 rounded-full flex items-center justify-center">
                  <Heart className="text-red-500 fill-red-500 w-5 h-5" />
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-3xl border border-white/30 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-4 border-white/20 border-t-blue-500 rotate-45" />
                </div>
              </div>

              <div className="absolute bottom-20 text-white/70 text-sm animate-pulse">向上轻扫以解锁</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Home Screen */}
        <div className="absolute inset-0 py-16 px-6">
          <div className="flex overflow-hidden w-full h-full relative">
            <motion.div 
              animate={{ x: `-${currentPage * 100}%` }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="flex w-full h-full"
            >
              {/* Page 1 */}
              <div className="min-w-full grid grid-cols-4 grid-rows-6 gap-x-3 gap-y-7 content-start pt-4">
                {/* Time/Weather Widget */}
                <div className="col-span-4 row-span-2 flex flex-col items-center justify-center mb-6">
                  <div className="text-[84px] font-medium text-white tracking-tighter drop-shadow-2xl">{formatTime(currentTime)}</div>
                  <div className="flex gap-4 text-white/90 text-sm tracking-widest font-medium">
                    <span>2026-01-14</span>
                    <span>周三</span>
                    <span>1°C</span>
                  </div>
                </div>

                {/* Photo Widget */}
                <div className="col-span-2 row-span-2 rounded-[32px] bg-white/40 backdrop-blur-[25px] border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-6 flex flex-col justify-end overflow-hidden relative">
                   <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400)' }} />
                   <div className="relative text-[10px] text-zinc-800 font-bold uppercase tracking-wider">2026-01-14</div>
                </div>

                <AppIcon logo={<NotesIcon />} name="备忘录" onClick={() => setActiveApp('notes')} />
                <AppIcon logo={<ClockLogo />} name="时钟" />
                <AppIcon logo={<iOSIcon bgColor="linear-gradient(180deg, #3EEA61, #34C759)"><MessageCircle className="text-white w-9 h-9 fill-white" /></iOSIcon>} name="信息" />
                <AppIcon logo={<iOSIcon bgColor="linear-gradient(180deg, #3EEA61, #34C759)"><Tv className="text-white w-9 h-9 fill-white" /></iOSIcon>} name="视频" />
                <AppIcon logo={<iOSIcon bgColor="linear-gradient(180deg, #FF9500, #FF3B30)"><MessageSquare className="text-white w-8 h-8 fill-white" /></iOSIcon>} name="论坛" />
                <AppIcon logo={<SafariIcon />} name="Safari" onClick={() => setActiveApp('safari')} />

                {/* Simple White Widget */}
                <div className="col-span-2 row-span-2 rounded-[32px] bg-white/40 backdrop-blur-[25px] border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col relative p-6">
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="text-[14px] font-bold text-zinc-500 uppercase tracking-tight">Today</div>
                    <div className="text-4xl font-light text-zinc-800">14</div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">
                    <span>JAN</span>
                    <span className="italic opacity-50">WED</span>
                  </div>
                </div>

                <AppIcon logo={<iOSIcon bgColor="#fff" className="flex-col !pt-1"><div className="text-[11px] text-red-500 font-bold">周三</div><div className="text-3xl font-light text-black">14</div></iOSIcon>} name="日历" />
                <AppIcon logo={<PhotosIcon />} name="相册" />
              </div>

              {/* Page 2 */}
              <div className="min-w-full grid grid-cols-4 grid-rows-6 gap-x-3 gap-y-7 content-start pt-4">
                <AppIcon logo={<iOSIcon bgColor="linear-gradient(180deg, #FFCC00, #FF9500)"><ShoppingBag className="text-white w-9 h-9" /></iOSIcon>} name="购物" />
                <AppIcon logo={<iOSIcon bgColor="linear-gradient(180deg, #FF9500, #FF3B30)"><BookOpen className="text-white w-9 h-9" /></iOSIcon>} name="阅读" />
                <AppIcon logo={<iOSIcon bgColor="linear-gradient(180deg, #5856D6, #322CA1)"><ShieldAlert className="text-white w-9 h-9" /></iOSIcon>} name="查手机" />
                <AppIcon logo={<iOSIcon bgColor="linear-gradient(180deg, #1c1c1e, #000)"><Globe className="text-white w-9 h-9" /></iOSIcon>} name="暗网" />
                <AppIcon logo={<iOSIcon bgColor="linear-gradient(180deg, #FF2D55, #E11A3E)"><Music2 className="text-white w-9 h-9 fill-white" /></iOSIcon>} name="音乐" />
                <AppIcon logo={<iOSIcon bgColor="#1a1a1a"><div className="bg-orange-500 text-black font-black text-[13px] px-1.5 py-0.5 rounded-[4px] leading-none">Hub</div></iOSIcon>} name="Porn" />
                <AppIcon logo={<iOSIcon bgColor="#fff"><Folder className="text-[#0A84FF] w-[40px] h-[28px] bg-[#0A84FF] rounded-[4px] relative before:content-[''] before:absolute before:-top-[5px] before:left-0 before:w-4 before:h-2 before:bg-[#0A84FF] before:rounded-t-[4px]" /></iOSIcon>} name="文件" />
                <AppIcon logo={<iOSIcon bgColor="#000"><div className="w-8 h-8 rounded-full border-[3.5px] border-white relative transition-all active:scale-95"><div className="absolute -right-2 top-2 w-1.5 h-3 bg-slate-500 rounded-sm" /></div></iOSIcon>} name="Watch" />
              </div>
            </motion.div>
          </div>

          {/* Page Indicators */}
          <div className="absolute bottom-36 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            <div className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${currentPage === 0 ? 'bg-white' : 'bg-white/40'}`} onClick={() => setCurrentPage(0)} />
            <div className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${currentPage === 1 ? 'bg-white' : 'bg-white/40'}`} onClick={() => setCurrentPage(1)} />
          </div>

          {/* Dock */}
          <div className="absolute bottom-5 left-4 right-4 h-[90px] bg-white/35 backdrop-blur-[30px] rounded-[40px] border border-white/40 flex items-center justify-around px-2 shadow-[0_15px_35px_rgba(0,0,0,0.15)]">
             <div className="w-[60px] h-[60px] rounded-[14px] bg-gradient-to-b from-[#3EEA61] to-[#34C759] flex items-center justify-center shadow-md active:brightness-75 transition-all">
               <Phone className="text-white w-9 h-9 fill-white" />
             </div>
             <div className="w-[60px] h-[60px] rounded-[14px] bg-[#07C160] flex items-center justify-center shadow-md active:brightness-75 transition-all overflow-hidden p-2">
                <svg viewBox="0 0 1024 1024" width="42" height="42" fill="white">
                  <path d="M682.6 426.6c0-117.3-115.2-213.3-256-213.3S170.6 309.3 170.6 426.6c0 64 34.1 123.7 93.8 162.1l-25.6 76.8 89.6-46.9c34.1 12.8 68.2 17.1 102.4 17.1 140.8 0 256-93.9 256-213.3zm213.4 213.4c0-93.9-93.9-170.7-204.8-170.7s-204.8 76.8-204.8 170.7 93.9 170.7 204.8 170.7c25.6 0 51.2-4.3 81.1-12.8l72.5 38.4-21.3-64c46.9-34.1 72.5-81.1 72.5-132.3z" />
                </svg>
             </div>
             <div className="w-[60px] h-[60px] rounded-[14px] bg-gradient-to-b from-[#BF5AF2] to-[#5E5CE6] flex items-center justify-center shadow-md active:brightness-75 transition-all">
                <RefreshCw className="text-white w-9 h-9" />
             </div>
             <div className="w-[60px] h-[60px] rounded-[14px] bg-[#8E8E93] flex items-center justify-center shadow-md active:brightness-75 transition-all">
                <Settings className="text-white w-9 h-9 fill-white" />
             </div>
          </div>
        </div>

        {/* --- Apps --- */}

        {/* Safari */}
        <AnimatePresence>
          {activeApp === 'safari' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 bg-[#F5F5F7] z-[100] flex flex-col"
            >
              <div className="flex-1 overflow-auto pt-20 pb-28 px-6 text-center">
                <div className="text-5xl my-6"></div>
                <h1 className="text-3xl font-bold tracking-tight mb-8">Store. The best way to buy the products you love.</h1>
                
                <div className="bg-black rounded-3xl p-8 mb-6 text-white text-left">
                  <div className="text-2xl font-bold mb-2">iPhone 15 Pro</div>
                  <div className="opacity-70">Titanium. So strong. So light. So Pro.</div>
                </div>
                
                <div className="bg-white rounded-3xl p-8 mb-6 text-black text-left shadow-sm border border-slate-200">
                  <div className="text-2xl font-bold mb-2">MacBook Air</div>
                  <div className="opacity-70 text-slate-600">Lean. Mean. Apple machine.</div>
                </div>
              </div>

              {/* Safari Bottom Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#F9F9F9]/90 backdrop-blur-3xl border-t border-black/5 flex flex-col items-center">
                <div className="w-[92%] -mt-6 bg-white rounded-2xl shadow-xl border border-black/5 h-12 flex items-center justify-between px-5 font-medium">
                  <span className="text-lg">Aa</span>
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-slate-400" />
                    <span className="text-lg">apple.com</span>
                  </div>
                  <RefreshCw className="w-4 h-4 text-slate-400" />
                </div>
                <div className="flex justify-between w-full px-8 py-5 text-[#007AFF]">
                  <ArrowLeft className="w-6 h-6 stroke-[1.5px]" />
                  <ArrowLeft className="w-6 h-6 rotate-180 opacity-20 stroke-[1.5px]" />
                  <Share className="w-6 h-6 stroke-[1.5px]" />
                  <Plus className="w-6 h-6 stroke-[1.5px]" />
                  <LayoutIcon />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes */}
        <AnimatePresence>
          {activeApp === 'notes' && (
            <motion.div 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="absolute inset-0 bg-[#F2F2F7] z-[100] flex flex-col pt-16"
            >
              <div className="px-6 pb-4">
                <div className="flex justify-between items-center mb-4">
                   <h1 className="text-[34px] font-bold tracking-tight">备忘录</h1>
                   <Edit2 className="text-[#FFCC00] w-6 h-6" />
                </div>
                <div className="bg-slate-200/50 rounded-xl px-3 py-2 flex items-center gap-2 mb-6">
                   <Search className="w-4 h-4 text-slate-500" />
                   <input className="bg-transparent border-none outline-none text-lg placeholder:text-slate-500 flex-1" placeholder="搜索备忘录" />
                </div>
              </div>
              
              <div className="flex-1 overflow-auto px-6">
                <div className="text-[13px] font-semibold text-slate-500 uppercase ml-4 mb-2 tracking-tight">iCloud</div>
                <div className="bg-white rounded-xl overflow-hidden divide-y divide-slate-100 shadow-sm border border-slate-50">
                   <NoteListItem icon={<Folder className="text-[#FFCC00] fill-[#FFCC00] w-6 h-6" />} name="备忘录" count={12} />
                   <NoteListItem icon={<Folder className="text-[#FFCC00] fill-[#FFCC00] w-6 h-6" />} name="最近删除" count={0} />
                </div>

                <div className="text-[13px] font-semibold text-slate-500 uppercase ml-4 mb-2 mt-8 tracking-tight">我的 iPhone</div>
                <div className="bg-white rounded-xl overflow-hidden divide-y divide-slate-100 shadow-sm border border-slate-50 mb-20">
                   {notes.map(note => (
                     <div key={note.id} className="flex items-center px-4 py-3 active:bg-slate-100 transition-colors" onClick={() => setSelectedNote(note)}>
                        <div className="mr-3"><Folder className="text-[#FFCC00] fill-[#FFCC00] w-6 h-6" /></div>
                        <div className="flex-1 text-lg font-normal">{note.title}</div>
                        <div className="text-slate-400 flex items-center gap-1 font-normal text-lg">
                           {note.count}
                           <ChevronRight className="w-5 h-5 opacity-30 stroke-[2px]" />
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              <div className="h-20 bg-[#F9F9F9] border-t border-black/5 flex justify-between px-8 pt-4">
                 <div className="text-[#FFCC00]"><Plus className="w-7 h-7 stroke-[1.5px]" /></div>
                 <div className="text-[#FFCC00]"><Edit2 className="w-7 h-7 stroke-[1.5px]" /></div>
              </div>

              {/* Note Detail Sub-screen */}
              <AnimatePresence>
                {selectedNote && (
                  <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    className="absolute inset-0 bg-white z-[110] flex flex-col"
                  >
                    <div className="pt-16 pb-3 px-4 border-b border-slate-50 flex items-center">
                       <button className="text-[#FFCC00] flex items-center text-lg active:opacity-40 transition-opacity font-medium" onClick={() => setSelectedNote(null)}>
                          <ChevronRight className="w-8 h-8 rotate-180 stroke-[2px]" />
                          <span>备忘录</span>
                       </button>
                    </div>
                    <div className="flex-1 p-6 overflow-auto outline-none" contentEditable>
                       <div className="text-center text-slate-400 text-xs font-semibold mb-8 tracking-wide uppercase">{selectedNote.date}</div>
                       <div className="text-lg leading-relaxed whitespace-pre-wrap text-slate-900">{selectedNote.content}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// --- Subcomponents ---

function AppIcon({ logo, name, onClick }: { logo: React.ReactNode, name: string, onClick?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={onClick}>
      <div className="transition-all group-active:scale-90 group-active:brightness-75 duration-200">
        {logo}
      </div>
      <span className="text-white text-[13px] font-normal tracking-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">{name}</span>
    </div>
  );
}

function NoteListItem({ icon, name, count }: { icon: React.ReactNode, name: string, count: number }) {
  return (
    <div className="flex items-center px-4 py-3 active:bg-slate-100 transition-colors">
      <div className="mr-3">{icon}</div>
      <div className="flex-1 text-lg font-normal">{name}</div>
      <div className="text-slate-400 flex items-center gap-1 font-normal text-lg">
        {count}
        <ChevronRight className="w-5 h-5 opacity-30 stroke-[2px]" />
      </div>
    </div>
  );
}

function LayoutIcon() {
  return (
    <div className="w-6 h-6 border-[1.5px] border-current rounded-[4px] relative flex items-center justify-center">
      <div className="w-full h-[1.5px] bg-current absolute top-1/2 -translate-y-1/2 opacity-20" />
      <div className="h-full w-[1.5px] bg-current absolute left-1/2 -translate-x-1/2 opacity-20" />
      <div className="w-2.5 h-2.5 border border-current rounded-sm" />
    </div>
  );
}

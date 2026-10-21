import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Globe, Sun, Moon, Radio, Activity } from 'lucide-react';
import { sound } from '../utils/sound';

export const AnimatedDhakaClock: React.FC = () => {
  const [time, setTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
    millis: '000',
    dayName: '',
    dateFormatted: '',
    isDaytime: true,
  });

  const [activePulse, setActivePulse] = useState(false);

  useEffect(() => {
    let animFrame: number;

    const updateClock = () => {
      const now = new Date();

      // Format in Asia/Dhaka Timezone
      const dhakaTimeStr = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Dhaka',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const parts = dhakaTimeStr.split(':');
      const hours = parts[0] || '00';
      const minutes = parts[1] || '00';
      const seconds = parts[2] || '00';

      const ms = String(now.getMilliseconds()).padStart(3, '0');

      const dayName = now.toLocaleDateString('en-US', {
        timeZone: 'Asia/Dhaka',
        weekday: 'long',
      });

      const dateFormatted = now.toLocaleDateString('en-US', {
        timeZone: 'Asia/Dhaka',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      const hourNum = parseInt(hours, 10);
      const isDaytime = hourNum >= 6 && hourNum < 18;

      setTime({
        hours,
        minutes,
        seconds,
        millis: ms,
        dayName,
        dateFormatted,
        isDaytime,
      });

      animFrame = requestAnimationFrame(updateClock);
    };

    animFrame = requestAnimationFrame(updateClock);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const handleClockClick = () => {
    sound.playClick();
    setActivePulse(true);
    setTimeout(() => setActivePulse(false), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onClick={handleClockClick}
      className={`relative group cursor-pointer select-none rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-[#f5ecde] to-[#eadbc5] border-2 border-[#c8b59b] shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.14)] hover:border-amber-700/50 transition-all duration-300 w-full overflow-hidden ${
        activePulse ? 'scale-[1.01]' : 'scale-100'
      }`}
    >
      {/* Animated Top Horizon Shimmer Beam */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-600/60 to-transparent animate-pulse" />

      {/* Background Radial Glow */}
      <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Top Header Row: Location, Timezone & Live Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#c8b59b]/60 pb-3 mb-4">
        
        {/* City & Zone */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-900/10 border border-amber-800/30 flex items-center justify-center text-amber-900 shadow-sm">
            <Globe className="w-4 h-4 animate-[spin_18s_linear_infinite]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs sm:text-sm font-black text-stone-950 tracking-wider">
                DHAKA, BANGLADESH
              </span>
              <span className="px-2 py-0.5 rounded-md bg-stone-950 text-amber-200 text-[10px] font-mono font-black tracking-widest shadow-sm">
                BST (GMT+6)
              </span>
            </div>
            <div className="text-[10px] font-mono text-stone-600 font-bold tracking-tight">
              LAT: 23.8103° N • LON: 90.4125° E
            </div>
          </div>
        </div>

        {/* Live Day/Night Indicator & Audio Equalizer */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfcfb8] border border-[#c8b59b] text-[11px] font-mono font-bold text-stone-900">
            {time.isDaytime ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-600 animate-[spin_10s_linear_infinite]" />
                <span className="text-amber-900">DAYLIGHT</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-700" />
                <span className="text-indigo-950">NIGHT SKY</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600/15 border border-emerald-600/30 text-emerald-900 text-[10px] font-mono font-bold">
            <Radio className="w-3 h-3 text-emerald-700 animate-pulse" />
            <span>LIVE SYNC</span>
          </div>
        </div>

      </div>

      {/* Main Clock Numerals Chamber (BIG ANIMATED TIME) */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        
        {/* BIG NUMERALS */}
        <div className="flex items-baseline gap-1 sm:gap-2">
          
          {/* Hours Card */}
          <div className="relative px-3 sm:px-4 py-2 sm:py-3 rounded-2xl bg-stone-950 text-amber-200 shadow-md border border-stone-800">
            <span className="font-mono text-4xl sm:text-6xl md:text-7xl font-black tracking-tight drop-shadow-md">
              {time.hours}
            </span>
            <div className="absolute bottom-1 inset-x-0 text-center text-[9px] font-mono text-amber-400/80 uppercase tracking-widest font-bold">
              HRS
            </div>
          </div>

          {/* Animated Pulsing Colon */}
          <span className="font-mono text-3xl sm:text-5xl font-black text-stone-900 animate-pulse px-1">
            :
          </span>

          {/* Minutes Card */}
          <div className="relative px-3 sm:px-4 py-2 sm:py-3 rounded-2xl bg-stone-950 text-amber-200 shadow-md border border-stone-800">
            <span className="font-mono text-4xl sm:text-6xl md:text-7xl font-black tracking-tight drop-shadow-md">
              {time.minutes}
            </span>
            <div className="absolute bottom-1 inset-x-0 text-center text-[9px] font-mono text-amber-400/80 uppercase tracking-widest font-bold">
              MIN
            </div>
          </div>

          {/* Animated Pulsing Colon */}
          <span className="font-mono text-3xl sm:text-5xl font-black text-stone-900 animate-pulse px-1">
            :
          </span>

          {/* Seconds Card (Animated Color Tick) */}
          <div className="relative px-3 sm:px-4 py-2 sm:py-3 rounded-2xl bg-amber-700 text-white shadow-lg border border-amber-600 shadow-amber-700/20">
            <span className="font-mono text-4xl sm:text-6xl md:text-7xl font-black tracking-tight drop-shadow-md">
              {time.seconds}
            </span>
            <div className="absolute bottom-1 inset-x-0 text-center text-[9px] font-mono text-amber-200 uppercase tracking-widest font-bold">
              SEC
            </div>
          </div>

          {/* Milliseconds Ticker (Running Rapidly) */}
          <div className="hidden md:flex flex-col items-start ml-2 pl-2 border-l-2 border-[#c8b59b]">
            <div className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">
              MS
            </div>
            <div className="font-mono text-xl lg:text-2xl font-black text-amber-800">
              .{time.millis}
            </div>
          </div>

        </div>

        {/* Live Date, Day & Telemetry Sidebar */}
        <div className="sm:text-right space-y-1">
          <div className="font-mono text-lg sm:text-xl font-black text-stone-950 flex items-center sm:justify-end gap-2">
            <Clock className="w-5 h-5 text-amber-700 animate-spin" style={{ animationDuration: '60s' }} />
            <span>{time.dayName}</span>
          </div>
          <div className="font-mono text-xs sm:text-sm text-stone-700 font-bold">
            {time.dateFormatted}
          </div>
          <div className="text-[11px] font-mono text-stone-600 flex items-center sm:justify-end gap-1.5 pt-1">
            <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Bangladeshi Standard Timezone • Online 24/7</span>
          </div>
        </div>

      </div>

      {/* Interactive Micro Pill at Bottom */}
      <div className="mt-4 pt-3 border-t border-[#c8b59b]/60 flex items-center justify-between text-[11px] font-mono text-stone-600">
        <span className="flex items-center gap-1.5 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
          <span>Real-Time Animated Telemetry Synchronizer</span>
        </span>
        <span className="text-stone-500 hidden sm:inline">Tap card to trigger audio sync</span>
      </div>

    </motion.div>
  );
};

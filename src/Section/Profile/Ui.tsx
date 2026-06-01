import React from "react";

// ─── card
export const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_#F5F5F8]
      transition-shadow hover:shadow-[0_4px_20px_#EFE9E5]
      ${className}`}
  >
    {children}
  </div>
);

// ─── divider
export const Divider = ({ className = "" }: { className?: string }) => (
  <div className={`h-px bg-slate-100 ${className}`} />
);

// ─── sectionheader
export const SectionHeader = ({
  icon: Icon,
  title,
  iconBg,
  iconColor,
  badge,
}: {
  icon: React.ElementType;
  title: string;
  iconBg: string;
  iconColor: string;
  badge?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2.5">
      <div
        className={`p-1.5 rounded-lg ${iconBg} flex items-center justify-center`}
      >
        <Icon size={17} className={iconColor} />
      </div>
      <span className="font-bold text-[15px] text-slate-900">{title}</span>
    </div>
    {badge}
  </div>
);

// ─── inforow
export const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
    <span className="text-slate-400 text-[13px] font-medium">{label}</span>
    <span className="text-slate-700 text-[13px] font-medium">{value}</span>
  </div>
);

// ─── toggle
export const Toggle = ({ checked }: { checked: boolean }) => (
  <div
    className={`relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0
      ${checked ? "bg-blue-500" : "bg-slate-200"}`}
  >
    <div
      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm
        transition-transform duration-200
        ${checked ? "translate-x-4" : "translate-x-0.5"}`}
    />
  </div>
);

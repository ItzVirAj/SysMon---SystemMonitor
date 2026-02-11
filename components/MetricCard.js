// simple class join helper (since you don’t have @/utils/cn)
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const colorMap = {
  emerald: {
    bg: "bg-emerald-50",
    icon: "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-200",
    text: "text-emerald-600",
    progressBg: "bg-emerald-100",
    progressBar: "bg-gradient-to-r from-emerald-400 to-emerald-500",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-200",
    text: "text-blue-600",
    progressBg: "bg-blue-100",
    progressBar: "bg-gradient-to-r from-blue-400 to-blue-500",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-200",
    text: "text-purple-600",
    progressBg: "bg-purple-100",
    progressBar: "bg-gradient-to-r from-purple-400 to-purple-500",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-200",
    text: "text-amber-600",
    progressBg: "bg-amber-100",
    progressBar: "bg-gradient-to-r from-amber-400 to-amber-500",
  },
  rose: {
    bg: "bg-rose-50",
    icon: "bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose-200",
    text: "text-rose-600",
    progressBg: "bg-rose-100",
    progressBar: "bg-gradient-to-r from-rose-400 to-rose-500",
  },
  cyan: {
    bg: "bg-cyan-50",
    icon: "bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-cyan-200",
    text: "text-cyan-600",
    progressBg: "bg-cyan-100",
    progressBar: "bg-gradient-to-r from-cyan-400 to-cyan-500",
  },
};

export default function MetricCard({
  icon: Icon,
  label,
  value,
  subtitle,
  color = "blue",
  progress,
}) {
  const c = colorMap[color];

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300">
      {/* Decorative corner */}
      <div className={cn("absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-10", c.bg)} />

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </p>
          <p className="mt-1.5 text-2xl font-bold text-slate-900">
            {value || "—"}
          </p>
          {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shadow-md", c.icon)}>
          {Icon && <Icon className="h-5 w-5 text-white" />}
        </div>
      </div>

      {progress !== undefined && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className={cn("text-xs font-semibold", c.text)}>{progress}%</span>
            <span className="text-[10px] text-slate-400">usage</span>
          </div>
          <div className={cn("mt-1 h-1.5 w-full overflow-hidden rounded-full", c.progressBg)}>
            <div
              className={cn("h-full rounded-full transition-all duration-1000", c.progressBar)}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

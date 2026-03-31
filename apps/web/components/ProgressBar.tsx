interface Props {
  progress: number; // 0-100
  color?: string;
  height?: string;
}

export default function ProgressBar({
  progress,
  color = 'bg-yellow-400',
  height = 'h-2',
}: Props) {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
      <div
        className={`${color} ${height} rounded-full transition-all duration-500`}
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

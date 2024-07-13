interface Props {
  value: number;
  className?: string;
}

export default function Total({ value, className = "" }: Props) {
  return (
    <div className={`bg-primary rounded text-white p-4 ${className}`}>
      <span className="text-6xl font-medium">PHP {value.toFixed(2)}</span>
    </div>
  );
}

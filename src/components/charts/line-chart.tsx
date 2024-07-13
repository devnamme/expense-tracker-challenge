interface Props {
  className?: string;
}

export default function LineChart({ className = "" }: Props) {
  return (
    <div className={`bg-gray-light rounded p-4 ${className}`}>Line Chart</div>
  );
}

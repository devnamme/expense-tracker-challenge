interface Props {
  className?: string;
}

export default function DonutChart({ className = "" }: Props) {
  return (
    <div className={`bg-gray-light rounded p-4 ${className}`}>Donut Chart</div>
  );
}

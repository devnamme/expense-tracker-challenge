interface Props {
  className?: string;
}

export default function DonutChart({ className = "" }: Props) {
  return (
    <div className={`bg-gray-light rounded-md p-4 ${className}`}>
      Donut Chart
    </div>
  );
}

interface Props {
  className?: string;
}

export default function LineChart({ className = "" }: Props) {
  return (
    <div className={`bg-gray-light rounded-md p-4 ${className}`}>
      Line Chart
    </div>
  );
}

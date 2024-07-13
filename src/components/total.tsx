interface Props {
  value: number;
  className?: string;
}

export default function Total({ value, className = "" }: Props) {
  return (
    <div className={`bg-primary rounded-md text-white p-4 ${className}`}>
      <p className="text-4xl sm:text-5xl md:text-6xl font-medium text-right">
        PHP{" "}
        {value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
  );
}

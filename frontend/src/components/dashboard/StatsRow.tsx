type Props = {
  label: string;
  value: string | number;
};

export default function StatsRow({
  label,
  value,
}: Props) {
  return (
    <div className="flex justify-between border-b py-3">

      <span className="text-gray-500">

        {label}

      </span>

      <span className="font-semibold">

        {value}

      </span>

    </div>
  );
}
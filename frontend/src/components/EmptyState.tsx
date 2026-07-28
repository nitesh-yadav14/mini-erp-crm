import { Inbox } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
};

export default function EmptyState({
  title,
  subtitle,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">

      <div className="bg-blue-100 rounded-full p-5">

        <Inbox
          size={40}
          className="text-blue-600"
        />

      </div>

      <h2 className="text-xl font-bold mt-5">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {subtitle}
      </p>

    </div>
  );
}
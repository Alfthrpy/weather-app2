
interface dataProps {
    suggestion : string | undefined
}

export default function InfoCard({suggestion}:dataProps) {

  return (
    <div
      className={`bg-white shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto`}
    >
      <div className="relative bg-purple-400 text-white px-2 py-2">
        <div className="relative">
          <h3 className="font-bold">
            Activity Suggestion
          </h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-700 mt-1">
          {suggestion ||
            "Based on the current weather, we don't have specific suggestions."}
        </p>
      </div>
    </div>
  );
}

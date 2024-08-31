

export default function LoadingSkeletons() {
  return (
    <div className="animate-pulse">
      <div className="h-32 bg-gray-200 rounded-md w-full mb-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 opacity-70 animate-shimmer" />
        </div>
      </div>
      <div className="h-6 bg-gray-200 rounded-md w-full mb-2">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 opacity-70 animate-shimmer" />
        </div>
      </div>
      <div className="h-6 bg-gray-200 rounded-md w-full mb-2">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 opacity-70 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

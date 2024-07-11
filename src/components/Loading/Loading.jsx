export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-900"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-600 animate-spin"></div>
      </div>
    </div>
  );
}

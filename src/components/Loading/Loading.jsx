export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-gray-900">
      <div className="w-full h-full flex justify-center items-center">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-600 animate-spin"></div>
      </div>
    </div>
  );
}

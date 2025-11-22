export const NodesPage = () => {
  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Knowledge Nodes</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          + New Node
        </button>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-center py-12 text-gray-500">
            <div className="text-center">
              <span className="text-6xl mb-4 block">📦</span>
              <p className="text-lg">No nodes yet</p>
              <p className="text-sm mt-2">Create your first knowledge node to get started</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


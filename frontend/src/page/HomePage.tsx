export const HomePage = () => {
  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to Knowledge Bonsai
        </h2>
        <p className="text-gray-600">
          Cultivate and visualize your knowledge graph
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Nodes</p>
              <p className="text-3xl font-bold text-gray-800">0</p>
            </div>
            <span className="text-4xl">📦</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Connections</p>
              <p className="text-3xl font-bold text-gray-800">0</p>
            </div>
            <span className="text-4xl">🔗</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Users</p>
              <p className="text-3xl font-bold text-gray-800">0</p>
            </div>
            <span className="text-4xl">👥</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Create New Node
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
            View Knowledge Graph
          </button>
        </div>
      </div>
    </div>
  );
};


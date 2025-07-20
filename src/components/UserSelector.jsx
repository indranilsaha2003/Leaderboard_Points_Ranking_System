import React, { useState } from 'react';
import { ChevronDown, Plus, User, X } from 'lucide-react';

const UserSelector = ({ 
  users, 
  selectedUser, 
  onSelectUser, 
  onAddUser, 
  showAddUser = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUserName.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      await onAddUser(newUserName.trim());
      setNewUserName('');
      setShowAddForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (showAddUser) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Manage Users</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Add User
          </button>
        </div>

        {showAddForm && (
          <div className="bg-orange-50 rounded-lg p-4 mb-4">
            <form onSubmit={handleAddUser} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Enter user name"
                  className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={loading}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading || !newUserName.trim()}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Adding...' : 'Add User'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setError('');
                    setNewUserName('');
                  }}
                  className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedUser?._id === user._id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
              }`}
              onClick={() => onSelectUser(user)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.totalPoints} points</p>
                  <p className="text-xs text-orange-600">Rank #{user.rank}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select User
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 text-left hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {selectedUser ? (
            <div className="flex items-center gap-3">
              <img
                src={selectedUser.avatarUrl}
                alt={selectedUser.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <span className="font-medium">{selectedUser.name}</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({selectedUser.totalPoints} points)
                </span>
              </div>
            </div>
          ) : (
            <span className="text-gray-500">Choose a user...</span>
          )}
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {users.map((user) => (
              <button
                key={user._id}
                onClick={() => {
                  onSelectUser(user);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-orange-50 focus:outline-none focus:bg-orange-50"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">
                    {user.totalPoints} points • Rank #{user.rank}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSelector;
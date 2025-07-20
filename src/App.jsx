import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UserSelector from './components/UserSelector';
import ClaimSection from './components/ClaimSection';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';
import { Trophy, History, Users } from 'lucide-react';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('ranking');
  const [loading, setLoading] = useState(false);
  const [lastClaim, setLastClaim] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/users');
      const data = await response.json();
      setUsers(data);
      if (data.length > 0 && !selectedUser) {
        setSelectedUser(data[0]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleClaimPoints = async () => {
    if (!selectedUser) return;
    
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: selectedUser._id }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setLastClaim(data);
        await fetchUsers(); // Refresh users to update rankings
      }
    } catch (error) {
      console.error('Error claiming points:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (name) => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      
      if (response.ok) {
        await fetchUsers(); // Refresh users list
        return true;
      } else {
        const error = await response.json();
        throw new Error(error.error);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  };

  const tabs = [
    { id: 'ranking', label: 'Leaderboard', icon: Trophy },
    { id: 'history', label: 'History', icon: History },
    { id: 'users', label: 'Users', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Header />
      
      {/* Tab Navigation */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="flex bg-white rounded-xl shadow-lg p-2 mb-6">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="hidden sm:block">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'ranking' && (
          <div className="space-y-6">
            {/* Claim Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Claim Points</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  onSelectUser={setSelectedUser}
                />
                <ClaimSection
                  selectedUser={selectedUser}
                  onClaim={handleClaimPoints}
                  loading={loading}
                  lastClaim={lastClaim}
                />
              </div>
            </div>

            {/* Leaderboard */}
            <Leaderboard users={users} />
          </div>
        )}

        {activeTab === 'history' && (
          <ClaimHistory />
        )}

        {activeTab === 'users' && (
          <UserSelector
            users={users}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
            onAddUser={handleAddUser}
            showAddUser={true}
          />
        )}
      </div>
    </div>
  );
}

export default App;
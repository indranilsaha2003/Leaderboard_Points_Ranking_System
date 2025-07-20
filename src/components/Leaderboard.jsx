import React from 'react';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

const Leaderboard = ({ users }) => {
  const topThree = users.slice(0, 3);
  const remaining = users.slice(3);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return null;
    }
  };

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white transform scale-110';
      case 2:
        return 'bg-gradient-to-br from-gray-300 to-gray-500 text-white transform scale-105';
      case 3:
        return 'bg-gradient-to-br from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-white border border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-orange-500" />
        <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
      </div>

      {/* Top 3 Podium */}
      {topThree.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            🏆 Top Champions 🏆
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {topThree.map((user) => (
              <div
                key={user._id}
                className={`p-6 rounded-xl shadow-lg text-center transition-all duration-300 hover:shadow-xl ${getRankStyle(user.rank)}`}
              >
                <div className="flex justify-center mb-3">
                  {getRankIcon(user.rank)}
                </div>
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-16 h-16 rounded-full mx-auto mb-3 border-4 border-white shadow-lg object-cover"
                />
                <h3 className="font-bold text-lg mb-1">{user.name}</h3>
                <p className={`text-2xl font-bold ${user.rank === 1 ? 'text-yellow-200' : user.rank <= 3 ? 'text-white' : 'text-orange-600'}`}>
                  {user.totalPoints}
                </p>
                <p className={`text-sm ${user.rank <= 3 ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                  points
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remaining Rankings */}
      {remaining.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Rankings #{topThree.length + 1}+
          </h3>
          <div className="space-y-3">
            {remaining.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-gray-600 text-white rounded-full font-bold text-sm">
                  {user.rank}
                </div>
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.totalPoints} points</p>
                </div>
                <div className="text-right">
                  <Trophy className="w-5 h-5 text-gray-400 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No users found. Add some users to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
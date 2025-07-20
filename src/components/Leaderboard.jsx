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
        return 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white transform scale-110 shadow-2xl border-4 border-yellow-300';
      case 2:
        return 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-white transform scale-105 shadow-xl border-4 border-gray-200';
      case 3:
        return 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white shadow-lg border-4 border-orange-300';
      default:
        return 'bg-white border border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
          Leaderboard
        </h2>
      </div>

      {/* Top 3 Podium */}
      {topThree.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center relative">
            <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              🏆 Hall of Champions 🏆
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {topThree.map((user) => (
              <div
                key={user._id}
                className={`p-8 rounded-2xl text-center transition-all duration-500 hover:shadow-2xl hover:scale-105 relative overflow-hidden ${getRankStyle(user.rank)}`}
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white transform translate-x-8 -translate-y-8"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white transform -translate-x-6 translate-y-6"></div>
                </div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-white bg-opacity-20 rounded-full">
                      {getRankIcon(user.rank)}
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-xl object-cover ring-4 ring-white ring-opacity-50"
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold text-gray-800">#{user.rank}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-2 drop-shadow-sm">{user.name}</h3>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-2">
                    <p className="text-3xl font-black drop-shadow-sm">
                      {user.totalPoints.toLocaleString()}
                    </p>
                    <p className="text-sm font-medium opacity-90">points</p>
                  </div>
                  {user.rank === 1 && (
                    <div className="mt-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white bg-opacity-20 text-white">
                        👑 Champion
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remaining Rankings */}
      {remaining.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <h3 className="text-lg font-bold text-gray-700 px-4 bg-gray-50 rounded-full py-2">
              Other Competitors
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
          <div className="space-y-4">
            {remaining.map((user) => (
              <div
                key={user._id}
                className="group flex items-center gap-6 p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 text-white rounded-xl font-bold text-lg shadow-md group-hover:from-orange-500 group-hover:to-yellow-500 transition-all duration-300">
                  {user.rank}
                </div>
                <div className="relative">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-14 h-14 rounded-full object-cover border-3 border-gray-200 group-hover:border-orange-300 transition-all duration-300 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Trophy className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                    {user.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-orange-600">
                      {user.totalPoints.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">points</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {users.length === 0 && (
        <div className="text-center py-16">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Trophy className="w-12 h-12 text-gray-300" />
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full opacity-50 -z-10"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-600 mb-2">No Champions Yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            The leaderboard is waiting for its first competitors. Add some users and start claiming points to see the rankings!
          </p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

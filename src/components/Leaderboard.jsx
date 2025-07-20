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

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 border border-gray-100 font-inter"> {/* Adjusted padding */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent"> {/* Adjusted text size */}
          Leaderboard
        </h2>
      </div>

      {/* Top 3 Podium */}
      {topThree.length > 0 && (
        <div className="mb-8 sm:mb-10"> {/* Adjusted margin-bottom */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center relative"> {/* Adjusted text and margin */}
            <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              🏆 Hall of Champions 🏆
            </span>
            <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div> {/* Adjusted width and position */}
          </h3>
          
          {/* Podium Layout - 1st in middle, 2nd left, 3rd right */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 items-end"> {/* Adjusted gap for mobile */}
            {/* 2nd Place - Left */}
            {topThree[1] && (
              <div className="order-2 sm:order-1 flex justify-center">
                <PodiumCard user={topThree[1]} isSecond getRankIcon={getRankIcon} />
              </div>
            )}
            
            {/* 1st Place - Center (Bigger) */}
            {topThree[0] && (
              <div className="order-1 sm:order-2 flex justify-center">
                <PodiumCard user={topThree[0]} isFirst getRankIcon={getRankIcon} />
              </div>
            )}
            
            {/* 3rd Place - Right */}
            {topThree[2] && (
              <div className="order-3 sm:order-3 flex justify-center">
                <PodiumCard user={topThree[2]} isThird getRankIcon={getRankIcon} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Remaining Rankings */}
      {remaining.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4 sm:mb-6"> {/* Adjusted margin-bottom */}
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <h3 className="text-base sm:text-lg font-bold text-gray-700 px-3 sm:px-4 bg-gray-50 rounded-full py-1 sm:py-2"> {/* Adjusted text and padding */}
              Other Competitors
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
          <div className="space-y-3 sm:space-y-4"> {/* Adjusted space-y */}
            {remaining.map((user) => (
              <div
                key={user._id}
                className="group flex items-center gap-4 sm:gap-6 p-3 sm:p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-600 to-gray-700 text-white rounded-xl font-bold text-base sm:text-lg shadow-md group-hover:from-orange-500 group-hover:to-yellow-500 transition-all duration-300"> {/* Adjusted size and text */}
                  {user.rank}
                </div>
                <div className="relative">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-3 border-gray-200 group-hover:border-orange-300 transition-all duration-300 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-lg"> {/* Adjusted size */}
                    <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" /> {/* Adjusted icon size */}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base sm:text-lg text-gray-800 group-hover:text-orange-600 transition-colors duration-300"> {/* Adjusted text size */}
                    {user.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-orange-600"> {/* Adjusted text size */}
                      {user.totalPoints.toLocaleString()}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 font-medium">points</span> {/* Adjusted text size */}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300"> {/* Adjusted size */}
                      <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" /> {/* Adjusted icon size */}
                    </div>
                    <span className="text-xs text-gray-400 font-medium">Rank</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {users.length === 0 && (
        <div className="text-center py-8 sm:py-16"> {/* Adjusted padding */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center"> {/* Adjusted size and margin */}
              <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300" /> {/* Adjusted icon size */}
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full opacity-50 -z-10"></div> {/* Adjusted size */}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-600 mb-2">No Champions Yet</h3> {/* Adjusted text size */}
          <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto"> {/* Adjusted text size */}
            The leaderboard is waiting for its first competitors. Add some users and start claiming points to see the rankings!
          </p>
        </div>
      )}
    </div>
  );
};

// Podium Card Component
const PodiumCard = ({ user, isFirst, isSecond, isThird, getRankIcon }) => {
  const getCardStyle = () => {
    // Base style for all podium cards, ensuring responsiveness
    let baseStyle = 'w-full'; // Ensures cards take full width of their grid column

    if (isFirst) {
      return `${baseStyle} bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white shadow-2xl border-4 border-yellow-300`;
    } else if (isSecond) {
      return `${baseStyle} bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-white shadow-xl border-4 border-gray-200 mt-2 sm:mt-8`; // Adjusted margin-top for podium effect
    } else if (isThird) {
      return `${baseStyle} bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white shadow-lg border-4 border-orange-300 mt-2 sm:mt-8`; // Adjusted margin-top for podium effect
    }
    return `${baseStyle} bg-white border border-gray-200`;
  };

  const avatarSize = isFirst ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-12 h-12 sm:w-16 sm:h-16'; // Responsive avatar size
  const nameSize = isFirst ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'; // Responsive name size
  const pointsSize = isFirst ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'; // Responsive points size
  const padding = isFirst ? 'p-4 sm:p-6' : 'p-3 sm:p-4'; // Responsive padding

  return (
    <div className={`${padding} rounded-2xl text-center relative overflow-hidden ${getCardStyle()}`}> {/* Removed transition-all and hover animations */}
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white transform translate-x-8 -translate-y-8"></div> {/* Responsive size */}
        <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white transform -translate-x-6 translate-y-6"></div> {/* Responsive size */}
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-center mb-2 sm:mb-4"> {/* Adjusted margin-bottom */}
          <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-full"> {/* Adjusted padding */}
            {getRankIcon(user.rank)}
          </div>
        </div>
        <div className="relative mb-2 sm:mb-4"> {/* Adjusted margin-bottom */}
          <img
            src={user.avatarUrl}
            alt={user.name}
            className={`${avatarSize} rounded-full mx-auto border-4 border-white shadow-xl object-cover ring-4 ring-white ring-opacity-50`}
          />
          <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-full flex items-center justify-center shadow-lg"> {/* Responsive size and position */}
            <span className="text-xs font-bold text-gray-800">#{user.rank}</span>
          </div>
        </div>
        <h3 className={`font-bold ${nameSize} mb-1 sm:mb-2 drop-shadow-sm`}>{user.name}</h3> {/* Adjusted margin-bottom */}
        <div className="bg-white bg-opacity-20 rounded-lg p-2 sm:p-3 mb-1 sm:mb-2"> {/* Adjusted padding and margin */}
          <p className={`${pointsSize} font-black drop-shadow-sm`}>
            {user.totalPoints.toLocaleString()}
          </p>
          <p className="text-xs sm:text-sm font-medium opacity-90"> {/* Adjusted text size */}
            points
          </p>
        </div>
        {user.rank === 1 && (
          <div className="mt-2 sm:mt-3"> {/* Adjusted margin-top */}
            <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold bg-white bg-opacity-20 text-white"> {/* Adjusted padding */}
              👑 Champion
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;

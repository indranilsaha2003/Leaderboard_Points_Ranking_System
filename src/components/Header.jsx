import React from 'react';
import { Trophy, Crown } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Crown className="w-8 h-8 text-yellow-200" />
            <h1 className="text-3xl font-bold">Points Arena</h1>
            <Trophy className="w-8 h-8 text-yellow-200" />
          </div>
          <p className="text-orange-100 text-lg">
            Claim points and climb the leaderboard!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
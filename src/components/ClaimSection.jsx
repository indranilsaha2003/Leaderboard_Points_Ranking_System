import React from 'react';
import { Zap, CheckCircle } from 'lucide-react';

const ClaimSection = ({ selectedUser, onClaim, loading, lastClaim }) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="text-center">
        <button
          onClick={onClaim}
          disabled={!selectedUser || loading}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Claiming...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-6 h-6" />
              Claim Points
            </div>
          )}
        </button>

        {lastClaim && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">
                +{lastClaim.pointsAwarded} points awarded to {lastClaim.user.name}!
              </span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              Total: {lastClaim.user.totalPoints} points
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimSection;
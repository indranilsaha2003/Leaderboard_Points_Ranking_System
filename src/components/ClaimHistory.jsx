import React, { useState, useEffect } from 'react';
import { History, ChevronLeft, ChevronRight, Calendar, User, Zap } from 'lucide-react';

const ClaimHistory = () => {
  const [history, setHistory] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchHistory(currentPage);
  }, [currentPage]);

  const fetchHistory = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`https://leaderboard-points-ranking-system.onrender.com/api/claims/history?page=${page}&limit=10`);
      const data = await response.json();
      setHistory(data.history);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <History className="w-6 h-6 text-orange-500" />
        <h2 className="text-2xl font-bold text-gray-800">Claim History</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {history.map((claim) => (
              <div
                key={claim._id}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-bold">
                  +{claim.pointsAwarded}
                </div>
                
                <img
                  src={claim.userId?.avatarUrl || 'https://via.placeholder.com/40'}
                  alt={claim.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <h4 className="font-semibold text-gray-800">{claim.userName}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(claim.claimedAt)}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 text-orange-600">
                    <Zap className="w-4 h-4" />
                    <span className="font-bold">+{claim.pointsAwarded}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {history.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No claim history found.</p>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Page {pagination.currentPage} of {pagination.totalPages} 
                ({pagination.totalRecords} total records)
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClaimHistory;
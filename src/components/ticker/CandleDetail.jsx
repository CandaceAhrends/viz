import React from 'react';

const CandleDetail = () => {
  return (
    <div className="flex grid-cols-7 bg-green-500 ml-6 m-4">
      {/* Column 1 */}
      <div className="bg-red-500">Column 1</div>
      {/* Column 2 */}
      <div className="bg-blue-500">Column 2</div>
      {/* Column 3 */}
      <div className="bg-yellow-500">Column 3</div>
      {/* Column 4 */}
      <div className="bg-purple-500">Column 4</div>
      {/* Column 5 */}
      <div className="bg-pink-500">Column 5</div>
      {/* Column 6 */}
      <div className="bg-orange-500">Column 6</div>
      {/* Column 7 */}
      <div className="bg-gray-500">Column 7</div>
    </div>
  );
};

export default CandleDetail;

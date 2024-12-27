import React from 'react';
import { fetchPolyDetail } from '../../services';
import { StockContext } from '../../StockContext';

const Quote = ({ size }) => {
  const { selectedStock } = React.useContext(StockContext);
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchPolyDetail(selectedStock);
        setData(data?.ticker);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetch();
  }, [selectedStock]);
  return (
    <div className="flex text-green">
      <div
        className={`transition-all ${
          size === 'lg' ? 'text-xxl' : 'text-lg'
        } font-semibold pl-3.5`}
      >
        {data?.prevDay.c}
      </div>
      {size === 'lg' && (
        <div className="flex flex-col pt-[.35rem] pl-3">
          <span className="text-xs font-thin">
            {Number(data?.todaysChange).toFixed(2)}
          </span>
          <span className="text-xs font-thin">
            {Number(data?.todaysChangePerc).toFixed(2)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default Quote;

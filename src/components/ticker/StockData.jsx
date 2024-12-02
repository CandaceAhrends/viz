import React from 'react';
import Title from './Title';
import Quote from './Quote';
import { fetchPolyTicker } from '../../services';
import { StockContext } from '../../StockContext';
import CandleDetail from './CandleDetail';

const StockData = () => {
  const { selectedStock } = React.useContext(StockContext);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const [data] = await fetchPolyTicker(selectedStock);
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetch();
  }, [selectedStock]);

  return (
    <div className="container flex w-full justify-between font-golos-text bg-[#OAOAOA]">
      <div className="column flex flex-col min-w-96 ml-2 ">
        <Title />
        <Quote />
      </div>

      <div className="column grow">
        <div className="flex flex-col h-full">
          <div className="flex justify-between mr-20">
            {/* <span className="text-brand-grey">Open</span> */}
            <span>{data?.type}</span>
          </div>
          <div className="flex justify-between  mr-20">
            {/* <span className="text-brand-grey">Exchange</span> */}
            <span>{data?.primary_exchange}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockData;

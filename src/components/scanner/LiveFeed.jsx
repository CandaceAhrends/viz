import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  Typography,
  Alert,
} from '@material-tailwind/react';
import { selectMenu } from '../../features/navigationSlice';
import { setFilteredStocks } from '../../features/historicalDataSlice';
import { filterScannerResults, buildTiingoStocklist } from '../../utils';
import { useNavigate } from 'react-router-dom';
import ViewSvg from '../images/ViewSvg';
import FeedList from './FeedList';

const VOL_HEADER = ['Symbol', 'Volume'];
const GAIN_HEADER = ['Symbol', 'Volulme', 'Change'];

const Feed = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const topVolume = useAppSelector((state) => state.scanner.topVolume);
  const topGainers = useAppSelector((state) => state.scanner.topGainers);
  return (
    <Tabs value="html">
      <Alert>Dummy Data - development currently in progress</Alert>
      <TabsHeader>
        <Tab key="Volume" value="vol">
          <h4 className="text-black"> Volume</h4>
        </Tab>
        <Tab key="Gainers" value="gain">
          <h4 className="text-black"> Gainers</h4>
        </Tab>
      </TabsHeader>
      <TabsBody
        animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        <TabPanel key="Volume" value="vol">
          <Card className="h-full w-full overflow-scroll px-6">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {VOL_HEADER.map((head) => (
                    <th
                      key={head}
                      className="border-b border-gray-300 pb-4 pt-10"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topVolume.map((stock, index) => {
                  return (
                    <tr key={stock.ticker} className="hover:bg-gray-50">
                      <td className="">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {stock.ticker}
                        </Typography>
                      </td>
                      <td className="">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {stock.volume}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </TabPanel>
        <TabPanel key="Gainers" value="gain">
          <Card className="h-full w-full overflow-scroll px-6">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {GAIN_HEADER.map((head) => (
                    <th
                      key={head}
                      className="border-b border-gray-300 pb-4 pt-10"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topGainers.map((stock, index) => {
                  return (
                    <tr key={stock.ticker} className="hover:bg-gray-50">
                      <td className="">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {stock.symbol}
                        </Typography>
                      </td>
                      <td className="">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {stock.volume}
                        </Typography>
                      </td>
                      <td className="">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {stock.gain}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
  // return <div>{JSON.stringify(topVolume)}</div>;
};

export default Feed;

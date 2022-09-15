import './styles.css';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useMemo, useState } from 'react';
import { buildFilterParams, makeRequest } from '../../utils/request';
import { FilterData, PieSeriesData, SalesByGender } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { buildPieChartConfig, buildPieSeriesLabels, sumSalesByGender } from './helpers';

type Props = {
  filterData?: FilterData;
};

function SalesByStoreComponent({ filterData }: Props) {
  const [pieSeries, setPieSeries] = useState<PieSeriesData>({ labels: [], series: [] });
  const [totalSum, setTotalSum] = useState(0);

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    let storeId = 0;
    if (params.store) {
      storeId = params.store.id;
    }

    makeRequest
      .get<SalesByGender[]>('/sales/by-gender?storeId=' + storeId)
      .then((response) => {
        const newPieSeries = buildPieSeriesLabels(response.data);
        setPieSeries(newPieSeries);
        const newTotalSum = sumSalesByGender(response.data);
        setTotalSum(newTotalSum);
      })
      .catch(() => {
        console.error('Error to fetch sales by date');
      });
  }, [params]);

  return (
    <div className="sales-by-store-container base-card">
      <div className="sales-by-store-data">
        <div className="sales-by-store-quantity-container">
          <h2 className="sales-by-store-quantity">{formatPrice(totalSum)}</h2>
          <span className="sales-by-store-quantity-label">Total de vendas</span>
        </div>
        <div className="sales-by-store-chart">
          <ReactApexChart
            options={buildPieChartConfig(pieSeries.labels, '')}
            type="donut"
            width="400"
            height="400"
            series={pieSeries.series}
          />
        </div>
      </div>
    </div>
  );
}

export default SalesByStoreComponent;

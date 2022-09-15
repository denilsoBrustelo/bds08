import { SalesByGender, Gender } from './../../types';
import { ApexOptions } from 'apexcharts';

export const buildPieChartConfig = (labels: string[] = [], name: string) => {
  return {
    labels,
    noData: {
      text: 'Sem resultados',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#334AC3',
        fontSize: '28px',
        fontFamily: 'Roboto, sans-serif'
      }
    },

    legend: {
      show: true,
      floating: false,
      position: 'bottom',
      offsetY: 0,
      labels: {
        colors: ['#b4bed2']
      },
      fontFamily: 'Roboto, sans-serif',
      fontSize: '18px',
      itemMargin: {
        vertical: 5
      }
    },
    dataLabels: {
      enabled: true
    },
    plotOptions: {
      pie: {
        size: 400,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 10,
              formatter: function () {
                return name;
              }
            },
            total: {
              show: true,
              showAlways: true,
              fontSize: '24px',
              color: '#ABB1C0',
              fontFamily: 'Roboto, sans-serif',
              formatter: function () {
                return '';
              }
            }
          }
        }
      }
    },
    chart: {
      height: '400px'
    }
  } as ApexOptions;
};

export const buildPieSeriesLabels = (salesByGender: SalesByGender[] = []) => {
  const labels = salesByGender.map(({ gender }) => formatGender(gender));
  const series = salesByGender.map(({ sum }) => sum);

  return { labels, series };
};

export const sumSalesByGender = (salesByGender: SalesByGender[] = []) => {
  return salesByGender.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.sum;
  }, 0);
};

const formatGender = (gender: Gender) => {
  const textByGender = {
    MALE: 'Masculino',
    FEMALE: 'Feminino',
    OTHER: 'Outros'
  };

  return textByGender[gender];
};

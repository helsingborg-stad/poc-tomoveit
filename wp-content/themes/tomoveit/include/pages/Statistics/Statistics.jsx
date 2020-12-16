import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Statistics.scss';

import { Chart } from 'chart.js';

const style = classNames.bind(styles);

const Statistics = () => {
  useEffect(() => {
    const chart = createChart();
    return () => chart.destroy();
  }, []);

  const createChart = () => {
    const chartElement = (document.getElementById('StatisticContainer')).getContext('2d');
    return new Chart(chartElement, {
      type: 'bar',
      data: {
        labels: ['MÅNDAG', 'TISDAG', 'ONSDAG', 'TORSDAG', 'FREDAG'],
        datasets: [{
          label: '# antal steg',
          data: [15000, 20000, 7000, 10000, 9000],
          backgroundColor: [
            '#4b4eff',
            '#4b4eff',
            '#4b4eff',
            '#4b4eff',
            '#4b4eff',
          ],
        }],
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              color: 'rgba(0, 0, 0, 0)',
            },
          }],
          yAxes: [{
            gridLines: {
              color: 'rgba(0, 0, 0, 0)',
            },
          }],
        },
        responsive: true,
        legend: {
          display: false,
        },
      },
    });
  };

  return (
    <div className={ style('statistics')}>
      <h3>Totalt antal steg hittills</h3>
      <div className={ style('statistics__chart-container')}>
        <canvas className={ style('statistics__chart')} id="StatisticContainer">
        </canvas>
      </div>
    </div>
  );
};

export default Statistics;

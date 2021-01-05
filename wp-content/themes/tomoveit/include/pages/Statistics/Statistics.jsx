import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Statistics.scss';
import { useSelector } from 'react-redux';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const style = classNames.bind(styles);

const Statistics = () => {
  const data = useSelector(state => state.app.data);
  const [totalSteps, setTotalSteps] = useState(0);
  const [goalsCompleted, setGoalsCompleted] = useState(0);

  useEffect(() => {
    const chart = createChart(data);
    return () => chart.destroy();
  }, []);

  const createChart = (data) => {
    const chartElement = (document.getElementById('StatisticContainer')).getContext('2d');

    let stepsSum = [0, 0, 0, 0, 0];

    for (let i = 0; i < data.length; i++) {
      let sumItem = 0;
      const sums = data[i].reduce((acc, val, index) => {
        let objects = Object.values(val);
        let test = objects.map(m => {
          sumItem = sumItem + m.steps;
        });
      });
      if (sumItem >= 10000) setGoalsCompleted(goalsCompleted + 1);
      stepsSum[i] = sumItem;
    }
    const totalSum = stepsSum.reduce((result, number) => result + number);
    setTotalSteps(totalSum);

    let colors = [];
    for (let i = 0; i < 5; i++) {
      colors[i] = stepsSum[i] >= 10000 ? '#2ecc71' : '#4b4eff';
    }

    return new Chart(chartElement, {
      type: 'bar',
      data: {
        labels: ['MÅNDAG', 'TISDAG', 'ONSDAG', 'TORSDAG', 'FREDAG'],
        datasets: [{
          label: '# antal steg',
          data: stepsSum,
          backgroundColor: colors,
        }],
      },
      options: {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 50,
            bottom: 0,
          },
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'rgba(0, 0, 0, 0)',
              drawBorder: false,
              drawOnChartArea: false,
            },
          }],
          yAxes: [{
            display: false,
            gridLines: {
              color: 'rgba(0, 0, 0, 0)',
              drawBorder: false,
              drawOnChartArea: false,
            },
          }],
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            fontFamily: 'Montserrat',
          },
        },
        plugins: {
          // Change options for ALL labels of THIS CHART
          datalabels: {
            anchor: 'end',
            align: 'top',
            color: colors,
            font: {
              weight: 'bold',
              size: 27,
              style: 'italic',
            },
          },
        },
      },
    });
  };

  return (
    <div className={ style('statistics')}>
      <div className={ style('statistics__stats')}>
        <h1>{totalSteps}</h1>
        <h3>Totalt antal steg hittills</h3>
        <span>Snyggt jobbat! Du har klarat ditt mål {goalsCompleted} av 5 dagar 👏💪</span>
      </div>
      <div className={ style('statistics__chart-container')}>
        <canvas className={ style('statistics__chart')} id="StatisticContainer">
        </canvas>
      </div>
    </div>
  );
};

export default Statistics;

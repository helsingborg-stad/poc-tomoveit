import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Statistics.scss';
import { useSelector } from 'react-redux';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

const style = classNames.bind(styles);

const Statistics = () => {
  const data = useSelector(state => state.app.data);
  const pin = useSelector(state => state.app.pin);
  const [totalSteps, setTotalSteps] = useState(0);
  const [totalStepsClass, setTotalStepsClass] = useState(0);

  const [stepArray, stepArraySet] = useState([]);

  useEffect(() => {
    const chart = createChart(data);
    return () => chart.destroy();
  }, []);

  const formatAdminData = (data) => {
    let stepsSum = [0, 0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        let objectsDate = Object.keys(data[i][0])[0];
        const date = moment(objectsDate);

        let sumItem = 0;
        const sums = data[i].reduce((acc, val, index) => {
          let objects = Object.values(val);
          let test = objects.map(m => {
            sumItem = sumItem + m.steps;
          });
        });
        stepsSum[(date.day()) - 1] += sumItem;
      }
    }

    stepArraySet(stepsSum);
    const totalSum = stepsSum.reduce((result, number) => result + number);
    setTotalStepsClass(totalSum);
    return stepsSum;
  };

  const createChart = (data, goalsCompletedClass, setGoalsCompletedClass) => {
    const chartElement = (document.getElementById('StatisticContainer')).getContext('2d');

    let stepsSum = [0, 0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        let objectsDate = Object.keys(data[i][0])[0];
        const date = moment(objectsDate);

        let sumItem = 0;
        const sums = data[i].reduce((acc, val, index) => {
          let objects = Object.values(val);
          let test = objects.map(m => {
            sumItem = sumItem + m.steps;
          });
        });
        stepsSum[(date.day()) - 1] = sumItem;
      }
    }
    stepArraySet(stepsSum);

    const totalSum = stepsSum.reduce((result, number) => result + number);
    setTotalSteps(totalSum);

    let colors = [];
    if (pin !== '1234') {
      for (let i = 0; i < 5; i++) {
        colors[i] = stepsSum[i] >= 10000 ? '#2ecc71' : '#4b4eff';
      }
    } else {
      for (let i = 0; i < 5; i++) {
        colors[i] = stepsSum[i] >= 160000 ? '#2ecc71' : '#4b4eff';
      }
    }

    return new Chart(chartElement, {
      type: 'bar',
      data: {
        labels: ['MÅNDAG', 'TISDAG', 'ONSDAG', 'TORSDAG', 'FREDAG'],
        datasets: [{
          label: '# antal steg',
          data: pin === '1234' ? formatAdminData(data) : stepsSum,
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

  const countCompletedClass = () => {
    let temp = 0;
    for (let i = 0; i < 5; i++) {
      if (stepArray[i] >= 160000) {
        temp = temp + 1;
      }
    }
    return temp;
  };

  const countCompleted = () => {
    let temp = 0;
    for (let i = 0; i < 5; i++) {
      if (stepArray[i] >= 10000) {
        temp = temp + 1;
      }
    }
    return temp;
  };

  return (
    <div className={ style('statistics')}>
      <div className={ style('statistics__stats')}>
        <h1>{pin === '1234' ? totalStepsClass : totalSteps}</h1>
        <h3>Totalt antal steg hittills</h3>
        { pin !== '1234' &&
          <span>Snyggt jobbat! Du har klarat ditt mål {countCompleted()} av 5 dagar 👏💪</span>
        }
        { pin === '1234' &&
        <span>Snyggt jobbat! Ni har klarat ert mål {countCompletedClass()} av 5 dagar 👏💪</span>
        }
      </div>
      <div className={ style('statistics__chart-container')}>
        <canvas className={ style('statistics__chart')} id="StatisticContainer">
        </canvas>
      </div>
    </div>
  );
};

export default Statistics;

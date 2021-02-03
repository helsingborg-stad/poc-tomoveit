import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Statistics.scss';
import { useSelector } from 'react-redux';
import { Chart } from 'chart.js';
/* eslint-disable */
import ChartDataLabels from 'chartjs-plugin-datalabels';
/* eslint-enable */
import moment from 'moment';
import axios from 'axios';
import { thousandSeparator } from '../../util/util';

const style = classNames.bind(styles);

const Statistics = () => {
  const admin = useSelector(state => state.app.admin);
  const pin = useSelector(state => state.app.pin);
  const [totalSteps, setTotalSteps] = useState(0);
  const [totalStepsClass, setTotalStepsClass] = useState(0);
  const [loding, setLoading] = useState(false);

  const [date, setdate] = useState(new Date());

  const [stepArray, stepArraySet] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    let monday = moment(date).startOf('week');
    let sunday = moment(date).startOf('week').add(6, 'days');

    setLoading(true);
    if (admin) {
      axios.post('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/adminData', {
        pin: pin,
        start_date: monday,
        end_date: sunday,
      },
      ).then((response) => {
        setData(response.data);
        setLoading(false);
      }, (error) => {
        console.log(error);
      });
    } else {
      axios.post('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/data', {
        pin: pin,
        start_date: monday,
        end_date: sunday,
      },
      ).then((response) => {
        setData(response.data);
        setLoading(false);
      }, (error) => {
        console.log(error);
      });
    }
  }, [date]);

  useEffect(() => {
    if (!loding) {
      const chart = createChart(data);
      return () => chart.destroy();
    }
  }, [loding]);

  const formatAdminData = (data) => {
    let stepsSum = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        let objectsDate = Object.keys(data[i][0])[0];
        const date = moment(objectsDate);

        let sumItem = 0;
        data[i].reduce((acc, val, index) => {
          let objects = Object.values(val);
          objects.map(m => {
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

  const createChart = (data) => {
    const chartElement = (document.getElementById('StatisticContainer')).getContext('2d');

    let stepsSum = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        let objectsDate = Object.keys(data[i][0])[0];
        const date = moment(objectsDate);

        let sumItem = 0;
        data[i].reduce((acc, val, index) => {
          let objects = Object.values(val);
          objects.map(m => {
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
    if (!admin) {
      for (let i = 0; i < 7; i++) {
        colors[i] = stepsSum[i] >= 10000 ? '#2ecc71' : '#4b4eff';
      }
    } else {
      for (let i = 0; i < 7; i++) {
        colors[i] = stepsSum[i] >= 160000 ? '#2ecc71' : '#4b4eff';
      }
    }

    return new Chart(chartElement, {
      type: 'bar',
      data: {
        labels: ['MÅNDAG', 'TISDAG', 'ONSDAG', 'TORSDAG', 'FREDAG', 'LÖRDAG', 'SÖNDAG'],
        datasets: [{
          label: '# antal steg',
          data: admin ? formatAdminData(data) : stepsSum,
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
            formatter: function(value, context) {
              return thousandSeparator(value.toString());
            },
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
    for (let i = 0; i < 7; i++) {
      if (stepArray[i] >= 160000) {
        temp = temp + 1;
      }
    }
    return temp;
  };

  const countCompleted = () => {
    let temp = 0;
    for (let i = 0; i < 7; i++) {
      if (stepArray[i] >= 10000) {
        temp = temp + 1;
      }
    }
    return temp;
  };

  const handleClickLeft = () => {
    setdate(moment(date).subtract(1, 'week').toDate());
  };

  const handleClickRight = () => {
    setdate(moment(date).add(1, 'week').toDate());
  };

  return (
    <div className={ style('statistics')}>
      <div className={ style('statistics__stats')}>
        <h1>{admin ? thousandSeparator(totalStepsClass) : thousandSeparator(totalSteps)}</h1>
        <h3>Totalt antal steg hittills</h3>
        { !admin &&
          <span>Snyggt jobbat! Du har klarat ditt mål {countCompleted()} av 5 dagar 👏💪</span>
        }
        { admin &&
        <span>Snyggt jobbat! Ni har klarat ert mål {countCompletedClass()} av 5 dagar 👏💪</span>
        }
      </div>
      <div className={ style('statistics__wrapper')}>
        <svg className={ style('statistics__arrow-left')} onClick={handleClickLeft}>
          <use xlinkHref={ 'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-arrow-left' } />
        </svg>
        <p>Vecka {moment(date).format('w')} ( {moment(date).startOf('week').format('DD MMMM')} — {moment(date).startOf('week').add(6, 'days').format('DD MMMM')} )</p>
        <svg className={ style('statistics__arrow-right')} onClick={handleClickRight}>
          <use xlinkHref={ 'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-arrow-left' } />
        </svg>
      </div>
      <div className={ style('statistics__chart-container')}>
        <canvas className={ style('statistics__chart')} id="StatisticContainer">
        </canvas>
      </div>
    </div>
  );
};

export default Statistics;

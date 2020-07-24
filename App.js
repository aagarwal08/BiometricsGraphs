/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryLegend,
  VictoryZoomContainer,
  VictoryCandlestick,
} from 'victory-native';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000},
];

export default class login extends Component {
  render() {
    function getTimeStamp(date, time) {
      var timeStamp = new Date(
        Date.UTC(
          date.slice(0, 4),
          parseInt(date.slice(4, 6)) - 1,
          date.slice(6),
          time.slice(0, 2),
          time.slice(3),
        ),
      );
      return timeStamp.getTime();
    }

    var weightData = [];
    var bsData = [];
    var sysData = [];
    var diaData = [];

    var prevDate; // = Object.keys(biometricData)[0]

    Object.entries(biometricData).forEach((entry) => {
      const [curDate, curDateData] = entry;
      Object.entries(curDateData).forEach((entry) => {
        const [curTime, curTimeData] = entry;
        Object.entries(curTimeData).forEach((entry) => {
          const [bioType, bioData] = entry;
          console.log('DATE, TIME, DATA', curDate, curTime, bioType);
          var timeStamp = getTimeStamp(curDate, curTime);
          console.log('PREV vs CURR DATE', prevDate, curDate);
          if (prevDate != curDate) {
            switch (bioType) {
              case 'Weight':
                weightData.push({
                  x: timeStamp,
                  low: Number(bioData['biometric_values']['Weight(lbs)']),
                  high: Number(bioData['biometric_values']['Weight(lbs)']),
                });
                break;
              case 'Blood Sugar':
                bsData.push({
                  x: timeStamp,
                  low: Number(bioData['biometric_values']['Post Meal']),
                  high: Number(bioData['biometric_values']['Post Meal']),
                });
                break;
              case 'Blood Pressure':
                sysData.push({
                  x: timeStamp,
                  low: Number(bioData['biometric_values']['Systolic']),
                  high: Number(bioData['biometric_values']['Systolic']),
                });
                diaData.push({
                  x: timeStamp,
                  low: Number(bioData['biometric_values']['Diastolic']),
                  high: Number(bioData['biometric_values']['Diastolic']),
                });
                break;
            }
          } else {
            var weightSize = weightData.length - 1;
            var bsSize = bsData.length - 1;
            var bpSize = sysData.length - 1;
            console.log('.MIN', weightData[0]);
            switch (bioType) {
              case 'Weight':
                if (
                  weightData[weightSize].low >
                  Number(bioData['biometric_values']['Weight(lbs)'])
                ) {
                  weightData[weightSize].low = Number(
                    bioData['biometric_values']['Weight(lbs)'],
                  );
                } else if (
                  weightData[weightSize].high <
                  Number(bioData['biometric_values']['Weight(lbs)'])
                ) {
                  weightData[weightSize].high = Number(
                    bioData['biometric_values']['Weight(lbs)'],
                  );
                }
                break;
              case 'Blood Sugar':
                if (
                  bsData[bsSize].low >
                  Number(bioData['biometric_values']['Post Meal'])
                ) {
                  bsData[bsSize].low = Number(
                    bioData['biometric_values']['Post Meal'],
                  );
                } else if (
                  bsData[bsSize].high <
                  Number(bioData['biometric_values']['Post Meal'])
                ) {
                  bsData[bsSize].high = Number(
                    bioData['biometric_values']['Post Meal'],
                  );
                }
                break;
              case 'Blood Pressure':
                if (
                  sysData[bpSize].low >
                  Number(bioData['biometric_values']['Systolic'])
                ) {
                  sysData[bpSize].low = Number(
                    bioData['biometric_values']['Systolic'],
                  );
                } else if (
                  sysData[bpSize].high <
                  Number(bioData['biometric_values']['Systolic'])
                ) {
                  sysData[bpSize].high = Number(
                    bioData['biometric_values']['Systolic'],
                  );
                }
                if (
                  diaData[bpSize].low >
                  Number(bioData['biometric_values']['Diastolic'])
                ) {
                  diaData[bpSize].low = Number(
                    bioData['biometric_values']['Diastolic'],
                  );
                } else if (
                  diaData[bpSize].high <
                  Number(bioData['biometric_values']['Diastolic'])
                ) {
                  diaData[bpSize].high = Number(
                    bioData['biometric_values']['Diastolic'],
                  );
                }
                break;
            }
          }
        });
        prevDate = curDate;
      });
    });

    // Object.entries(biometricData).forEach(entry => {
    //   const [curDate, curDateData] = entry;
    //   Object.entries(curDateData).forEach(entry => {
    //     const [curTime, curTimeData] = entry;
    //     Object.entries(curTimeData).forEach(entry => {
    //       const [bioType, bioData] = entry;
    //       var timeStamp = getTimeStamp(curDate, curTime);
    //       switch(bioType) {
    //         case 'Weight':
    //           weightData.push({x: timeStamp, y: Number(bioData['biometric_values']['Weight(lbs)'])});
    //           break;
    //         case 'Blood Sugar':
    //           bsData.push({x: timeStamp, y: Number(bioData['biometric_values']['Post Meal'])});
    //           break;
    //         case 'Blood Pressure':
    //           sysData.push({x: timeStamp, y: Number(bioData['biometric_values']['Systolic'])});
    //           diaData.push({x: timeStamp, y: Number(bioData['biometric_values']['Diastolic'])});
    //           break;
    //       }
    //     });
    //   });
    // });

    //FOR EACH
    // biometricData.forEach((curDateData, curDate) => {
    //   curDateData.forEach((curTimeData, curTime) => {
    //     curTimeData.forEach((bioData, bioType) => {
    //       var timeStamp = curDate + curTime;
    //         switch(bioType) {
    //           case 'Weight':
    //             weightData.push({x: timeStamp, y: bioData['biometric_values']['Weight(lbs)']});
    //             break;
    //           case 'Blood Sugar':
    //             bsData.push({x: timeStamp, y: bioData['biometric_values']['Post Meal']});
    //             break;
    //           case 'Blood Pressure':
    //             sysData.push({x: timeStamp, y: bioData['biometric_values']['Systolic']});
    //             diaData.push({x: timeStamp, y: bioData['biometric_values']['Diastolic']});
    //             break;
    //         }
    //     });
    //   });
    // });

    // console.log("WEIGHT", weightData);
    // console.log("BP", bsData);
    // console.log("SYS", sysData);
    // console.log("DIA", diaData);

    //MAP
    // let objKeysX = Object.keys(biometricData);

    // let weightsY = Object.keys(biometricData).map((k) =>
    //   Object.keys(biometricData[k]).map(
    //     (x) => biometricData[k][x]['Weight']['biometric_values']['Weight(lbs)'],
    //   ),
    // );

    // console.log("BIOMETRIC KEYS LENGTH", objKeysX.length);

    // let sysBP = Object.keys(biometricData).map((currDate) =>
    //   Object.keys(biometricData[currDate]).map(
    //     (currTime) =>
    //       biometricData[currDate][currTime]['Blood Pressure'][
    //         'biometric_values'
    //       ]['Systolic'],
    //   ),
    // );
    // console.log('SYSTOLIC', sysBP);

    // let diaBP = Object.keys(biometricData).map((k) =>
    //   Object.keys(biometricData[k]).map(
    //     (x) =>
    //       biometricData[k][x]['Blood Pressure']['biometric_values'][
    //         'Diastolic'
    //       ],
    //   ),
    // );

    // let monthNames = [
    //   'Jan',
    //   'Feb',
    //   'Mar',
    //   'Apr',
    //   'May',
    //   'Jun',
    //   'Jul',
    //   'Aug',
    //   'Sep',
    //   'Oct',
    //   'Nov',
    //   'Dec',
    // ];

    // let dates = objKeysX.map((x) => x.slice(6));
    // let years = objKeysX.map((x) => x.slice(0, 4));
    // console.log('YEARS', years);
    // console.log('DATES', dates[0]);
    // let months = objKeysX
    //   .map((x) => x.slice(4, 6))
    //   .map((y) => y.replace('0', ''))
    //   .map((z) => monthNames[z - 1]);
    // for (let i = 0; i < dates.length; i++) {
    //   months[i] = months[i] + ' ' + dates[i] + ' ' + years[i];
    // }
    // console.log('MONTHS', months);

    // for (let i = 0; i < 9; i++) {
    //   weightData.push({x: objKeysX[i], y: weightsY[i]});
    //   sysData.push({x: months[i], y: sysBP[i]});
    //   diaData.push({x: months[i], y: diaBP[i]});
    // }

    return (
      <View style={styles.container}>
        <Text>Weight vs Date</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          scale={{x: 'time', y: 'linear'}}>
          <VictoryCandlestick
            data={weightData}
            open={(d) => (d.high + d.low + 0.25) / 2}
            close={(d) => (d.high + d.low - 0.25) / 2}
            high={(d) => d.high}
            low={(d) => d.low}
            style={{
              data: {
                stroke: 'green',
                fill: 'green',
                strokeWidth: 2,
              },
            }}
          />
        </VictoryChart>

        <Text>Blood Pressure vs Date</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          scale={{x: 'time'}}
          style={(paddingLeft = 150)}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({datum}) =>
                `${Math.round(datum.low, 2)}, ${Math.round(datum.high, 2)}`
              }
            />
          }>
          <VictoryZoomContainer allowZoom={true} zoomDomain={{x: [0, 100]}} />
          <VictoryLegend
            x={120}
            y={40}
            title="Legend"
            centerTitle
            orientation="horizontal"
            gutter={20}
            style={{border: {stroke: 'black'}, title: {fontSize: 20}}}
            data={[
              {name: 'Systolic', symbol: {fill: '#c43a31'}},
              {name: 'Diastolic', symbol: {fill: 'darkblue'}},
            ]}
          />
          <VictoryAxis
            dependentAxis
            domain={[60, 150]}
            offsetX={50}
            orientation="left"
            standalone={false}
          />
          <VictoryAxis
            crossAxis
            //width={400}
            height={400}
            theme={VictoryTheme.material}
            //offsetY={200}
            standalone={false}
          />
          {/* <VictoryAxis
            dependentAxis = {true}
            domain={{ x: [0, 100], y: [60, 140] }}
            orientation="right"
            standalone={false}
            style={styles.axisOne}
          /> */}
          <VictoryCandlestick
            style={{
              data: {stroke: '#c43a31', fill: '#c43a31', strokeWidth: 2},
              parent: {border: '1px solid #ccc'},
            }}
            data={sysData}
            open={(d) => (d.high + d.low + 0.5) / 2}
            close={(d) => (d.high + d.low - 0.5) / 2}
            high={(d) => d.high}
            low={(d) => d.low}
          />
          <VictoryCandlestick
            style={{
              data: {stroke: 'darkblue', fill: 'darkblue', strokeWidth: 2},
              parent: {border: '1px solid #ccc'},
            }}
            data={diaData}
            open={(d) => (d.high + d.low + 0.5) / 2}
            close={(d) => (d.high + d.low - 0.5) / 2}
            high={(d) => d.high}
            low={(d) => d.low}
          />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    paddingLeft: 35,
    paddingRight: 0,
  },
});

const BioMetricArray = [
  {
    biometric_type: 'BloodPressure',

    biometric_values: {
      type: 'TEXTBOX',

      values: [{Systolic: 'NUM'}, {Diastolic: 'NUM'}],
    },
  },

  {
    biometric_type: 'Blood Sugar',

    biometric_values: {
      type: 'DROPDOWN',

      values: [{PostMeal: 'NUM'}, {Fasting: 'NUM'}, {Other: 'NUM'}],
    },
  },

  {
    biometric_type: 'Weight',

    biometric_values: {
      type: 'TEXTBOX',

      values: [{'Weight(lbs)': 'NUM'}],
    },
  },
];

const biometricData = {
  '20200626': {
    '15:32': {
      Weight: {
        biometric_values: {
          'Weight(lbs)': '185',
        },
      },

      'Blood Sugar': {
        biometric_values: {
          'Post Meal': '97',
        },
      },

      'Blood Pressure': {
        biometric_values: {
          Systolic: '125',

          Diastolic: '87',
        },
      },
    },
    '22:35': {
      Weight: {
        biometric_values: {
          'Weight(lbs)': '183',
        },
      },

      'Blood Sugar': {
        biometric_values: {
          'Post Meal': '100',
        },
      },

      'Blood Pressure': {
        biometric_values: {
          Systolic: '120',

          Diastolic: '80',
        },
      },
    },
  },

  '20200627': {
    '15:32': {
      Weight: {
        biometric_values: {
          'Weight(lbs)': '183',
        },
      },

      'Blood Sugar': {
        biometric_values: {
          'Post Meal': '106',
        },
      },

      'Blood Pressure': {
        biometric_values: {
          Systolic: '115',

          Diastolic: '84',
        },
      },
    },
    '22:35': {
      Weight: {
        biometric_values: {
          'Weight(lbs)': '182',
        },
      },

      'Blood Sugar': {
        biometric_values: {
          'Post Meal': '110',
        },
      },

      'Blood Pressure': {
        biometric_values: {
          Systolic: '118',

          Diastolic: '80',
        },
      },
    },
  },

  '20200628': {
    '15:32': {
      'Blood Pressure': {
        biometric_values: {
          Systolic: '122',

          Diastolic: '80',
        },
      },

      'Blood Sugar': {
        biometric_values: {
          'Post Meal': '104',
        },
      },

      Weight: {
        biometric_values: {
          'Weight(lbs)': '187',
        },
      },
    },
    '22:35': {
      Weight: {
        biometric_values: {
          'Weight(lbs)': '182',
        },
      },

      'Blood Sugar': {
        biometric_values: {
          'Post Meal': '110',
        },
      },

      'Blood Pressure': {
        biometric_values: {
          Systolic: '121',

          Diastolic: '83',
        },
      },
    },
  },

  '20200629': {
    '15:32': {
      Weight: {
        biometric_values: {
          'Weight(lbs)': '189',
        },
      },

      'Blood Sugar': {
        biometric_values: {
          'Post Meal': '106',
        },
      },

      'Blood Pressure': {
        biometric_values: {
          Systolic: '122',

          Diastolic: '80',
        },
      },
    },
  },

  '20200630': {
    '15:32': {
      Weight: {
        biometric_values: {
          'Weight(lbs)': '187',
        },
      },

      'Blood Sugar': {
        biometric_values: {
          'Post Meal': '98',
        },
      },

      'Blood Pressure': {
        biometric_values: {
          Systolic: '120',

          Diastolic: '81',
        },
      },
    },
  },

  '20200701': {
    '15:32': {
      Weight: {
        biometric_values: {
          'Weight(lbs)': '180',
        },
      },

      'Blood Sugar': {
        biometric_values: {
          'Post Meal': '104',
        },
      },

      'Blood Pressure': {
        biometric_values: {
          Systolic: '118',

          Diastolic: '86',
        },
      },
    },
  },

  '20200702': {
    '15:32': {
      Weight: {
        biometric_values: {
          'Weight(lbs)': '190',
        },
      },

      'Blood Sugar': {
        biometric_values: {
          'Post Meal': '101',
        },
      },

      'Blood Pressure': {
        biometric_values: {
          Systolic: '118',

          Diastolic: '81',
        },
      },
    },
  },

  '20200703': {
    '15:32': {
      Weight: {
        biometric_values: {
          'Weight(lbs)': '189',
        },
      },

      'Blood Sugar': {
        biometric_values: {
          'Post Meal': '97',
        },
      },

      'Blood Pressure': {
        biometric_values: {
          Systolic: '118',

          Diastolic: '80',
        },
      },
    },
  },

  '20200704': {
    '15:32': {
      'Blood Pressure': {
        biometric_values: {
          Systolic: '117',

          Diastolic: '85',
        },
      },

      'Blood Sugar': {
        biometric_values: {
          'Post Meal': '97',
        },
      },

      Weight: {
        biometric_values: {
          'Weight(lbs)': '181',
        },
      },
    },
  },

  '20200705': {
    '15:32': {
      Weight: {
        biometric_values: {
          'Weight(lbs)': '185',
        },
      },

      'Blood Sugar': {
        biometric_values: {
          'Post Meal': '103',
        },
      },

      'Blood Pressure': {
        biometric_values: {
          Systolic: '116',

          Diastolic: '89',
        },
      },
    },
  },

  '20200706': {
    '15:32': {
      Weight: {
        biometric_values: {
          'Weight(lbs)': '184',
        },
      },

      'Blood Sugar': {
        biometric_values: {
          'Post Meal': '103',
        },
      },

      'Blood Pressure': {
        biometric_values: {
          Systolic: '117',

          Diastolic: '80',
        },
      },
    },
  },
};

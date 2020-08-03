import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
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

export default class Weight extends Component {
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
          //console.log('DATE, TIME, DATA', curDate, curTime, bioType);
          var timeStamp = getTimeStamp(curDate, curTime);
          //console.log('PREV vs CURR DATE', prevDate, curDate);
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
            //console.log('.MIN', weightData[0]);
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
    return (
      <View style={styles.container}>
        {/* <View> 
          <Text style={styles.header}>Weight vs Date</Text>
        </View> */}
       
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 25 }}
          width={800}
          scale={{ x: 'time', y: 'linear' }}>
          {/* <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`}/>
          <VictoryAxis dependentAxis/> */}
          <VictoryCandlestick
            data={weightData}
            open={(d) => (d.high + d.low + 0.25) / 2}
            close={(d) => (d.high + d.low - 0.25) / 2}
            high={(d) => d.high}
            low={(d) => d.low}
            style={{
              data: {
                stroke: 'darkgreen',
                fill: 'darkgreen',
                strokeWidth: 2,
                
              },
            }}
          />
        </VictoryChart>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  header: {
    fontSize: 20,
    
  }
});


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
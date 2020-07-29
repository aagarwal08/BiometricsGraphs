import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Button} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
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
        return(
            <View>
                <Text>hi</Text>
            </View>
        );
    }
}


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
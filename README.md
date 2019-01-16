# ![image](https://user-images.githubusercontent.com/2585676/51196670-fd492800-1932-11e9-932e-30920312460e.png) React Datepicker
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/%40y0c%2Freact-datepicker.svg)](https://badge.fury.io/js/%40y0c%2Freact-datepicker) 
[![Build Status](https://travis-ci.com/y0c/react-datepicker.svg?branch=master)](https://travis-ci.com/y0c/react-datepicker)
[![codecov](https://codecov.io/gh/y0c/react-datepicker/branch/master/graph/badge.svg)](https://codecov.io/gh/y0c/react-datepicker)
[![Maintainability](https://api.codeclimate.com/v1/badges/e2a0ba59adb7412eae87/maintainability)](https://codeclimate.com/github/y0c/react-datepicker/maintainability)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![dependencies Status](https://david-dm.org/y0c/react-datepicker/status.svg)](https://david-dm.org/y0c/react-datepicker)
[![devDependencies Status](https://david-dm.org/y0c/react-datepicker/dev-status.svg)](https://david-dm.org/y0c/react-datepicker?type=dev)


> Simple and Reusable DatePicker Component 

## 🔧 Built With

* TypeScript
* Sass
* React
* Moment

## 📦 Dependency 

* [Moment](https://momentjs.com)

## 📲 Installation 

```sh
yarn add @y0c/react-datepicker
# or 
npm install --save @y0c/react-datepicker
```

## 💡 Examples 

### Simple Calendar Standalone 

```javascript
// import Calendar Component 
import React, { Component } from 'react';
import { Calendar } from '@y0c/react-datepicker';
// import calendar style 
// You can customize style by copying asset folder.
import '@y0c/react-datepicker/assets/styles/calendar.scss';

// Please include the locale you want to use.
// and delivery props to calendar component 
import 'moment/locale/ko';

class CalendarExample extends Component {

  state = {
    selected: []
  }

  /**
   * Signle Select
   * @param {Moment} selected date  
   */
  handleChange = (date) => {
    this.setState({
      selected: [date]
    });
  }

  /**
   * MultiSelect Date
    handleChange = (date) => {
      this.setState({
        selected: [...this.state.selected].concat(date) 
      })
    }
  */
  
  render() {
    const { selected } = this.state;
    return (
      <Calendar 
        onChange={this.handleChange}
        selected={selected}
      />
    )
  }
}

```
### Result 
Single Select & Multi Select
![image](https://user-images.githubusercontent.com/2585676/50602165-f0bbdd00-0ef9-11e9-95b7-1cc3e2c56f0e.png)

### Range Select & Custom Text
```javascript
class CalendarExample extends Component {
  state ={
    startDay: null,
    endDay: null
  }

  handleChange = (date) => {
    const { startDay, endDay } = this.state;
    if(!startDay) {
      this.setState({
        startDay: date
      });
    } else {
      if(date.isAfter(startDay)) {
        this.setState({
          endDay: date
        });
      } else {
        this.setState({
          startDay: date
        });
      }
    }
  }

  getDayText = (date) => {
    const value = date.format('YYYYMMDD');
    const { startDay, endDay } = this.state;
    
    //You can mapping date with specific text
    const textMap = {
      "20190101": "신정"
    };
    if(startDay) textMap[startDay.format('YYYYMMDD')] = "출발일"
    if(endDay) textMap[endDay.format('YYYYMMDD')] = "도착일"
    return textMap[value];
  }

  render() {
    const { startDay, endDay } = this.state;
    return (
      <div className="App">
        <Calendar
          onChange={this.handleChange}
          startDay={startDay}
          endDay={endDay}
          customDayText={this.getDayText}
        />
      </div>
    );
  }
}

```

### Result

![image](https://user-images.githubusercontent.com/2585676/50604018-ebae5c00-0f00-11e9-9990-205f252f0693.png)


## 📋 Calendar Component Props Detail 

| Props          | Description                               | defaultProps  | Type          |
|----------------|-------------------------------------------|---------------|---------------|
| locale         | Moment locale param                       | 'ko'          | string        |
| headerFormat   | Header Year & Month Format(Moment Format) | 'YYYY년 MM월' | string        |
| selected       | selected date(single or multi)            | []            | array         |
| startDay       | Start Date to display                     |               | moment.Moment |
| endDay         | End Date to display                       |               | moment.Moment |
| customDayClass | you can grant class specific date         |               | function      |
| customDayText  | you can grant text specific text          |               | function      |
| show           | Calendar Display Y/N                      | true          | boolean       |

### DatePicker Component
> Datepicker Component is simply wrapping Calendar Component with input

```javascript
 // ...

  render() {
    return (
      <DatePicker 
        inputFormat='YYYY/MM/DD'
        onChange={this.handleChange}
        selected={selected}
      />
    )
  }
```

### Result
![image](https://user-images.githubusercontent.com/2585676/50604620-e18d5d00-0f02-11e9-84f2-a0f87f68e41c.png)

## ⚙️ Local Development

```sh
# clone this project
git clone https://github.com/y0c/react-datepicker.git
# install dependency
yarn
# start development mode 
# webpack dev server serving examples folder
# This folder will later be added to the demo site It will be used.
yarn run dev
```
Open your browser and connect http://localhost:8080


## ✨ Feature

* Custom Day Text 
* Custom Day Class
* Select Day
* Mutiple Select
* Today Check
* i18n(with moment locale)
* Select Range

## 📋 Todo

- [ ] Year & Month Selection Feature 
- [ ] Abstraction Datepicker Component Input 
- [ ] Demo site (Github Pages)
- [ ] Range Datepicker Input 

## 📝 License 
MIT


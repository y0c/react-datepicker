<p align="center">

<img src="https://user-images.githubusercontent.com/2585676/52951566-75d55580-33c5-11e9-8e00-b8e227dc0280.png" alt="drawing" width="200"/>


</p>
<h1 align="center">

React DatePicker

</h1>


<p align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/%40y0c%2Freact-datepicker.svg)](https://badge.fury.io/js/%40y0c%2Freact-datepicker) 
[![Build Status](https://travis-ci.com/y0c/react-datepicker.svg?branch=master)](https://travis-ci.com/y0c/react-datepicker)
[![codecov](https://codecov.io/gh/y0c/react-datepicker/branch/master/graph/badge.svg)](https://codecov.io/gh/y0c/react-datepicker)
[![Maintainability](https://api.codeclimate.com/v1/badges/e2a0ba59adb7412eae87/maintainability)](https://codeclimate.com/github/y0c/react-datepicker/maintainability)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![dependencies Status](https://david-dm.org/y0c/react-datepicker/status.svg)](https://david-dm.org/y0c/react-datepicker)
[![devDependencies Status](https://david-dm.org/y0c/react-datepicker/dev-status.svg)](https://david-dm.org/y0c/react-datepicker?type=dev)
[![Storybook](https://github.com/storybooks/brand/blob/master/badge/badge-storybook.svg)](https://y0c.github.io/react-datepicker)
[![NPM Download](https://img.shields.io/npm/dt/@y0c/react-datepicker.svg?style=flat)](https://www.npmjs.com/package/@y0c/react-datepicker)
[![Join the chat at https://gitter.im/react-datepicker/community](https://badges.gitter.im/react-datepicker/community.svg)](https://gitter.im/react-datepicker/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

</p>

> Flexible, Reusable, Mobile friendly DatePicker Component 

## 🎬 Intro 

### DatePicker

![datepicker](https://user-images.githubusercontent.com/2585676/52909193-a8992400-32c7-11e9-9266-7735c0e6e705.gif)


### RangeDatePicker 

![rangedatepicker](https://user-images.githubusercontent.com/2585676/52909117-d7ae9600-32c5-11e9-902a-4df671e82611.gif)


[Demo in Storybook](https://y0c.github.io/react-datepicker)

[![Edit React Datepicker](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pw6n17pk57)

## ✨ Major Component 

* RangeDatePicker
* DatePicker
* Standalone Calendar

The components that you can use are as follows: If you want to configure the `DatePicker` yourself, you can configure it any way you want through the `Default Calendar component`.

## 🔧 Built With

* TypeScript
* Sass
* React

## 📦 Dependency 

* Moment.js

In previous versions, moment.js were used. but now it is changed to `Day.js` to because of bundle size issue (#14)

* [Day.js](https://github.com/iamkun/dayjs)

`Day.js` is a javascript library for Parse, validate, manipulate, and display dates and times. this component use `Day.js` library to globalize and control date. You can check the locale list through this [link](https://github.com/iamkun/dayjs/tree/dev/src/locale).

## 📲 Installation 

```sh
yarn add @y0c/react-datepicker
# or 
npm install --save @y0c/react-datepicker
```

## 💡 Examples 

### Simple DatePicker 

```javascript
// import Calendar Component 
import React, { Component } from 'react';
import { DatePicker } from '@y0c/react-datepicker';
// import calendar style 
// You can customize style by copying asset folder.
import '@y0c/react-datepicker/assets/styles/calendar.scss';

class DatePickerExample extends Component {

  onChange = (date) => {
    // Day.js object
    console.log(date);

    // to normal Date object
    console.log(date.toDate());
  }
  
  render() {
    return (
      <DatePicker onChange={this.onChange}/>
    )
  }
}
```

You can find more Exmaples and Demo in story book link

## 🌎 i18n

Features for i18n are provided by Day.js by default.

see locale list https://github.com/iamkun/dayjs/tree/dev/src/

and you can customize the locale object

```javascript
// use day.js locale
import 'dayjs/locale/ko'

// delivery prop locale string  
<DatePicker locale="ko" />

// or define customize locale object 
const locale = {
  name: 'ko',
  weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
  weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
  months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
};

// delivery propr locale object
<DatePicker locale={locale} />
```

Defaults locale `en`

### 🎨 Themeing

1. Copy this project asset folder under scss file
2. Override scss variable you want(_variable.scss) 
( red theme examples )

```scss
// red_theme.scss
$base-font-size: 12px;
$title-font-size: 1.3em;

// override scss variable
$primary-color-dark: #e64a19;
$primary-color: #ff5722;
$primary-color-light: #ffccbc;
$primary-color-text: #ffffff;
$accent-color: #ff5252;
$primary-text-color: #212121;
$secondary-text-color: #757575;
$divider-color: #e4e4e4;
$today-bg-color: #fff9c4;

// import mixin 
@import "../node_modules/@y0c/react-datepicker/assets/styles/_mixin.scss";
// import app scss
// if you want other style customize 
// app.scss copy & rewrite !
@import "../node_modules/@y0c/react-datepicker/assets/styles/app.scss";

```

if you want custom css rewrite `app.scss` file 

Try this example! 

[![Edit 1rw1lp8w7j](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1rw1lp8w7j) 

## ⚙️ Local Development

This component is managed by a `storybook` which is combined with `develop environment` and `documentation`. If you want develop in local environment, clone project and develop through a storybook

```sh
# clone this project
git clone https://github.com/y0c/react-datepicker.git
# install dependency
yarn
# start storybook 
yarn run storybook
```
Open your browser and connect http://localhost:6006

## 💼 Get Support

Please fork and use [https://codesandbox.io/s/pw6n17pk57](https://codesandbox.io/s/pw6n17pk57) to reproduce your problem.

* Open a new issue(Bug or Feature) on [Github](https://github.com/y0c/react-datepicker/issues/new/choose)
* Join the [Gitter room](https://gitter.im/react-datepicker/community) to chat with other developers.

## 👨‍👦‍👦 Contribution 

Issue and Pull Request are always welcome! 

## 📝 License 
MIT


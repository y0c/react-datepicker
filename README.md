<center>

# ![image](https://user-images.githubusercontent.com/2585676/51196670-fd492800-1932-11e9-932e-30920312460e.png) React Datepicker

</center>

---

<center>

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/%40y0c%2Freact-datepicker.svg)](https://badge.fury.io/js/%40y0c%2Freact-datepicker) 
[![Build Status](https://travis-ci.com/y0c/react-datepicker.svg?branch=master)](https://travis-ci.com/y0c/react-datepicker)
[![codecov](https://codecov.io/gh/y0c/react-datepicker/branch/master/graph/badge.svg)](https://codecov.io/gh/y0c/react-datepicker)
[![Maintainability](https://api.codeclimate.com/v1/badges/e2a0ba59adb7412eae87/maintainability)](https://codeclimate.com/github/y0c/react-datepicker/maintainability)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![dependencies Status](https://david-dm.org/y0c/react-datepicker/status.svg)](https://david-dm.org/y0c/react-datepicker)
[![devDependencies Status](https://david-dm.org/y0c/react-datepicker/dev-status.svg)](https://david-dm.org/y0c/react-datepicker?type=dev)
[![Storybook](https://github.com/storybooks/brand/blob/master/badges/storybook.svg)](https://y0c.github.io/react-datepicker)

</center>

> Flexible, Reusable, Mobile friendly DatePicker Component 

## 🎬 Intro 

### DatePicker

![datepicker](https://user-images.githubusercontent.com/2585676/52909193-a8992400-32c7-11e9-9266-7735c0e6e705.gif)

### RangeDatePicker 

![rangedatepicker](https://user-images.githubusercontent.com/2585676/52909117-d7ae9600-32c5-11e9-902a-4df671e82611.gif)

### TimePicker

![timepicker](https://user-images.githubusercontent.com/2585676/52909206-fd3c9f00-32c7-11e9-983e-94594c9847f4.gif)

[Demo in Storybook](https://y0c.github.io/react-datepicker)

## ✨ Major Component 

* RangeDatePicker
* DatePicker
* Standalone Calendar
* TimePicker

The components that you can use are as follows: If you want to configure the `DatePicker` yourself, you can configure it any way you want through the `Default Calendar component`.

## 🔧 Built With

* TypeScript
* Sass
* React

## 📦 Dependency 

* [Moment](https://momentjs.com)

`Moment` is a javascript library for Parse, validate, manipulate, and display dates and times. this component use moment library to globalize and control date

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

// Please include the locale you want to use.
// and delivery props to calendar component 
import 'moment/locale/ko';

class DatePickerExample extends Component {

  onChange = (date) => {
    console.log(date);
  }
  
  render() {
    return (
      <DatePicker locale="ko" onChange={this.onChange}/>
    )
  }
}
```
You can find more Exmaples and Demo in story book link

### 🎨 Themeing

1. Copy this project asset folder under scss file
2. Override scss variable you want(_variable.scss) 
( red theme examples )

```scss
$base-font-size: 12px;
$title-font-size: 1.3em;

$primary-color-dark:   #49599a;
$primary-color:        red;
$primary-color-light:  #aab6fe;
$primary-color-text:   #FFFFFF;
$accent-color:         #03A9F4;
$primary-text-color:   #212121;
$secondary-text-color: #757575;
$divider-color:        #e4e4e4;
$today-bg-color:       #FFF9C4;

@import "../_mixin.scss";
@import "../app.scss";

```
if you want custom css rewrite `app.scss` file 


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


## 📝 License 
MIT


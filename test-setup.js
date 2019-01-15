/**
 * React 16 Adapter for Enzyme 
 */
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16'); 

enzyme.configure({ adapter: new Adapter() });
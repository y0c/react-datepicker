/**
 * Get rids of the missing requestAnimatinoFrame polyfill warning 
 */
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

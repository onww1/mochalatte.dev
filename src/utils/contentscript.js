// Reference : https://github.com/williambelle/github-contribution-color-graph

'use strict';

// Themes from GitHub
const github = ['#eeeeee', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];
const halloween = ['#eeeeee', '#fdf156', '#ffc722', '#ff9711', '#04001b'];

// Themes from Material design
const amber = ['#eeeeee', '#ffecb3', '#ffd54f', '#ffb300', '#ff6f00'];
const blue = ['#eeeeee', '#bbdefb', '#64b5f6', '#1e88e5', '#0d47a1'];
const bluegrey = ['#eeeeee', '#cfd8dc', '#90a4ae', '#546e7a', '#263238'];
const cyan = ['#eeeeee', '#b2ebf2', '#4dd0e1', '#00acc1', '#006064'];
const green = ['#eeeeee', '#c8e6c9', '#81c784', '#43a047', '#1b5e20'];
const lightblue = ['#eeeeee', '#b3e5fc', '#4fc3f7', '#039be5', '#01579b'];
const lightgreen = ['#eeeeee', '#dcedc8', '#aed581', '#7cb342', '#33691e'];
const lime = ['#eeeeee', '#f0f4c3', '#dce775', '#c0ca33', '#827717'];
const orange = ['#eeeeee', '#ffe0b2', '#ffb74d', '#fb8c00', '#e65100'];
const teal = ['#eeeeee', '#b2dfdb', '#4db6ac', '#00897b', '#004d40'];
const yellowMd = ['#eeeeee', '#fff9c4', '#fff176', '#ffd835', '#f57f17'];

// Theme from Me
const unicorn = ['#eeeeee', '#6dc5fb', '#f6f68c', '#8affa4', '#f283d1'];
const summer = ['#eeeeee', '#eae374', '#f9d62e', '#fc913a', '#ff4e50'];

// Theme from MoonAntonio
const yellow = ['#eeeeee', '#d7d7a2', '#d4d462', '#e0e03f', '#ffff00'];

const colors = {
  github,
  halloween,
  amber,
  blue,
  bluegrey,
  cyan,
  green,
  lightblue,
  lightgreen,
  lime,
  orange,
  teal,
  yellowMd,
  summer,
  unicorn,
  yellow
};

function randomProperty(obj) {
  const keys = Object.keys(obj);
  return keys[Math.floor(keys.length * Math.random())];
}

export default function getRandomPalette() {
  const key = randomProperty(colors);
  return colors[key];
}

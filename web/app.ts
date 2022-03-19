import Vue from 'vue';
import GuWallet from './vue/Wallet.vue';
import './scss/main.scss';

const lowerTheFirstLetter = str => (str.charAt(0).toLowerCase() + str.slice(1));
const toCamel = str => str.replace(/_([a-z])/g, g => g[1].toUpperCase());
const toUnderscore = str => str.replace(/([A-Z])/g, g => `_${g.toLowerCase()}`);
const toDashed = str => lowerTheFirstLetter(toCamel(str)).replace(/([A-Z])/g, g => `-${g.toLowerCase()}`);
(<any>window).azVueComponents = (<any>window).azVueComponents || {};

(<any>window).azVueComponents = {
  ...(<any>window).azVueComponents,
  GuWallet
};

(<any>window).AzVueComponentPlugin = {
  install: (Vue, options) => {
    Object.keys((<any>window).azVueComponents).forEach((k) => {
      Vue.component(toDashed(k), (<any>window).azVueComponents[k]);
    });
  },
};

(<any>window).Vue = Vue;

Vue.use((<any>window).AzVueComponentPlugin);

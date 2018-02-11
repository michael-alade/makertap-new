import Vue from 'vue'
import VueSocketio from 'vue-socket.io';
import socket from 'socket.io-client'

console.log(process.env.WS_URL, 'process')
Vue.use(VueSocketio, socket(process.env.WS_URL));

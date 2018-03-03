import Vue from 'vue'
import VueSocketio from 'vue-socket.io';
import socket from 'socket.io-client'
Vue.use(VueSocketio, socket(process.env.WS_URL));

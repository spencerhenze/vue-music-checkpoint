import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import itunes from '@/components/itunes'

Vue.use(Router)

var routes = new Router({
    routes: [
        { name: 'Home', component: Home, path: '/' }
    ]
})

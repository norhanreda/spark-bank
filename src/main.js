import { createApp } from 'vue'
import { createRouter,createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue';
import AboutUs from './components/AboutUs.vue';
import TheCustomers from './components/TheCustomers'
import createCustomer from './components/createCustomer'
import App from './App.vue'
const router=createRouter(
   {
    history:createWebHistory(),
    routes:[
     {
          path:'/', component:HomePage
         
     },
        {
             path:'/home', component:HomePage
            
        },
        {
            path:'/about', component:AboutUs
           
       },
       {
        path:'/customers', component:TheCustomers
       
       },
       {
          path:'/createCustomers', component:createCustomer
         
         },
         {
          // to catch all routs 
          path:'/:notFound(.*)',  component:HomePage,
      },
    ]
}

);
const app=createApp(App);
app.use(router);
app.mount('#app');

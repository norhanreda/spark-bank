import { createApp } from 'vue'
import { createRouter,createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue';
import TheTransactions from './components/TheTransactions.vue';
import TheCustomers from './components/TheCustomers'
import createCustomer from './components/createCustomer'
import TheProfile from './components/TheProfile'
import TheTransfer from './components/TheTransfer'
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
            path:'/transactions', component:TheTransactions
           
       },
       {
        path:'/customers', component:TheCustomers
       
       },
       {
          path:'/createCustomers', component:createCustomer
         
         },
         {
          name:'profile',path:'/profile:id', component:TheProfile ,
          
         
         },
         {
          name:'transfer',path:'/transfer:id', component:TheTransfer ,
          
         
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

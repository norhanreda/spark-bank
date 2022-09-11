<template>
 
  <button @click="goto">add customer </button>
    <h1>customers</h1>

    <p v-if="isLoading" style="color:pink">Loading data please wait.......... </p>
    <p v-else-if="error && !isLoading" style="color:red"> {{error}} </p>
    <p v-else-if="!isLoading && (!results || results.length===0)">There is no Data</p>
    <ul  v-else-if="!isLoading && results &&results.length>0">
      <tr>
        <th>Company</th>
        <th>Contact</th>
        <th>Country</th>
      </tr>
     <li
         v-for="result in results"
          :key="result.id"
     >
  
    

    <table>
      
      <tr>
        <td>{{result.name}}</td>
        <td>{{result.email}} </td>
        <td> {{result.balance}}</td>
        <!-- <td> <router-link> View custumer</router-link></td> -->
      </tr>

    </table>
    
    </li> 
     
     
</ul>

  </template>
  
  
  
  <script>
  export default {
    data()
    {
    return{
      isLoading:false,
      results:[],
      error:null,
    };
    },
    
    components: {
      
    },
    methods:
    {
      goto()
      {
        this.$router.push('/createCustomers');
      },
      loadData()
    {
      this.isLoading=true;
      fetch('https://sparks-bank-cdcdf-default-rtdb.firebaseio.com/bank.json')
      .then((response)=>{
            if(response.ok)
             {
                return response.json();
             }

      }).then((data)=>{
        this.isLoading=false;
           console.log(data);
          const res=[];
          for(const id in data)
          {
              res.push({id:id,name:data[id].name,email:data[id].emial,balance:data[id].balance});
          }
          this.results=res;
      },
     
      ).catch((error)=>
           {
            console.log(error);
            this.isLoading=false;
            this.error="faild to fetch data please try again later ........";
           }
      )
      ;

    },
    },
    mounted()
 {
  this.loadData();
 }
  }
  </script>
  
  <style scoped>
    
  
  </style>
  
<template>
  <h1 >customers</h1>
  <button @click="goto">add customer </button>

    <p v-if="isLoading" style="color:pink">Loading data please wait.......... </p>
    <p v-else-if="error && !isLoading" style="color:red"> {{error}} </p>
    <p v-else-if="!isLoading && (!results || results.length===0)">There is no Data</p>
     <table v-else-if="!isLoading && results &&results.length>0" class="table">
    
      <thead>
        <th>Name</th>
        <th>Email</th>
        <th>Current Balance</th>
        <th>View custumer</th>
      </thead>
      <tbody>
      <tr  v-for="result in results"
      :key="result.id">
        <td>{{result.name}}</td>
        <td>{{result.email}} </td>
        <td> {{result.balance}} $</td>
        <td> 
          <router-link :to="{ name: 'profile', params: {id:result.id} }">view</router-link>
          
          
        </td>
      </tr>
      
    </tbody>
    
    </table>
    
    
     
     


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
      shareData(ID)
      {
        this.$router.push({name:"profile" ,params:{id:ID}});
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
 },


  }
  </script>
  
  <style scoped>
    h1
    {
     position: absolute;
     left: 45%;
     top:12%;
     margin:10px 0;
     padding: 10px;
    }
    body{
      margin: 0;
      padding: 20px;
      font-family: sans-serif;
    }
    *
    {
      box-sizing: border-box;
    }
    .table
    {
     width: 100%;
     border-collapse: collapse;
     position:absolute;
     top:30%;
    }
    .table td,.table th {
      padding: 12px 15px;
      border:1px solid grey ;
      text-align: center;
    }

    .table th
    {
     background-color: pink;
     

    }

    .table tbody tr:nth-child(even)
    {
      background-color: #f5f5f5;
    }
    /*responsive*/

    /*@media(max-width: 500px)
    {
       .table thead{
       display:none;
       }
    }*/
  
  </style>
  
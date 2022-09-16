<template>
  <h1 >Transactions</h1>


    <p v-if="isLoading" style="color:pink">Loading data please wait.......... </p>
    <p v-else-if="error && !isLoading" style="color:red"> {{error}} </p>
    <p v-else-if="!isLoading && (!results || results.length===0)">There is no Data</p>
     <table v-else-if="!isLoading && results &&results.length>0" class="table">
    
      <thead>
        <th>From</th>
        <th>To</th>
        <th>Value</th>
        <th>Date</th>
      </thead>
      <tbody>
      <tr  v-for="result in results"
      :key="result.id">
        <td>{{result.from}}</td>
        <td>{{result.to}} </td>
        <td> {{result.value}} $</td>
        <td> {{result.date}}</td>
  
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
  
      loadData()
    {
      this.isLoading=true;
      fetch('https://sparks-bank-cdcdf-default-rtdb.firebaseio.com/transaction.json')
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
              res.push({id:id,from:data[id].from,to:data[id].to,value:data[id].value,date:data[id].date});
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
  
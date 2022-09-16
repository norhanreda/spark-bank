<template>
<p align="center" style="font-size:20; padding:10px;"> <b>user profile </b></p>
<div v-for="result in results"
:key="result.id">
    <ul >
    
    <div  v-if="this.id===result.id">
      <div class="control">
    <label >Name: </label>
    <li  >
     {{result.name}}
    </li>
    </div>
    <div class="control">
    <label >Email: </label>
    <li >
      {{result.email}}
    </li>
  </div>
    <div class="control">
    <label >Current Balance: </label>
    <li >
      {{result.balance}}
    </li>
  </div>
    </div>
    
    </ul>
    <div>
      <button @click="transfer(result.id)">transfer</button>
    </div>
    </div>
    
  </template>
  
  
  
  <script>
  export default {
    // props:['name','email','balance'],
    data()
    {
        return{
            id:'',
            name:'',
            email:'',
            balance:'',
            isLoading:false,
            results:[],
            error:null,
          
            
        };
    },
    components: {
      
    },
    created(){
        this.id=this.$route.params.id;
      // this.name=this.$route.params.name;
      // this.email=this.$route.params.email;
      // this.balance=this.$route.params.balance;
    },
    methods:
    {
      transfer(ID)
      {
        this.$router.push({name:"transfer" ,params:{id:ID}});
      
      },
     loadProfile()
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

     }
    },
    
      mounted()
 {
  this.loadProfile();
 },
    
  }
  </script>
  
  <style scoped>
  label
  {
    color: rgb(249, 5, 143);
  }
  .control
  {
    padding: 10px 20px;
    margin: 20px 50px;
  }
  li
  {
    list-style: none;
  }
  
  </style>
  
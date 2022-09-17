<template>
    <form @submit.prevent="updatData">
      <div class="form">
        <label> from:</label>
        <br>
        <select name="from" id="from" v-model.trim="from">
          <option 
          v-for="result in results"
           :key="result.id"
           :value="result.id"
          
          >{{result.name}}</option>
          
        </select>
      </div>
  
      <div class="form">
        <label> to:</label>
        <br>
        <select name="to" id="to"  v-model.trim="to">
          <option 
          v-for="result in results"
           :key="result.id"
           :value="result.id"
          
          >{{result.name}}</option>
          
        </select>
      </div>
  
      <div class="form">
        <label> value:</label>
        <br>
        <input type="number" v-model.trim="value" />
      </div>

      <div class="form">
        <label> date:</label>
        <br>
        <input type="Date" v-model.trim="date"   dateformat="y M d" />
      </div>
   
      
      <button type="submit">transfer</button>
    </form>
    {{from}}
    {{to}}
    {{results[(results.findIndex((item) => item.id === to))]?.balance}}
    {{date}}
  </template>
  
  <script>
 
 
  export default {
    data() {
      return {
        history:{},
        from: "",
        to: "",
        value: "",
        date:'',
        invalidInput: false,
        error:null,
        isLoading:false,
        results:[],
        
      
      };
    },
  
    components: {},
    methods: {
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
    async updatData(){
      //delete old data
      
      fetch('https://sparks-bank-cdcdf-default-rtdb.firebaseio.com/bank.json' ,
      {
      method:'DELETE',
       headers:
       {
       'Content-Type':'application/json'
     
      },
      
     
      
      body: JSON.stringify({
    
      }),

      }
      
      ).then (response =>
      {
         
        if(response.ok)
        {
              console.log('done......');
        }
        else
        {
          throw new Error('Could not save data! ');
        }
      }
        

      ).catch((Error)=>
      {
        console.log(Error);
        this.error=Error.message;
      });
   


      ////////////////////////////////////////////////////////
       //update data

      // this.results[(this.results.findIndex((item) => item.id === this.from))]?.balance-this.value;
      // this.results[(this.results.findIndex((item) => item.id === this.to))]?.balance-this.value;

      for(var i = 0; i < this.results.length; i++)
      {
        if(this.results[i].id === this.from)
          {
            this.results[i].balance=this.results[i].balance-this.value;
          }
          if(this.results[i].id === this.to)
          {
            this.results[i].balance=this.results[i].balance+this.value;
          }


        fetch('https://sparks-bank-cdcdf-default-rtdb.firebaseio.com/bank.json',
      {
      method:'POST',
      headers:{
       'Content-Type':'application/json'
      },
      body: JSON.stringify({
          name:this.results[i].name,
          emial:this.results[i].email,
        
          balance:this.results[i].balance,
    
          
      }),

      }
      
      ).then (response =>
      {
         
        if(response.ok)
        {
              console.log('done......');
        }
        else
        {
          throw new Error('Could not save data! ');
        }
      }
        

      ).catch((Error)=>
      {
        console.log(Error);
        this.error=Error.message;
      });


    
      }
      
      //insert transction

      fetch('https://sparks-bank-cdcdf-default-rtdb.firebaseio.com/transaction.json',
      {
      method:'POST',
      headers:{
       'Content-Type':'application/json'
      },
      body: JSON.stringify({
          from:this.results[(this.results.findIndex((item) => item.id === this.from))]?.name,
          to:this.results[(this.results.findIndex((item) => item.id === this.to))]?.name,
          value:this.value,
          date:this.date,
    
          
      }),

      }
      
      ).then (response =>
      {
         
        if(response.ok)
        {
              console.log('done......');
        }
        else
        {
          throw new Error('Could not save data! ');
        }
      }
        

      ).catch((Error)=>
      {
        console.log(Error);
        this.error=Error.message;
      });

       // for v-model
      this.from="";
      this.to="";
      this.value="";
      
      
   

        } ,


    },
    mounted()
 {
  this.loadData();
 },
  };
  </script>
  
  <style scoped>
  div {
    margin: 5px;
    padding: 5px;
  
  }
  form
  {
    position: absolute;
    left: 45%;
  }
  
  
  button
  {
    cursor: pointer;
    background-color: rgb(194, 40, 173);
    border-color: black;
    border-width: 1px;
    border-radius: 5px;
    padding: 5px;
    margin:1px auto;
    position:absolute;
    left:35%;
    top:250px;
  }
  button:hover
  {
    cursor: pointer;
    background-color: pink;
    border-color: black;
    border-width: 1px;
    border-radius: 5px;
    padding: 5px;
    margin:1px auto;
    position:absolute;
    left:35%;
    top:250px;
  }
  </style>
  
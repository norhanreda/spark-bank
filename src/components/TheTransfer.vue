<template>
  <base-dialog 
  title="money is not enough"
  v-if="view"
  >  
 
  <p>your balance is no't enough to complete the transaction! </p>
  <template  v-slot:actions> <button @click="ok">ok</button> </template>
</base-dialog>
  <div class="con">
  <div class="card">
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
   
      
      <button type="submit" id="sub">transfer</button>
    </form>
    </div>
  </div>
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
        view:false,
      
      };
    },
  
    components: {
      
    },
    methods: {
      ok()
      {
    this.view=false;
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
    async updatData(){
      
      for(var j = 0; j< this.results.length; j++)
      {
        if(this.results[j].id === this.from)
          {
            if( this.results[j].balance<=this.value)
            {
              this.view=true;
            return;
            }
          }
         
        }
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
      this.date="";
      
      
   

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
    left: 22%;
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(45deg, pink, rgb(139, 4, 249));
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }
  

  .card {
    position: relative;
    width: 350px;
    height: 350px;
    /*background: #fff;*/
    background: linear-gradient(45deg, pink, rgb(139, 4, 249));
    border-radius: 20px;
    box-shadow: 0 35px 80px rgba(0, 0, 0, 0.15);
    transition: 0.5s;
  }
  .con
  {
    display: flex;
    justify-content: center;
    align-items: center;
   
  }
  input,select
  {
 width: 150px;
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
      color: white;
     
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
      color: black;
      
    }
    #sub
    {
      position: absolute;
      left:35%;
      top:100%;
    }
  </style>
  
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
        <select name="to" id="to" v-model.trim="to">
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
        <label> Date:</label>
        <br>
        <input type="Date" v-model.trim="Date" />
      </div>
  
      <button type="submit">transfer</button>
    </form>
    {{from}}
    {{to}}
    {{results[(results.findIndex((item) => item.id === to))]?.balance}}

  </template>
  
  <script>
  // import axios from "axios";
 
  export default {
    data() {
      return {
        history:{},
        from: "",
        to: "",
        value: "",
        Date:'',
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
            // try {
              
            //      await axios.patch(`https://sparks-bank-cdcdf-default-rtdb.firebaseio.com/bank.json?id=balance`,
            //      {
            //      balance:this.results[(this.results.findIndex((item) => item.id === this.to))]?.balance-this.value,
            //     //  history:this.results[(this.results.findIndex((item) => item.id === this.to))]?.history.push(this.history),

            //      });
            //      this.to="";
            //      this.from="";
            //      this.value="";
            //      this.Date="";
            //      this.history={};
            //     //  this.$router.push('/');
                
            // } catch (error) {
            //     console.log(error);
            // }

            let headers = new Headers();
            
              headers.append('Content-Type', 'application/json');
              headers.append('Origin','*');
              headers.append("Access-Control-Allow-Origin: *");
headers.append('Access-Control-Allow-Methods: GET, POST, OPTIONS');
headers.append("Access-Control-Allow-Headers: Content-Type, Authorization");
            
            fetch('https://sparks-bank-cdcdf-default-rtdb.firebaseio.com/bank/-NBwMPsq5nw8F7jYO2e4',{mode:'cors'},
      {
      method:'PATCH',
       headers:headers,
      //  {
      //  'Content-Type':'application/json',
      //  'Access-Control-Allow-Credentials':true,
      // 'Access-Control-Allow-Origin':'*',
      // },
      
     
      
      body: JSON.stringify({
        balance:this.results[(this.results.findIndex((item) => item.id === this.to))]?.balance-this.value,
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
     this.name='';
     this.email='';
     this.balance='';

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
  
  
  button {
    margin: 0.5rem;
    padding: 0.5rem;
    width: 5rem;
   /* position: absolute;
    left: 45%;*/
  }
  </style>
  
<template>
  <div class="con">
    <div class="card">
  <form @submit.prevent="submitData">
    <div class="form">
      <label> Name:</label>
      <br>
      <input type="text" v-model.trim="name" />
    </div>

    <div class="form">
      <label> E-mail:</label>
      <br>
      <input type="email" v-model.trim="email" />
    </div>

    <div class="form">
      <label> Current balance:</label>
      <br>
      <input type="number" v-model.trim="balance" />
    </div>

    <button type="submit">Add</button>
  </form>
  </div>
  </div>
</template>

<script>
  //  import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      balance: "",
      invalidInput: false,
      error:null,
    };
  },

  components: {},
  methods: {
    submitData() {
      if (this.name === "" || this.email==='' || this.balance==='') {
        this.invalidInput = true;
        return;
      }
      this.invalidInput = false;


         
                //   axios.post(`http://localhost:8888/spark/api.php?action=addusers`,
                //  {
                // name:this.name,
                // email:this.email,
                // balance:this.balance,
                //  }).then(function(response)
                //  {
                //      console.log(response)
                //  }). catch (function(error)
                //  {
                // console.log(error);
                //         }
                //  );
                      
                //  this.name="";
                //  this.email="";
                //  this.balance="";
                
                
            
      fetch('https://sparks-bank-cdcdf-default-rtdb.firebaseio.com/bank.json',
      {
      method:'POST',
      headers:{
       'Content-Type':'application/json'
      },
      body: JSON.stringify({
          name:this.name,
          emial:this.email,
          balance:this.balance,
          history:[{from:'',to:'',value:'',Date:''}]
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


    },
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
  top:10px;
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
      left:22%;
      top:200px;
      width:100px;
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
      left:22%;
      top:200x;
      width:100px;
      
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
</style>

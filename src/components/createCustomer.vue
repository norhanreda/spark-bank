<template>
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

<template>
  <div class="text">
  <h2>Welcome to sparks bank</h2>
  <div class="para" >
  <p>This system is designed to show the transactions between customers  </p>
  <p>and the history of each customer stored in data base. </p>
  <router-link to="customers" id="go">Go to customers </router-link>
  </div>
  </div>
  <p align="right"><img src="./images/20944139.jpg" width="600" height="400" alt="home" > </p>
  
</template>



<script>
export default {
  
  components: {
    
  },
}
</script>

<style scoped>

  h2
  {
    display: flex;
    position: relative;
    left: 15%;
  
  }
  .para
  {
    position: relative;
    left: 10%;
    padding: 10px;
   
  }
  .text
  {
    position: relative;
    top:10% ;
  }
  #go
  {
    text-decoration: none;
    color:black;
    
  }


</style>

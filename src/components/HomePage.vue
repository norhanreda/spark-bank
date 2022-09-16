<template>
  <div class="text">
  <h2>Welcome to sparks bank</h2>
  <div class="para" >
  <p>This system is designed to show the transactions between customers  </p>
  <p>and the history of each customer stored in data base. </p>
  <button @click="go" >Go to view all customers </button>
  </div>
  </div>
 <p align="right"> <img   src="./images/20944139.jpg" width="600" height="400" alt="home" > </p>
  
</template>



<script>
export default {
  
  components: {
    
  },
  methods:
  {
  go()
  {
   
      this.$router.push('/customers');
     
  },
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
    font-family: sans-serif;
  }
  #go
  {
    text-decoration: none;
    color:black;
    border-color: palevioletred;
    border-radius: 0.5rem;
    border-style:solid ;
    padding:0.5rem;
    margin: 10px 0;
  }

  button
  {

    margin:1rem 5rem;
    padding: 0.5rem;
    cursor: pointer;
    background-color: pink;
    border-radius: 0.5rem;
  }

 

</style>

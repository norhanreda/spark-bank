<template>

    <div class="container">
     <h1> Sparks Bank</h1>
      <div class="links">
        
        <ul>
          <li> <a href="#home">Home</a></li>
          <li> <a href="#customers">Customers</a></li>
          <li> <a href="#about">About</a></li>
        </ul>
      
      </div>

 </div>
  
    
  
</template>

<script>
//import HomePage from './components/HomePage.vue';

export default {

  components: {
   // HomePage,
  }
}
</script>

<style >
  *{
    margin: 0;
    padding: 0;
  }
  .container
  {
    background-color: pink;

 
    margin:2rem auto;
    padding: 1rem;
    width: 100%;
    position: relative;
    top: 0%;
    left: 0%;
  }
.links

  {

   
     
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:10px 0;
    margin: auto;

   position: absolute;
   left: 80%;
   top: 0%;

  }

  .links ul li
  {
    list-style: none;
    display: inline-block;
    margin:0.5rem 0.5rem;

  }

  .links ul li a
  {
    text-decoration: none;
    text-transform: uppercase;
    color: black;
  }
 

</style>

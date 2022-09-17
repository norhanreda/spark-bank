<template>

    <div class="container">
     <h1> Sparks Bank</h1>
      <div class="links">
        
        <ul>
          <li> <router-link to="/home">Home</router-link></li>
          <li> <router-link to="/customers">customers</router-link></li>
          <li><router-link to="/transfer">Transfer</router-link> </li>
          <li><router-link to="/transactions">Transactions</router-link> </li>
        </ul>
      
      </div>

 </div>
  
    <router-view></router-view>
  
</template>

<script>


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
    background: linear-gradient(45deg,pink,rgb(139, 4, 249));

 
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
   left: 65%;
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
  /*.links ul li ::after
  {
    content: '';
    width: 100%;
    height: 3px;
    background:brown;
    position: absolute;
    left: 0;
    bottom: 0px;
  }*/
 

</style>

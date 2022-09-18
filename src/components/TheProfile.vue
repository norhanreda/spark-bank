<template>
  <teleport to="body">
  <p align="center" style="font-size: 20; padding: 10px">
    
  </p>
  
  <div v-for="result in results" :key="result.id">
    <ul>
      <div v-if="this.id === result.id" class="con">
        <div class="card">
          <div class="imgbox">

            <img   src="./images/user_icon.png"  width="150" height="150" alt="profile" >
          </div>
          <div id="trans">
            <button @click="transfer()">transfer</button>
          </div>
          
          <div class="content">
            
            <div class="control">
              <label>Name: </label>
              <li>
                {{ result.name }}
              </li>
            </div>
            <div class="control">
              <label>Email: </label>
              <li>
                {{ result.email }}
              </li>
            </div>
            <div class="control">
              <label>Current Balance: </label>
              <li>{{ result.balance }} $</li>
            </div>
            
          </div>
          
        </div>
      </div>
      <div v-if="this.id === result.id">
        <h2 id="his">history</h2>
        <p v-if="load" style="color: pink">
          Loading data please wait..........
        </p>
        <p v-else-if="e && !load" style="color: red">{{ e }}</p>
        <p v-else-if="!load && (!history || history.length === 0)">
          There is no Data
        </p>

        <table v-else-if="!load && history && history.length > 0" class="table">
          <thead>
            <th>#From</th>
            <th>#To</th>
            <th>Value $</th>
            <th>Date</th>
          </thead>
          <tbody>
            <tr v-for="his in history" :key="his.id">
              <td v-if="his.from === result.name || his.to === result.name">
                {{ his.from }}
              </td>
              <td v-if="his.from === result.name || his.to === result.name">
                {{ his.to }}
              </td>
              <td v-if="his.from === result.name || his.to === result.name">
                {{ his.value }} $
              </td>
              <td v-if="his.from === result.name || his.to === result.name">
                {{ his.date }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ul>
  </div>
  </teleport>
</template>

<script>
export default {
  // props:['name','email','balance'],
  data() {
    return {
      id: "",
      name: "",
      email: "",
      balance: "",
      isLoading: false,
      results: [],
      error: null,
      history: [],
      load: false,
      e: null,
    };
  },
  components: {},
  created() {
    this.id = this.$route.params.id;
    // this.name=this.$route.params.name;
    // this.email=this.$route.params.email;
    // this.balance=this.$route.params.balance;
  },
  methods: {
    transfer() {
      this.$router.push("/transfer");
    },
    loadProfile() {
      this.isLoading = true;
      fetch("https://sparks-bank-cdcdf-default-rtdb.firebaseio.com/bank.json")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.isLoading = false;
          console.log(data);
          const res = [];
          for (const id in data) {
            res.push({
              id: id,
              name: data[id].name,
              email: data[id].emial,
              balance: data[id].balance,
            });
          }
          this.results = res;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.error = "faild to fetch data please try again later ........";
        });
    },
    getHistory() {
      this.load = true;
      fetch(
        "https://sparks-bank-cdcdf-default-rtdb.firebaseio.com/transaction.json"
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.load = false;
          console.log(data);
          const res = [];
          for (const id in data) {
            res.push({
              id: id,
              from: data[id].from,
              to: data[id].to,
              value: data[id].value,
              date: data[id].date,
            });
          }
          this.history = res;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.e = "faild to fetch data please try again later ........";
        });
    },
  },

  mounted() {
    this.loadProfile();
    this.getHistory();
  },
};
</script>

<style scoped>
label {
  color: rgb(249, 5, 143);
}
.control {
  padding: 1px 2px;
  margin: 2px 5px;
}
li {
  list-style: none;
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
.table {
  width: 100%;
  border-collapse: collapse;
  position: absolute;
  top: 70%;
}
.table td,
.table th {
  padding: 12px 15px;
  border: 1px solid grey;
  text-align: center;
}

.table th {
  /*background-color: pink;*/
  background-color: rgb(194, 40, 173);
}

.table tbody tr:nth-child(even) {
  background-color: #f5f5f5;
}

#trans {
  position: absolute;
  left: 45%;
  top: 220px;
}
#his {
  position: absolute;
  top: 62%;
  left: 48%;
}
.con {
  display: flex;
  justify-content: center;
  align-items: center;
  /*background: linear-gradient(45deg,pink,rgb(139, 4, 249));*/
}
.card {
  position: relative;
  width: 350px;
  height: 250px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 35px 80px rgba(0, 0, 0, 0.15);
  transition: 0.5s;
}
.imgbox {
  position: absolute;
  width: 150px;
  height: 150px;
  left: 30%;
  top: -50px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
}
.content {
  position: absolute;
  left: 2%;
  top: 100px;
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
     /* position:absolute;
      left:47%;
      top:30%;*/
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
      /*position:absolute;
      left:47%;
      top:30%;*/
    }
    #o
    {
      position: absolute;
      left:1%;
      top:80px;
      
    }
</style>

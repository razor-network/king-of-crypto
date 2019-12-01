<template>
<div class="hello">
    <h1>{{ msg }}</h1>
    <p> <button @click="refresh"> Refresh </button> </p>
    <p> The king of crypto is</p>
    <h2>{{job.name}} </h2>
    <p> Change: {{change}}% </p>
    <p> Jobs: {{jobs}} </p>

    <h3> Add datafeed </h3>
    <input v-model="datafeedId" type="number" min="0" max="20" step="1" />
    <button @click = "addDatafeed" > Add datafeed</button>

</div>
</template>

<script>
import {
  enableEth,
  findKing,
  getKing,
  addDatafeed,
  getJobs,
  getJob,
  test
  // getNetwork
} from '@/utils/common'
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data: function() {
        return {
            jobs: [],
            king:'wait...',
            change:0,
            datafeedId:0,
            test: 'wait',
            job: 'wait...',
            name:'wait..'
        }
    },
    async mounted() {
        await enableEth()
        await this.getKing()
        await this.getJob(this.king)
        // this.name = this.job.name
        await this.getJobs()
        await this.testFunction()
    },
    methods: {
        refresh: async function() {
            await findKing()
        },
        getKing: async function() {
            this.king = await getKing()
        },
        addDatafeed: async function() {
            await addDatafeed(this.datafeedId)
        },
        getJobs: async function() {
            this.jobs = await getJobs()
        },
        testFunction: async function() {
            this.test = await test()
        },
        getJob: async function(id) {
            // console.log('getJob', id)
            this.job = await getJob(id)
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>

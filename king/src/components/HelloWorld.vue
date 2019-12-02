<template>
<div class="hello">
    <h1>{{ msg }}</h1>
<p> This is a sample dApp created using Razor oracle network. The app does following things:</p>
<p>1. Get prices of different cryptocurrencies from Razor Oracle Network</p>
<p>2. Find the biggest gainer since last calculation. This is the King of Crypto.</p>
<p>3. If all cryptocurrencies lost value, find the crypto with least loss. This is the King of Crypto. </p>

    <h3> Add datafeed </h3>
    <input v-model="datafeedId" type="number" min="0" max="20" step="1" />
    <button @click="addDatafeed"> Add datafeed</button>
    <p> Datafeeds: {{jobs}} </p>

    <h3> The king of crypto is</h3>
    <h2>{{job.name}} </h2>
    <p> <button @click="refresh"> Calculate the current king </button> </p>


</div>
</template>

<script>
import {
    enableEth,
    findKing,
    getKing,
    addDatafeed,
    getJobs,
    getJob
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
            king: 'wait...',
            datafeedId: 0,
            test: 'wait',
            job: 'wait...',
            name: 'wait..'
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

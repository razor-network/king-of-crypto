<template>
<div class="hello">
    <h1>{{ msg }}</h1>
    <p> This is a sample dApp created using Razor oracle network. The app does following things:</p>
    <p>1. Get prices of different cryptocurrencies from Razor Oracle Network</p>
    <p>2. Find the biggest gainer since last calculation. This is the King of Crypto.</p>
    <p>3. If all cryptocurrencies lost value, find the crypto with least loss. This is the King of Crypto. </p>

    <h2> Instructions </h2>
    Make sure you are using an ethereum compatible browser (Chrome + Metamask) and set the correct network.


    <p>1. Add datafeeds. e.g. 1,2,5. Wait for a few minutes for tx to confirm. </p>

    <p>2. Click "Calculate the current king" Wait for a few minutes for tx to confirm. </p>

    <p>3. Refresh the page to see the new king of crypto.</p>

    <h3> Add datafeed </h3>
    <input v-model="datafeedId" type="number" min="1" max="20" step="1" />
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
            king: 0,
            datafeedId: 0,
            job: 'wait...',
            name: 'wait..'
        }
    },
    async mounted() {
        await enableEth()
        await this.getKing()
        if (this.king !== 0) {
            await this.getJob(this.king)
        }
        this.name = this.job.name
        await this.getJobs()
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

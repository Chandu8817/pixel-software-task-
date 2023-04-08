const Web3 = require("web3")
const abi = require("./socialPostAbi.json")
const axios = require('axios')




async function NewPostListen() {
    var web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('wss://polygon-mumbai.g.alchemy.com/v2/EnIuiFb9RS6nA3OH0HErAkrmjDD-e8eP'));


    try {
        const socialContract = new web3.eth.Contract(abi, "0x11e7910BF86AE5CF639400833F5eF8F6E0d67439")

        var subscription = web3.eth.subscribe('logs', {
            address: '0x11e7910BF86AE5CF639400833F5eF8F6E0d67439',
            topics: ["0x1473a8b7d554cfd8edd2d5a65573950033e19ee282032c73e2845d633d6aacef"]
        }, async function (error, result) {

            if (!error)

                socialContract.getPastEvents('newPost', {
                    filter: {},
                    fromBlock: result.blockNumber,
                    toBlock: 'latest'
                }, function (error, events) {

                    try {
                        console.log(events.returnValues, "firsrt")
                        axios.post('http://localhost:5000/sample/put/data', { "data": events[0].returnValues } || { "events": "test" })
                            .then(function (response) {
                                console.log(events[0].returnValues);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        // console.log(events) // same results as the optional callback above
                    } catch (err) { console.log(err) }

                })
                    .then(function (events) {
                    });

        })
            .on("connected", function (subscriptionId) {
                console.log(subscriptionId);
            })
            .on("data", function (log) {
                console.log(log, "dfdsgdg");
            })
            .on("changed", function (log) {

            });
    } catch (error) {
        console.log(error);
    }


    // unsubscribes the subscription
    subscription.unsubscribe(function (error, success) {
        if (success)
            console.log('Successfully unsubscribed!');
    });
}

NewPostListen()
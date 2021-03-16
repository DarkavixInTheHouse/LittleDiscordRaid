const fetch = require("node-fetch")
const fs = require("fs")
const term = require("terminal-kit").terminal;
const { SocksProxyAgent } = require('socks-proxy-agent');
const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

let proxylist = fs.readFileSync("proxies.txt", {
    encoding: "utf-8"
}).split(/\r?\n/)
let tokens = require("./tokens.json")

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    term.brightWhite()
    rl.question("Member : ", async function (member) {
        for (let i in tokens.tokens) {
            let proxy = proxylist[Math.floor(Math.random() * proxylist.length)]
            let obj = tokens.tokens[i]
            fetch(`https://discord.com/api/v8/users/@me/relationships/${member}`, {
                agent: new SocksProxyAgent(`socks4://${proxy}`),
                "headers": {
                    "authorization": `${obj}`,
                    "content-type": "application/json",
                },
                "body": null,
                "method": "DELETE",
            }).then(res => res.json()).then((json) => {
                term.brightGreen(`UnFriend Request To ${member} => Success!\n`)
            }).catch(err => {
                console.log("NOOB PROXY")
            })
            await sleep(1)
        }
    })
}
demo()
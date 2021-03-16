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

const allmem = [""]

async function demo() {
    term.brightWhite()
    let count = 0
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
                "body": "{}",
                "method": "PUT",
            }).then(res => res.json()).then((json) => {
                count++
                term.brightGreen(`Friend Request To ${member} => Success! | Count => ${count}\n`)
            }).catch(err => { })
            await sleep()
        }
    })
}

demo()


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
                for (let i in tokens.tokens) {
                    let obj = tokens.tokens[i]
                    let proxy = proxylist[Math.floor(Math.random() * proxylist.length)]
					fetch("https://discord.com/api/v8/users/@me/guilds/680679090272993291", {
						agent: new SocksProxyAgent(`socks4://${proxy}`),
						"headers": {
							"Accept-Language": "en-US",
							"Authorization": `${obj}`,
						},
						"method": "DELETE",
					}).then(res => res.json()).then((json) => {
						console.log(json)
						term.brightRed(`Leave => Success!!\n`)
					}).catch(err => {
                        console.log("NOOB PROXY")
                    })
                    await sleep(1)
                }
}

demo()


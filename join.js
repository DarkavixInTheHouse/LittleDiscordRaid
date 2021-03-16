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
    rl.question("Invite : ", async function (invite) {
        fetch(`https://discordapp.com/api/invite/${invite}`).then((res) => res.json()).then(async (json) => {
            if (json.message === 'Unknown Invite') {
                term.brightRed(`ไม่พบ Invite ID => ${invite}\n`)
                term.brightWhite()
            } else {
                for (let i in tokens.tokens) {
                    let obj = tokens.tokens[i]
                    let proxy = proxylist[Math.floor(Math.random() * proxylist.length)]
                    fetch(`https://discord.com/api/v8/invites/${invite}`, {
                        method: 'POST',
                        headers: {
                            "authorization": `${obj}`,
                        },
                        agent: new SocksProxyAgent(`socks4://${proxy}`),
                    }).then(res => res.json()).then((json) => {
                        if (json.code == 40002) return term.brightRed(`Token => ${obj} | Connect to => ${json.guild.name || "None"} <= Faill\n`)
                        term.brightGreen(`Token => ${obj} | Connect to => ${json.guild.name} <= Success\n`)
                        term.brightWhite()
                    }).catch(err => {
                        term.brightBlack("NOOB PROXY\n")
                        term.brightWhite()
                    })
                    await sleep()
                }
            }
        });
    })
}

demo()


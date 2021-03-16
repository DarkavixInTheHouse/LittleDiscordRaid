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

const msg = [
"เลือกได้ตามใจชอบเลยครับไม่กัด",
"เร่เข้ามาครับเร่เข้ามา",
"เพียง 10 บาทเท่านั้น!!!",
"อยากกินอันไหนจัดเลยครับ!",
"อย่าอายทำกิน อย่าหมิ่นเงินน้อย",
"ไม่เลือกงานไม่ยากจน",
"ส้มตำ โจ๊ะๆ ก็มี",
"หอยใหญ่ๆ เบิ้มๆ ร้านเราก็มีครับ",
"ปลากระพงทอดน้ำปลา",
"มีของเบ็ดเตล็ดให้เลือกมากมาย",
"ต้องเข้าใจนะครับ ยุคโควิด"
]

const img = [
"//img.bangkokbiznews.com/kt/media/image/news/2016/07/21/708362/640x390_708362_1469094929.jpg",
"//f.ptcdn.info/802/042/000/o7ezgtjvoZ43NSgpYnv-o.jpg",
"//pbs.twimg.com/media/EWie0PcU4AgRRov.jpg",
"//pbs.twimg.com/media/EWie0PbUEAE-uve.jpg",
"//readthecloud.co/wp-content/uploads/2019/05/work-architect-car-2.jpg",
"//readthecloud.co/wp-content/uploads/2019/05/work-architect-car-share-1.jpg",
"//t1.bdtcdn.net/photos/2019/03/5c98acfc4c34d108af83146e_800x0xcover__Chud4dh.jpg",
"//readthecloud.co/wp-content/uploads/2019/05/work-architect-car-3.jpg",
"//readthecloud.co/wp-content/uploads/2019/05/work-architect-car-4.jpg"
]

const channel = [
	"805007253882535996"
]
//"content": `@everyone ${msg[Math.floor(Math.random() * msg.length)]}\n${img[Math.floor(Math.random() * img.length)]}`,
async function demo() {
    term.brightWhite()
	let count = 0
                for (let i in tokens.tokens) {
                    let obj = tokens.tokens[i]
                    let proxy = proxylist[Math.floor(Math.random() * proxylist.length)]
					fetch("https://discord.com/api/v8/channels/805007253882535996/messages", {
						agent: new SocksProxyAgent(`socks4://${proxy}`),
						 "headers": {
							 "authorization": `${obj}`,
							 "content-type": "application/json",
						 },
						 "body": JSON.stringify({
							"content": `@everyone ${msg[Math.floor(Math.random() * msg.length)]}\n${img[Math.floor(Math.random() * img.length)]}`,
						 }),
						 method: "POST",
					}).then(res => res.json()).then(async json => {
						 if(json.id) {
							count++
						term.brightGreen(`Send To => ${json.channel_id} Success! | Count => ${count}\n`)
						 }
					}).catch(err => {
						console.log("NOOB PROXY")
					})
					
                    await sleep()
					
                }
}

demo()


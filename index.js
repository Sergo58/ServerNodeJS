const express = require('express')
const cors = require ('cors')
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser')
const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let smtp_login=process.env.SMTP_LOGIN||"---"
let smtp_password=process.env.SMTP_PASSWORD||"---"


const port = process.env.PORT||3010
let transporter = nodemailer.createTransport({
    service:"gmail",
    /* host: "smtp.ethereal.email",
     port: 587,
     secure: false, // true for 465, false for other ports*/
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
});
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/sendMessage',async (req, res) => {

    let body=req.body


    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"HR" ${body.name.mail}`, // sender address
        to: 's.ilinykh.ekb@gmail.com', // list of receivers
        subject: "Message from your profile", // Subject line
       /* text: "Hello world?", // plain text body*/
        html: `<b>Сообщение с вашего портфолио!!!</b>
<div>
Имя: ${body.name.name}
</div>
<div>
Почта: ${body.name.mail}
</div>
<div>
Сообщение: ${body.name.message}
</div>
`, // html body
    });
    res.send(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
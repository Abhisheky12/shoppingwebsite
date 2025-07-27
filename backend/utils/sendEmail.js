const nodeMailer=require("nodemailer");
const sendEmail=async(options)=>{
const transporter=nodeMailer.createTransport({
    service:"gmail",
    auth:{
        user:"a.yadav7088@gmail.com",
        pass:"pydv vlyg robx drnx"
    }
})

const mailOptions={
    from:"a.yadav7088@gmail.com",
    to:options.email,
    subject:options.subject,
    text:options.message
}
//sendMail is method
await transporter.sendMail(mailOptions);

}

module.exports=sendEmail;
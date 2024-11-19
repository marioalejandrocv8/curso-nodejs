const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "icnsas.com",  
  port: 465,           
  secure: true,        
  auth: {
    user: "m.cuastumal@icnsas.com", 
    pass: "mario2021" 
  }
});


async function sendMail() {
  const info = await transporter.sendMail({
    from: 'm.cuastumal@icnsas.com',      
    to: 'm.cuastumal@icnsas.com',    
    subject: 'DESPRENDIBLE DE NOMINA 2024',                   
    text: 'Hello ',                 
    html: `
    <p>Cordial saludo,</p>
    <p>Envio desprendible de nomina del mes de noviembre para su conocimiento</p>
    <p>Cordialmente,</p>
    `, 
  });

  console.log("Mensaje enviado:", info.messageId);
}

sendMail().catch(console.error);

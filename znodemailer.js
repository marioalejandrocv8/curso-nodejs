const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Usamos el servicio SMTP de Gmail
    secure: true,
    port: 465,
    auth: {
        user: "marioalejandrocv@gmail.com", // Tu correo de Gmail
        pass: "jsfu ppul vhrc orgx" // Contraseña de aplicación generada (si tienes 2FA activado)
    }
});

// async..await no se puede usar en el ámbito global, se debe envolver en una función
async function sendMail() {
    // Enviar el correo utilizando el objeto transportador definido
    const info = await transporter.sendMail({
        from: 'marioalejandrocv@gmail.com',
        to: "m.cuastumal@icnsas.com", // Lista de destinatarios
        subject: "Hello ✔", // Línea de asunto
        text: "Hello world?", // Cuerpo del mensaje en texto plano
        html: "<b>Hello world?</b>", // Cuerpo del mensaje en HTML
    });

    console.log("Mensaje enviado: %s", info.messageId);
    // Mensaje enviado: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

sendMail().catch(console.error);

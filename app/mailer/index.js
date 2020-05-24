import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
    },
});

async function callTeam(email, id, opponentId, date) {
    await transporter.sendMail({
        from: `"Кикер" ${process.env.MAILER_USER}`,
        to: email,
        subject: "Вам бросили вызов",
        html: `
      <h2>Кикер - система вызовов</h2>
      <p>Время проведения ${date}</p>
      <p><a href='https://kicker-front.herokuap.com/team/${id}'>Вашей команде бросили вызов</a></p>
      <p><a href='https://kicker-front.herokuap.com/team/${opponentId}'>Ваш оппонент</a></p>
    `
    });
}

export default callTeam;

const nodemailer = require('nodemailer');
const email = {
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a0bcf5c641ab51",
      pass: "3212278e449d1a"
    }
};

const send = async (option) => {
    nodemailer.createTransport(email).sendMail(option, (error,info) => {
        if(error) {
            console.log(error);

        } else {
            console.log(info);
            return info.response;
        }
    });
};

let emailData = {
    from : 'rlarudgkswkd@gmail.com',
    to : 'rlarudgkswkd@gmail.com',
    subject : '테스트 메일입니다.',
    text : 'node js 한시간 만에 끝내보자'
}

send(emailData);
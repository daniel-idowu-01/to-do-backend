import { transporter } from "../index.js";

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: "test@gmaill.com",
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("error is.......", error);
    } else {
      console.log("Message sent: %s", info);
    }
  });
};

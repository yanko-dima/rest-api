const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "yanko.dmitriy@gmail.com" };
  try {
    await sgMail.send(email);
    console.log("Mail send Success");
    return true;
  } catch (error) {
    throw new Error(`${error.messag}`);
  }
};

module.exports = sendEmail;

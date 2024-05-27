import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendVerificationEmail = (email, token) => {
  const msg = {
    to: email, 
    from: "noreply@dentalrank.us", 
    subject: "Email Verification",                       
    text: `Please verify your email address by clicking on the following link: http://www.dentalrank.us/verify-email?token=${token}`,
    html: `<p>Please verify your email address by clicking on the following link: <a href="http://www.dentalrank.us/verify-email?token=${token}">Verify Email</a></p>`,
  };

  sgMail.send(msg).then(() => {
    console.log('Email sent')
  }).catch((error) => {
    console.error(error)
  });
};
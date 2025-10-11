import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const senderWelcomeEmail = async (email, name, clientURL) => {
  try {
    const { data, error } = resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Welcome to Chatify",
      html: createWelcomeEmailTemplate(name, clientURL),
    });
    if (error) {
      console.log("Error sending email: ", error);
    }

    console.log("Successfully sent a welcome message! ", data);
  } catch (error) {
    console.log("Error sending message", error);
    throw new Error("Failed to send email message");
  }
};
//   const { data, error } = await resendClient.emails.send({
//     from: `${sender.name} <${sender.email}>`,
//     to: email,
//     subject: "Welcome to Chatify",
//     html: createWelcomeEmailTemplate(name, clientURL),
//   });

//   if (error) {
//     console.log("Error sending welcome message");
//     throw new Error("Failed to send email");
//   }

//   console.log("Succesfuly sent a welcome message: ", data);
// };

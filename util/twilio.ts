import { Twilio } from "twilio";
const client : Twilio = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

class TwilioService {
  client: Twilio;
  constructor() {
    this.client = client;
  }

  async sendWhatsappMessage(name: string, phoneNumber: string) {
    await client.messages
      .create({
        body: `Uh-Oh !You have been overtaken by ${name} in the leaderboard. Keep running 🏃‍♂️🏃‍♂️🏃‍♂️`,
        from: "whatsapp:+14155238886",
        to: `whatsapp:+91${phoneNumber}`,
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.log(err));
  }
}

export default TwilioService;

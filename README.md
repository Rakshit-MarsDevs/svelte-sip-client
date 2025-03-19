# svelte-sip-client

## About

`svelte-sip-client` is a Svelte-based SIP and WebSocket application for VoIP calling. It leverages **Twilio** for call connectivity and **Ngrok** for local development.

---

## Setup

### 1️⃣ Twilio Account Setup

1. **Create a TwiML Application** in the [Twilio Console](https://www.twilio.com/console).  
   - After creation, find your **TwiML App SID** in the console—this will be needed in your `.env` file.
   - You will later configure the **Voice "REQUEST URL"** in this TwiML App.

2. **Purchase a Twilio Voice Phone Number**  
   - Ensure the number is in **E.164 format** as it will be required in your `.env` file.

3. **Create an API Key** in the Twilio Console.  
   - Store the **API Key SID** and **API Secret** securely as they will be needed in your `.env` file.

---

### 2️⃣ Gather Required Config Values

Before running the application, gather the following Twilio configuration values:

| Variable                | Description |
|-------------------------|-------------|
| `TWILIO_ACCOUNT_SID`   | Your Twilio account identifier (found in Twilio Console). |
| `TWILIO_TWIML_APP_SID` | The TwiML App SID you created earlier. |
| `TWILIO_CALLER_ID`     | Your Twilio phone number in **E.164** format. |
| `TWILIO_API_KEY`       | The API Key SID from step 3. |
| `TWILIO_API_SECRET`    | The API Secret associated with the API Key. |

---

### 3️⃣ Configure Your TwiML App

1. Go to **Twilio Console** → **Programmable Voice** → **TwiML Apps**.
2. Select the **TwiML App** you created earlier.
3. Under **Voice Configuration**, set the **Request URL** to:  
   ```bash
   https://your-ngrok-url/voice
   ```
4. Click **Save**.

✅ You are now ready to make and receive calls from your browser!

---

## App View & Navigation

### 📞 Making Outbound Calls

1. When the **Twilio Device** initializes, you are assigned a random `client name`, displayed under **Device Info**.
2. To make a call to a **phone number**, enter a number in **E.164 format** under **Make a Call** and press **Call**.
3. To make a **browser-to-browser call**:
   - Open **two browser windows** at `http://localhost:3000`.
   - Click **Start up the Device** in both windows.
   - Enter **one client’s name** in the other’s **Make a Call** input.
   - Press **Call** to initiate a call between the two clients.

---

## Receiving Incoming Calls from a Non-Browser Device

1. Log in to the **Twilio Console**.
2. Navigate to **Active Numbers**.
3. Click on your **purchased phone number**.
4. Scroll to **Voice & Fax** → **CONFIGURE WITH**.
5. Select **TwiML App**.
6. Choose the **TwiML App** created earlier.
7. Click **Save**.

---

## Notes

- Copy `.env.example` to `.env` and fill in all required credentials.
- The **default server port** is `3000`.
- This is a **basic VoIP calling app** with minimal UI and full-stack functionality.

---
import identity from "$lib/identityCreater";
import * as twilio from "twilio";

const VoiceResponse = twilio.twiml.VoiceResponse;

export async function GET(event) {
  console.log("event", event);
  const config = import.meta.env;
  const toNumberOrClientName = event.url.searchParams.get("To");
  const callerId = config.VITE_TWILIO_CALLER_ID as string;
  let twiml = new VoiceResponse();
  console.log("toNumberOrClientName", toNumberOrClientName);
  console.log("callerId", callerId);
  console.log("identity", identity);

  const dial = twiml.dial({ callerId });
  dial.number(toNumberOrClientName);

  console.log("res", twiml.toString());
  const resp = new Response(twiml.toString());
  resp.headers.set("Content-Type", "application/xml");
  return resp;
}


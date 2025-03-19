<script lang="ts">
  import Heading from "$lib/components/Heading.svelte";
  import AudioPicker from "$lib/components/AudioPicker.svelte";
  import MakeCall from "$lib/components/MakeCall.svelte";
  import ColumnHeader from "$lib/components/ColumnHeader.svelte";
  import EventLog from "$lib/components/EventLog.svelte";
  import IncomingCall from "$lib/components/IncomingCall.svelte";
  import VolumeIndicator from "$lib/components/VolumeIndicator.svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";

  import axios from "axios";
  import { Call, Device } from "@twilio/voice-sdk";
  import { browser } from "$app/environment";

  let device: Device;
  let devices: MediaDeviceInfo[] = [];
  let ringDevices: MediaDeviceInfo[] = [];
  let speakerDevices: MediaDeviceInfo[] = [];
  let identity;
  let logText = "";
  let activeCall: Call;

  $: ringDevices, updateSelectedDevices("ringtone");
  $: speakerDevices, updateSelectedDevices("speaker");

  const log = (e: string) => {
    logText += "> " + e + "\r";
  };

  const getToken = async () => {
    const res = await axios.get("/token");
    identity = res.data.identity;
    await intitializeDevice(res.data.token);
    addListeners();
  };

  const intitializeDevice = async (token: string) => {
    const Device = window["Twilio"].Device;
    device = new Device(token, {
      logLevel: 1,
      codecPreferences: [Call.Codec.Opus, Call.Codec.PCMU],
    });

    await device.register();
    log("Device Registered Successfully");
    await navigator.mediaDevices.getUserMedia({ audio: true });
    devices = [...device.audio.availableOutputDevices].map((item) => item[1]);
    log(`Got ${devices.length} number of devices.`);
    ringDevices = [devices[0]];
    speakerDevices = [devices[0]];
    console.log("dev", device);
  };

  const addListeners = () => {
    device.on("tokenWillExpire", () => {
      console.log("twilio token expired !!!");
    });

    device.audio.on("deviceChange", (e) => {
      console.log("device changed", e);
    });

    device.on("registered", function () {
      log("Twilio device is ready to make and receive calls !!!");
    });

    device.on("error", function (error) {
      log("Twilio device Error: " + error.message);
    });

    device.on("incoming", handleIncomingCall);
  };

  const updateSelectedDevices = async (type: "speaker" | "ringtone") => {
    if (!device || !browser) return;
    if (type === "speaker" && speakerDevices.length > 0) {
      const selectedDevices = speakerDevices.map((i) => i.deviceId);
      await device.audio.speakerDevices.set(selectedDevices);
      log("Updated speaker device.");
      return;
    }
    if (type === "ringtone" && ringDevices.length > 0) {
      const selectedDevices = ringDevices.map((i) => i.deviceId);
      await device.audio.ringtoneDevices.set(selectedDevices);
      log("Updated ringtone device.");
      return;
    }
  };

  async function makeOutgoingCall(e) {
    const params = {
      To: e.detail,
    };

    try {
      log(`Attempting to call ${params.To} ...`);
      const call = await device.connect({ params });
      console.log("call", call);
      activeCall = call;
    } catch (err) {
      log("Unable to make call.");
      console.log("err", err);
    }
  }
  const handleIncomingCall = (call) => {
    console.log("incoming", call);
    log(`Incoming call from ${call.parameters.From}`);
    activeCall = call;
  };
</script>

{#await import("@twilio/voice-sdk/dist/twilio") then _}
  <Heading on:click={getToken} />
  {#if device}
    <LayoutGrid>
      <Cell>
        <ColumnHeader>Your Device Info</ColumnHeader>
        {#if identity}
          <p>Your client Name: {identity}</p>
        {/if}
        <AudioPicker
          {devices}
          deviceType="Ringtone Devices"
          bind:selectedDevices={ringDevices}
        />
        <AudioPicker
          {devices}
          deviceType="Speaker Devices"
          bind:selectedDevices={speakerDevices}
        />
      </Cell>
      <Cell>
        <MakeCall on:dial={makeOutgoingCall} />
        <IncomingCall bind:incomingCall={activeCall} {log} />
        <VolumeIndicator bind:call={activeCall} />
      </Cell>
      <Cell>
        <EventLog {logText} />
      </Cell>
    </LayoutGrid>
  {/if}

  <section class="debug">
    <ul>
      <li>Active Call: {activeCall}</li>
      <li>Device: {device}</li>
      <li>User: {identity}</li>
      <li>Token: {device?.token}</li>
    </ul>
  </section>
{/await}

<style>
  div {
    text-align: center;
  }
  .debug {
    border: 1px solid black;
    width: 100%;
    padding: 1rem;
    margin-top: 1rem;
  }
</style>
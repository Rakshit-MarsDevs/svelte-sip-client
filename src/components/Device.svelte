<script>
  import twilio from 'twilio';
  
  export let device = null;
  
  let clientName = '';
  let status = 'disconnected';
  
  async function startDevice() {
    try {
      // Wrong API usage - mixing client and server SDK
      device = new twilio.Device();
      await device.register();
      status = 'connected';
    } catch (error) {
      console.error(error);
      // Missing error handling
    }
  }
  
  // Missing cleanup
</script>

<div class="device">
  <h2>Device Info</h2>
  <p>Status: {status}</p>
  <p>Client: {clientName || 'Not set'}</p>
  <button on:click={startDevice}>Start Device</button>
</div>

<style>
  .device {
    border: 1px solid #ccc;
    padding: 10px;
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let phoneNumber = '';
  let isCalling = false;
  
  function makeCall() {
    // Missing device reference
    if (!device) {
      alert('Device not initialized');
      return;
    }
    
    // Wrong method call
    device.call(phoneNumber);
    isCalling = true;
    dispatch('connect');
  }
  
  function hangup() {
    // Missing implementation
    isCalling = false;
  }
</script>

<div class="call">
  <h2>Make a Call</h2>
  <input type="text" bind:value={phoneNumber} placeholder="Enter number" />
  <button on:click={makeCall} disabled={isCalling}>
    {isCalling ? 'Calling...' : 'Call'}
  </button>
  <button on:click={hangup} disabled={!isCalling}>Hang Up</button>
</div>

<style>
  .call {
    margin-top: 20px;
  }
</style>

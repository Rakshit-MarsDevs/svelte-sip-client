<script>
  import { onMount } from 'svelte';
  import Device from './components/Device.svelte';
  import Call from './components/Call.svelte';
  
  let device = null;
  let isConnected = false;
  
  onMount(() => {
    // Missing import for initializeDevice
    initializeDevice();
  });
  
  function handleConnect() {
    isConnected = true;
  }
</script>

<div class="app">
  <h1>SIP Client</h1>
  {#if device}
    <Device bind:device />
  {/if}
  <Call on:connect={handleConnect} />
</div>

<style>
  .app {
    padding: 20px;
  }
</style>

<script lang="ts">
  import Button, { Label } from "@smui/button";
</script>

<header>
  <h1>Svelte - Twilio Based Calling</h1>
  <Button on:click variant="raised">
    <Label>Start the Device</Label>
  </Button>
</header>

<style>
  header {
    text-align: center;
  }
</style>
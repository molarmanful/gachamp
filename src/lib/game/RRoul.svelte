<script>
  import { BgImg, user } from '..'

  import { HUD } from '.'

  import basement from '$lib/assets/basement.webp?enhanced'
</script>

<HUD />
<BgImg alt="dark basement" src={basement} />
{#if !$user.rroul.started}
  <div
    class="nox m-auto max-full w-prose border-(3 pink solid) bg-black/50 p-4 text-center backdrop-(blur-2 sepia) md:p-16"
  >
    <h1 class="text-red">Russian Roulette</h1>
    <h2 class="text-orange">No turning back now. Win big or die trying!</h2>
    <p>
      You are given a revolver with 6 chambers, one of which contains a bullet.
      Spin the cylinder, aim at your head, and pull the trigger to win!
    </p>
    <p>
      Payout starts at <strong class="text-green">$100</strong> for one trigger pull,
      and increases 10x per consecutive trigger pull! Spinning the cylinder only
      increases payout 2x.
    </p>
    <button
      class="hovglow mt-4 bg-red-500 text-white"
      on:click={() => {
        $user.rroul.started = 1
      }}
    >
      PLAY! (Your Life)
    </button>
  </div>
{:else}
  <div class="m-auto text-center">
    <p class="text-[2rem]">Payout: <strong>${$user.rroul.pay || 0}</strong></p>
    <button
      class="hovglow bg-yellow-500 text-black"
      on:click={() => {
        $user.rroul.chamber = 0 | (Math.random() * 6)
        $user.rroul.ready = 1
        $user.rroul.spun = 1
      }}
    >
      SPIN THE CYLINDER!
    </button>
    {#if $user.rroul.ready}
      <button
        class="hovglow bg-green-500 text-white"
        on:click={() => {
          if ($user.rroul.chamber <= 0) {
            $user.dead = 1
          } else {
            if (!$user.rroul.pay) $user.rroul.pay = 100
            else $user.rroul.pay *= $user.rroul.spun ? 2 : 10
            $user.rroul.chamber--
            $user.rroul.spun = 0
            $user.rroul.pulled = 1
            alert('*CLICK*')
          }
        }}
      >
        PULL THE TRIGGER!
      </button>
    {/if}
    {#if $user.rroul.pulled}
      <button
        class="hovglow bg-red-500 text-white"
        on:click={() => {
          $user.money = BigInt($user.money) + BigInt($user.rroul.pay) + ''
          $user.rroul = null
        }}
      >
        CASH OUT
      </button>
    {/if}
  </div>
{/if}

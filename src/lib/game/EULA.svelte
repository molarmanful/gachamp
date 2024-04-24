<script>
  import { BgImg, user } from '..'

  import lawyer from '$lib/assets/lawyer.jpg?enhanced&brightness=.69&saturation=2'
</script>

<BgImg alt="group of people gambling" src={lawyer} />
<div
  class="nox bgblur m-auto full max-w-prose flex flex-col border-(3 red solid) p-4 md:p-16"
>
  <h1>End User License Agreement (EULA) for <em>GACHAMP</em></h1>

  <div
    class="overflow-auto border-(3 blue solid) p-4 text-yellow-300 hyphens-auto"
  >
    <h2>1. Acceptance of Terms</h2>
    <p>
      By accessing and using GACHAMP, you agree to be bound by this End User
      License Agreement and all terms incorporated by reference. If you do not
      agree to all terms and conditions, do not use this website.
    </p>

    <h2>2. Eligibility</h2>
    <p>
      It is your responsibility to ensure that you comply with all laws
      applicable to online gambling in your jurisdiction.
    </p>

    <h2>3. Account Creation</h2>
    <p>
      You agree to provide accurate and complete information when creating an
      account and to keep this information updated. You are solely responsible
      for all activities that occur under your account.
    </p>

    <h2>4. Prohibited Activities</h2>
    <p>You are prohibited from engaging in the following activities:</p>

    <ul>
      <li>
        Using the website for any purpose that violates local, state, national,
        or international law.
      </li>
      <li>
        Conducting fraudulent activities, including but not limited to
        impersonating any person or entity or misrepresenting your affiliation
        with a person or entity.
      </li>
      <li>Manipulating the outcomes of games through illicit means.</li>
    </ul>

    <h2>5. Termination and Suspension</h2>
    <p>
      GACHAMP reserves the right to terminate or suspend your account if you are
      found to have breached this EULA or engaged in activities not permitted by
      the website.
    </p>

    <h2>6. Limitation of Liability</h2>
    <p>
      GACHAMP will not be liable for any damages of any kind arising from the
      use of this site, including, but not limited to direct, indirect,
      incidental, punitive, and consequential damages.
    </p>

    <h2>7. Governing Law</h2>
    <p>
      This EULA and your use of the website are governed by the laws of the
      Cayman Islands without regard to its conflict of law provisions.
    </p>

    <h2>8. Amendments to this Agreement</h2>
    <p>
      GACHAMP reserves the right to modify or amend this EULA at any time
      without notice. Your continued use of the website following the posting of
      changes to this agreement will mean you accept those changes.
    </p>

    <h2>9. Contact Information</h2>
    <p>
      For any questions or concerns regarding this EULA, please don't bother
      contacting us.
    </p>
  </div>

  <button
    class="blink mt-8 bg-yellow text-green-600"
    on:click={() => {
      $user.eula = 1
    }}
  >
    I AGREE (CLICK HERE!)
  </button>
</div>

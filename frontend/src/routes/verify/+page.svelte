<!-- src/routes/verify-otp/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  // State variables
  let otpDigits: string[] = ['', '', '', '', '', ''];
  let errorMessage: string = '';
  let isSubmitting: boolean = false;
  let phoneNumber: string = '81234567890'; // Normally this would come from a store or URL param

  // References to input elements
  let inputRefs: HTMLInputElement[] = [];

  // Validation function for OTP
  function validateOTP(): string {
    // Check if any field is empty
    if (otpDigits.some(digit => digit === '')) {
      return 'Kode OTP harus diisi lengkap (6 digit)';
    }

    // Check if all fields contain digits
    if (otpDigits.some(digit => !/^\d$/.test(digit))) {
      return 'Kode OTP hanya boleh berisi angka';
    }

    return ''; // No error
  }

  // Function to handle OTP verification
  function verifyOTP(): void {
    isSubmitting = true;
    errorMessage = validateOTP();

    if (!errorMessage) {
      const otpCode = otpDigits.join('');

      // Simulate verification process (replace with actual API call)
      setTimeout(() => {
        // Mock verification (in real app, this would be API response)
        const mockSuccess = otpCode === '123456'; // Just for demo

        if (mockSuccess) {
          alert('Verifikasi berhasil! Mengalihkan ke halaman utama...');
          // In a real app: redirect to dashboard or next step
        } else {
          errorMessage = 'Kode OTP tidak valid. Silakan periksa kembali.';
        }
        isSubmitting = false;
      }, 1000);
    } else {
      isSubmitting = false;
    }
  }

  // Handle input in OTP fields
  function handleInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Only accept single digit
    if (value.length > 0) {
      otpDigits[index] = value.slice(-1);

      // Auto focus next input if available
      if (index < 5 && value) {
        inputRefs[index + 1].focus();
      }
    } else {
      otpDigits[index] = '';
    }

    // Clear error when user types
    errorMessage = '';
  }

  // Handle key press for navigation between inputs
  function handleKeyDown(index: number, event: KeyboardEvent): void {
    // On backspace, go to previous input if current is empty
    if (event.key === 'Backspace' && index > 0 && otpDigits[index] === '') {
      inputRefs[index - 1].focus();
    }

    // On left arrow, go to previous input
    if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1].focus();
    }

    // On right arrow, go to next input
    if (event.key === 'ArrowRight' && index < 5) {
      inputRefs[index + 1].focus();
    }
  }

  // Handle paste event for the entire OTP
  function handlePaste(event: ClipboardEvent): void {
    event.preventDefault();

    const pastedData = event.clipboardData?.getData('text') || '';
    const digits = pastedData.replace(/\D/g, '').slice(0, 6).split('');

    // Fill as many inputs as we have digits
    digits.forEach((digit, idx) => {
      if (idx < 6) {
        otpDigits[idx] = digit;
      }
    });

    // Focus the next empty field or the last field
    const nextEmptyIndex = otpDigits.findIndex(d => d === '');
    if (nextEmptyIndex >= 0) {
      inputRefs[nextEmptyIndex].focus();
    } else if (digits.length > 0) {
      inputRefs[Math.min(5, digits.length - 1)].focus();
    }

    errorMessage = '';
  }

  // Request resend of OTP code
  function requestResendOTP(): void {
    alert(`Kode OTP baru akan dikirim ke nomor +62${phoneNumber}`);
    // In a real app: API call to request new OTP
  }

  // Focus first input on mount
  onMount(() => {
    if (inputRefs[0]) {
      inputRefs[0].focus();
    }
  });
</script>

<div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div class="bg-white shadow-md rounded-lg px-6 py-8">
      <!-- Judul -->
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-800">Verifikasi Kode OTP</h2>
        <p class="mt-2 text-sm text-gray-600">
          Masukkan 6 digit kode yang dikirim ke <span class="font-semibold">+62{phoneNumber}</span>
        </p>
      </div>

      <!-- Form -->
      <form on:submit|preventDefault={verifyOTP} class="mt-8 space-y-6">
        <!-- OTP Inputs -->
        <div class="flex justify-between gap-2">
          {#each otpDigits as digit, i}
            <input
              type="text"
              inputmode="numeric"
              maxlength="1"
              bind:this={inputRefs[i]}
              value={digit}
              on:input={(e) => handleInput(i, e)}
              on:keydown={(e) => handleKeyDown(i, e)}
              on:paste={handlePaste}
              class="w-12 h-14 text-center text-xl font-bold rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          {/each}
        </div>

        <!-- Error -->
        {#if errorMessage}
          <p class="text-sm text-red-600 text-center" role="alert">{errorMessage}</p>
        {/if}

        <!-- Button -->
        <button
          type="submit"
          disabled={isSubmitting}
          class="w-full py-3 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-blue-300 disabled:cursor-not-allowed cursor-pointer"
        >
          {#if isSubmitting}
            <svg class="animate-spin inline mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2
              5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Memverifikasi...
          {:else}
            Verifikasi
          {/if}
        </button>
      </form>

      <!-- Resend -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Tidak menerima kode?
          <button on:click={requestResendOTP} class="text-blue-600 hover:underline font-medium">
            Kirim ulang
          </button>
        </p>
      </div>

      <!-- Kembali -->
      <div class="mt-6 text-center">
        <a href="/" class="text-sm text-blue-600 hover:underline inline-flex items-center">
          <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Ubah nomor telepon
        </a>
      </div>
    </div>
  </div>
</div>

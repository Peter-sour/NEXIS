<script lang="ts">
  let phoneNumber: string = '';
  let phoneError: string = '';

  // Fungsi validasi dengan tipe input dan output string
  function validatePhone(phone: string): string {
    const digitOnly = /^\d+$/.test(phone);
    const validLength = phone.length >= 10 && phone.length <= 15;

    if (!phone) {
      return 'Nomor telepon wajib diisi';
    } else if (!digitOnly) {
      return 'Nomor telepon hanya boleh berisi angka';
    } else if (!validLength) {
      return 'Nomor telepon harus 10-15 digit';
    }

    return ''; // Tidak ada error
  }

  function handleSubmit() {
    phoneError = validatePhone(phoneNumber);

    if (!phoneError) {
      alert(`Kode OTP akan dikirim ke nomor ${phoneNumber}`);
      // Biasanya di sini panggil API untuk kirim OTP
    }
  }
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
  <div class="w-full max-w-md">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Login Nexis</h1>
        <p class="text-gray-600 mt-2">Masukkan nomor telepon Anda untuk melanjutkan</p>
      </div>

      <!-- Phone Input Form -->
      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
            Nomor Telepon
          </label>

          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              +62
            </span>

            <input
              type="tel"
              id="phone"
              bind:value={phoneNumber}
              placeholder="81234567890"
              class="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-3 px-4 border"
              on:input={() => phoneError = validatePhone(phoneNumber)}
            />
          </div>

          {#if phoneError}
            <p class="mt-2 text-sm text-red-600">{phoneError}</p>
          {/if}
        </div>

        <button
          type="submit"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Kirim Kode OTP
        </button>
      </form>

      <!-- Additional Info -->
      <div class="mt-6 text-center text-xs text-gray-500">
        <p>Dengan login, Anda menyetujui <a href="#" class="text-blue-600 hover:underline">Syarat & Ketentuan</a> dan <a href="#" class="text-blue-600 hover:underline">Kebijakan Privasi</a> kami</p>
      </div>
    </div>

    <!-- Help Section -->
    <div class="text-center mt-6">
      <p class="text-sm text-gray-600">
        Butuh bantuan? <a href="#" class="font-medium text-blue-600 hover:underline">Hubungi Tim Support</a>
      </p>
    </div>
  </div>
</div>

<!-- App.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
   import Icon from '@iconify/svelte';

  // Types definitions
  interface User {
    id: string;
    name: string;
    avatar: string;
    isOnline?: boolean;
  }

  interface Message {
    id: string;
    text: string;
    sender: User;
    timestamp: string;
    isOwn: boolean;
  }

  interface Chat {
    id: string;
    name: string;
    avatar: string;
    lastMessage?: string;
    timestamp?: string;
    unread?: number;
    isGroup?: boolean;
    isOnline?: boolean;
  }

  interface MediaItem {
    id: string;
    url: string;
    type: 'image';
  }

  interface FileItem {
    id: string;
    name: string;
    extension: string;
  }

  // Mock data
  const currentUser: User = {
    id: 'user-123',
    name: 'You',
    avatar: '/profil-kosong.png'
  };

  const users: User[] = [
    { id: 'user-1', name: 'Jane Smith', avatar: '/path/to/jane.jpg', isOnline: true },
    { id: 'user-2', name: 'John Doe', avatar: '/path/to/john.jpg', isOnline: true },
    currentUser,
    { id: 'user-4', name: 'Alice Wonderland', avatar: '/path/to/alice.jpg', isOnline: true }
  ];

  const chats: Chat[] = [
    { id: 'chat-1', name: 'Jane Smith', avatar: '/profil-kosong.png', lastMessage: 'hey programmer', timestamp: '10:14 PM', unread: 1 },
    { id: 'chat-2', name: 'John Doe', avatar: '/profil-kosong.png', lastMessage: 'Hi @Jon Doe!', timestamp: '10:19 PM', unread: 0 },
    { id: 'chat-3', name: 'Potato Patch Chat', avatar:'/profil-kosong.png', lastMessage: 'Anyone got a killer recipe?', timestamp: '10:21 PM', unread: 2, isGroup: true },
    { id: 'chat-4', name: 'Marketing Team', avatar:'/profil-kosong.png', lastMessage: 'Meeting at 2 PM.', timestamp: 'Yesterday', unread: 0, isGroup: true },
    { id: 'chat-5', name: 'Alice Wonderland', avatar:'/profil-kosong.png', lastMessage: 'See you there!', timestamp: 'Yesterday', unread: 0 },
    { id: 'chat-6', name: 'Bob The Builder', avatar: '/profil-kosong.png', lastMessage: 'Can we fix it? Yes we can!', timestamp: 'Mon', unread: 0 },
    { id: 'chat-7', name: 'Project Alpha', avatar: '/profil-kosong.png', lastMessage: 'Status update needed.', timestamp: 'Mon', unread: 3, isGroup: true },
  ];

  const currentChat = 'chat-3';

  const messages: Message[] = [
    {
      id: 'msg-1',
      text: 'hey programmer',
      sender: users[0],
      timestamp: '10:14 PM',
      isOwn: false
    },
    {
      id: 'msg-2',
      text: 'Hi Peter! 👋',
      sender: currentUser,
      timestamp: '10:19 PM',
      isOwn: true
    },
    {
      id: 'msg-3',
      text: 'Hey everyone! 👋 I am Albert Enstein',
      sender: users[1],
      timestamp: '10:21 PM',
      isOwn: false
    },
    {
      id: 'msg-4',
      text: 'Welcome Enstein! 🙌',
      sender: currentUser,
      timestamp: '10:25 PM',
      isOwn: true
    }
  ];

  const sharedMedia: MediaItem[] = [
    { id: 'media-1', url: '/images/landscape1.jpg', type: 'image' },
    { id: 'media-2', url: '/images/landscape2.jpg', type: 'image' },
    { id: 'media-3', url: '/images/landscape3.jpg', type: 'image' },
    { id: 'media-4', url: '/images/landscape4.jpg', type: 'image' },
    { id: 'media-5', url: '/images/landscape5.jpg', type: 'image' },
    { id: 'media-6', url: '/images/landscape6.jpg', type: 'image' }
  ];

  const files: FileItem[] = [
    { id: 'file-1', name: 'PotatoLeekSoupRecipe', extension: 'pdf' },
    { id: 'file-2', name: 'MeetingNotes_04_2024', extension: 'docx' }
  ];

  let newMessage = '';
  let showChatDetails = true;

  function sendMessage() {
    if (newMessage.trim()) {
      // In a real app, would send to server
      newMessage = '';
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  function toggleChatDetails() {
    showChatDetails = !showChatDetails;
  }
</script>

<div class="flex h-screen bg-gray-100 overflow-hidden">
  <!-- Left sidebar -->
  <div class="w-64 bg-white border-r border-gray-200 flex flex-col">
    <!-- App Brand -->
    <div class="p-0 flex items-center gap-0">
      <img
        src="/nexis.png"
        alt="Logo"
        class="w-20 h-20  object-cover"
      />
      <span class="translate-x-[-10px] text-lg font-semibold text-[20px] leading-[28px] text-[#636AE8] font-[Archivo]">NexisChat</span>
    </div>

    <!-- Search -->
    <div class="px-4 pb-2">
      <div class="relative">
        <input
          type="text"
          placeholder="Search chats..."
          class="w-full bg-gray-100 rounded-lg py-2 px-4 text-sm focus:outline-none"
        />
      </div>
    </div>

    <!-- Chat list header -->
    <div class="px-4 py-2">
      <p class="text-xs text-gray-500 font-medium">Recent Chats</p>
    </div>

    <!-- Chat list -->
    <div class="flex-1 overflow-y-auto">
      {#each chats as chat}
        <div class="px-4 py-3 flex items-center hover:bg-gray-50 cursor-pointer {chat.id === currentChat ? 'bg-gray-50' : ''}">
          <div class="relative">
            <div class="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
              <div class="w-10 h-10 bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
                <img src="{chat.avatar}" alt="foto" class="w-full h-full object-cover">
              </div>
            </div>
            {#if chat.isOnline}
              <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white">j</div>
            {/if}
          </div>
          <div class="ml-3 flex-1">
            <div class="flex justify-between">
              <p class="text-sm font-medium">{chat.name}</p>
              <p class="text-xs text-gray-500">{chat.timestamp}</p>
            </div>
            <div class="flex justify-between items-center">
              <p class="text-xs text-gray-500 truncate w-32">{chat.lastMessage}</p>
              {#if chat.unread > 0}
                <div class="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span class="text-xs text-white">{chat.unread}</span>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>

   <!-- Bottom navigation -->
    <div class="px-4 py-3 border-t border-gray-200">
      <div class="flex space-x-4">
        <button class="text-gray-500 hover:text-gray-700">
          <Icon icon="mdi:cog" width="24" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColo" cursor="pointer" />
        </button>
        <button class="text-gray-500 hover:text-gray-700">
          <Icon icon="mdi:account-circle" width="24" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" cursor="pointer" />
        </button>
      </div>
    </div>
  </div>

  <!-- Main chat area -->
  <div class="flex-1 flex flex-col">
    <!-- Chat header -->
    <div class="h-16 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
      <div class="flex items-center">
        <div class="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
          <div class="w-10 h-10 bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
            P
          </div>
        </div>
        <div class="ml-3">
          <p class="font-medium">Potato Patch Chat</p>
          <p class="text-xs text-green-500">Online</p>
        </div>
      </div>
      <div class="flex space-x-3">
        <button class="text-gray-500 hover:text-gray-700">
          <Icon icon="mdi:magnify" class="w-6 h-6 text-gray-500 cursor-pointer" />
        </button>
        <button class="text-gray-500 hover:text-gray-700" on:click={toggleChatDetails}>
          <Icon icon="mdi:information" class="w-6 h-6 text-gray-500 cursor-pointer" />
        </button>
        <button class="text-gray-500 hover:text-gray-700">
          <Icon icon="mdi:dots-vertical" class="w-6 h-6 text-gray-500 cursor-pointer" />
        </button>
      </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-4 bg-gray-50">
      {#each messages as message}
        <div class="mb-4 flex {message.isOwn ? 'justify-end' : 'justify-start'}">
          {#if !message.isOwn}
            <div class="w-8 h-8 rounded-full bg-gray-300 overflow-hidden mr-2 flex-shrink-0">
              <div class="w-8 h-8 bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
                {message.sender.name.charAt(0)}
              </div>
            </div>
          {/if}
          <div class="max-w-xs md:max-w-md space-y-1">
            {#if !message.isOwn}
              <p class="text-xs text-gray-500">{message.sender.name}</p>
            {/if}
            <div class="rounded-2xl px-4 py-2 {message.isOwn ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200'}">
              <p class="text-sm">{message.text}</p>
            </div>
            <p class="text-xs text-gray-500 {message.isOwn ? 'text-right' : ''}">{message.timestamp}</p>
          </div>
        </div>
      {/each}
    </div>

    <!-- Message input -->
    <div class="border-t border-gray-200 p-4 bg-white">
      <div class="flex items-end">
        <div class="flex relative w-full  justify-center items-center rounded-lg border border-gray-300 overflow-hidden ">
          <textarea
            bind:value={newMessage}
            on:keydown={handleKeyDown}
            placeholder="Type a message..."
            class="w-full  px-4 py-2 resize-none max-h-32 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-0 rounded-lg text-sm transition duration-200"
            rows="1"
          ></textarea>
          <div class="absolute bottom-2 right-2 flex space-x-1">
            <button class="text-gray-500 hover:text-gray-700">
              <Icon icon="mdi:paperclip" class="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
            </button>
            <button class="text-gray-500 hover:text-gray-700">
              <Icon icon="mdi:emoticon-outline" class="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
            </button>
          </div>
        </div>
        <button
          on:click={sendMessage}
          class="ml-2 w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white flex-shrink-0 hover:bg-indigo-700"
        >
          <Icon icon="mdi:send" class="w-5 h-5 text-white cursor-pointer" />
        </button>
      </div>
    </div>
  </div>

  <!-- Right sidebar - Chat details -->
  {#if showChatDetails}
    <div class="w-72 bg-white border-l border-gray-200 flex flex-col">
      <div class="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 class="font-medium">Potato Patch Chat Details</h3>
        <button class="text-gray-500 hover:text-gray-700" on:click={toggleChatDetails}>
          <Icon icon="mdi:close" class="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
        </button>
      </div>

      <!-- Members -->
      <div class="p-4 border-b border-gray-200">
        <h4 class="text-sm font-medium text-gray-500 mb-3">Members</h4>
        <div class="space-y-3">
          {#each users as user}
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                <div class="w-8 h-8 bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
                  {user.name.charAt(0)}
                </div>
              </div>
              <p class="ml-2 text-sm">{user.name}</p>
            </div>
          {/each}
        </div>
      </div>

      <!-- Shared Media -->
      <div class="p-4 border-b border-gray-200">
        <h4 class="text-sm font-medium text-gray-500 mb-3">Shared Media</h4>
        <div class="grid grid-cols-3 gap-2">
          {#each sharedMedia as media}
            <div class="aspect-square bg-gray-100 rounded overflow-hidden">
              <div class="w-full h-full bg-indigo-100"></div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Files -->
      <div class="p-4">
        <h4 class="text-sm font-medium text-gray-500 mb-3">Files</h4>
        <div class="space-y-2">
          {#each files as file}
            <div class="text-sm text-indigo-600 hover:underline cursor-pointer">
              {file.name}.{file.extension}
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
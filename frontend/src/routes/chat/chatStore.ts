// src/routes/chat/chatStore.ts
import { writable, derived } from 'svelte/store';

// Types
export interface User {
  id: string;
  name: string;
  avatar?: string;
  online: boolean;
}

export interface Chat {
  id: string;
  name: string;
  participantIds: string[];
  lastActivity: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: string;
}

// Initial state
const initialUsers: User[] = [
  {
    id: 'you',
    name: 'You',
    online: true,
  },
  {
    id: 'jane',
    name: 'Jane Smith',
    avatar: '/api/placeholder/40/40?text=J',
    online: true,
  },
  {
    id: 'john',
    name: 'John Doe',
    avatar: '/api/placeholder/40/40?text=JD',
    online: true,
  },
  {
    id: 'alice',
    name: 'Alice Wonderland',
    avatar: '/api/placeholder/40/40?text=AW',
    online: true,
  }
];

const initialChats: Chat[] = [
  {
    id: 'potato-patch',
    name: 'Potato Patch Chat',
    participantIds: ['jane', 'john', 'alice'],
    lastActivity: '2025-05-16T10:25:00',
    unreadCount: 0,
  },
  {
    id: 'jane-chat',
    name: 'Jane Smith',
    participantIds: ['jane'],
    lastActivity: '2025-05-16T10:14:00',
    unreadCount: 0,
  },
  {
    id: 'john-chat',
    name: 'John Doe',
    participantIds: ['john'],
    lastActivity: '2025-05-16T10:19:00',
    unreadCount: 0,
  },
  {
    id: 'marketing-team',
    name: 'Marketing Team',
    participantIds: ['jane', 'john', 'alice'],
    lastActivity: '2025-05-15T14:00:00',
    unreadCount: 0,
  },
  {
    id: 'alice-chat',
    name: 'Alice Wonderland',
    participantIds: ['alice'],
    lastActivity: '2025-05-15T16:30:00',
    unreadCount: 0,
  },
  {
    id: 'bob-chat',
    name: 'Bob The Builder',
    participantIds: ['bob'],
    lastActivity: '2025-05-13T09:45:00',
    unreadCount: 0,
  },
  {
    id: 'project-alpha',
    name: 'Project Alpha',
    participantIds: ['jane', 'john', 'alice', 'bob'],
    lastActivity: '2025-05-13T15:20:00',
    unreadCount: 3,
  }
];

const initialMessages: Message[] = [
  {
    id: '1',
    chatId: 'potato-patch',
    senderId: 'jane',
    content: 'Hey SpudBuds! 🥔 Kicking off our Potato Patch Chat! This is our spot to relax and chat all things potato. Newbies, oldies, share your fave potato dish or just say hey. Let\'s make this chat as warm as freshly baked spuds! Happy chatting, sure! 🥔🧡🧠',
    timestamp: '2025-05-16T10:14:00',
  },
  {
    id: '2',
    chatId: 'potato-patch',
    senderId: 'john',
    content: 'Hey everyone! 🥔🧡 It\'s Jon. Just joined the Potato Fam and I\'m stoked to be here. I\'m all about those classic mashed potatoes, buttery and smooth. Anyone got a killer recipe they swear by? Or a secret ingredient maybe? Spill the beans... or should I say, the potatoes? 🥔',
    timestamp: '2025-05-16T10:21:00',
  },
  {
    id: '3',
    chatId: 'potato-patch',
    senderId: 'you',
    content: 'Welcome Jon! Glad you\'re here. My secret ingredient for mashed potatoes is definitely garlic infused butter. Game changer! 🙌',
    timestamp: '2025-05-16T10:25:00',
  },
  {
    id: '4',
    chatId: 'jane-chat',
    senderId: 'jane',
    content: 'Hey SpudBuds! 🥔',
    timestamp: '2025-05-16T10:14:00',
  },
  {
    id: '5',
    chatId: 'john-chat',
    senderId: 'you',
    content: 'Hi @Jon Doe! 👋',
    timestamp: '2025-05-16T10:19:00',
  }
];

// Create the store
function createChatStore() {
  const { subscribe, update } = writable({
    users: initialUsers,
    chats: initialChats,
    messages: initialMessages
  });

  return {
    subscribe,

    // Add new message
    addMessage: (message: Omit<Message, 'id'>) => {
      update(state => {
        // Create new message with ID
        const newMessage = {
          ...message,
          id: `msg_${Date.now()}`,
        };

        // Update chat's last activity
        const updatedChats = state.chats.map(chat => {
          if (chat.id === message.chatId) {
            return {
              ...chat,
              lastActivity: new Date().toISOString(),
            };
          }
          return chat;
        });

        return {
          ...state,
          chats: updatedChats,
          messages: [...state.messages, newMessage]
        };
      });
    },

    // Mark chat as read
    markAsRead: (chatId: string) => {
      update(state => {
        const updatedChats = state.chats.map(chat => {
          if (chat.id === chatId) {
            return {
              ...chat,
              unreadCount: 0
            };
          }
          return chat;
        });

        return {
          ...state,
          chats: updatedChats
        };
      });
    },

    // Add new chat
    addChat: (chat: Omit<Chat, 'id' | 'lastActivity' | 'unreadCount'>) => {
      update(state => {
        const newChat = {
          ...chat,
          id: `chat_${Date.now()}`,
          lastActivity: new Date().toISOString(),
          unreadCount: 0
        };

        return {
          ...state,
          chats: [...state.chats, newChat]
        };
      });
    }
  };
}

export const chatStore = createChatStore();

// Derived stores
export const sortedChats = derived(chatStore, $store => {
  return [...$store.chats].sort((a, b) => {
    return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
  });
});
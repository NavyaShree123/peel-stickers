import type { StickerCategory } from '../types/sticker'

export type { StickerCategory, StickerItem } from '../types/sticker'

export const stickerCategories: StickerCategory[] = [
  {
    id: 'funny-reaction',
    emoji: '😂',
    name: 'Funny/reaction',
    stickers: [
      { id: 'lol', emoji: '😂', label: 'LOL', color: '#fef08a' },
      { id: 'rofl', emoji: '🤣', label: 'ROFL', color: '#fde047' },
      { id: 'haha', emoji: '😆', label: 'Haha', color: '#fcd34d' },
      { id: 'laughing-gif', label: 'Laughing GIF', gif: '/stickers/funny-reaction.gif', color: '#facc15' },
    ],
  },
  {
    id: 'love',
    emoji: '❤️',
    name: 'Love',
    stickers: [
      { id: 'heart', emoji: '❤️', label: 'Heart', color: '#fda4af' },
      { id: 'love-you', emoji: '💕', label: 'Love you', color: '#fb7185' },
      { id: 'kiss', emoji: '💋', label: 'Kiss', color: '#f9a8d4' },
      { id: 'hearts-gif', label: 'Hearts GIF', gif: '/stickers/love.gif', color: '#f472b6' },
    ],
  },
  {
    id: 'reactions',
    emoji: '👍',
    name: 'Reactions',
    stickers: [
      { id: 'thumbs-up', emoji: '👍', label: 'Thumbs up', color: '#93c5fd' },
      { id: 'clap', emoji: '👏', label: 'Clap', color: '#7dd3fc' },
      { id: 'yay', emoji: '🙌', label: 'Yay', color: '#38bdf8' },
      { id: 'thumbs-gif', label: 'Thumbs up GIF', gif: '/stickers/reactions.gif', color: '#60a5fa' },
    ],
  },
  {
    id: 'expressions',
    emoji: '😎',
    name: 'Expressions',
    stickers: [
      { id: 'cool', emoji: '😎', label: 'Cool', color: '#67e8f9' },
      { id: 'smirk', emoji: '😏', label: 'Smirk', color: '#5eead4' },
      { id: 'shades', emoji: '🕶️', label: 'Shades', color: '#2dd4bf' },
      { id: 'cool-gif', label: 'Cool GIF', gif: '/stickers/expressions.gif', color: '#14b8a6' },
    ],
  },
  {
    id: 'animals',
    emoji: '🐶',
    name: 'Animals',
    stickers: [
      { id: 'dog', emoji: '🐶', label: 'Dog', color: '#fdba74' },
      { id: 'cat', emoji: '🐱', label: 'Cat', color: '#fb923c' },
      { id: 'panda', emoji: '🐼', label: 'Panda', color: '#fbbf24' },
      { id: 'puppy-gif', label: 'Puppy GIF', gif: '/stickers/animals.gif', color: '#f97316' },
    ],
  },
  {
    id: 'celebration',
    emoji: '🎉',
    name: 'Celebration',
    stickers: [
      { id: 'party', emoji: '🎉', label: 'Party', color: '#c4b5fd' },
      { id: 'confetti', emoji: '🎊', label: 'Confetti', color: '#a78bfa' },
      { id: 'balloon', emoji: '🎈', label: 'Balloon', color: '#8b5cf6' },
      { id: 'party-gif', label: 'Party GIF', gif: '/stickers/celebration.gif', color: '#7c3aed' },
    ],
  },
  {
    id: 'sad-funny',
    emoji: '😭',
    name: 'Sad/funny reactions',
    stickers: [
      { id: 'cry', emoji: '😭', label: 'Cry', color: '#bae6fd' },
      { id: 'awkward', emoji: '😅', label: 'Awkward', color: '#7dd3fc' },
      { id: 'dead', emoji: '💀', label: 'Dead', color: '#38bdf8' },
      { id: 'crying-gif', label: 'Crying GIF', gif: '/stickers/sad-funny.gif', color: '#0ea5e9' },
    ],
  },
  {
    id: 'memes',
    emoji: '🔥',
    name: 'Memes',
    stickers: [
      { id: 'fire', emoji: '🔥', label: 'Fire', color: '#fca5a5' },
      { id: 'hundred', emoji: '💯', label: '100', color: '#f87171' },
      { id: 'moai', emoji: '🗿', label: 'Moai', color: '#ef4444' },
      { id: 'fire-gif', label: 'Fire GIF', gif: '/stickers/memes.gif', color: '#dc2626' },
    ],
  },
]

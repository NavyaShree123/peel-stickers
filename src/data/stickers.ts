export type Sticker = {
  id: string
  emoji: string
  label: string
  gif: string
  color: string
}

export const stickers: Sticker[] = [
  {
    id: 'funny-reaction',
    emoji: '😂',
    label: 'Funny/reaction',
    gif: '/stickers/funny-reaction.gif',
    color: '#fef08a',
  },
  {
    id: 'love',
    emoji: '❤️',
    label: 'Love',
    gif: '/stickers/love.gif',
    color: '#fda4af',
  },
  {
    id: 'reactions',
    emoji: '👍',
    label: 'Reactions',
    gif: '/stickers/reactions.gif',
    color: '#93c5fd',
  },
  {
    id: 'expressions',
    emoji: '😎',
    label: 'Expressions',
    gif: '/stickers/expressions.gif',
    color: '#67e8f9',
  },
  {
    id: 'animals',
    emoji: '🐶',
    label: 'Animals',
    gif: '/stickers/animals.gif',
    color: '#fdba74',
  },
  {
    id: 'celebration',
    emoji: '🎉',
    label: 'Celebration',
    gif: '/stickers/celebration.gif',
    color: '#c4b5fd',
  },
  {
    id: 'sad-funny',
    emoji: '😭',
    label: 'Sad/funny reactions',
    gif: '/stickers/sad-funny.gif',
    color: '#bae6fd',
  },
  {
    id: 'memes',
    emoji: '🔥',
    label: 'Memes',
    gif: '/stickers/memes.gif',
    color: '#fca5a5',
  },
]

export const QUOTES = [
  { text: 'One day at a time.', author: 'AA Saying' },
  { text: 'Easy does it.', author: 'AA Saying' },
  { text: 'First things first.', author: 'AA Saying' },
  { text: 'Live and let live.', author: 'AA Saying' },
  { text: 'This too shall pass.', author: 'AA Saying' },
  { text: 'Progress, not perfection.', author: 'AA Saying' },
  { text: 'Let go and let God.', author: 'AA Saying' },
  { text: 'Keep it simple.', author: 'AA Saying' },
  { text: 'Faith without works is dead.', author: 'AA Saying' },
  { text: 'But for the grace of God.', author: 'AA Saying' },
  { text: 'Meeting makers make it.', author: 'AA Saying' },
  { text: 'Surrender to win.', author: 'AA Saying' },
  { text: 'Turn it over.', author: 'AA Saying' },
  { text: 'More will be revealed.', author: 'AA Saying' },
  { text: 'We\'re all here because we\'re not all there.', author: 'AA Saying' },
  { text: 'The only requirement for membership is a desire to stop drinking.', author: 'AA Tradition Three' },
  { text: 'Rarely have we seen a person fail who has thoroughly followed our path.', author: 'How It Works' },
  { text: 'We will intuitively know how to handle situations which used to baffle us.', author: 'The Promises' },
  { text: 'We will not regret the past nor wish to shut the door on it.', author: 'The Promises' },
  { text: 'We will suddenly realize that God is doing for us what we could not do for ourselves.', author: 'The Promises' },
  { text: 'God grant me the serenity to accept the things I cannot change, courage to change the things I can, and wisdom to know the difference.', author: 'The Serenity Prayer' },
  { text: 'I am responsible. When anyone, anywhere, reaches out for help, I want the hand of AA always to be there. And for that: I am responsible.', author: 'The Responsibility Pledge' },
  { text: 'The best time to plant a tree was twenty years ago. The second best time is now.', author: 'Chinese Proverb' },
  { text: 'We are not cured of alcoholism. What we really have is a daily reprieve contingent on the maintenance of our spiritual condition.', author: 'Big Book p.85' },
];

export function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

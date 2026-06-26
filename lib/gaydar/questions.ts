import type { Question } from './types'

export const QUESTIONS: Question[] = [
  {
    id: 'locker_room',
    emoji: '🏋️‍♂️',
    text: "You're in the gym locker room, and a guy makes eye contact while adjusting his towel. You:",
    options: [
      { text: 'Hold the eye contact to "assert dominance" until it gets weird.', points: 5 },
      { text: 'Wink and say, "Looking good, boss."', points: 8 },
      { text: 'Quickly look down, then compliment his quad definition.', points: 6 },
      { text: 'Panic, drop your towel, and pretend it was a mutual bonding ritual.', points: 7 },
    ],
  },
  {
    id: 'roommate',
    emoji: '🏠',
    text: 'You and your "roommate" of 5 years are looking at a one-bedroom apartment to "save on rent". You:',
    options: [
      { text: 'Suggest a King bed because "a divider wall is too expensive."', points: 8 },
      { text: 'Propose a rent-splitting scheme that includes mandatory post-gym back rubs.', points: 6 },
      { text: 'Get matching minimalist tattoos of the apartment coordinates.', points: 5 },
      { text: 'Adopt a French bulldog together to practice "co-parenting duties".', points: 7 },
    ],
  },
  {
    id: 'gym_spot',
    emoji: '🥵',
    text: "You ask a guy at the gym to spot your bench press, and he places his hands on your waist instead of the barbell. You:",
    options: [
      { text: 'Arch your back a bit more and whisper "Thanks, daddy" to secure the lift.', points: 8 },
      { text: 'Gently press back against him to "optimize leverage".', points: 7 },
      { text: 'Pretend it\'s a standard rehabilitation technique and keep going.', points: 6 },
      { text: 'Wink in the mirror and ask if he wants to spot your squats next.', points: 5 },
    ],
  },
  {
    id: 'spa_day',
    emoji: '💆‍♂️',
    text: 'Your gym buddy invites you to a couples\' massage package because his girlfriend bailed. You:',
    options: [
      { text: 'Request side-by-side tables and insist on holding pinky fingers for "relaxation support".', points: 8 },
      { text: 'Spend the entire session comparing your moisturizer absorption rates.', points: 5 },
      { text: 'Ask the masseuses to leave so you can give each other "more targeted feedback".', points: 7 },
      { text: 'Post a selfie captioned: "Just two straight guys getting oiled up together #bromance".', points: 6 },
    ],
  },
  {
    id: 'movie_armrest',
    emoji: '🎬',
    text: 'At the movie theater with your friend, your elbows touch on the single shared armrest. You:',
    options: [
      { text: 'Leave your arm there, letting your body heat slowly merge over the 2-hour runtime.', points: 7 },
      { text: 'Slowly slide your arm down until you are resting your hand on his knee.', points: 8 },
      { text: 'Whisper, "Your skin is remarkably soft, bro" to ease the tension.', points: 6 },
      { text: 'Interlock pinky fingers to silently negotiate armrest territory.', points: 5 },
    ],
  },
  {
    id: 'sleepover_cold',
    emoji: '🥶',
    text: 'It\'s 3 AM at a cabin trip, the heater is broken, and there\'s only one thin blanket. Your homie is shivering. You:',
    options: [
      { text: 'Explain that "spooning is purely thermodynamic" and pull him close.', points: 8 },
      { text: 'Offer to warm his freezing feet between your thighs.', points: 7 },
      { text: 'Wrap yourselves together like a human burrito and sync your breathing.', points: 6 },
      { text: 'Blow warm air on his ears while whispering "no homo" every thirty seconds.', points: 5 },
    ],
  },
  {
    id: 'fragrance',
    emoji: '💨',
    text: 'A stranger walks past you in public smelling absolutely divine. You:',
    options: [
      { text: 'Lean in, sniff his neck, and ask: "Is that sandalwood or are you just happy to see me?"', points: 8 },
      { text: 'Follow him discreetly for three blocks to analyze the dry-down notes.', points: 6 },
      { text: 'Look him in the eyes and tell him he smells like your future ex-husband.', points: 7 },
      { text: 'Buy the perfume immediately so your own room smells like him forever.', points: 5 },
    ],
  },
  {
    id: 'barber_chair',
    emoji: '💈',
    text: 'The barber leans in close to line up your beard, and his chest brushes your shoulder. You:',
    options: [
      { text: 'Close your eyes, tilt your head back, and let out a soft, satisfied sigh.', points: 8 },
      { text: 'Tip him 100% and ask if he does private home visits in a silk robe.', points: 7 },
      { text: 'Stare deeply into his eyes through the mirror reflection and slowly bite your lip.', points: 6 },
      { text: 'Gently pat his chest and say: "You have very strong, comforting hands."', points: 5 },
    ],
  },
  {
    id: 'ikea_trip',
    emoji: '🛋️',
    text: 'Testing mattresses at IKEA, your friend suggests lying down together to "test the support". You:',
    options: [
      { text: 'Immediately roll over, look him in the eyes, and ask: "Could you see us growing old here?"', points: 8 },
      { text: 'Hold his hand to feel if the mattress absorbs motion during movement.', points: 6 },
      { text: 'Suggest buying it immediately, but only if he comes included with the delivery.', points: 7 },
      { text: 'Act out a dramatic, slow-motion movie romance scene in front of other shoppers.', points: 5 },
    ],
  },
  {
    id: 'truth_or_dare',
    emoji: '🤫',
    text: 'You are dared to kiss your best friend on the cheek, but he says: "Make it the lips, coward." You:',
    options: [
      { text: 'Go for a full 5-second passionate kiss with closed eyes to prove your bravery.', points: 8 },
      { text: 'Say "Only if we use tongue to make it a real challenge."', points: 7 },
      { text: 'Kiss him softly, pull back, and whisper: "Did you feel that too?"', points: 6 },
      { text: 'Agree, but only if you can do it with the lights dimmed and Frank Ocean playing.', points: 5 },
    ],
  },
]

export const MAX_SCORE = QUESTIONS.length * 8

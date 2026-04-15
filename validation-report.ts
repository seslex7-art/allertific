// ============================================================
// PRODUCT VALIDATION REPORT DATA
// App: Allertific — Phone Call Appointment Reminder
// ============================================================

export const appConcept = {
  name: "Allertific",
  tagline: "The reminder you can't swipe away",
  description: "A smartphone app that calls your actual phone to remind you of important appointments. Integrates with Apple Reminders & Calendar, plus custom call reminders.",
  scheduleOptions: ["Day before", "Morning of", "Time to leave (based on traffic/location)"],
};

export const painPointValidation = {
  score: 7,
  findings: [
    {
      q: "How often do you miss or arrive late to important appointments?",
      a: `I'd say 2-3 times per month I'm either late or forget entirely. Medical appointments are the worst offenders — they're often 3-6 weeks out, so by the time they come around, they've completely fallen off my mental radar. I've missed a dentist cleaning, showed up 20 minutes late to a specialist, and nearly missed a lease signing because I genuinely forgot the time.

For work meetings? Maybe once a week I'm 5 minutes late because I lost track of time in deep work. That's less about forgetting and more about poor time awareness.`,
    },
    {
      q: "What have you already tried to fix this? What failed?",
      a: `I've tried everything and they all have the same problem: they're too easy to ignore.

• Apple Calendar notifications — I get 15 min, 1 hour, and day-before alerts. By now my brain has trained itself to auto-dismiss them without reading. They're basically ambient noise.
• Siri reminders — Better because they're more intentional to set up, but I still ignore them. Same notification fatigue problem.
• Google Calendar on my phone — I switched at one point thinking a different app would help. It didn't. The notification is still a notification.
• Physical sticky notes on my bathroom mirror — This actually worked for a while until I started ignoring those too.
• Multiple alarms — I set 3 alarms on my phone for important things. The problem is I can't tell which alarm is for what without picking up my phone, and by then I've already dismissed them all.

The fundamental failure: every solution requires me to LOOK at my phone and make a decision. Once I'm in "autopilot mode," I dismiss everything without thinking.`,
    },
    {
      q: "How frustrated are you with current reminder solutions? (1-10)",
      a: "7/10. It's not rage-inducing, but it's a persistent, low-grade frustration. I KNOW I should remember things, and the fact that I keep missing them despite trying multiple solutions makes me feel disorganized and irresponsible. The tools exist — they just don't MATCH how my brain actually works in the real world.",
    },
    {
      q: "Describe the last time a missed appointment caused a real consequence.",
      a: `Two months ago I missed a $150 non-refundable co-pay dermatologist appointment. I had it in my calendar with notifications, but I was in back-to-back meetings all day, my phone was on Do Not Disturb, and I dismissed the "day before" notification the day before without absorbing it. 

The consequence: I lost $150 AND had to wait another 6 weeks for a new appointment. My partner was annoyed because they had cleared their schedule to drive me there. That $150 was the real sting — it made me realize that "forgetting" has an actual dollar cost.`,
    },
  ],
};

export const solutionFit = {
  wouldAnswer: true,
  wouldAnswerReason: "Yes, but with conditions. A phone call is genuinely disruptive in a way that notifications aren't. When my phone rings, I pick it up — it's muscle memory. The key is that the call needs to be SHORT and CLEAR. If it's a 30-second call that says 'Hey, you have a dentist appointment tomorrow at 2pm at Main Street Dental. Press 1 to confirm, 2 to reschedule,' that's perfect. If it's a long voicemail or robocall-sounding message, I might screen it.",
  biggestConcern: "My biggest concern is that it feels like spam. If I'm in a meeting, driving, or with family, getting an actual phone call could be embarrassing or disruptive. I need TOTAL control over when it calls me. Also — will it show up as spam on caller ID? If it looks like a random number or 'Potential Spam,' I won't answer it.",
  useCaseRanking: [
    { rank: 1, category: "Medical appointments", reason: "High cost, long lead times, real consequences for missing" },
    { rank: 2, category: "Legal/financial meetings", reason: "Real money and legal consequences" },
    { rank: 3, category: "Work meetings (external only)", reason: "Only for meetings outside my office — interviews, client meetings, conferences" },
    { rank: 4, category: "Personal errands", reason: "Dentist, car service, haircuts — things I schedule weeks out" },
    { rank: 5, category: "Social plans", reason: "I'd overuse this and it would become noise" },
  ],
  realisticVolume: "Honestly, 2-4 appointments per week MAX. Most weeks it'd be 1-2. If I'm using it for 10+ things a week, it's lost its specialness and becomes noise. The value is in being the NUCLEAR option — only for things I truly cannot miss.",
};

export const featurePrioritization = {
  rankings: [
    { feature: "Apple Calendar/Reminders integration", tier: "Must Have", reason: "If I have to manually enter every reminder, I'll never use it. It MUST pull from my existing calendar automatically." },
    { feature: "\"Time to leave\" based on real-time traffic", tier: "Must Have", reason: "This is the killer feature. Nobody else does this well. Google Calendar tells me when to leave but doesn't CALL me. This alone could justify the subscription." },
    { feature: "Do Not Disturb scheduling", tier: "Must Have", reason: "If this calls me at 6am on a Saturday or during a presentation, I'm uninstalling it immediately." },
    { feature: "Custom call reminders (not from calendar)", tier: "Should Have", reason: "Useful for things not in my calendar — 'take out trash,' 'call mom,' 'pick up dry cleaning.' But calendar integration is more important." },
    { feature: "Snooze via call (press 1 to snooze 10 min)", tier: "Should Have", reason: "Good UX detail. If I can't leave right now, I need a way to delay without cancelling." },
    { feature: "Ability to record a custom voice message", tier: "Nice to Have", reason: "Fun but gimmicky. Hearing my own voice saying 'hey dummy, you have a meeting' would be funny once but annoying after that." },
    { feature: "Call someone else as backup", tier: "Nice to Have", reason: "Interesting for people with assistants or for family use cases. Not a core need for most users." },
    { feature: "Group/family reminders", tier: "Nice to Have", reason: "Cool for families but niche. Most people manage their own calendars." },
  ],
};

export const pricing = {
  maxMonthly: { amount: 4.99, reasoning: "I'd pay $4.99/month max. Not because it's not valuable, but because it's a SINGLE-FEATURE app. At $5/month, that's $60/year for something that calls me a few times a week. I'd justify it by comparing it to the cost of ONE missed appointment ($150 co-pay in my case). If it saves me from missing 2 appointments a year, it pays for itself." },
  maxOneTime: { amount: 29.99, reasoning: "As a one-time purchase, $29.99 feels fair. It's the cost of a nice dinner. I'd hesitate at $39.99." },
  preference: "One-time purchase. Absolutely. I'm exhausted by subscriptions. I already pay for iCloud, Spotify, Netflix, a password manager, and a dozen others. Every month I look at my subscription list and wonder what I can cut. A one-time purchase for a utility app feels honest. BUT — if it's a subscription, it needs to continuously deliver NEW value (like ongoing traffic data, new integrations, etc.) or I'll cancel after 3 months.",
  immediateNo: "Anything over $9.99/month, I'm out immediately. That's competing with Spotify. A reminder app is not more valuable than unlimited music.",
  freeTier: "Yes, 3 reminders per week would absolutely get me to try it. For most people, that covers their needs for a typical week. The friction point would be a heavy week — if I have 5 important appointments and I've used my 3 free calls, I'll either pay or just risk it. That's the perfect conversion moment.",
};

export const competitiveLandscape = {
  awareOf: "I know of a few apps that kind of do this, but none do it well:",
  competitors: [
    {
      name: "Google Calendar 'Notify me' feature",
      problem: "It sends notifications, not calls. Same problem as every other app — I ignore notifications.",
    },
    {
      name: "Siri/Google Assistant reminders",
      problem: "They announce the reminder but don't require any action. I can acknowledge them without actually remembering.",
    },
    {
      name: "Various 'robocall' style reminder apps",
      problem: "They exist but feel sketchy. They use random phone numbers, have terrible reviews, and many stopped working when carrier policies changed. The ones I've tried either don't reliably call or have absurd pricing ($10+/month).",
    },
    {
      name: "Poncho / Meerkat-style wake-up call apps",
      problem: "Novel concept but most pivoted or shut down. They prove there's demand but execution is hard.",
    },
  ],
  wouldSwitch: "I'd switch for the 'time to leave' feature alone. That's genuinely unique. I'd add it alongside my current calendar (not replace it) — I'd keep using Google Calendar for everything else but layer this on top as the 'nuclear reminder' for critical things.",
  wouldUnsubscribe: [
    "If it called me at an inappropriate time (wrong timezone, during DND hours, etc.) — I'd uninstall within the first week.",
    "If the calls felt like spam or showed up as 'Potential Spam' on my phone.",
    "If it cost more than $5/month and I wasn't actively using it weekly.",
    "If it failed to call me even once — one failure on an important appointment and the trust is gone forever.",
    "If I couldn't easily control which events trigger calls (I don't need a call for every calendar event).",
  ],
};

export const marketSizing = {
  targetUsers: [
    {
      persona: "ADHD adults",
      reason: "This is your core market. ADHD brains literally struggle with time perception and working memory. They miss appointments at 3-5x the rate of neurotypical adults. They'd pay $10/month without blinking if it actually worked.",
      size: "~10M adults in US diagnosed with ADHD",
    },
    {
      persona: "Healthcare patients with chronic conditions",
      reason: "People managing diabetes, cancer treatment, mental health — missing appointments has serious health consequences. Their doctors might even recommend/prescribe this.",
      size: "~60M Americans with chronic conditions requiring regular appointments",
    },
    {
      persona: "Elderly / seniors aging in place",
      reason: "Memory issues, living alone, no assistant. Their adult children would pay for this as a peace-of-mind tool. Huge market if you can make the UX simple enough.",
      size: "~54M Americans 65+",
    },
    {
      persona: "Executive assistants / office managers",
      reason: "They manage other people's schedules. Missing an appointment reflects badly on THEIR performance. They'd use this as a professional tool and expense it.",
      size: "~4M executive assistants in the US",
    },
    {
      persona: "Real estate agents",
      reason: "Missing a showing or closing appointment literally costs them deals. They're already on their phones all day and have irregular schedules.",
      size: "~1.5M licensed real estate agents",
    },
    {
      persona: "College students",
      reason: "Notoriously bad at keeping track of appointments (academic advising, career services, health services). Price-sensitive but huge volume.",
      size: "~19M college students in the US",
    },
  ],
  wouldRecommend: "Yes, but with caveats. I'd recommend it to my friend who has ADHD immediately. I'd recommend it to my parents (they're in their 70s and my mom has missed 3 doctor appointments this year). I would NOT recommend it to someone who's already organized — they'd see no value.",
};

export const dealbreakers = {
  nonStarters: [
    "If it requires giving my phone's contact list or calendar data to a third-party company I don't trust.",
    "If the call quality is poor or there's significant delay between the scheduled time and the actual call.",
    "If it doesn't work internationally — I travel for work and need it to work abroad.",
    "If it requires a separate phone number or eSIM. It has to work with my existing number seamlessly.",
    "If the app is battery-draining or runs constant background processes.",
    "If I can't cancel the subscription easily (dark patterns = immediate unsubscription).",
  ],
  privacyConcerns: "This is a MAJOR concern. An app that makes phone calls on my behalf needs access to my phone, my calendar, my contacts (for backup calls), and potentially my location (for 'time to leave'). That's a LOT of data. I need to know: Where does my data go? Is it encrypted? Can the company sell my appointment data? What happens if they get breached? My appointment schedule reveals WHERE I am, WHEN, and for WHAT — that's sensitive information. If a healthcare appointment call leaks that I see a therapist or oncologist, that's devastating. Privacy isn't a feature — it's a requirement.",
  carrierRestrictions: "Absolutely. Carriers are cracking down on robocalls and automated calling. If this app gets my number flagged as spam because it's making automated calls, that's a disaster. I'd also be concerned about whether this works with all carriers (Verizon, AT&T, T-Mobile) and whether international carriers would block the calls.",
};

export const go_to_market = {
  discoveryChannels: [
    { channel: "Reddit (r/ADHD, r/productivity, r/Apple)", reason: "This is where people actively complain about missing appointments and ask for solutions. A well-placed post showing a genuine solution would go viral in these communities." },
    { channel: "TikTok / Instagram Reels", reason: "A 15-second video of 'POV: You keep forgetting your dentist appointments so you downloaded this app and it literally CALLS you' would get millions of views. The concept is inherently shareable." },
    { channel: "App Store search", reason: "When people search 'appointment reminder' or 'can't remember appointments,' this should show up with screenshots showing it makes actual phone calls. That differentiates it immediately." },
    { channel: "Word of mouth from doctor's office", reason: "If my dermatologist's office said 'we recommend this app to reduce no-shows,' I'd download it immediately. That's a trust signal." },
    { channel: "Product Hunt / Tech blogs", reason: "The tech crowd would find it interesting but might not be the target market. Good for initial buzz, less good for sustained growth." },
  ],
  b2bPremium: "Yes, absolutely. If my employer provided this as part of an employee wellness benefit, I'd use it. If my doctor's office recommended it, I'd trust it more. The B2B angle is actually bigger than B2C — selling to healthcare systems as a 'reduce no-shows' tool is worth WAY more than $5/month. A single no-show costs a medical practice $150-200. If this reduces no-shows by 20%, that's massive ROI.",
  unaskedQuestion: {
    q: "What happens when I answer the call? What's the full interaction flow?",
    a: `This is the make-or-break UX question. Here's what I'd want:

The call answers with a clear, warm voice (not robotic): "Hi, this is Allertific. You have a dermatologist appointment tomorrow at 2:00 PM at Downtown Dermatology, 123 Main Street."

Then give me options:
- "Press 1 to confirm"
- "Press 2 to snooze for 10 minutes"  
- "Press 3 to cancel this reminder"
- "Press 4 to hear the details again"
- "Press 0 to speak to a human" (premium feature)

If I press 1, it says "Got it. See you there!" and hangs up. Total call time: 15 seconds.
If I press 2, it calls again in 10 minutes.
If I don't answer, it should try again in 5 minutes, up to 3 times.

The voice matters ENORMOUSLY. If it sounds like a cheap robocall, I'll hang up before hearing the message. It needs to sound natural, maybe even use AI voice technology to sound like a real person calling. The first 2 seconds determine whether I answer or decline.`,
  },
};

export const overallVerdict = {
  rating: 7.5,
  ratingLabel: "Strong potential with execution risks",
  summary: `This is a genuinely useful idea that solves a real pain point. The key insight — that notifications are too easy to ignore and phone calls are genuinely disruptive — is correct. However, the execution is HARD. Carrier restrictions, privacy concerns, spam filtering, and call reliability are all significant technical challenges.

The market is real and underserved. ADHD adults, elderly patients, and busy professionals all struggle with the same problem. The pricing sweet spot is $3-5/month or a $25-30 one-time purchase.

My biggest advice: Start with ONE use case (medical appointments) and ONE platform (iOS). Nail the call experience, prove reliability, then expand. Don't try to be everything to everyone.

The competitor landscape is weak — most existing solutions are either notification-based or poorly executed call services. There's room for a polished, trustworthy product.

RISK LEVEL: Medium. The idea is good, but the technical and business challenges (carrier relationships, call costs at scale, privacy compliance) are significant. This is not a "build it in a weekend" app. You need infrastructure, legal compliance, and carrier relationships.`,
  nextSteps: [
    "Build an MVP with Twilio API for phone calls (fastest path to market)",
    "Test with 50-100 ADHD community members (they're your power users)",
    "Measure: call answer rate, snooze rate, appointment attendance improvement",
    "If >80% answer rate and users report fewer missed appointments → scale",
    "Explore B2B healthcare partnerships early — that's where the real revenue is",
  ],
};

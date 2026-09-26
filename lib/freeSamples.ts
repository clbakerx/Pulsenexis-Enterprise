// app/components/freeSamples.ts
// The pool of tracks the free-sample page picks from.

export type FreeSample = {
  id: string;
  title: string;
  vibe: string;
  audioUrl: string;
};

const BASE = "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/FreeSamples";

// encodeURI handles the spaces and parentheses in the file names.
const url = (file: string) => encodeURI(`${BASE}/${file}`);

const slug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const TRACKS: Omit<FreeSample, "id">[] = [
  { title: "48 Hours", vibe: "Moody - R&B", audioUrl: url("48-Hours_V2_Sample.mp3") },
  { title: "A Love Thats True", vibe: "Romantic - R&B", audioUrl: url("A_Love_Thats_True_Sample.mp3") },
  { title: "All In", vibe: "Romantic - R&B", audioUrl: url("All In_Sample.mp3") },
  { title: "All Of Me", vibe: "Moody - R&B", audioUrl: url("All of Me_Sample.mp3") },
  { title: "Almost Counts", vibe: "Emotional - R&B", audioUrl: url("Almost Counts_Sample.mp3") },
  { title: "Another Moment", vibe: "Moody - R&B", audioUrl: url("Another Moment_V2_Sample.mp3") },
  { title: "Betrayed Again", vibe: "Moody - R&B", audioUrl: url("Betrayed Again_V2_Sample.mp3") },
  { title: "Boyfriend", vibe: "Moody - R&B", audioUrl: url("Boyfriend_Sample.mp3") },
  { title: "Breaking My Heart", vibe: "Moody - R&B", audioUrl: url("Breaks My Heart.mp3") },
  { title: "Bring The Snow", vibe: "Moody - R&B", audioUrl: url("Bring-the-Snow(Slide We Ride)Sample.mp3") },
  { title: "Built Different", vibe: "Moody - R&B", audioUrl: url("Built Different_Sample.mp3") },
  { title: "Cant Stay Away", vibe: "Moody - R&B", audioUrl: url("Cant Stay Away_Sample.mp3") },
  { title: "Chances", vibe: "Moody - R&B", audioUrl: url("Chances_30secSample.mp3") },
  { title: "Clean Air", vibe: "Poetic - Soul", audioUrl: url("Clean Air_Sample.mp3") },
  { title: "Closer Than Before", vibe: "Romantic - R&B", audioUrl: url("Closer-Than-Before_Sample.mp3") },
  { title: "Crystal Ball", vibe: "Poetic - Soul", audioUrl: url("Crystal Ball_Sample.mp3") },
  { title: "Emotionally", vibe: "Moody - R&B", audioUrl: url("Emotionally_Sample.mp3") },
  { title: "Extraordinary Love", vibe: "Romantic - R&B", audioUrl: url("Extraordinary Love_Sample.mp3") },
  { title: "First Sight", vibe: "Moody - R&B", audioUrl: url("First Sight_Sample.mp3") },
  { title: "Forward", vibe: "Moody - R&B", audioUrl: url("Forward (No Looking Back)_Sample.mp3") },
  { title: "Heart Gets In The Way", vibe: "Moody - R&B", audioUrl: url("Heart Gets in the Way.mp3") },
  { title: "Last Night", vibe: "Moody - R&B", audioUrl: url("Last Night .mp3") },
  { title: "Made For This", vibe: "Romantic - R&B", audioUrl: url("Made For This_Sample.mp3") },
  { title: "Millionaire", vibe: "Moody - R&B", audioUrl: url("Millionaire_V2_Sample.mp3") },
  { title: "Movie Of The Year", vibe: "Moody - R&B", audioUrl: url("Movie of the Year_Sample.mp3") },
  { title: "Never Again", vibe: "Moody - R&B", audioUrl: url("Never Again_Sample.mp3") },
  { title: "No Distance Between Us", vibe: "Romantic - R&B", audioUrl: url("No-Distance-Between-Us_V2_Sample.mp3") },
  { title: "No Doubt", vibe: "Moody - R&B", audioUrl: url("No Doubt_Sample.mp3") },
  { title: "No Halfway Love", vibe: "Moody - R&B", audioUrl: url("No Halfway Love_Sample.mp3") },
  { title: "No Way You Win", vibe: "Moody - R&B", audioUrl: url("No Way You Win_Sample.mp3") },
  { title: "Not Just For Tonight", vibe: "Moody - R&B", audioUrl: url("Not Just For Tonight_Sample.mp3") },
  { title: "Nothing Falls Through", vibe: "Moody - R&B", audioUrl: url("Nothing-Falls-Through_V2_Short.mp3") },
  { title: "One Love", vibe: "Romantic - R&B", audioUrl: url("One Love_Sample.mp3") },
  { title: "Paid The Price", vibe: "Moody - R&B", audioUrl: url("Paid the Price_Sample.mp3") },
  { title: "Perfect Choice", vibe: "Romantic - R&B", audioUrl: url("Perfect-Choice-(Remix).mp3") },
  { title: "Release Me", vibe: "Moody - R&B", audioUrl: url("Release Me_Sample.mp3") },
  { title: "Right Here With You", vibe: "Romantic - R&B", audioUrl: url("Right-Here-With-You_Sample.mp3") },
  { title: "Right In The Middle", vibe: "Moody - R&B", audioUrl: url("Right in the Middle_30secSample.mp3") },
  { title: "Say It Right", vibe: "Moody - R&B", audioUrl: url("Say it Right_Sample.mp3") },
  { title: "Sensational", vibe: "Romantic - R&B", audioUrl: url("Sensational_V2.mp3") },
  { title: "Slow Motion Love", vibe: "Romantic - R&B", audioUrl: url("Slow Motion Love_Sample.mp3") },
  { title: "Soapbox Attention", vibe: "Moody - R&B", audioUrl: url("Soapbox Attention_Sample.mp3") },
  { title: "Teach Me To Love", vibe: "Romantic - R&B", audioUrl: url("Teach Me to Love_Sample.mp3") },
  { title: "Tell Me You Love Me Again", vibe: "Romantic - R&B", audioUrl: url("Tell-Me-You-Love-Me-Again_Sample.mp3") },
  { title: "The Only Way I Be", vibe: "Poetic - Soul", audioUrl: url("The Only Way I Be_Sample.mp3") },
  { title: "This Love Aint Temporary", vibe: "Moody - R&B", audioUrl: url("This-Love-Aint-Temporary_V2_Sample.mp3") },
  { title: "This Love Is Relevant", vibe: "Moody - R&B", audioUrl: url("This-Love-Is-Relevant_Sample.mp3") },
  { title: "Under The Moonlight", vibe: "Romantic - R&B", audioUrl: url("Under the Moonlight_V2_Sample.mp3") },
  { title: "Where Do We Go Tonight", vibe: "Moody - R&B", audioUrl: url("Where Do We Go Tonight_Sample.mp3") },
  { title: "Where Im Going", vibe: "Poetic - Soul", audioUrl: url("Where-Im-Going_V2_Sample.mp3") },
  { title: "Where We Need To Be", vibe: "Moody - R&B", audioUrl: url("Where We Need to Be_Sample.mp3") },
  { title: "Winter White", vibe: "Poetic - Soul", audioUrl: url("Winter-While-Sample.mp3") },
  { title: "Wouldnt Want To", vibe: "Moody - R&B", audioUrl: url("Wouldnt-Want-To_Sample.mp3") },
];

export const FREE_SAMPLES: FreeSample[] = TRACKS.map((t) => ({
  id: slug(t.title),
  ...t,
}));
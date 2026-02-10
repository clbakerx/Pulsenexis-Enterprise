export type Track = {
  id: string;
  title: string;
  artist?: string | null;
  mood?: string;
  bpm?: number;
  key?: string;
  previewSrc?: string; // full URL OR filename
};

export const TRACKS: Track[] = [
  {
    id: "t1",
    title: "Come Get This Love (Remix)",
    artist: "PulseNexis",
    mood: "Grown & soulful",
    bpm: 76,
    key: "E minor",
    previewSrc:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Come%20Get%20This%20Love%20(Remix).mp3",
  },
  {
    id: "t2",
    title: "Your Love Comes With Side Effects",
    artist: "PulseNexis",
    previewSrc:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Your%20Love%20Comes%20With%20Side%20Effects.mp3",
  },
  {
    id: "t3",
    title: "You Got Me Funked Up",
    artist: "PulseNexis",
    previewSrc:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/You%20Got%20Me%20Funked%20Up.mp3",
  },
  {
    id: "t4",
    title: "You And Me",
    artist: "PulseNexis",
    previewSrc:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/You%20And%20Me.mp3",
  },
  {
    id: "t5",
    title: "Worth The Wait (Remix)",
    artist: "PulseNexis",
    previewSrc:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Worth%20The%20Wait%20(Remix).mp3",
  },
  {
    id: "t6",
    title: "With You",
    artist: "PulseNexis",
    previewSrc:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/With%20You_Sample_1.mp3",
  },
  {
    id: "t7",
    title: "Made For Me",
    artist: "PulseNexis",
    previewSrc:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Made%20For%20Me.mp3",
  },
  {
    id: "t8",
    title: "Loud and Clear",
    artist: "PulseNexis",
    previewSrc:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Loud%20and%20Clear.mp3",
  },
  {
    id: "t9",
    title: "Heaven To Me",
    artist: "PulseNexis",
    previewSrc:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Like%20Heaven%20To%20Me.mp3",
  },
  {
    id: "t10",
    title: "Lead The Way",
    artist: "PulseNexis",
    previewSrc:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Lead%20The%20Way.mp3",
  },
  {
    id: "t11",
    title: "If It’s Real",
    artist: "PulseNexis",
    previewSrc:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/IF%20IT'S%20REAL.mp3",
  },
  {
    id: "t12",
    title: "I’ll Never Love Another (Remix)",
    artist: "PulseNexis",
    previewSrc:
      "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/I'll%20Never%20Love%20Another%20(Remix).mp3",
  },
  {
  id: "t13",
  title: "Hold Me Closer Tonight",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Hold%20Me%20Closer%20Tonight.mp3",
},
{
  id: "t14",
  title: "Here at Your Beck n Call",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Here%20at%20Your%20Beck%20n%20Call.mp3",
},
{
  id: "t15",
  title: "Every Inch of You",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Every%20Inch%20of%20You.mp3",
},
{
  id: "t16",
  title: "Dream Lover",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Dream%20Lover.mp3",
},
{
  id: "t17",
  title: "Don’t Let Me Be a Memory",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Don't%20Let%20Me%20Be%20a%20Memory.mp3",
},
{
  id: "t18",
  title: "Deeper Than Me",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Deeper%20Than%20Me.mp3",
},
{
  id: "t19",
  title: "Hold Me Closer Tonight",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Catalog/Hold-Me-Closer-Tonight/samples/Hold-Me-Closer-Tonight_16Bar.mp3",
},
{
  id: "t20",
  title: "Breakin Me Down",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Breakin'%20Me%20Down.mp3",
},
{
  id: "t21",
  title: "With These Words",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/With%20These%20Words.mp3",
},
{
  id: "t22",
  title: "With My Heart, I Do",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/With%20My%20Heart%2C%20I%20Do.mp3",
},{
  id: "t23",
  title: "Where Love Used to Live",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Where%20Love%20Used%20to%20Live.mp3",
},{
  id: "t24",
  title: "When You Look",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/When%20You%20Look.mp3",
},
{
  id: "t25",
  title: "What I wanna do to You",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/What%20I%20Wanna%20Do%20to%20You.mp3",
},
{
  id: "t26",
  title: "The First Time I Never (conflicted",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/The%20First%20Time%20I%20Never%20(conflicted).mp3",
},
{
  id: "t27",
  title: "The Cool in You",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/The-Cool-In-You.mp3",
},
{
  id: "t28",
  title: "The Awakening",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/The-Awakening.mp3",
},
{
  id: "t29",
  title: "Pieces of Me",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Pieces%20Of%20Me.mp3",
},
{
  id: "t30",
  title: "More Than Friends",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/More%20Than%20Friends.mp3",
},
{
  id: "t31",
  title: "Loves Lullaby",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Love's%20Lullaby.mp3",
},
{
  id: "t32",
  title: "In Your Hands",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/In%20Your%20Hands.mp3",
},
{
  id: "t33",
  title: "In Time",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/In%20Time.mp3",
},
{
  id: "t34",
  title: "Hushproof",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Hushproof.mp3",
},
{
  id: "t35",
  title: "How Many Love Songs",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/How%20Many%20Love%20Songs.mp3",
},
{
  id: "t36",
  title: "When You Are Mine",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/When%20You%20are%20Mine.mp3",
},
{
  id: "t36",
  title: "What's Your Number",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/What's%20Your%20Number.mp3",
},
{
  id: "t37",
  title: "So Right, So Fine",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/So%20Right%2C%20So%20Fine%20copy.mp3",
},
{
  id: "t38",
  title: "Money Talks in Minor Keys",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Money%20Talks%20in%20Minor%20Keys.mp3",
},
{
  id: "t39",
  title: "Mike Dreams",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Mike%20Dreams.mp3",
},

{
  id: "t40",
  title: "All I'm Capable Of",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Catalog/All-I%27m-Capable-Of/All%20I%E2%80%99m%20Capable%20Of_60secSample.mp3",
},
{
  id: "t41",
  title: "Feeling Fly",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Catalog/Feeling-Fly/Feeling%20Fly_60secSample.mp3",
},
{
  id: "t42",
  title: "Strawberries and Cream",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Strawberries%20and%20Cream_Sample_1.mp3",
},
{
  id: "t43",
  title: "How I Love You",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/How%20I%20Love%20You.mp3",
},
{
  id: "t44",
  title: "Drop City",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Catalog/Drop-City/Drop%20City_60secSample.mp3",
},
{
  id: "t45",
  title: "Be My Misses Clause",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Catalog/Be-My-Misses_Clause/Be%20My%20Mrs_%20Clause_60secSample.mp3",
},
{
  id: "t46",
  title: "Nothing Falls Through",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Catalog/Nothing-Falls-Through/Nothing%20Falls%20Through_60Sec.mp3",
},
{
  id: "t47",
  title: "Stay Until The Morning",
  artist: "PulseNexis",
  previewSrc:
    "https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/Catalog/Stay-Until-The-Morning/Stay%20Until%20the%20Morning_60secSample.mp3",
},
];
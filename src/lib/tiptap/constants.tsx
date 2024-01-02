import {
  AiToneOption,
  LanguageOption,
} from '#/components/tiptap/block-editor/types';

export const languages: LanguageOption[] = [
  { name: 'arabic', label: 'Arabic', value: 'ar' as LanguageOption['value'] },
  { name: 'chinese', label: 'Chinese', value: 'zh' as LanguageOption['value'] },
  { name: 'english', label: 'English', value: 'en' as LanguageOption['value'] },
  { name: 'french', label: 'French', value: 'fr' as LanguageOption['value'] },
  { name: 'german', label: 'German', value: 'de' as LanguageOption['value'] },
  { name: 'greek', label: 'Greek', value: 'gr' as LanguageOption['value'] },
  { name: 'italian', label: 'Italian', value: 'it' as LanguageOption['value'] },
  {
    name: 'japanese',
    label: 'Japanese',
    value: 'jp' as LanguageOption['value'],
  },
  { name: 'korean', label: 'Korean', value: 'ko' as LanguageOption['value'] },
  { name: 'russian', label: 'Russian', value: 'ru' as LanguageOption['value'] },
  { name: 'spanish', label: 'Spanish', value: 'es' as LanguageOption['value'] },
  { name: 'swedish', label: 'Swedish', value: 'sv' as LanguageOption['value'] },
  {
    name: 'ukrainian',
    label: 'Ukrainian',
    value: 'ua' as LanguageOption['value'],
  },
];

export const embeds = {
  twitter: {
    regex:
      /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(?:\?|\/|$)(\S+)?$/i,
  },
  youtube: {
    regex:
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|shorts\/|v\/)?)([\w-]+)(\S+)?$/i,
  },
  instagram: {
    regex:
      /^https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel|reels)\/([^/?#&]+)(\S+)?$/i,
  },
  tiktok: {
    regex:
      /^(https?:\/\/)?(?:(?:www)\.(?:tiktok\.com)(?:\/)(?!foryou)(@[a-zA-Z0-9_.]+)(?:\/)(?:video)(?:\/)([\d]+)|(?:m)\.(?:tiktok\.com)(?:\/)(?!foryou)(?:v)(?:\/)?(?=([\d]+)\.html)|vm\.tiktok\.com(?:\/)([\S]+)(?:\/))(\S+)?$/i,
  },
  generic: {
    regex:
      /^(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/i,
  },
};

export enum EmbedService {
  YOUTUBE = 'youtube',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  FRAMER = 'framer',
  FIGMA = 'figma',
}

export const tones: AiToneOption[] = [
  { name: 'academic', label: 'Academic', value: 'academic' },
  { name: 'business', label: 'Business', value: 'business' },
  { name: 'casual', label: 'Casual', value: 'casual' },
  { name: 'childfriendly', label: 'Childfriendly', value: 'childfriendly' },
  { name: 'conversational', label: 'Conversational', value: 'conversational' },
  { name: 'emotional', label: 'Emotional', value: 'emotional' },
  { name: 'humorous', label: 'Humorous', value: 'humorous' },
  { name: 'informative', label: 'Informative', value: 'informative' },
  { name: 'inspirational', label: 'Inspirational', value: 'inspirational' },
  { name: 'memeify', label: 'Memeify', value: 'meme' },
  { name: 'narrative', label: 'Narrative', value: 'narrative' },
  { name: 'objective', label: 'Objective', value: 'objective' },
  { name: 'persuasive', label: 'Persuasive', value: 'persuasive' },
  { name: 'poetic', label: 'Poetic', value: 'poetic' },
];

export const userNames = [
  'Bulbasaur',
  'Ivysaur',
  'Venusaur',
  'Charmander',
  'Charmeleon',
  'Charizard',
  'Squirtle',
  'Wartortle',
  'Blastoise',
  'Caterpie',
  'Metapod',
  'Butterfree',
  'Weedle',
  'Kakuna',
  'Beedrill',
  'Pidgey',
  'Pidgeotto',
  'Pidgeot',
  'Rattata',
  'Raticate',
  'Spearow',
  'Fearow',
  'Ekans',
  'Arbok',
  'Pikachu',
  'Raichu',
  'Sandshrew',
  'Sandslash',
  'Nidoran',
  'Nidorina',
  'Nidoqueen',
  'Nidoran',
  'Nidorino',
  'Nidoking',
  'Clefairy',
  'Clefable',
  'Vulpix',
  'Ninetales',
  'Jigglypuff',
  'Wigglytuff',
  'Zubat',
  'Golbat',
  'Oddish',
  'Gloom',
  'Vileplume',
  'Paras',
  'Parasect',
  'Venonat',
  'Venomoth',
  'Diglett',
  'Dugtrio',
  'Meowth',
  'Persian',
  'Psyduck',
  'Golduck',
  'Mankey',
  'Primeape',
  'Growlithe',
  'Arcanine',
  'Poliwag',
  'Poliwhirl',
  'Poliwrath',
  'Abra',
  'Kadabra',
  'Alakazam',
  'Machop',
  'Machoke',
  'Machamp',
  'Bellsprout',
  'Weepinbell',
  'Victreebel',
  'Tentacool',
  'Tentacruel',
  'Geodude',
  'Graveler',
  'Golem',
  'Ponyta',
  'Rapidash',
  'Slowpoke',
  'Slowbro',
  'Magnemite',
  'Magneton',
  'Farfetched',
  'Doduo',
  'Dodrio',
  'Seel',
  'Dewgong',
  'Grimer',
  'Muk',
  'Shellder',
  'Cloyster',
  'Gastly',
  'Haunter',
  'Gengar',
  'Onix',
  'Drowzee',
  'Hypno',
  'Krabby',
  'Kingler',
  'Voltorb',
  'Electrode',
  'Exeggcute',
  'Exeggutor',
  'Cubone',
  'Marowak',
  'Hitmonlee',
  'Hitmonchan',
  'Lickitung',
  'Koffing',
  'Weezing',
  'Rhyhorn',
  'Rhydon',
  'Chansey',
  'Tangela',
  'Kangaskhan',
  'Horsea',
  'Seadra',
  'Goldeen',
  'Seaking',
  'Staryu',
  'Starmie',
  'Mr. Mime',
  'Scyther',
  'Jynx',
  'Electabuzz',
  'Magmar',
  'Pinsir',
  'Tauros',
  'Magikarp',
  'Gyarados',
  'Lapras',
  'Ditto',
  'Eevee',
  'Vaporeon',
  'Jolteon',
  'Flareon',
  'Porygon',
  'Omanyte',
  'Omastar',
  'Kabuto',
  'Kabutops',
  'Aerodactyl',
  'Snorlax',
  'Articuno',
  'Zapdos',
  'Moltres',
  'Dratini',
  'Dragonair',
  'Dragonite',
  'Mewtwo',
  'Mew',
];

export const userColors = [
  '#fb7185',
  '#f472b6',
  '#e879f9',
  '#c084fc',
  '#a78bfa',
  '#818cf8',
  '#60a5fa',
  '#38bdf8',
  '#22d3ee',
  '#2dd4bf',
  '#34d399',
  '#4ade80',
  '#a3e635',
  '#facc15',
  '#fbbf24',
  '#fb923c',
];

export const themeColors = [
  '#FF6347',
  '#FFD700',
  '#32CD32',
  '#00BFFF',
  '#9370DB',
  '#FF4500',
  '#9ACD32',
  '#1E90FF',
  '#BA55D3',
  '#8B4513',
  '#808080',
  '#000000',
  '#FFFFFF',
];

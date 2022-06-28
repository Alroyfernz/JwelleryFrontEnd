const jwelleryData = [
  {
    id: 1,
    name: "Rings",
    link: "/category/jwellery/rings",
    data: [
      { id: 1, link: "/category/jwellery/rings/ladies", name: "Ladies" },
      { id: 2, link: "/category/jwellery/rings/gents", name: "Gents" },
      { id: 3, link: "/category/jwellery/rings/stone", name: "Stone" },
      { id: 4, link: "/category/jwellery/rings/baby", name: "Baby" },

      { id: 5, link: "/category/jwellery/rings/couple", name: "Couple" },
      { id: 6, link: "/category/jwellery/rings/zodiac", name: "Zodiac" },
    ],
  },
  {
    id: 2,
    name: "Chain",
    link: "/category/jwellery/chain",
    data: [
      {
        id: 1,
        link: "/category/jwellery/chain/shortchain",
        name: "Short chain",
      },
      { id: 2, link: "/category/jwellery/chain/fullchain", name: "Full chain" },
    ],
  },
  {
    id: 3,
    name: "Mangalsutras",
    link: "/category/jwellery/mangalsutras",
    data: [
      {
        id: 1,
        link: "/category/jwellery/mangalsutras/longmangalsutras",
        name: "Long Mangalsutras",
      },
      {
        id: 2,
        link: "/category/jwellery/mangalsutras/shortmangalsutras",
        name: "Short Mangalsutras",
      },
    ],
  },

  {
    id: 5,
    name: "Men's",
    link: "/category/jwellery/gents",
    data: [
      { id: 1, link: "/category/jwellery/gents/bracelet", name: "Bracelet" },
      { id: 2, link: "/category/jwellery/gents/kada", name: "Kada" },
    ],
  },
  {
    id: 6,
    name: "Necklace",
    link: "/category/jwellery/necklace",
    data: [
      {
        id: 1,
        link: "/category/jwellery/necklace/longnecklace",
        name: "Long Nacklace",
      },
      {
        id: 2,
        link: "/category/jwellery/necklace/shortnecklace",
        name: "Short Nacklace",
      },
    ],
  },
  {
    id: 7,
    name: "Hair Accessories",
    link: "/category/jwellery/hairaccessories",
    data: [
      {
        id: 1,
        link: "/category/jwellery/hairaccessories/valsat",
        name: "Valsat",
      },
      { id: 2, link: "/category/jwellery/hairaccessories/aati", name: "aati" },
      { id: 2, link: "/category/jwellery/hairaccessories/leor", name: "leor" },
    ],
  },
];

const GoldData = [
  { id: 1, link: "/category/jwellery/rings?gold=true", name: "Rings" },
  { id: 2, link: "/category/jwellery/earrings?gold=true", name: "Earrings" },
  {
    id: 3,
    link: "/category/jwellery/bracelets&bangles?gold=true",
    name: "Bracelets & Bangles",
  },
  {
    id: 4,
    link: "/category/jwellery/pendants&set?gold=true",
    name: "Pendants & Set",
  },
  {
    id: 5,
    link: "/category/jwellery/mangalsutra?gold=true",
    name: "Mangalsutra",
  },
  { id: 6, link: "/category/jwellery/chains?gold=true", name: "Chains" },
  {
    id: 7,
    link: "/category/jwellery/necklace&sets?gold=true",
    name: "Necklace & Sets",
  },
  { id: 8, link: "/category/jwellery/goldnath?gold=true", name: "Gold Nath" },
  {
    id: 9,
    link: "/category/jwellery/goldnath?gold=true",
    name: "Name Pendant",
  },
];

const DiamondData = [
  { id: 1, link: "/category/jwellery/earrings?diamond=true", name: "Earrings" },
  {
    id: 2,
    link: "/category/jwellery/pendants&set?diamond=true",
    name: "Pendants & Set",
  },
  {
    id: 3,
    link: "/category/jwellery/bracelets&bangles?diamond=true",
    name: "Bracelet & Bangles",
  },
  {
    id: 4,
    link: "/category/jwellery/mangalsutra?diamond=true",
    name: "Mangalsutra",
  },
  { id: 5, link: "/category/jwellery/rings?diamond=true", name: "Rings" },
  {
    id: 6,
    link: "/category/jwellery/necklace&sets?diamond=true",
    name: "Necklaces & Sets",
  },
  { id: 7, link: "/category/jwellery/nosepins?diamond=true", name: "Nosepins" },
];

const CoinsData = [
  {
    id: 1,
    name: "Gold Coins(995)",
    link: "/category/coins/goldcoins995",
    data: [
      { id: 11, link: "/category/coins/goldcoins995/1gm", name: "1gm" },
      { id: 12, link: "/category/coins/goldcoins995/2gm", name: "2gm" },

      { id: 14, link: "/category/coins/goldcoins995/5gm", name: "5gm" },
      { id: 15, link: "/category/coins/goldcoins995/10gm", name: "10gm" },
    ],
  },
  {
    id: 2,
    name: "Gold Vedhani(995)",
    link: "/category/coins/goldvedhani995",
    data: [
      { id: 10, link: "/category/coins/goldcoins995/0.5gm", name: "0.5gm" },
      { id: 11, link: "/category/coins/goldcoins995/1gm", name: "1gm" },
      { id: 12, link: "/category/coins/goldcoins995/2gm", name: "2gm" },
      { id: 13, link: "/category/coins/goldcoins995/3gm", name: "3gm" },
      { id: 14, link: "/category/coins/goldcoins995/5gm", name: "5gm" },
      { id: 15, link: "/category/coins/goldcoins995/10gm", name: "10gm" },
    ],
  },
  {
    id: 3,
    name: "Silver",
    link: "/category/coins/silver",
    data: [
      { id: 11, link: "/category/coins/goldcoins995/5gm", name: "5gm" },
      { id: 12, link: "/category/coins/goldcoins995/15gm", name: "15gm" },
      { id: 13, link: "/category/coins/goldcoins995/20gm", name: "20gm" },
      { id: 14, link: "/category/coins/goldcoins995/25gm", name: "25gm" },
      { id: 15, link: "/category/coins/goldcoins995/50gm", name: "50gm" },
      { id: 16, link: "/category/coins/goldcoins995/100gm", name: "100gm" },
    ],
  },
];

const ShipsNowData = [
  {
    id: 1,
    link: "/category/jwellery/pendants&set?gold=true",
    name: "All ready items",
  },
];

const PlatinumData = [
  {
    id: 1,
    link: "/category/jwellery/pendants&set?gold=true",
    name: "All Ready items",
  },
];
const SilverData = [
  {
    id: 1,
    link: "/category/jwellery/pendants&set?gold=true",
    name: "All Ready items",
  },
];
const WatchesData = [
  {
    id: 1,
    link: "/category/jwellery/pendants&set?gold=true",
    name: "All Ready items",
  },
];

const GiftsData = [
  { id: 1, link: "/category/gift/birthday", name: "Birthday" },
  { id: 2, link: "/category/gift/wedding", name: "Wedding" },
  { id: 3, link: "/category/gift/engagement", name: "Engagement" },
  { id: 4, link: "/category/gift/anniversary", name: "Anniversary" },
];

export const NavItems = [
  { id: 1, name: "JEWELLERY", data: jwelleryData, link: "/category/jwellery" },
  { id: 2, name: "GOLD", data: GoldData, link: "/category/gold" },

  { id: 3, name: "DIAMOND", data: DiamondData, link: "/category/diamond" },
  { id: 4, name: "COINS", data: CoinsData, link: "/category/coins" },
  { id: 5, name: "GIFTS", data: GiftsData, link: "/category/gifts" },

  { id: 6, name: "PLATINUM", data: PlatinumData, link: "/category/platinum" },
  { id: 7, name: "SILVER", data: SilverData, link: "/category/silver" },
  { id: 8, name: "WATCHES", data: WatchesData, link: "/category/watches" },
  { id: 9, name: "SHIPS NOW", data: ShipsNowData, link: "/" },
];

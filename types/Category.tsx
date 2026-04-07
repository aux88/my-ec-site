export const CATEGORIES = {
    all: "すべて",
    clothes: "衣類",
    accessories: "アクセサリー",
    gadget: "ガジェット",
} as const;
  
export type Category = keyof typeof CATEGORIES;
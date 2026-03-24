export type Category =
    | "all"
    | "clothes"
    | "accessories"
    | "gadget"
    ;

export const CATEGORY_LABELS: Record<Category, string> = {
    "all": "すべて",
    "clothes": "衣類",
    "accessories": "アクセサリー",
    "gadget": "ガジェット",
};

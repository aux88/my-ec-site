"use client";
import { createContext, useState, ReactNode } from "react";
import { Category } from "@/app/types/Category";

type FilterContextValue = {
    category: Category;
    selectCategory: (category: Category) => void;
};

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
    const [category, setFilter] = useState<Category>("all");

    const selectCategory = (category: Category) => {
        setFilter(category);
    };

    return (
        <FilterContext.Provider value={{ category, selectCategory }}>
        {children}
        </FilterContext.Provider>
    );
}

export default FilterContext;
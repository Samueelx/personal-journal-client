import React, { createContext, useState, ReactNode } from 'react';

interface CategoryContextProps {
  categoryId: string | null;
  setCategoryId: (id: string | null) => void;
}

const CategoryContext = createContext<CategoryContextProps>({
  categoryId: null,
  setCategoryId: () => {},
});

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categoryId, setCategoryId] = useState<string | null>(null);

  return (
    <CategoryContext.Provider value={{ categoryId, setCategoryId }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;

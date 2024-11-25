// src/stores/basket.ts
import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent'

export type BasketItem = {
  pid: string; // Unique product ID
  size: string;
  quantity: number;
  price: number;
};

// Base store to hold raw items
// export const basketStore = persistentAtom<string, BasketItem[]>(basketStore,[]);
export const basketStore = persistentAtom<BasketItem[]>(
  'basket', // Key used in localStorage
  [], // Default value
  {
    encode: JSON.stringify, // Serialize to store in localStorage
    decode: JSON.parse,     // Deserialize when reading from localStorage
  }
);
// Function to add an item to the basket, grouping items by pid
export function addToBasket(newItem: BasketItem) {
  const currentItems = basketStore.get();

  // Check if there's already an item with the same pid
  const existingItemIndex = currentItems.findIndex((item: BasketItem) => item.pid === newItem.pid);

  if (existingItemIndex !== -1) {
    // Update the existing item by summing quantities and prices
    const updatedItem = {
      ...currentItems[existingItemIndex],
      quantity: currentItems[existingItemIndex].quantity + newItem.quantity,
      price: currentItems[existingItemIndex].price + newItem.price,
    };

    // Replace the existing item with the updated one
    basketStore.set([
      ...currentItems.slice(0, existingItemIndex),
      updatedItem,
      ...currentItems.slice(existingItemIndex + 1),
    ]);
  } else {
    // Add the new item if no matching pid exists
    basketStore.set([...currentItems, newItem]);
  }
}

// components/Basket.tsx
import { basketStore, type BasketItem } from '../stores/basket';
import { useStore } from '@nanostores/react';

const Basket: React.FC = () => {
  const items: BasketItem[] = useStore(basketStore);
  console.log('Basket items:', items);

  const handleDelete = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index); // Remove the item by index
    basketStore.set(updatedItems); // Update the basket store
  };
  
  if (!items.length) return null;

  return (
    <div className="p-8 bg-white  w-full mb-8">
      <h2 className="text-xl font-bold mb-4">Warenkorb</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mb-2 p-2 border flex justify-between">
            <span>{item.quantity} x {item.size}L - {item.price.toFixed(2)} €</span>
            <button
              onClick={() => handleDelete(index)}
              className="text-red-500 hover:text-red-700 text-xl"
              aria-label="Delete item"
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <button 
        onClick={() => (window.location.href = '/checkout')}
        type="button"
        className="w-full bg-white_smoke-400 text-black py-2 rounded hover:bg-green-700 transition"
      >
        Bestellen
      </button>
    </div>
  );
};

export default Basket;

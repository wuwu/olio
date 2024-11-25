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


  return (
    <div className="p-4 bg-white shadow-lg rounded-md w-80">
      <h2 className="text-xl font-bold mb-4">Warenkorb</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mb-4 flex justify-between">
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
    </div>
  );
};

export default Basket;

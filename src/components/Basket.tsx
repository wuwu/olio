// components/Basket.tsx
import { basketStore, type BasketItem } from '../stores/basket';
import { useStore } from '@nanostores/react';

const Basket: React.FC = () => {
  const items: BasketItem[] = useStore(basketStore);
  console.log('Basket items:', items);

  return (
    <div className="p-4 bg-white shadow-lg rounded-md w-80">
      <h2 className="text-xl font-bold mb-4">Warenkorb</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mb-4">
            {item.quantity} x {item.size}L - {item.price.toFixed(2)} €
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Basket;

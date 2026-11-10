import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from 'react';
import { getProductDetailById } from '../data/products';
import { ProductModal } from '../components/product-modal/ProductModal';

interface ProductModalContextValue {
  selectedProductId: string | null;
  openProductModal: (
    productId: string,
    triggerElement?: HTMLElement | null
  ) => void;
  closeProductModal: () => void;
}

const ProductModalContext = createContext<ProductModalContextValue | null>(
  null
);

export const ProductModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const lastTriggerElRef = useRef<HTMLElement | null>(null);

  const openProductModal = useCallback(
    (productId: string, triggerElement?: HTMLElement | null) => {
      if (triggerElement) {
        lastTriggerElRef.current = triggerElement;
      } else if (document.activeElement instanceof HTMLElement) {
        lastTriggerElRef.current = document.activeElement;
      }
      setSelectedProductId(productId);
    },
    []
  );

  const closeProductModal = useCallback(() => {
    setSelectedProductId(null);
    const triggerEl = lastTriggerElRef.current;
    if (triggerEl) {
      window.setTimeout(() => {
        triggerEl.focus();
      }, 20);
    }
  }, []);

  const selectedProduct = getProductDetailById(selectedProductId);

  return (
    <ProductModalContext.Provider
      value={{
        selectedProductId,
        openProductModal,
        closeProductModal,
      }}
    >
      {children}
      <ProductModal product={selectedProduct} onClose={closeProductModal} />
    </ProductModalContext.Provider>
  );
};

export function useProductModal(): ProductModalContextValue {
  const ctx = useContext(ProductModalContext);
  if (!ctx) {
    throw new Error(
      'useProductModal must be used within a ProductModalProvider'
    );
  }
  return ctx;
}

import { Button } from "@/components/atoms/button";
import { useCartStore } from "@/store/cart";
import { Minus, Plus, Trash2, X } from "lucide-react";

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
    const { items, removeItem, increaseQty, decreaseQty } = useCartStore();

    const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div
            className={`fixed right-0 top-0 h-full bg-white dark:bg-neutral-900 shadow-xl border-l border-gray-200 dark:border-neutral-800 transition-all duration-300 ease-in-out z-50 flex flex-col ${isOpen ? "w-80 translate-x-0" : "w-0 translate-x-full opacity-0"
                }`}
        >
            <div className="p-4 border-b border-gray-200 dark:border-neutral-800 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        Cart is empty
                    </div>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col gap-2 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg"
                        >
                            <div className="flex justify-between items-start">
                                <span className="font-medium text-sm line-clamp-2">
                                    {item.name}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm font-semibold">
                                    ৳{(item.price * item.quantity).toFixed(2)}
                                </span>
                                <div className="flex items-center gap-2 bg-white dark:bg-neutral-700 rounded-md border border-gray-200 dark:border-neutral-600">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="p-1 rounded-l-md"
                                        onClick={() => decreaseQty(item.id)}
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="text-xs w-4 text-center">
                                        {item.quantity}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="p-1 rounded-r-md"
                                        disabled={item.quantity >= item.stock}
                                        onClick={() => increaseQty(item.id)}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900">
                <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total</span>
                    <span className="text-lg font-bold">৳{total.toFixed(2)}</span>
                </div>
                <Button className="w-full">Checkout</Button>
            </div>
        </div>
    );
};

export default CartSidebar;

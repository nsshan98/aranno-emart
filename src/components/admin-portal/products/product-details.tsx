import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";

const ProductDetails = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="link" className="w-full max-w-sm">
            Details
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              Provides detailed information about the product.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ProductDetails;

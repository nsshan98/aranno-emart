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
import DeleteModal from "@/components/molecules/delete-modal";

interface ProductDeleteComponentProps {
  open: boolean;
  onClose: () => void;
}

const ProductDeleteComponent = ({
  open,
  onClose,
}: ProductDeleteComponentProps) => {
  const handleDeleteProduct = async () => {
    // await employeeDeleteMutation.mutateAsync(employeeId, {
    //   onSuccess: () => {
    //     toast("Employee Deleted Successfully");
    //     onClose();
    //   },
    //   onError: () => {
    //     toast.error("Something Went Wrong");
    //   },
    // });
  };

  return (
    <DeleteModal
      open={open}
      onClose={onClose}
      onConfirm={handleDeleteProduct}
      isLoading={false}
    />
  );
};

export default ProductDeleteComponent;

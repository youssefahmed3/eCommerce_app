import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { deleteProductById } from "@/lib/actions/product.action";
import { ProductType } from "@/lib/models/product.model";

const ProductActionsCell = ({ product }: { product: ProductType }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(product.id as string)
          }
        >
          Copy Product Id
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => router.push(`/admin/products/${product.id}`)}
          className="bg-customColors-blue text-customColors-white"
        >
          Edit Product
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="bg-customColors-red text-customColors-white"
          onClick={async () =>
            await deleteProductById(product.id as string)
          }
        >
          Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductActionsCell;
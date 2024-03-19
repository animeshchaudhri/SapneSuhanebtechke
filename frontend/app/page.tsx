import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <div>
        {/* Product Details */}
        <Input name="product_title" />
        <Input name="category" />
        <Input name="MRP" />
        <Input name="retail_price" />
        <Input name="selling_price" />
        <Input name="description" />
        <Input name="status" />
        <Input name="GTIN" />
        <Input name="HSN_code" />
        <Input name="merchant_ref" />
        <Input name="manufacturer_ref" />
        <Input name="committed_quantity" />
        <Input name="storefront_featured" />
        <Input name="common_name" />
        <Input name="net_content" />

        {/* Manufacturer Details */}
        <Input name="manufacturer_name_address" />
        <Input name="packer_name_address" />
        <Input name="marketer_name_address" />
        <Input name="importer_name_address" />
        <Input name="country_of_origin" />
        <Input name="brand" />
        <Input name="lifestyle" />

        {/* Dimensions */}
        <Input name="model_name" />
        <Input name="series" />
        <Input name="model_id" />
        <Input name="part_number" />
        <Input name="material" />
        <Input name="size" />
        <Input name="cleaning_type" />
        <Input name="product_width" />
        <Input name="product_height" />
        <Input name="product_depth" />
        <Input name="manual" />
      </div>
    </div>
  );
}

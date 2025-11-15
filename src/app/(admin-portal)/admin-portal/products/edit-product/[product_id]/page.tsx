import { auth } from "@/auth";
import EditProductComponent from "@/components/admin-portal/products/edit-product";
import { Spinner } from "@/components/atoms/spinner";

export default async function Page({
  params,
}: {
  params: Promise<{ product_id: string }>;
}) {
  const product_id = (await params).product_id;
  const session = await auth();
  // const response = await fetch(
  //   `${process.env.API_SERVER_BASE_URL}/products/${product_id}/`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${session?.accessToken}`,
  //     },
  //   }
  // );

  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/1/`);

  console.log(response);

  if (!response.ok) {
    <div style={{ display: "flex" }}>
      <Spinner />
    </div>;
    return;
  }
  const data = await response.json();
  return (
    <div>
      <EditProductComponent product={data} />
    </div>
  );
}

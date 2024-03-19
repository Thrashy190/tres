import supabase from "@/db/supabase";
import Product from "@/interface/product";

async function getItems(): Promise<Product[]> {
  const { data, error } = await supabase.from("product").select("*");

  if (error) {
    console.log(error.message);
    return [];
  }
  return data;
}

async function deleteItem(
  id: number
): Promise<{ status: number; message: string }> {
  const { error } = await supabase.from("product").delete().eq("id", id);

  if (error) {
    return { status: 400, message: error.message };
  }
  return { status: 200, message: "Eliminado con exito" };
}

async function addItem(producto: Product) {
  const { error } = await supabase.from("countries").insert(producto);

  if (error) {
    return { status: 400, message: error.message };
  }
  return { status: 200, message: "Eliminado con exito" };
}

async function searchItem(search: string): Promise<Product[] | string> {
  const { data, error } = await supabase
    .from("product")
    .select()
    .like("name", `%${search}%`);

  if (error) {
    return error.message;
  }
  return data;
}

export { getItems, deleteItem, addItem, searchItem };

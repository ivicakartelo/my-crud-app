import ProductsList from "./components/ProductsList";
import ProductForm from "./components/ProductForm";

export default function App() {
  return (
    <div>
      <h1>My E-shop App</h1>
      <ProductForm />     
      <ProductsList />
    </div>
  );
}
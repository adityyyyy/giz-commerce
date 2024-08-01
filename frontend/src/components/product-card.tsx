import { Product } from "../types/product";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./rating";
import { apiClient } from "../api-client";
import { toast } from "react-toastify";

export default function ProductCard({ product }: { product: Product }) {
  const AddToCartHandler = async () => {
    try {
      await apiClient.post("/api/cart", {
        productId: product.id,
        quantity: 1,
      });
      toast.success("Product successsfully added to cart");
    } catch (err) {
      toast.warn("error");
    }
  };

  return (
    <Card>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.stock === 0 ? (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button onClick={AddToCartHandler}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}

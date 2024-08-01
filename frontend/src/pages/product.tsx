import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetProductDetailsByIdQuery } from "../hooks/product-hooks";
import LoadingBox from "../components/loading";
import MessageBox from "../components/message";
import { ApiError } from "../types/api-error";
import { getError } from "../utils";
import { Row, Col, ListGroup, Card, Badge, Button } from "react-bootstrap";
import Rating from "../components/rating";
import { toast } from "react-toastify";
import { apiClient } from "../api-client";

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsByIdQuery(+id!);

  const addToCartHandler = async () => {
    try {
      await apiClient.post("/api/cart", {
        productId: id,
        quantity: 1,
      });
      toast.success("Product successsfully added to cart");
    } catch (err) {
      toast.warn("error");
    }
  };

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product not found</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="large" src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.stock > 0 ? (
                      <Badge bg="success">In Stock</Badge>
                    ) : (
                      <Badge bg="danger">Unavailable</Badge>
                    )}
                  </Col>
                </Row>
                <ListGroup.Item>
                  {product.stock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} variant="primary">
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup.Item>
              </ListGroup.Item>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

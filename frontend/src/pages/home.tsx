import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/loading";
import MessageBox from "../components/message";
import { useGetProductQuery } from "../hooks/product-hooks";
import { ApiError } from "../types/api-error";
import { getError } from "../utils";
import ProductCard from "../components/product-card";

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductQuery();

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>GizCommerce</title>
      </Helmet>
      {products?.data.map((product) => (
        <Col key={product.id} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
}

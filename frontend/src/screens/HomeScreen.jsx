import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { keyword = "", pageNumber = "1" } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
    {!keyword ?(<ProductCarousel/>): (
      <Link to="/" className="btn btn-light">
        Go Back
        </Link>
        )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.message}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data && data.products && data.products.length > 0 ? (
              data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            ) : (
              <div>No products found.</div>
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;

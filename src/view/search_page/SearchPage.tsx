import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import "./SearchPage.scss";
import { login, logout, authSelector } from "../../redux/auth.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IHotel } from "../../interfaces";
import loadingGif from "../../assets/loading.gif";
import bgimg from "../../assets/search-page-bg.jpg";
// import { hotels } from "../../constants";
import ProductCard from "../../component/product_card/ProductCard";
import { consumers } from "stream";
import axios from "axios";

interface Filter {
  query: string;
  companionTypeCategory: string;
  travelStyleCategory: string;
  minPrice: number | null;
  maxPrice: number | null;
  attractionTypeCategory: string;
}

const SearchPage = () => {
  const [filteredData, setFilteredData] = useState<IHotel[]>([]);
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<Filter>({
    query: "",
    companionTypeCategory: "",
    travelStyleCategory: "",
    minPrice: null,
    maxPrice: null,
    attractionTypeCategory: "",
  });

  useEffect(() => {
    let tempFilterData: IHotel[] = [];
    let minPrice = 0;
    let maxPrice = Infinity;

    const fetchData = async () => {
      try {
        const res = await axios.get(`https://localhost:7103/api/hotel`);
        setIsLoading(true);
        tempFilterData = res.data.hotel;
        if (!(filter.query === "")) {
          const query = filter.query.toLowerCase();
          tempFilterData = tempFilterData.filter((prod) =>
            prod.hotelName.toLowerCase().includes(query)
          );
        }
        if (!(filter.companionTypeCategory === "")) {
          tempFilterData = tempFilterData.filter((prod) =>
            prod.companionTypeCategory.includes(filter.companionTypeCategory)
          );
        }
        if (!(filter.travelStyleCategory === "")) {
          tempFilterData = tempFilterData.filter((prod) =>
            prod.travelStyleCategory.includes(filter.travelStyleCategory)
          );
        }
        if (!(filter.attractionTypeCategory === "")) {
          tempFilterData = tempFilterData.filter((prod) =>
            prod.attractionTypeCategory.includes(filter.attractionTypeCategory)
          );
        }
        if (!!filter.minPrice) {
          minPrice = filter.minPrice;
        }
        if (filter.maxPrice !== null) {
          maxPrice = filter.maxPrice;
        }
        tempFilterData = tempFilterData.filter(
          (prod) => prod.minPrice > minPrice && prod.minPrice < maxPrice
        );
        setFilteredData(tempFilterData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [
    filter.attractionTypeCategory,
    filter.maxPrice,
    filter.minPrice,
    filter.travelStyleCategory,
    filter.query,
    filter.companionTypeCategory,
    hotels,
  ]);

  useEffect(() => {
    setIsLoading(false);
  }, [filteredData])

  const resetFilter = () => {
    setFilter({
      query: "",
      companionTypeCategory: "",
      travelStyleCategory: "",
      minPrice: null,
      maxPrice: null,
      attractionTypeCategory: "",
    });
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof Filter
  ) => {
    const { value, checked } = event.target;
    console.log(value);
    let updatedValue = checked ? value : null;
    setFilter((filter) => ({ ...filter, [key]: updatedValue }));
  };

  return (
    <Fragment>
      <div className="page-search-wrapper">
        <div
          className="filter-wrapper"
          style={{ backgroundImage: `url(${bgimg})`, backgroundSize: "cover" }}
        >
          <div className="search-wrapper">
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="search-bar"
                  value={filter.query}
                  onChange={(e) => {
                    setFilter({ ...filter, query: e.target.value });
                  }}
                />
              </Form.Group>
            </Form>
          </div>
          <Form className="filter-container">
            <Row className="form-row">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="form-label">Select Type:</Form.Label>
                  {[
                    { label: "Solo", value: "Solo" },
                    { label: "Group", value: "Group" },
                    { label: "Couple", value: "Couple" },
                    { label: "Family", value: "Family" },
                  ].map((option) => (
                    <Form.Check
                      key={option.value}
                      type="radio"
                      label={option.label}
                      name="companionTypeCategory"
                      value={option.value}
                      checked={filter.companionTypeCategory === option.value}
                      onChange={(e) => {
                        handleCheckboxChange(e, "companionTypeCategory");
                      }}
                    />
                  ))}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="form-label">Select Mood:</Form.Label>
                  {[
                    { label: "Relaxing", value: "Relaxing" },
                    { label: "Formal", value: "Formal" },
                    { label: "Busy", value: "Busy" },
                  ].map((option) => (
                    <Form.Check
                      key={option.value}
                      type="radio"
                      label={option.label}
                      name="travelStyleCategory"
                      value={option.value}
                      checked={filter.travelStyleCategory === option.value}
                      onChange={(e) => {
                        handleCheckboxChange(e, "travelStyleCategory");
                      }}
                    />
                  ))}
                </Form.Group>
              </Col>
            </Row>

            <Row className="form-row">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="form-label">
                    Select Audience:
                  </Form.Label>
                  {[
                    { label: "Local", value: "Local" },
                    { label: "Tourist", value: "Tourist" },
                  ].map((option) => (
                    <Form.Check
                      key={option.value}
                      type="radio"
                      label={option.label}
                      name="attractionTypeCategory"
                      value={option.value}
                      checked={filter.attractionTypeCategory === option.value}
                      onChange={(e) => {
                        handleCheckboxChange(e, "attractionTypeCategory");
                      }}
                    />
                  ))}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="form-label">Price Range:</Form.Label>
                  <Form.Control
                    className="form-price-input"
                    type="number"
                    name="minPrice"
                    placeholder="Minimum Price"
                    value={filter.minPrice === null ? "" : filter.minPrice}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        minPrice:
                          e.target.value === ""
                            ? null
                            : parseInt(e.target.value),
                      });
                      console.log(parseInt(e.target.value));
                    }}
                  />
                  <Form.Control
                    className="form-price-input"
                    type="number"
                    name="maxPrice"
                    placeholder="Maximum Price"
                    value={filter.maxPrice === null ? "" : filter.maxPrice}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        maxPrice:
                          e.target.value === ""
                            ? null
                            : parseInt(e.target.value),
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="secondary" type="submit" onSubmit={resetFilter}>
              Reset Filter
            </Button>
          </Form>
        </div>

        <div className="result-wrapper">
          <h3>Search Results</h3>

          {isLoading && (
            <div className="search-loading-wrapper">
              <Image
                width={150}
                height={150}
                src={loadingGif}
                className="search-loading-img"
              />
            </div>
          )}

          {isLoading === false && filteredData.length === 0 && (
            <div>No Product Found . . .</div>
          )}
          {isLoading === false &&
            filteredData &&
            filteredData.map((prod) => {
              return (
                <ProductCard
                  hotelId={prod.hotelId}
                  hotelName={prod.hotelName}
                  minPrice={prod.minPrice}
                  images={prod.images}
                  city={prod.city}
                  address={prod.address}
                  rating={prod.rating}
                  ratingCount={prod.ratingCount}
                  travelStyleCategory={prod.travelStyleCategory}
                  companionTypeCategory={prod.companionTypeCategory}
                  attractionTypeCategory={prod.attractionTypeCategory}
                  facilities={prod.facilities}
                  hotelStar={prod.hotelStar}
                />
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

// mapStateToProps here if needed

// mapDispatchToProps here if needed

export default SearchPage;

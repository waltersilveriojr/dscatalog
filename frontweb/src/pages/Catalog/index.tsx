import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import ProductCard from 'components/ProductCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'Types/product';

import { SpringPage } from 'Types/Vendor/spring';
import { requestBackend } from 'util/requests';
import CardLoader from './CardLoader';
import './styles.css';

const Catalog = () => {
  const [page, setPage] = useState<SpringPage<Product>>();
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = (pageNumber : number) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: {pageNumber},
        size: 12,
      },
    };
    setIsLoading(true);
    requestBackend(params)
      .then((Response) => {
        setPage(Response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }

  useEffect(() => {
    getProducts(0);
  }, []);

  return (
    <div className="container my-4 catalog-container">
      <div className="row catalogo-title-container">
        <h1>Catalogo de produtos</h1>
      </div>
      <div className="row">
        {isLoading ? (
          <CardLoader />
        ) : (
          page?.content.map((product) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <Link to="/products/1">
                <ProductCard product={product} />
              </Link>
            </div>
          ))
        )}
      </div>
      <div className="row">
        <Pagination pageCount={(page) ? page.totalPages : 0} range={3} onChange={ getProducts} />
      </div>
    </div>
  );
};

export default Catalog;

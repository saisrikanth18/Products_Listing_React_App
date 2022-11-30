import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import { deleteProduct, setProducts } from '../redux/actions/productActions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const ProductComponent = () => {
  const [search, setSearch] = useState('');
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const products = useSelector((state) => state.allProducts.products);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete the user ?")) {
      dispatch(deleteProduct(id));
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button style={{ marginTop: '20px', float: 'right' }} variant="contained" color="primary" onClick={() => { navigate('/addProduct') }}>
          Add Product
        </Button>
        <h2 style={{ marginTop: '20px' }}>List of All Products</h2>
        <input
          type="text"
          placeholder='Search product here..'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{ height: 'auto', width: '20%', marginTop: '20px' }}
        />
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ marginTop: 5, minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>Product Name</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Discount Percentage</StyledTableCell>
              <StyledTableCell align="center">Rating</StyledTableCell>
              <StyledTableCell align="center">Stock</StyledTableCell>
              <StyledTableCell align="center">Brand</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.filter(product => product.title.toLowerCase().includes(search.toLowerCase())).map((product) => (
              <StyledTableRow key={product.id}>
                <Link to={`/product/${product.id}`} >
                  <StyledTableCell align='center' style={{ color: 'blue' }} component="th" scope="row">
                    {product.title}
                  </StyledTableCell>
                </Link>
                <StyledTableCell align="center">{product.price}</StyledTableCell>
                <StyledTableCell align="center">{product.discountPercentage}</StyledTableCell>
                <StyledTableCell align="center">{product.rating}</StyledTableCell>
                <StyledTableCell align="center">{product.stock}</StyledTableCell>
                <StyledTableCell align="center">{product.brand}</StyledTableCell>
                <StyledTableCell align="center">{product.category}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button
                      style={{ marginRight: '5px' }}
                      color="error"
                      onClick={() => handleDelete(product.id)}
                    >Delete</Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProductComponent;
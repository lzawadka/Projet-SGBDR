import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Pagination from '@mui/material/Pagination';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { array10 } from "./arrayData";


export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [nbItems, setNbItems] = useState(10);
  const [sort, setSort] = useState("title");
  const [page, setPage] = useState(1);

  const [selectPageItems, setPageItems] = useState(array10);
  const [isLoading, setIsLoading] = useState(false);

  const fillSelectArray = (length) => {
    let arrayLength = 1000 / length;
    let array = []
    for(let i = 1; i < arrayLength + 1; i++){
      array.push(i);
    }
    setPageItems(array);
  }

  const handleLimitChange = (e) => {
    setNbItems(e.target.value);
  };

  const handleOrderChange = (e) => {
    setPage(1);
    setOrder(e.target.value);
  };

  const handleSortChange = (e) => {
    setPage(1);
    setSort(e.target.value);
  };

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    if(nbItems === 10){
      setPage(1)
      fillSelectArray(10)
    } else if(nbItems === 50){
      setPage(1)
      fillSelectArray(50)
    } else{
      setPage(1)
      fillSelectArray(100)
    }
  }, [nbItems]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        `https://movie-project-hetic-api.herokuapp.com/api/movies?limit=${nbItems}&order=${order}&sort=${sort}&page=${page}`
      );
      setMovies(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, [nbItems, order, sort, page]);

  return (
    <React.Fragment>
      <div style={{ maxWidth: "1500px", margin: "auto", paddingTop: "50px" }}>
        <Box sx={{ display: "grid" }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="items-select-label">ITEMS</InputLabel>
                <Select
                  labelId="items-select-label"
                  id="items-select"
                  value={nbItems}
                  label="Items"
                  onChange={handleLimitChange}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="order-select-label">ORDER</InputLabel>
                <Select
                  labelId="order-select-label"
                  id="order-select"
                  value={order}
                  label="Order"
                  onChange={handleOrderChange}
                >
                  <MenuItem value={"ASC"}>ASCENDANT</MenuItem>
                  <MenuItem value={"DESC"}>DESCENDANT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="sort-select-label">SORT</InputLabel>
                <Select
                  labelId="sort-select-label"
                  id="sort-select"
                  value={sort}
                  label="Sort"
                  onChange={handleSortChange}
                >
                  <MenuItem value={"title"}>Title</MenuItem>
                  <MenuItem value={"name"}>Genre</MenuItem>
                  <MenuItem value={"rental"}>Rentals</MenuItem>
                  <MenuItem value={"rental_rate"}>Rental Price</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <TableContainer component={Paper}>
                  <Table stickyHeader sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>TITLE</TableCell>
                        <TableCell align="right">GENRE</TableCell>
                        <TableCell align="right">RATING</TableCell>
                        <TableCell align="right">RENTALS</TableCell>
                        <TableCell align="right">RENTAL PRICE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {movies.map((movie) => (
                        <TableRow
                          hover
                          key={movie.title}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {movie.title}
                          </TableCell>
                          <TableCell align="right">{movie.name}</TableCell>
                          <TableCell align="right">{movie.rating}</TableCell>
                          <TableCell align="right">{movie.rental}</TableCell>
                          <TableCell align="right">{movie.rental_rate} €</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          </Grid>
          <Pagination style={{ marginTop: '1em'}} count={selectPageItems.length} page={page} value={page} onChange={handlePageChange} />
        </Box>
      </div>
    </React.Fragment>
  );
};
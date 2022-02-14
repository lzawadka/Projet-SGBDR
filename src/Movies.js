import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
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
import { array10, array50, array100 } from "./arrayData";

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [nbItems, setNbItems] = useState(10);
  const [sort, setSort] = useState("title");
  const [page, setPage] = useState(1);

  const [selectPageItems, setPageItems] = useState(array10);
  const [isLoading, setIsLoading] = useState(false);

  const handleLimitChange = (e) => {
    setNbItems(e.target.value);
    if(nbItems === 10){
      setPageItems(array10);
    } else if(nbItems === 50){
      setPageItems(array50);
    } else{
      setPageItems(array100);
    }
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handlePageChange = (e) => {
    setPage(e.target.value);
  };

  useEffect(() => {
    if(nbItems === 10){
      setPageItems(array10);
    } else if(nbItems === 50){
      setPageItems(array50);
    } else{
      setPageItems(array100);
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

  console.log(movies);

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
                  <MenuItem value={"rental"}>Number of rental</MenuItem>
                  <MenuItem value={"rental_rate"}>Rental Price</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="page-select-autowidth-label">Page</InputLabel>
                <Select
                  labelId="page-select-autowidth-label"
                  id="page-select-autowidth"
                  value={page}
                  onChange={handlePageChange}
                  autoWidth
                  label="Page"
                >
                  {selectPageItems.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">TITLE</TableCell>
                        <TableCell align="center">GENRE</TableCell>
                        <TableCell align="center">RATING</TableCell>
                        <TableCell align="center">RENTALS</TableCell>
                        <TableCell align="center">RENTAL PRICE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {movies.map((movie) => (
                        <TableRow
                          key={movie.title}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center" component="th" scope="row">
                            {movie.title}
                          </TableCell>
                          <TableCell align="center">{movie.name}</TableCell>
                          <TableCell align="center">{movie.rating}</TableCell>
                          <TableCell align="center">N/A</TableCell>
                          <TableCell align="center">{movie.rental_rate} €</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          </Grid>
        </Box>
      </div>
    </React.Fragment>
  );
};

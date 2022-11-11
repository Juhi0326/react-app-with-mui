import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Loading from '../components/Loading';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import productSevice from '../services/productSevice';
import { useNavigate } from "react-router-dom";


export default function Products() {

    const [products, setProducts] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchString, setSearchString] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        console.log('useffect run from products')
        getProducts();
        setLoading(false)
    }, []);

    useEffect(() => {
        console.log('useffect run with searchString')
        searchProduct(searchString)
    }, [products, searchString])

    const searchProduct = (searchString) => {
        console.log(`ez a paraméter érkezik: ${searchString}`)
        if (searchString) {
            setFilteredProducts(filterProduct(searchString))
        } else {
            setFilteredProducts(products)
        }
        console.log(products)
    }
    const filterProduct = (searchString) => products.filter(product => {
        return product.name.toLowerCase().includes(searchString.toLowerCase());
      });

    const GoToDetails = (productId) => {
        console.log(`rákattintottam, ez a product id: ${productId}`)
        navigate(`/product-details/${productId}`)
    }

    const formatMoney = (amount) => {
        const value = Number(amount).toLocaleString("hu-HU", {
            // minimumFractionDigits: 2,
            // maximumFractionDigits: 2,
        });
        return `${value} Ft`;
    }
    const getProducts = async () => {

        try {
            const result = await productSevice.getProducts();
            setProducts(result.data.products);

        } catch (err) {
            setError(err.message || "Unexpected Error!");

        } finally {
        }
    }

    return (
        <Box>
            <div>
            <TextField 
            id="outlined-basic" 
            label="Search by product name" 
            variant="outlined"  
            onChange={(e) => { setSearchString(e.target.value) }}
            sx={{
                mb: 6
            }}/>
            </div>
            <div>
                {!loading && !error ? <div>
                    <Grid container spacing={2}>
                        {filteredProducts?.map((product, key) => (
                            <Grid item xs={12} sm={6} md={4} key={product._id}>
                                <Card sx={{
                                    maxWidth: 345,
                                    height: 500
                                }}>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={`http://localhost:8081/${product.imagePath}`}
                                        alt={product.name}
                                    />
                                    <CardContent >
                                        <Typography gutterBottom variant="h5" component="div" sx={{
                                            height: 80
                                        }}>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            price: {formatMoney(product.price)}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            onClick={() => GoToDetails(product._id)}
                                            variant="contained"
                                            color='primary'
                                            sx={{ ml: 1 }}
                                        >Details
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>{ }
                </div> : null}
            </div>
            <div>
                {error ? <div>{error}</div> :  <Loading />}
            </div>
        </Box>
    );
}
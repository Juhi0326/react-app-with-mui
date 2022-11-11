import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
//import { useDispatch } from 'react-redux';
//import { toastShow } from '../store/actions'
import productSevice from '../services/productSevice';
//import { red } from '@mui/material/colors';

export default function Products() {

    //const dispatch = useDispatch();
    const [products, setProducts] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('useffect run')
        getProducts();
        setLoading(false)
    }, []);

    const GoToDetails = (productId) => {
        
        console.log(`rákattintottam, ez a product id: ${productId}`)
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
            {!loading ? <div>
                <Grid container spacing={2}>
                    {products?.map((product, key) => (
                        <Grid item xs={12} sm={6} md={4}>
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
            </div> :
                <div>Loading...</div>}
        </Box>
    );
}
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CustomButton from '../components/CustomButton';
import Loading from '../components/Loading';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import productSevice from '../services/productSevice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';



export const ProductDetails = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch()
    const params = useParams();
    const [product, setProduct] = React.useState(null);
    const [counter, setCounter] = React.useState(1);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        console.log('useEffect run from product')
        getProductById(params.id);
        setLoading(false)
        console.log(product)
    }, []);

    React.useEffect(() => {

    }, [product, counter]);

    const formatMoney = (amount) => {
        const value = Number(amount).toLocaleString("hu-HU", {
            // minimumFractionDigits: 2,
            // maximumFractionDigits: 2,
        });
        return `${value} Ft`;
    }

    const addItem = () => {
        let element = counter + 1
        setCounter(element)
    }
    const removeItem = () => {
        if (counter > 1) {
            let element = counter - 1
            setCounter(element)
        }


    }
    const getProductById = async (productId) => {
        console.log(`ez a param.id: ${productId}`)
        try {
            const result = await productSevice.getProductById(productId);
            console.log(`ez a result.data: ${JSON.stringify(result.data.product)}`)
            setProduct(result.data.product);
            console.log(`ez a setProduct után jön:  ${JSON.stringify(product)}`)

        } catch (err) {
            setError(err.message || "Unexpected Error!");

        } finally {
        }
    }

    return (

        <Container>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {!loading && !error ?
                    <Card sx={{ width: 500 }}>
                        {<CardMedia
                            component="img"
                            height="400"
                            image={`http://localhost:8081/${product?.imagePath}`}
                            alt="green iguana"
                        />}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product?.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{
                                mb: 3
                            }}>
                                {product?.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{
                                mb: 3
                            }}>
                                Price: {formatMoney(product?.price)}
                            </Typography>
                            {product?.price !== product?.discountedPrice ?
                                <Typography variant="body2" sx={{
                                    color: 'red'
                                }}>
                                    Discounted price: {formatMoney(product?.discountedPrice)}
                                </Typography>
                                : null}
                        </CardContent>
                        <CardActions>
                            <CustomButton
                                value='Add to cart'
                                variant={'contained'}
                                color={'primary'}
                                btnSize={'small'}
                                sx={{ mt: 3, mb: 2, mr: 5, ml: 1 }} />
                            <IconButton>
                                <AddIcon
                                    onClick={addItem} />
                            </IconButton>
                            <IconButton>
                                <RemoveIcon
                                    onClick={removeItem}
                                />
                            </IconButton>
                            <TextField
                                id="outlined-basic"
                                value={counter}
                                variant="outlined"
                                sx={{
                                    maxWidth: 80
                                }} />
                        </CardActions>

                    </Card>
                    : null}
                <div>
                    {error ? <div>{error}</div> : null}
                </div>
                <div>
                    {loading ? <Loading /> : null}
                </div>



            </Box>
        </Container>
    );
}

export default ProductDetails;
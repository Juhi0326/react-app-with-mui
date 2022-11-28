import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toastShow } from '../store/actions'
import CustomButton from '../components/CustomButton';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';
import { changeQuantityOfProductById } from '../store/actions'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const Cart = () => {
    const dispatch = useDispatch()
    const increase = (productId, quantity) => {

        quantity++;
        //dispatch(changeQuantityOfProductById(productId, quantity))
    }

    const decrease = (productId, quantity) => {
        quantity--;
    }

    const removeProductById = (productId) => {
        console.log(` ezt kéne törölni: ${productId}`)
    }

    const formatMoney = (amount) => {
        const value = Number(amount).toLocaleString("hu-HU", {
            // minimumFractionDigits: 2,
            // maximumFractionDigits: 2,
        });
        return `${value} Ft`;
    }

    const cartState = useSelector(state => state.cart.items);
    const sum = useSelector(state => state.cart.sumOfCharge);


    React.useEffect(() => {
        console.log('hgh')
    }, [cartState, sum]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Item>
                        {cartState?.map((product, key) => (
                            <Card sx={{
                                maxWidth: 345,
                                height: 400
                            }}
                                key={product._id}>
                                <Avatar
                                    src={`http://localhost:8081/${product.imagePath}`}
                                    sx={{ width: 60, height: 60 }}
                                    alt={product.name}
                                />
                                <CardContent >
                                    <Typography gutterBottom variant="h5" component="div" sx={{
                                        height: 80
                                    }}>
                                        Termék neve: {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        egység ár:: {formatMoney(product.price)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        mennyiség:: {product.quantity}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Termék ára összesen:: {formatMoney(product.subTotal)}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Grid item xs={12}>
                                        <IconButton
                                        >
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                    </Grid>
                                </CardActions>
                                <CardActions>
                                    <CustomButton
                                        value='termék eltávolítása'
                                        variant={'contained'}
                                        color={'primary'}
                                        btnSize={'small'}
                                        onClick={removeProductById(product._id)}
                                        sx={{ ml: 10, mb: 5 }} />
                                </CardActions>
                                <Divider />
                            </Card>


                        ))}

                    </Item>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Item>
                        <Box sx={{ minHeight: 100, pt: 5 }}>
                            <div>
                                A kosárban lévő termékek ára összesen:  {formatMoney(sum)}
                            </div>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
        </Box>

    )
}
export default Cart;
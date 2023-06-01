import { useEffect, useState } from "react"
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

import { db } from "../../config/firebase"
import { doc, getDoc } from "firebase/firestore"
import { Button, ButtonGroup, Typography } from "@mui/material";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { addFavorites, removeAllFavorites } from "../../Store/Slices/FavoritesSlice";
import { addToCart } from "../../Store/Slices/CartSlice";
import {useDispatch, useSelector} from "react-redux"




export default function AdDetail() {
    const params = useParams()
    // console.log(params)
    const adId = params.adId
    const category = params.category

    const reduxState = useSelector((state) => state)
    console.log(reduxState)
    const reduxUser = useSelector((state) => state.UserReducer)
    const dispatch = useDispatch()

    const [data, setData] = useState(null)
    console.log(data)
    const [done, setDone] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getAd()
    }, [])

    const getAd = async () => {
        const docRef = doc(db, category, adId)
        const docData = await getDoc(docRef)
        setData(docData.data())
        console.log(data)
        setDone(true)
    }

    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? data.ImagesURl.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === data.ImagesURl.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }


    const handleFavorite = () => {
        if (!reduxUser.user) {
            alert("please signin to add to favorites")
        } 
        else {
            
            dispatch(addFavorites({...data, currentUID:reduxUser.uid}))
            console.log("added to favorite")
        }
    }

    const handleCart = () => {
        if (!reduxUser.user) {
            alert("please signin to add to Cart")
        } 
        else {
            
            dispatch(addToCart({...data, currentUID:reduxUser.uid}))
            console.log("added to Cart")
        }
    }

    return <>
    {/* <p>Redux Remove all</p>
    <button onClick={() => {dispatch(removeAllFavorites())}}>Remove All Favorites</button> */}

        {done
            ? <>
                <div>

                    <div id="ADAdImages" className="max-w-[700px] h-[600px] w-1/2 m-auto py-2 px-4 relative float-left">

                        <div id="ADAdImagesAll" className="w-2/12 float-left overflow-y-auto overflow-x-hidden h-[90%]" >
                            {data.ImagesURl.map((val, ind) => {

                                return <>
                                    <img src={val} alt={`img${ind + 1}`} className="m-4 pd-4" onClick={() => setCurrentIndex(ind)} />
                                </>
                            })}
                        </div>

                        <div id="ADAdImagesProfile" className="w-9/12 rounded-2xl bg-cover float-right group " >
                            <div>
                                <img src={data.ImagesURl[currentIndex]} className="w-full h-[550px] rounded-2xl" alt="display image"></img>
                            </div>
                            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-[28%]  rounded-full p-2 bg-black/20 text-white cursor-pointer ">
                                <BsChevronCompactLeft size={20} onClick={prevSlide} />
                            </div>
                            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-[5%] rounded-full p-2 bg-black/20 text-white cursor-pointer">
                                <BsChevronCompactRight size={20} onClick={nextSlide} />
                            </div>
                            <div className="top-4 justify-center py-2 absolute top-[520px] left-[50%] hidden group-hover:flex">
                                {data.ImagesURl.map((val, ind) => {
                                    return <div>
                                        <RxDotFilled className="text-2xl cursor-pointer " onClick={() => setCurrentIndex(ind)} />
                                    </div>

                                })}
                            </div>
                        </div>

                    </div>


                    {/* text-left */}

                    <div id="ADAdContent" className="w-1/2 max-w-[700px] float-right m-auto py-2 px-4 ">
                        <div>
                            <Typography variant="h5" component='h2' color='primary' className="uppercase" sx={{ fontWeight: "bold" }}>
                                {data.Name}
                            </Typography>
                        </div>

                        <div>
                            <hr className="afterTitle" />
                        </div>

                        <div className="font-extrabold text-2xl my-4" >
                            <Typography variant="text1" component='p'>
                                PKR {data.Price}.00
                            </Typography>
                        </div>

                        <div className="text-lg my-4 ">
                            <Typography variant="text1" component='p'>
                                {data.Description}
                            </Typography>
                        </div>

                        <div>
                            <ButtonGroup variant="contained" aria-label="outlined primary button group" orientation="vertical" color="secondary" >
                                <Button className="mt-4" style={{ marginTop: "10px" }} endIcon={<AddShoppingCartIcon/>} onClick={handleCart}> Add to Cart </Button>
                                <Button className="mt-4" style={{ marginTop: "10px" }} endIcon={<FavoriteIcon />} onClick={handleFavorite }> Add favorites</Button>
                            </ButtonGroup>
                        </div>

                    </div>
                </div>
            </>


            : <>
                <p> Loading</p>
            </>
        }



    </>
}


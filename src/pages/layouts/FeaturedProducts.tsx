import { useFetchFeaturedProductsMutation } from "@/store/Reducers/productApiSlice";
import { useEffect, useRef, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import LinkButton from "../buttons/LinkButton";
import React from "react";
import { HiArrowSmallRight } from "react-icons/hi2";
import useRedirect from "@/hooks/useReDirect";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/Reducers/authReducer";
import toast from "react-hot-toast";
import { useAddProductAndFetchMutation } from "@/store/Reducers/cartApiSlice";
import { useAddProductToWishListMutation } from "@/store/Reducers/wishListApiSlice";
import { setCart } from "@/store/Reducers/cartReducer";

function FeaturedProducts() { 
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser)
  const [addProductAndFetchMutation] = useAddProductAndFetchMutation()
  const [featuredProducts, setFeaturedProducts] = useState<[]|undefined>();
  const redirect = useRedirect()
  const [fetchFeaturedProductsMutation] = useFetchFeaturedProductsMutation();
  const [addProductToWishListMutation] = useAddProductToWishListMutation();
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const handleImageLoad = (imgRef:any, containerRef:any) => {
    const imgHeight = imgRef.current.offsetHeight;
    const containerHeight = containerRef.current.offsetHeight;
    if (imgHeight > containerHeight) {
      imgRef.current.classList.add('w-full');
      imgRef.current.classList.remove('h-full');
    } else {
      imgRef.current.classList.add('h-full');
      imgRef.current.classList.remove('w-full');
    }
  }; 
  const handleAddToCart = async (productId:string) =>{
    console.log('addToCart');
    if(user.accessToken != ""){
      try{
        const response = await addProductAndFetchMutation({productId}).unwrap();console.log(response);
        dispatch(setCart(response.cart))
      }catch(e:any){
        console.log(e)
        toast.error(e.data.message ?? "try again later")
      }
    }
  }
  const handleAddToWishList = async (productId:string) =>{
    console.log('wish list');
    if(user.accessToken != ""){
      try{
        const response = await addProductToWishListMutation({productId}).unwrap();console.log(response);
        toast.success(response.message)
      }catch(e:any){
        console.log(e)
        toast.error(e.data.message ?? "try again later")
      }
    }
  }
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const response = await fetchFeaturedProductsMutation({}).unwrap();
      setFeaturedProducts(response?.products);
    };
    fetchFeaturedProducts();
  }, [fetchFeaturedProductsMutation]);

  return (
    <div className="container mx-auto flex flex-col montserrat">
      <div className="relative flex items-center">
        <h1 className="relative z-10  px-8 text-blue-500 bg-[var(--main-color)]">Featured Products</h1>
        <div className="absolute z-0 w-1/4 top-1/2 h-[1px] bg-slate-" />
      </div>
      <div className="grid gap-4 grid-cols-2 p-6 md:grid-cols-4">
        {featuredProducts && featuredProducts.map((product:any, i:number) => {
          if (!imgRefs.current[i]) 
            imgRefs.current[i] = React.createRef();
          if (!containerRefs.current[i]) 
            containerRefs.current[i] = React.createRef();
          return (
            <div key={i + 1} className="group flex flex-col border shadow-sm rounded-md bg-white overflow-hidden -aspect-triangle hover:shadow-md">
              <div ref={containerRefs.current[i]} className="relative flex basis-2/3 justify-center items-center overflow-hidden">
                <img
                  ref={imgRefs.current[i]}
                  className=" transition-all"
                  src={product?.media[0].url}
                  loading="lazy"
                  onLoad={() => handleImageLoad(imgRefs.current[i], containerRefs.current[i])}
                />
                <div className="absolute left-1/2 -translate-x-1/2 translate-y-full top-full flex items-center gap-2 transition-all group-hover:top-1/2">
                  <div onClick={()=>handleAddToWishList(product._id)} className="flex justify-center items-center bg-white rounded-full cp-6 cursor-pointer">
                    <MdFavoriteBorder />
                  </div>
                  <div onClick={()=>handleAddToCart(product._id)} className="flex justify-center items-center bg-white rounded-full cp-6 cursor-pointer">
                    <LuShoppingCart />
                  </div>
                  <div className="flex justify-center items-center bg-white rounded-full cp-6 cursor-pointer">
                    <RiShareForwardLine />
                  </div>
                </div>
              </div>
              <div className="basis-1/3 flex flex-col gap-2 p-6 pt-3 shrink-0">
                <h1 className="c3 py-3 font-semibold">{product.name}</h1>
                <div className="flex justify-between gap-2">
                  <div className="flex justify-center items-center">
                    <h1 onClick={()=>redirect("/products/:productId")} className="c3 text-center text hover:underline text-blue-500 cursor-pointer">show more</h1>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="cp-6 c3 font-semibold grow ">${product.price}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
       
      </div>
      <div className="flex justify-end px-8">
          <LinkButton className="cp-x-2_7 c3 text-nowrap cp-y-1_4 m-4 gap-2 bg-transparent border bg-white font-medium " text="view products" to={"/products"} direction={"right"} >
            <HiArrowSmallRight />
          </LinkButton >
        </div>
    </div>
  );
}

export default FeaturedProducts;
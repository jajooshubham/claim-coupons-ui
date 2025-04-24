import { Fragment } from "react";
import {ProductOrderList, ProductOrderLists} from "~/model/product-order-lists";
import {PlantscareProduct, PlantscareProducts} from "~/model/plantscare-products";
import {getRandomInt} from "~/utils/functions";

export default function InputGridData({productOrderLists, setProductOrderLists, plantscareProducts, firstProductId}: {
    productOrderLists: ProductOrderLists;
    setProductOrderLists: (productOrderLists: ProductOrderLists) => void;
    plantscareProducts: PlantscareProducts;
    firstProductId: number;
}) {
    const add = () => {
        const productOrderList : ProductOrderList = {
            id: getRandomInt(),
            productId: firstProductId,
            quantity: 1
        };
        const _productOrderLists: ProductOrderLists = [...productOrderLists, productOrderList];
        setProductOrderLists(_productOrderLists);
    }

    const remove = (id:number) => {
        const newProductOrderLists = productOrderLists.filter((item) => item.id !== id);
        setProductOrderLists(newProductOrderLists);
    }

    const modify = (id: string, value: string, mapId: number) => {
        const _productOrderList = productOrderLists.map((item) => {
            if(mapId === item.id){
                return {...item, [id]: value};
            }
            else {
                return item;
            }
        });
        setProductOrderLists(_productOrderList);
    }

    const productsList = plantscareProducts.map((item:PlantscareProduct) => {
        return(<option key={item.productId} value={item.productId}>{item.productName} - {item.mrp}</option>);
    })

    return (
        <Fragment>
            {productOrderLists?.map((item:ProductOrderList) => {
                return (
                    <div className="grid grid-cols-12 gap-1 md:gap-4 lg:grid-cols-10" key={item.id}>
                        <div className="col-span-8 md:col-span-5">
                            <select name="productId"
                                    onChange={event => modify(event.target.name, event.target.value, item.id)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2">
                                    {productsList}
                            </select>
                        </div>

                        <div className="col-span-2 lg:col-span-3">
                            <input type="text" name="quantity"
                                   onChange={event => modify(event.target.name, event.target.value, item.id)}
                                   placeholder="Quantity"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"/>
                        </div>

                        <div className="col-span-2 lg:col-span-2">
                            <button type="button" className="p-2 rounded bg-red-600 text-white block w-full"
                                    onClick={() => remove(item.id)}>
                                <p className="block lg:hidden">-</p>
                                <p className="hidden lg:block">Remove</p>
                            </button>
                        </div>
                    </div>
                );
            })}
            <div className="text-right">
                <button type="button" className="p-2 rounded bg-lime-600 text-white w-20" onClick={add}>
                    <p className="block lg:hidden">+</p>
                    <p className="hidden lg:block">Add</p>
                </button>
            </div>
        </Fragment>
    )
}

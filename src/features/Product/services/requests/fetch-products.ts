import axiosInstance from "../../../../common/services/axios-instance";
import { BASE_URL } from "../../../../constants/constant";
import { IGetProductListRequest } from "../types/get-product-list-request.type";
import { IGetProductListResponse } from "../types/get-product-list-response.type";

export const fetchProductList = async (
  params: Partial<IGetProductListRequest>
) => {
  try {
    const { data, status } = await axiosInstance.get<IGetProductListResponse>(
      `${BASE_URL}/products`,
      { params }
    );

    if (status === 200) return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

import { propertyDetailsAction } from "./propertyDetails-slice";
import {axiosInstance} from "../../utils/axios"
export const getPropertyDetails = (id) => async(dispatch) =>{
try{
dispatch(propertyDetailsAction.getListRequest());
const response= await axiosInstance(`/api/vi/rent/listing/${id}`);
if(!response) {
throw new Error("Could not fetch any property Details")
}
const{data} = response.data
dispatch(propertyDetailsAction.getPropertyDetails(data))
}catch(error) {
dispatch(propertyDetailsAction.getErrors(error.response.data.error))
}
}
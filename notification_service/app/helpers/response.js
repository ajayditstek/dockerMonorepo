import lang from "../lang";
class ResponseHelper {
    success(res,data){
        let resPayload={
            status:true,
            message:data?.message || lang.en.SUCCESS,
            payload:data?.payload  || []
        }
        return res.status(data?.code||200).send(resPayload)
    }

    error(res,data) {
        let resPayload = {
            status: false,
            message: data?.message || lang.en.ERROR,
            payload: data?.payload
        }
        return res.status(data?.code||500).send(resPayload);
    }
}
export default new ResponseHelper();
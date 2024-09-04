export const register = async(req,res)=>{
    try {
        res.send("register Api");
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export function adminCheck(req, res, next){
    if(req.session?.admin){
        return next()
    }
    return res.status(401).send("Autentication Error")
}
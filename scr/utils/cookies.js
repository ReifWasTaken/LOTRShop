


/* import cookieParser from 'cookie-parser';
app.use(cookieParser('secret-code-reeeeeeee'));

app.use("/api/set-cookies", (req, res)=>{

  res.cookie('pets', '["dog", "hedgehog"]', {maxAge: 1000000000})
  res.cookie('isAdmin', 'false', {maxAge: 1000000000, signed: true, httpOnly: true})
    return res.status(200).json({
        status: "hola",
        msg:"ahora tenes cookies",
        data: {}
    })
})
app.use("/api/get-cookies", (req, res)=>{

  console.log(req.cookies)
  console.log(req.signedCookies)
    return res.status(200).json({
        status: "mira",
        msg:"estas son tus cookies",
        data: {}
    })
})

app.use("/api/del-cookies", (req, res)=>{

  res.clearCookie('pets')
  res.clearCookie('isAdmin')
  return res.status(200).json({
    status: "ok",
    msg:"ya no tenes mas",
    data: {}
})
}) */

const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

//middleware
app.use(cors())
app.use(express.json())

//ROUTES

//Create
app.post("/chemicals", async (req, res) => {
    try {
        console.log(req.body)
        const { oadb_chemicalid, cid } = req.body
        const newChemical = await pool.query(
            "INSERT INTO chemical (oadb_chemicalid,cid) values ($1,$2) RETURNING *",
            [oadb_chemicalid, cid])

        res.json(newChemical.rows[0])
    }
    catch (err) {
        console.error(err.message)
    }
})



//get all

//get data in demotable
app.get("/demotable", async (req, res) => {
    try {
        const demotable = await pool.query("select * from demotable")
        res.json(demotable.rows)
    } catch (err) {
        console.error(err.message)
    }
})


//get all in chemical
app.get("/chemicals", async (req, res) => {
    try {
        const allChemicals = await pool.query("SELECT * FROM chemical")
        res.json(allChemicals.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a chemical by cname
app.get("/chemicalsname/:cname", async (req, res) => {
    try {
        const { cname } = req.params
        console.log(cname)
        const chemical = await pool.query("SELECT * FROM chemical WHERE lower(cmpdname) LIKE lower($1) or lower(molecularname) LIKE lower($1) or lower(bindingdbligandname) LIKE lower($1)", ['%' + cname + '%'])
        // console.log("SELECT * FROM chemical WHERE cmpdname LIKE ?",[`%${cname}%`]);
        res.json(chemical.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a chemical by casno
app.get("/chemicalscasno/:casno", async (req, res) => {
    try {
        const { casno } = req.params
        console.log(casno)
        const chemical = await pool.query("SELECT * FROM chemical WHERE casno = $1", [casno])
        console.log("SELECT * FROM chemical WHERE casno = $1", [casno])
        res.json(chemical.rows)
    } catch (err) {
        console.error(err.message)
    }
})


//get a chemical by weight range
app.get("/chemicalsweight", async (req, res) => {
    try {
        let maxwt = parseFloat(req.query.maxweight)
        let minwt = parseFloat(req.query.minweight)
        console.log(req.query.minweight, req.query.maxweight)
        const chemical = await pool.query("SELECT * FROM chemical WHERE cast(molecularweight as double precision) >=$1 and cast(molecularweight as double precision) <=$2 ", [minwt, maxwt])
        // console.log("SELECT * FROM chemical WHERE molecularweight >=$1 and molecularweight <=$2 ", [req.query.minweight,req.query.maxweight]);
        res.json(chemical.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a chemical by alogp
app.get("/chemicalsalogp", async (req, res) => {
    try {
        let maxp = parseFloat(req.query.maxalogp)
        let minp = parseFloat(req.query.minalogp)
        console.log(maxp, minp)
        const chemical = await pool.query("SELECT * FROM chemical WHERE cast(alogp as double precision) >=$1 and cast(alogp as double precision) <=$2 ", [minp, maxp])
        // console.log("SELECT * FROM chemical WHERE cast(alogp as double precision) >=$1 and cast(alogp as double precision) <=$2 ", [minp,maxp]);
        res.json(chemical.rows)
    } catch (err) {
        console.error(err.message)
    }
})


//update

//delete

//init
app.listen(5000, () => {
    console.log("server has started on port 5000")
})
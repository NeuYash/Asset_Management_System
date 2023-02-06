const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())

const users = [
    {
        "userName": "aditya",
        "password": "qwerty123",
        "userType": "admin"
    },
    {
        "userName": "maya",
        "password": "qwerty123",
        "userType": "manager"
    }
]

let assets = [
    { assetId: 1100, assetName: "Routers", assetDes: "To route the network traffic.", status: "allocated" },
    { assetId: 1101, assetName: "Fibre", assetDes: "For high speed data.", status: "unallocated" },
]

let employees = [
    { employeeId: 100, employeeName: "Amit", employeeRole: "Manager", employeeSalary: 56000 },
    { employeeId: 101, employeeName: "Bhuvan", employeeRole: "Marketing", employeeSalary: 1000 },
    { employeeId: 102, employeeName: "Ajey", employeeRole: "HR", employeeSalary: 25000 }
]

//Users
app.get('/users', cors(), (req, res) => res.send(users))

//Assets
app.get('/assets', cors(), (req, res) => res.send({ status: 200, message: 'All clear', result: assets }))
app.get('/countAssets', cors(), (req, res) => {
    res.send({ status: 200, message: 'No of aaset.', result: assets.length })
})

app.post('/addAsset', bodyParser.json(), (req, res) => {
    assets.push({
        assetId: Math.floor(Math.random() * 10000),
        assetName: req.body.assetName,
        assetDes: req.body.assetDes,
        status: req.body.status
    })
    res.send({ status: 201, message: 'Add successful', result: {} })
})

app.put('/updateAsset', bodyParser.json(), (req, res) => {
    let idx = null
    for (let i = 0; i < assets.length; i++) {
        if (assets[i].assetId == req.body.assetId) {
            idx = i
            break
        }
    }

    if (idx == null) {
        res.send({ status: 404, message: 'ERROR', result: {} })
    } else {
        assets[idx].assetName = req.body.assetName
        assets[idx].assetDes = req.body.assetDes
        assets[idx].status = req.body.status
        res.send({ status: 201, message: 'Update success', result: {} })
    }
})

app.delete('/deleteAsset', cors(), (req, res) => {
    assets = assets.filter(asset => asset.assetId != req.query.assetId)
    res.send({ status: 204, message: 'Deleted', result: assets })
})

//Employees
app.get('/checkEmployee', cors(), (req, res) => {

    let idx = null;
    for (let i = 0; i < employees.length; i++) {
        if (req.query.employeeId == employees[i].employeeId) {
            idx = i
            break
        }
    }

    if (idx != null) {
        res.send({
            status: 200, message: "Exists",
            result: {
                employeeId: employees[idx].employeeId,
                employeeName: employees[idx].employeeName,
                employeeRole: employees[idx].employeeRole,
                employeeSalary: employees[idx].employeeSalary
            }
        })
        console.log("check")
    } else {
        res.send({ status: 404, message: "Doesn't exist", result: {} })
    }
})
app.get('/getEmployees', cors(), (req, res) => res.send({ status: 200, message: 'Employees', result: employees }))

app.post('/addEmployee', bodyParser.json(), (req, res) => {
    employees.push({
        employeeId: Math.floor(Math.random() * 5000),
        employeeName: req.body.employeeName,
        employeeRole: req.body.employeeRole,
        employeeSalary: req.body.employeeSalary
    })
    res.send({ status: 200, message: 'Add successful', result: {} })
})

app.put('/updateEmployee', bodyParser.json(), (req, res) => {
    let idx = null

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].employeeId == req.body.employeeId)
            idx = i
    }
    employees[idx].employeeName = req.body.employeeName
    employees[idx].employeeRole = req.body.employeeRole
    employees[idx].employeeSalary = req.body.employeeSalary
    if (idx == null)
        res.send({ status: 404, message: 'Error', result: {} })
    else
        res.send({ status: 200, message: 'Update Success', result: {} })
})

app.delete('/deleteEmployee', bodyParser.json(), (req, res) => {
    employees = employees.filter(emp => emp.employeeId != req.query.employeeId)
    res.send({ status: 200, message: "Deleted", result: employees })
})

app.listen(3000, () => console.log('Server running on port 3000'))

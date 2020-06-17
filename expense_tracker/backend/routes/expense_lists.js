const router = require('express').Router();
let Expense_list = require('../models/expense_list.model');

router.route('/').get((req,res)=>
{
    Expense_list.find()
    .then(lists => res.json(lists))
    .catch(err=>res.status(400).json('Error '+err));
});

router.route('/currentList').post((req,res)=>
{
    
    Expense_list.find({username:req.body.username})
    .sort('-createdAt')
    .then(list =>res.json(list))
    .catch(err=>res.status(400).json('Error '+err));
});

router.route('/createNewList').post((req,res)=>
{
    const username=req.body.username;
    const grocery=0;
    const medicine=0;
    const stationaries=0;
    const electricity=0;
    const rents=0;
    const monthly_subscriptions=0;
    const toiletries=0;
    const fresh_produce=0;
    const bakery=0;
    const start_date=req.body.start_date;
    const end_date=req.body.end_date;
    const misc=0;
    const monthly_budget=req.body.monthly_budget

    const newList = new Expense_list({username,grocery,medicine,stationaries,electricity,rents,monthly_subscriptions,toiletries,fresh_produce,bakery,start_date,end_date,misc,monthly_budget});

    newList.save()
    .then(()=>res.json('List added!'))
    .catch(err=>res.status(400).json('Error : '+err));
});

router.route('/findAll').post((req,res)=>{
    Expense_list.find({username:req.body.username})
    .then(list=>res.json(list))
    .catch(err=>res.status(400).json('Error : '+err));
});

router.route('/:id').delete((req,res)=>{
    Expense_list.findByIdAndDelete(req.params.id)
    .then(list=>res.json('List deleted !'))
    .catch(err=>res.status(400).json('Error : '+err));
});

router.route('/updateCurrentList/:id').post((req,res)=>
{
    Expense_list.findById(req.params.id)
    .then(list=>{
    list.username=req.body.username;
    list.grocery=req.body.grocery;
    list.medicine=req.body.medicine;
    list.stationaries=req.body.stationaries;
    list.electricity=req.body.electricity;
    list.rents=req.body.rents;
    list.monthly_subscriptions=req.body.monthly_subscriptions;
    list.toiletries=req.body.toiletries;
    list.fresh_produce=req.body.fresh_produce;
    list.bakery=req.body.bakery;
    list.misc=req.body.misc;


    list.save()
    .then(()=>res.json('List updated!'))
    .catch(err=>res.status(400).json('Error : '+err));
    })
    .catch(err=>res.status(400).json('Error : '+err));       
});



module.exports = router;
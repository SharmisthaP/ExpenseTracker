const router = require('express').Router();
let Event_list = require('../models/event_list.model');

router.route('/').get((req,res)=>
{
    Event_list.find()
    .then(events => res.json(events))
    .catch(err=>res.status(400).json('Error '+err));
});

router.route('/currentEvents').post((req,res)=>
{
    Event_list.find({username:req.body.username})
    .sort('-createdAt')
    .then(list =>res.json(list))
    .catch(err=>res.status(400).json('Error '+err));
});

router.route('/createNewEventList').post((req,res)=>
{
    const username=req.body.username;
    const start_date=req.body.start_date;
    const end_date=req.body.end_date;
    const events=[];

    const newEventList = new Event_list({username,start_date,end_date,events,});

    newEventList.save()
    .then(()=>res.json('Event List created!'))
    .catch(err=>res.status(400).json('Error : '+err));
});

router.route('/addEvent/:id').post((req,res)=>
{
    console.log("add event action called");
    Event_list.findById(req.params.id)
    .then(list=>{
        list.events.push(
            {event_date:req.body.event_date,event_name:req.body.event_name,event_items:req.body.event_items}
        );
    list.save()
    .then(()=>res.json('Event added!'))
    .catch(err=>res.status(400).json('Error : '+err));
    })
    .catch(err=>res.status(400).json('Error : '+err));       
});

router.route('/updateCurrentEvent/:id').post((req,res)=>
{
    Event_list.findById(req.params.id)
    .then(list=>{
        list.events.map((event)=>{
            if(event._id==req.body.eventid)
            {
                event.event_name=req.body.event_name;
                event.event_date=req.body.event_date;
                event.event_items=req.body.event_items;

            }
        });
    list.save()
    .then(()=>res.json('Event updated!'))
    .catch(err=>res.status(400).json('Error : '+err));
    })
    .catch(err=>res.status(400).json('Error : '+err));       
});

module.exports = router;
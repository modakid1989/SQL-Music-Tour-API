const bands = require('express').Router()
const db = require('../models')
const { Band, MeetGreet, Event, SetTime } = db
const { Op } = require ('sequelize')

// FIND ALL BANDS SHOW ROUTE
bands.get('/', async (req, res) => {
    try {
        console.log("Executing 'findAll' query...")
        const foundBands = await Band.findAll({
            attributes: ['band_id', ['name', 'band_name'], ['available_start_time', 'start_time'], 'end_time'],
            order: [['available_start_time', 'ASC']],
            where: {
                name: { 
                    [Op.like]: `%${ req.query.name ? req.query.name : ''}%`
                }
            }
        })
        console.log("Found bands:", foundBands)
        res.status(200).json(foundBands)
    } catch (error) {
        console.error("Error in 'findAll' query:", error)
        res.status(500).json(error)
    }
})

//FIND ONE
bands.get('/:name', async (req, res) => {
    try {
        console.log(`Executing 'findOne' query for band '${req.params.name}'...`)
        const foundBand = await Band.findOne({
            where: {name: req.params.name},
            attributes: ['name', ['available_start_time', 'start_time'], 'end_time'],
            include:[ 
                {
                    model: MeetGreet, 
                    as: "meet_greets",
                    attributes: ['meet_start_time', 'meet_end_time'],
                    include: { 
                        model: Event, 
                        as: "event", 
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                    }
                },
                {
                    model: SetTime,
                    as: "set_times",
                    attributes: ['start_time', 'end_time'],
                    include: { 
                        model: Event, 
                        as: "event",
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event: ''}%` } }
                     }
                }
            ],
            order: [
				[{ model: MeetGreet, as: 'meet_greets' }, { model: Event, as: 'event' }, 'date', 'DESC'],
				[{ model: SetTime, as: 'set_times' }, { model: Event, as: 'event' }, 'date', 'DESC'],
			],
        })
        console.log("Found band:", foundBand)
        res.status(200).json(foundBand)
    } catch (error) {
        console.error(`Error in 'findOne' query for band '${req.params.name}':`, error)
        res.status(500).json(error)
    }
})

//CREATE A BAND POST ROUTE
bands.post('/', async (req, res) => {
    try {
        console.log("Inserting new band...")
        const newBand = await Band.create(req.body)
        console.log("New band inserted:", newBand)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch(err) {
        console.error("Error inserting new band:", err)
        res.status(500).json(err)
    }
})

// UPDATE ONE BAND
bands.put('/:id',async (req, res) => {
    try {
        console.log(`Updating band with id ${req.params.id}...`)
        const updatedBands = await Band.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        console.log(`Updated ${updatedBands[0]} band(s)`)
        res.status(200).json({
            message: `Successfully updated ${updatedBands[0]} band(s)`
        })
    } catch(err) {
        console.error(`Error updating band with id ${req.params.id}:`, err)
        res.status(500).json(err)
    }
})

//DELETE A BAND
bands.delete('/:id', async (req, res) => {
    try {
        console.log(`Deleting band with id ${req.params.id}...`)
        const deletedBands = await Band.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


//EXPORT
module.exports = bands
// DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Op } = require('sequelize')
const { Event, Stage, StageEvent, MeetGreet, SetTime, Band } = db

// FIND ALL EVENTS SHOW ROUTE
events.get('/', async (req, res) => {
  try {
    const foundEvents = await Event.findAll({
      order: [['start_time', 'ASC']],
      where: {
        name: {
          [Op.like]: `%${req.query.name ? req.query.name : ''}%`
        }
      },
      include: [
        {
          model: db.Stage,
          as: 'stages',
          required: false
        }
      ]
    })
    res.status(200).json(foundEvents)
  } catch (error) {
    res.status(500).json(error)
  }
})

// FIND ONE EVENT
events.get('/:name', async (req, res) => {
  try {
    const foundEvent = await Event.findOne({
      where: { name: req.params.name },
      attributes: { exclude: ['event_id'] },
      include: [
        {
          model: MeetGreet,
          as: 'meet_greets',
          include: {
            model: Band,
            as: 'band',
            attributes: ['name']
          }
        },
        {
          model: SetTime,
          as: 'set_times',
          attributes: ['start_time', 'end_time'],
          include: [
            {
              model: Band,
              as: 'band',
              attributes: ['name']
            },
            {
              model: Stage,
              as: 'stage',
              attributes: ['stage_name']
            }
          ]
        },
        {
          model: Stage,
          as: 'stages',
          attributes: { exclude: ['stage_id'] },
					through: { attributes: [] },
        }
      ],
   order: [
      [{model: MeetGreet, as:'meet_greets'}, 'meet_start_time', 'ASC'],
      [{model: SetTime, as:'set_times'}, 'start_time', 'ASC'],
      [{model: Stage, as: 'stages'}, 'stage_name', 'ASC']
    ]
    })
    if (foundEvent) {
      res.status(200).json(foundEvent)
    } else {
      res.status(404).json({ message: 'Event not found' })
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// CREATE AN EVENT POST ROUTE
events.post('/', async (req, res) => {
  try {
    const newEvent = await Event.create(req.body)
    res.status(200).json({
      message: 'Successfully inserted a new event',
      data: newEvent
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

// UPDATE AN EVENT PUT ROUTE
events.put('/:id', async (req, res) => {
  try {
    const updatedEvents = await Event.update(req.body, {
      where: { event_id: req.params.id }
    })
    res.status(200).json({
      message: `Successfully updated ${updatedEvents[0]} event(s)`
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

// DELETE AN EVENT
events.delete('/:id', async (req, res) => {
  try {
    const deletedEvents = await Event.destroy({
      where: { event_id: req.params.id }
    })
    res.status(200).json({
      message: `Successfully deleted ${deletedEvents} event(s)`
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

// EXPORT
module.exports = events
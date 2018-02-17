import express from 'express';
import Db from '../database';
import jwt from 'express-jwt';
import { db, secret } from '../config';
import { handleError } from '../utils';

const app = express.Router();
const database = new Db(db);

app.get('/all', async (req, res) => {
  try {
    await database.connect();
    const hotels = await database.getHotels();
    await database.disconnect();
    res.status(200).json(hotels);
  } catch (error) {
    handleError(error, res);
  }
});
app.get('/one/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await database.connect();
    const hotel = await database.getHotel(id);
    await database.disconnect();
    res.status(200).json(hotel);
  } catch (error) {
    handleError(error, res);
  }
});
app.post('/', jwt({ secret }), async (req, res) => {
  const { hotel } = req.body;
  try {
    await database.connect();
    const hotel = await database.createHotel(hotel);
    await database.disconnect();
    res.status(201).json(hotel);
  } catch (error) {
    handleError(error, res);
  }
});
app.put('/:id', jwt({ secret }), async (req, res) => {
  const { id } = req.params;
  const { hotel } = req.body;
  try {
    await database.connect();
    const hotel = await database.updateHotel(id, hotel);
    await database.disconnect();
    res.status(201).json(hotel);
  } catch (error) {
    handleError(error, res);
  }
});
app.delete('/:id', jwt({ secret }), async (req, res) => {
  const { id } = req.params;
  try {
    await database.connect();
    const hotel = await database.deleteHotel(id);
    await database.disconnect();
    res.status(201).json(hotel);
  } catch (error) {
    handleError(error, res);
  }
});

export default app;

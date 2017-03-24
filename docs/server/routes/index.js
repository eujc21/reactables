import app from '../../server/entry'
import { homeRoute } from './home.router';

export app.server.use('/home', homeRoute);

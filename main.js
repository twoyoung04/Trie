import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import URLParse from 'url-parse'
import { app } from './src/app'

const location = window.location;
const {pathname} = URLParse(location);
console.log("🚀🚀🚀 ~ pathname:", pathname)


app();
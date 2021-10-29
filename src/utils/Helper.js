
import { Buffer } from "buffer"

export const rand = (min, max) => min+Math.floor(Math.random() * max);

export const postcolor = (post) => `#${Buffer.from(post.title, 'utf8').toString('hex').substr(1,6)}`;
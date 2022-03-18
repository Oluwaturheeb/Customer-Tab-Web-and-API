import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import fs from 'fs';

let conf = fs.readFileSync('./devtee-93ae3-6ed56c9d4b51.json','utf-8' );

initializeApp({credential: cert(JSON.parse(conf))});


export const myTab = getFirestore().collection('customerTab');
export const otherTab = getFirestore().collection('otherTab');
export const download = getFirestore().collection('download');
export const field = FieldValue;
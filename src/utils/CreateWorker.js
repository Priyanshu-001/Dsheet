// eslint-disable-next-line
export const createWorker = fn => {
   
    const blob = new Blob([ '( onmessage=' + fn.toString() + ')()'], { type: 'application/javascript' }) 
    const objectURL = URL.createObjectURL(blob)
    const worker = new Worker(objectURL)
    return worker
}
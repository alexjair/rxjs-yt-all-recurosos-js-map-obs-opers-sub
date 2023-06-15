import {Observable, Observer} from 'rxjs';

const myObserver: Observer<any> =  {
  next : x => {
    if(!isNaN(x)){ //Saber si es un Numero
      console.log("'X' es un numero.");
      console.log("Valor: ",x);
    }else{
      console.log(`'X' no es un numero. Valor = ${x}`);
    }
  },
  error: err => {
    console.error("Se produjo un error.", err);
  },
  complete: () => {
    console.log("Trabajo completado..");
  }
}

const myObservable = new Observable( subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next("Hola mensaje");
    setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
    }, 1000);
    subscriber.error("Respuesta de Error");
});

const myObservable2 = new Observable( subscriber => {
  subscriber.complete();
});

console.log("Run 001: myObservable");
console.log("------------------");
myObservable.subscribe(myObserver);
console.log("Run 002: myObservable2");
console.log("------------------");
myObservable2.subscribe(myObserver);